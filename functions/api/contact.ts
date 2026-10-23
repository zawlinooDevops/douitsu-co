/**
 * DOUITSU LLC — Form Validation & Anti-Abuse Pipeline
 * 
 * Target Platforms:
 *   - Cloudflare Pages Functions (Edge Runtime: functions/api/contact.ts)
 *   - Local Vite Dev Middleware (Node Runtime in astro.config.mjs)
 * 
 * Pipeline Stages:
 *   1. Method & Content-Type Gate
 *   2. Payload Size Guard (10KB limit)
 *   3. CSRF & Origin/Referer Verification
 *   4. Dual Bot Heuristics (Website Honeypot + Time Heuristic -> Silent 200 Shadow Drop)
 *   5. Strict Field-Level Validation (Name, Email, Phone, Message)
 *   6. Canonical Turnstile Verification (spin/prompt.md contract: action="contact", hostname allowlist)
 *   7. Transactional Email Dispatch via Resend API
 */

interface Env {
  PUBLIC_TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET?: string;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  RESEND_TO_EMAIL?: string;
  [key: string]: string | undefined;
}

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string;        // Field Honeypot (must be empty)
  renderedAt?: number;     // Time-based Honeypot (timestamp when form mounted)
  turnstileToken?: string; // Cloudflare Turnstile single-use token
}

// Canonical Hostname Allowlist for DOUITSU LLC (Strict Production)
const APPROVED_HOSTNAMES = new Set([
  'douitsu-co.com',
  'www.douitsu-co.com'
]);

// In-memory cache for 30s duplicate submission guard
const recentSubmissions = new Map<string, number>();

