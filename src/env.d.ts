/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'alpinejs';

interface ImportMetaEnv {
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly TURNSTILE_SECRET_KEY?: string;
  readonly RESEND_API_KEY?: string;
  readonly CONTACT_FROM_EMAIL?: string;
  readonly RESEND_FROM_EMAIL?: string;
  readonly CONTACT_TO_EMAIL?: string;
  readonly RESEND_TO_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  turnstile?: {
    render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
    reset: (widgetId?: string) => void;
    getResponse: (widgetId?: string) => string;
    remove: (widgetId?: string) => void;
  };
}
