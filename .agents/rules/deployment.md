---
trigger: always_on
description: Deployment Instructions, Build Pipeline, Server Configuration, and Caching Guidelines for DOUITSU LLC
---

# Deployment & Build Specifications

## 1. Build Verification & Commands

```bash
# Clean Install Dependencies
npm install

# Run Local Development Server
npm run dev

# Run Production Build (Static Site Generation)
npm run build

# Preview Production Build Locally
npm run preview
```

### Build Artifacts (`dist/`):
- `dist/index.html` (Main Landing Page with all active sections)
- `dist/_astro/*.js` (Bundled Alpine.js and scripts, ~19.7 kB gzipped)
- `dist/_astro/*.css` (Tailwind CSS stylesheet)
- `dist/images/` (Optimized logos, hero background, certificates, flyers)
- `dist/fonts/` (Self-hosted TTF font files)
- `dist/files/` (Kaigo exam PDF textbooks)

---

## 2. Recommended Hosting Targets

### Option A: Cloudflare Workers with Static Assets (Primary Production Target)

The website is deployed to Cloudflare as a unified **Cloudflare Worker with Static Assets** (Workers Assets architecture):

- **Architecture Overview**:
  1. **Static Assets (`dist/`)**: Compiled at build time by Astro (`npm run build`) containing HTML, CSS, client scripts, self-hosted TTF fonts, images, and `404.html`. Uploaded directly to Cloudflare edge assets store.
  2. **Worker Script (`src/worker.ts`)**: Acts as the edge gateway. When a visitor requests `/api/contact` via `POST`, the Worker executes the anti-abuse pipeline and dispatches emails via Resend. For all other requests, it proxies seamlessly to `env.ASSETS.fetch(request)`.
  3. **Custom 404 Handling**: Configured with `"not_found_handling": "404-page"` in `wrangler.jsonc`, automatically serving `dist/404.html` with status 404 whenever an asset route is not found.

- **Cloudflare CI Build Commands**:
  - **Build command**: `npm run build`
  - **Deploy command**: `npx wrangler deploy`

- **Authoritative Configuration (`wrangler.jsonc`)**:
  ```jsonc
  {
    "name": "douitsu-co",
    "main": "src/worker.ts",
    "compatibility_date": "2024-11-01",
    "assets": {
      "directory": "./dist",
      "binding": "ASSETS",
      "not_found_handling": "404-page"
    },
    "vars": {
      "CONTACT_FROM_EMAIL": "info@douitsu-co.com",
      "CONTACT_TO_EMAIL": "zawlinoo.dev@gmail.com",
      "PUBLIC_TURNSTILE_SITE_KEY": "0x4AAAAAAFYQzIK4TKPrb3od"
    }
  }
  ```

- **Runtime Environment Variables & Secrets**:
  - **Public Variables (`vars` in `wrangler.jsonc`)**:
    - `CONTACT_FROM_EMAIL`: Verified sender address (`info@douitsu-co.com`).
    - `CONTACT_TO_EMAIL`: Recipient inbox address (`zawlinoo.dev@gmail.com`).
    - `PUBLIC_TURNSTILE_SITE_KEY`: Client-facing Turnstile widget key.
  - **Encrypted Secrets (Configured in Cloudflare Dashboard)**:
    - `TURNSTILE_SECRET_KEY`: Never committed to git. Stored as an Encrypted Secret in Cloudflare Dashboard -> Workers & Pages -> Settings -> Variables and Secrets.
    - `RESEND_API_KEY`: Never committed to git. Stored as an Encrypted Secret in Cloudflare Dashboard.

---

### Option B: Cloudflare Pages (Pages Functions Fallback)
If deployed via legacy Cloudflare Pages:
- `public/_routes.json` routes `/api/*` to `functions/api/contact.ts` and `/*` to static files.
- Build Output Directory: `dist`.

---

### Option C: GitHub Pages
- Deployable via `.github/workflows/deploy.yml` using `actions/deploy-pages`.
- Requires setting `site: 'https://<username>.github.io/<repo>'` in `astro.config.mjs` if not using a custom domain.

---

### Option D: Linux Server (Nginx / Apache)
Place `dist/` contents in the webroot (e.g. `/var/www/douitsu-co/html`).

#### Example Nginx VirtualHost Configuration:
```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name www.douitsu-co.com douitsu-co.com;

    root /var/www/douitsu-co/dist;
    index index.html;

    # HTML Pages: No-cache revalidation for instant content updates
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Static Assets: 1-Year Immutable Caching
    location ~* \.(webp|jpg|jpeg|png|gif|ico|svg|ttf|woff2|pdf)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Astro Chunked JS & CSS
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Fallback for routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 3. Pre-Deployment Verification Checklist

Before pushing changes to production, agents must verify:
- [ ] `npm run build` exits with code 0.
- [ ] Static build generates clean unified output: `dist/index.html`.
- [ ] Trilingual toggling works across Japanese, English, and Myanmar.
- [ ] Language state persists across page navigation via `localStorage`.
- [ ] Image lightbox modals open and close correctly.
- [ ] Download links for both Kaigo PDF textbooks trigger file downloads.
- [ ] Form submission validation works when required fields are blank.
- [ ] No broken links or external CDN dependencies are introduced.
- [ ] **Pre-Push Version Protocol**: Consult user on SemVer bump (`patch`, `minor`, `major`) with recommendation, update `package.json` & `siteData.meta.version`, and verify footer version badge prior to git push.