function cleanRecentSubmissions(): void {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > 60_000) {
      recentSubmissions.delete(key);
    }
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function handleContactSubmission(
  request: Request,
  env: Env
): Promise<Response> {
  cleanRecentSubmissions();

  // --------------------------------------------------------------------------
  // Stage 1: HTTP Method & Content-Type Gate
  // --------------------------------------------------------------------------
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json', 'Allow': 'POST' } }
    );
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return new Response(
      JSON.stringify({ success: false, error: 'UNSUPPORTED_MEDIA_TYPE', message: 'Content-Type must be application/json' }),
      { status: 415, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // --------------------------------------------------------------------------
  // Stage 2: Payload Size Guard (Max 10 KB to prevent buffer flooding)
  // --------------------------------------------------------------------------
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'READ_BODY_FAILED', message: 'Failed to read request payload' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (rawBody.length > 10_240) {
    return new Response(
      JSON.stringify({ success: false, error: 'PAYLOAD_TOO_LARGE', message: 'Payload exceeds maximum limit of 10KB' }),
      { status: 413, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let payload: ContactPayload;
  try {
    payload = JSON.parse(rawBody) as ContactPayload;
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'INVALID_JSON', message: 'Invalid JSON request payload' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // --------------------------------------------------------------------------
  // Stage 3: CSRF & Origin / Referer Validation
  // --------------------------------------------------------------------------
  const originHeader = request.headers.get('origin');
  const refererHeader = request.headers.get('referer');
  const checkUrl = originHeader || refererHeader;

  if (checkUrl) {
    try {
      const parsed = new URL(checkUrl);
      if (!APPROVED_HOSTNAMES.has(parsed.hostname)) {
        return new Response(
          JSON.stringify({ success: false, error: 'CSRF_FORBIDDEN', message: 'Cross-origin request rejected' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: 'INVALID_ORIGIN_HEADER', message: 'Malformed origin header' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // --------------------------------------------------------------------------
  // Stage 4: Triple Bot Heuristics (Honeypot + Time Check + Link Injection -> Silent 200 Shadow Drop)
  // --------------------------------------------------------------------------
  // Heuristic A: Field Honeypot (website field must be blank for human users)
  if (payload.website && payload.website.trim().length > 0) {
    // Return fake success so bots do not retry with alternate vectors
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message delivered successfully.',
        id: 'shadow-drop-honeypot'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Heuristic B: Time-based Honeypot (humans require at least 2.0s to fill form)
  const renderedAt = Number(payload.renderedAt);
  if (renderedAt && Number.isFinite(renderedAt)) {
    const elapsedMs = Date.now() - renderedAt;
    if (elapsedMs < 2000 && elapsedMs >= 0) {
      // Rapid automated script detected -> shadow-drop
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Message delivered successfully.',
          id: 'shadow-drop-speed'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // Heuristic C: Link / URL Injection (Common spam bot vector in inquiries)
  const URL_REGEX = /(https?:\/\/|ftp:\/\/|www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9-]+\.(com|org|net|xyz|ru|top|biz|info|cn|cc|me|live|site|online|shop|club|store|vip|pro|icu|work|link|click|app|io|ai)(\/|\b)|\[url=|<a\s+href)/i;
  const contentToCheck = `${payload.name || ''} ${payload.message || ''}`;
  if (URL_REGEX.test(contentToCheck)) {
    // URL spam bot detected -> silent 200 shadow-drop without email dispatch
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message delivered successfully.',
        id: 'shadow-drop-url'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // --------------------------------------------------------------------------
  // Stage 5: Strict Field-Level Validation
  // --------------------------------------------------------------------------
  // Stage 5: Input Sanitization & Field-Level Strict Validation
  // --------------------------------------------------------------------------
  // Strip control characters & newlines from header-sensitive fields (Header Injection Prevention)
  const name = (payload.name || '').trim().replace(/[\r\n\t]/g, ' ');
  const email = (payload.email || '').trim().replace(/[\r\n\t]/g, '');
  const phone = (payload.phone || '').trim().replace(/[\r\n\t]/g, '');
  const message = (payload.message || '').trim();
  const turnstileToken = (payload.turnstileToken || '').trim();

  // Name: 2 to 100 characters
  if (!name || name.length < 2 || name.length > 100) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'INVALID_NAME',
        field: 'name',
        message: 'Name must be between 2 and 100 characters.'
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Email: RFC 5322 regex compliant, max 254 characters
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!email || email.length > 254 || !emailRegex.test(email)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'INVALID_EMAIL',
        field: 'email',
        message: 'Please provide a valid email address.'
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Phone: 8 to 20 characters, Japanese & International format
  const phoneRegex = /^[0-9+\-()\s]{8,20}$/;
  const digitsOnly = phone.replace(/[^0-9]/g, '');
  if (!phone || !phoneRegex.test(phone) || digitsOnly.length < 8) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'INVALID_PHONE',
        field: 'phone',
        message: 'Please provide a valid phone number with at least 8 digits.'
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Message: Required, 10 to 3000 characters
  if (!message || message.length < 10 || message.length > 3000) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'INVALID_MESSAGE',
        field: 'message',
        message: 'Inquiry message must be between 10 and 3,000 characters.'
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Turnstile Token Presence & Length Guard (<= 2048 chars per Cloudflare standard)
  if (!turnstileToken || turnstileToken.length > 2048) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'CAPTCHA_REQUIRED',
        field: 'turnstile',
        message: 'Cloudflare Turnstile verification token is required and must be valid.'
      }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // --------------------------------------------------------------------------
  // Stage 6: Duplicate Submission Guard (30-second window)
  // --------------------------------------------------------------------------
  const clientIp = request.headers.get('cf-connecting-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || 'unknown-ip';
  
  const duplicateKey = `${clientIp}:${email}:${message.slice(0, 50)}`;
  const now = Date.now();
  const lastSubmitted = recentSubmissions.get(duplicateKey);

  if (lastSubmitted && now - lastSubmitted < 30_000) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'DUPLICATE_SUBMISSION',
        message: 'Duplicate submission detected. Please wait 30 seconds before resubmitting.'
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // --------------------------------------------------------------------------
  // Stage 7: Canonical Cloudflare Turnstile Verification (spin/prompt.md standard)
  // --------------------------------------------------------------------------
  const turnstileSecret = env.TURNSTILE_SECRET || env.TURNSTILE_SECRET_KEY;
  const resendApiKey = env.RESEND_API_KEY;
  const fromEmail = env.CONTACT_FROM_EMAIL || env.RESEND_FROM_EMAIL || 'contact@douitsu-co.com';
  const toEmail = env.CONTACT_TO_EMAIL || env.RESEND_TO_EMAIL || 'info@douitsu-co.com';

  if (!turnstileSecret) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'CONFIG_ERROR',
        message: 'Server configuration error: TURNSTILE_SECRET or TURNSTILE_SECRET_KEY is not set.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!resendApiKey) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'CONFIG_ERROR',
        message: 'Server configuration error: RESEND_API_KEY is not set.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const expectedAction = 'contact';
  const turnstileParams = new URLSearchParams();
  turnstileParams.append('secret', turnstileSecret);
  turnstileParams.append('response', turnstileToken);
  if (clientIp && clientIp !== 'unknown-ip') {
    turnstileParams.append('remoteip', clientIp);
  }

  try {
    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body: turnstileParams.toString()
    });

    if (!turnstileRes.ok) {
      throw new Error(`siteverify returned HTTP ${turnstileRes.status}`);
    }

    const turnstileJson = await turnstileRes.json() as {
      success?: boolean;
      action?: string;
      hostname?: string;
      'error-codes'?: string[];
    };

    const isSuccess = turnstileJson.success === true;
    const actionMatch = turnstileJson.action === expectedAction;
    const hostnameMatch = Boolean(turnstileJson.hostname && APPROVED_HOSTNAMES.has(turnstileJson.hostname));

    if (!isSuccess || !actionMatch || !hostnameMatch) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'TURNSTILE_FAILED',
          message: 'Security challenge verification failed. Please try again.',
          details: turnstileJson['error-codes'] || []
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'TURNSTILE_NETWORK_ERROR',
        message: 'Failed to communicate with Turnstile verification service.',
        details: errMsg
      }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // --------------------------------------------------------------------------
  // Stage 8: Transactional Email Dispatch via Resend API
  // --------------------------------------------------------------------------
  const jstFormatter = new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Tokyo'
  });
  const formattedDate = jstFormatter.format(new Date());

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  const htmlBody = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>【お問い合わせ】${safeName} 様</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a;">
  <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);">
    
    <!-- Header Banner -->
    <div style="background: linear-gradient(135deg, #105c8e 0%, #1a486c 100%); padding: 28px 32px; color: #ffffff;">
      <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #7ba7cc; font-weight: 700;">DOUITSU LLC — 公式ウェブサイト通知</p>
      <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 800; color: #ffffff;">新しいお問い合わせを受信しました</h1>
    </div>
    
    <!-- Body Content -->
    <div style="padding: 32px;">
      <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #334155;">
        DOUITSU合同会社 公式ウェブサイトのお問い合わせフォームより、以下の内容が送信されました。
      </p>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        <tr style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 0; width: 130px; font-weight: 700; color: #64748b;">お名前</td>
          <td style="padding: 12px 0; color: #0f172a; font-weight: 700;">${safeName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 0; font-weight: 700; color: #64748b;">メールアドレス</td>
          <td style="padding: 12px 0; color: #0f172a; font-weight: 600;">
            ${safeEmail}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 0; font-weight: 700; color: #64748b;">電話番号</td>
          <td style="padding: 12px 0; color: #0f172a; font-weight: 600;">
            ${safePhone}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 0; font-weight: 700; color: #64748b;">送信日時 (JST)</td>
          <td style="padding: 12px 0; color: #475569; font-size: 13px;">${formattedDate}</td>
        </tr>
      </table>

      <!-- Message Box -->
      <div style="margin-top: 16px;">
        <div style="font-weight: 700; color: #334155; font-size: 13px; margin-bottom: 8px;">お問い合わせ内容:</div>
        <div style="background-color: #eff6fa; border: 1px solid #dbeaf3; border-radius: 12px; padding: 16px; color: #1e293b; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</div>
      </div>

      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px dashed #cbd5e1; font-size: 12px; color: #64748b;">
        ※ このメールに直接「返信 (Reply)」すると、送信者（${safeName} 様）宛に届きます。
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; line-height: 1.6; text-align: center;">
      <p style="margin: 0; font-weight: 700; color: #0d1b2a;">DOUITSU合同会社 (登録支援機関: 25登－012206)</p>
      <p style="margin: 2px 0 0 0;">〒204-0021 東京都清瀬市元町1-11-21 フローレス元町205号</p>
      <p style="margin: 2px 0 0 0;">TEL: 042-497-1537 / E-mail: info@douitsu-co.com</p>
    </div>

  </div>
</body>
</html>`;

  const textBody = [
    '=====================================================',
    '  DOUITSU LLC — 公式ウェブサイトお問い合わせ通知',
    '=====================================================',
    '',
    `【お名前】: ${name}`,
    `【メールアドレス】: ${email}`,
    `【電話番号】: ${phone}`,
    `【送信日時】: ${formattedDate} (日本標準時)`,
    '',
    '【お問い合わせ内容】:',
    message,
    '',
    '-----------------------------------------------------',
    '※ このメールに直接返信すると送信者宛に届きます。',
    'DOUITSU合同会社 (出入国在留管理庁 登録支援機関: 25登－012206)',
    '〒204-0021 東京都清瀬市元町1-11-21 フローレス元町205号',
    'TEL: 042-497-1537 | https://www.douitsu-co.com/'
  ].join('\n');

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Douitsu-Website/1.2.0'
      },
      body: JSON.stringify({
        from: `DOUITSU LLC <${fromEmail}>`,
        to: [toEmail],
        reply_to: `${name} <${email}>`,
        subject: `【お問い合わせ】${name} 様よりWebサイトからのお問い合わせ`,
        html: htmlBody,
        text: textBody
      })
    });

    const resendJson = await resendRes.json() as { id?: string; message?: string; name?: string };

    if (!resendRes.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'RESEND_API_ERROR',
          message: resendJson.message || 'Failed to dispatch email via Resend API.',
          details: resendJson
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Record timestamp for duplicate submission prevention
    recentSubmissions.set(duplicateKey, now);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message delivered successfully.',
        id: resendJson.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'RESEND_NETWORK_ERROR',
        message: 'Failed to connect to email dispatch service.',
        details: errMsg
      }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Cloudflare Pages Function Entrypoint
 */
export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  return handleContactSubmission(context.request, context.env);
}
