import { handleContactSubmission } from '../functions/api/contact';

export interface WorkerEnv {
  ASSETS: {
    fetch: typeof fetch;
  };
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  PUBLIC_TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET?: string;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  [key: string]: unknown;
}

const SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
};

function withSecurityHeaders(response: Response): Response {
  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!newHeaders.has(key)) {
      newHeaders.set(key, value);
    }
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, '');

    // Intercept Contact API route
    if (pathname === '/api/contact') {
      const apiResponse = await handleContactSubmission(request, env as Record<string, string | undefined>);
      return withSecurityHeaders(apiResponse);
    }

    // Fall back to Cloudflare Static Assets (dist/) for HTML, CSS, fonts, images, and 404.html
    const assetResponse = await env.ASSETS.fetch(request);
    return withSecurityHeaders(assetResponse);
  }
};
