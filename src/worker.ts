import { handleContactSubmission } from '../functions/api/contact';

export interface WorkerEnv {
  ASSETS: {
    fetch: typeof fetch;
  };
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  PUBLIC_TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  [key: string]: unknown;
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, '');

    // Intercept Contact API route
    if (pathname === '/api/contact') {
      return handleContactSubmission(request, env as Record<string, string | undefined>);
    }

    // Fall back to Cloudflare Static Assets (dist/) for HTML, CSS, fonts, images, and 404.html
    return env.ASSETS.fetch(request);
  }
};
