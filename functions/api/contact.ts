/**
 * DOUITSU LLC — Contact Form API Handler
 * 
 * Target Platforms:
 *   - Cloudflare Pages Functions (Production Edge Runtime)
 *   - Local Vite Middleware in astro.config.mjs (Local Dev Runtime)
 * 
 * Verifies Cloudflare Turnstile CAPTCHA and dispatches transactional
 * notification emails via Resend API.
 */

interface Env {
  PUBLIC_TURNSTILE_SITE_KEY?: string;
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
  turnstileToken?: string;
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
  // Enforce POST method
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'METHOD_NOT_ALLOWED', message: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'INVALID_JSON', message: 'Invalid JSON request payload' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();
  const phone = (payload.phone || '').trim();
  const message = (payload.message || '').trim();
  const turnstileToken = (payload.turnstileToken || '').trim();

  // Validate required fields
  if (!name || !email || !phone) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'MISSING_REQUIRED_FIELDS',
        message: 'Name, email, and phone number are required.'
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'INVALID_EMAIL',
        message: 'Please provide a valid email address.'
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate Turnstile CAPTCHA token presence
  if (!turnstileToken) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'CAPTCHA_REQUIRED',
        message: 'Cloudflare Turnstile verification is required.'
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Retrieve secrets from environment
  const turnstileSecret = env.TURNSTILE_SECRET_KEY;
  const resendApiKey = env.RESEND_API_KEY;
  const fromEmail = env.CONTACT_FROM_EMAIL || env.RESEND_FROM_EMAIL || 'info@douitsu-co.com';
  const toEmail = env.CONTACT_TO_EMAIL || env.RESEND_TO_EMAIL || 'info@douitsu-co.com';

  if (!turnstileSecret) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'CONFIG_ERROR',
        message: 'Server configuration error: TURNSTILE_SECRET_KEY is not set.'
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

  // Step 1: Verify Turnstile Token with Cloudflare
  const clientIp = request.headers.get('cf-connecting-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || '';

  const turnstileParams = new URLSearchParams();
  turnstileParams.append('secret', turnstileSecret);
  turnstileParams.append('response', turnstileToken);
  if (clientIp) {
    turnstileParams.append('remoteip', clientIp);
  }

  let turnstileVerificationSuccess = false;
  try {
    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: turnstileParams.toString()
    });

    const turnstileJson = await turnstileRes.json() as { success?: boolean; 'error-codes'?: string[] };
    turnstileVerificationSuccess = Boolean(turnstileJson.success);

    if (!turnstileVerificationSuccess) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'TURNSTILE_FAILED',
          message: 'Security verification failed. Please try again.',
          details: turnstileJson['error-codes'] || []
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'TURNSTILE_NETWORK_ERROR',
        message: 'Failed to communicate with verification service.',
        details: errMsg
      }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Step 2: Build Branded HTML and Plain-Text Emails
  const jstFormatter = new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Tokyo'
  });
  const formattedDate = jstFormatter.format(new Date());

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br/>') : '（お問い合わせ内容なし）';

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
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #7ba7cc; font-weight: 700;">DOUITSU LLC — 公式ウェブサイト通知</p>
          <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 800; color: #ffffff;">新しいお問い合わせを受信しました</h1>
        </div>
      </div>
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
          <td style="padding: 12px 0;">
            <a href="mailto:${safeEmail}" style="color: #105c8e; font-weight: 600; text-decoration: underline;">${safeEmail}</a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 0; font-weight: 700; color: #64748b;">電話番号</td>
          <td style="padding: 12px 0;">
            <a href="tel:${safePhone}" style="color: #0f172a; font-weight: 600; text-decoration: none;">${safePhone}</a>
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
        ※ このメールに直接返信すると、送信者（${safeEmail}）宛に返信されます。
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; line-height: 1.6; text-align: center;">
      <p style="margin: 0; font-weight: 700; color: #0d1b2a;">DOUITSU合同会社 (登録支援機関: REG:0A32ES43)</p>
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
    message || '（お問い合わせ内容なし）',
    '',
    '-----------------------------------------------------',
    '※ このメールに直接返信すると送信者宛に届きます。',
    'DOUITSU合同会社 (出入国在留管理庁 登録支援機関 REG:0A32ES43)',
    '〒204-0021 東京都清瀬市元町1-11-21 フローレス元町205号',
    'TEL: 042-497-1537 | https://www.douitsu-co.com/'
  ].join('\n');

  // Step 3: Dispatch via Resend API
  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Douitsu-Website/1.1.0'
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
 * Cloudflare Pages Function entrypoint
 */
export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  return handleContactSubmission(context.request, context.env);
}
