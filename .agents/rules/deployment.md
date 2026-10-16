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

### Option A: Cloudflare Pages (Recommended)
- **Framework Preset**: Astro
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Node.js Version**: `>= 18.20.0` or `20.x`
- **Global CDN Edge**: High-speed edge delivery across Tokyo, Osaka, and Yangon POPs with zero egress fees.

### Option B: GitHub Pages
- Deployable via `.github/workflows/deploy.yml` using `actions/deploy-pages`.
- Requires setting `site: 'https://<username>.github.io/<repo>'` in `astro.config.mjs` if not using a custom domain.

### Option C: Linux Server (Nginx / Apache)
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
