---
trigger: always_on
description: Comprehensive Tech Stack Architecture, Runtime, Styling, Typography, and Client State Specifications for DOUITSU LLC
---

# Tech Stack Architecture & Engineering Specifications

## 1. Core Framework & Build Engine

- **Framework**: [Astro 5](https://astro.build/) (`astro@^5.4.2`)
- **Module System**: ECMAScript Modules (`"type": "module"` in `package.json`)
- **Rendering Architecture**: Pure Static Site Generation (SSG)
  - `output: "static"` (default Astro 5 mode)
  - Pre-renders all pages at build time into pure HTML, CSS, and localized JS assets.
- **Astro Configuration (`astro.config.mjs`)**:
  ```javascript
  import { defineConfig } from 'astro/config';
  import tailwind from '@astrojs/tailwind';

  export default defineConfig({
    integrations: [tailwind()],
    site: 'https://www.douitsu-co.com',
    build: {
      format: 'file' // Outputs /index.html and /job.html directly
    }
  });
  ```
- **Package Manager**: `npm` with `package-lock.json` (v3 format).
- **Core Dependencies**:
  - `astro`: `^5.4.2`
  - `@astrojs/tailwind`: `^5.1.5`
  - `tailwindcss`: `^3.4.17`
  - `alpinejs`: `^3.14.8`

---

## 2. Styling System & Design Tokens

### CSS Framework & Pipeline
- **Tailwind CSS**: v3.4.17 integrated via `@astrojs/tailwind`.
- **Global Styles**: Defined in `src/styles/global.css`, importing `src/styles/fonts.css`.
- **Design Principles**: Modern corporate B2B aesthetics blending Japanese business trust with warm, friendly Sakura accents and oceanic blue tones.

### Color Tokens (`douitsu` theme in `tailwind.config.mjs`)

| Token Name | Hex Code | Semantic Role & Usage |
|---|---|---|
| `douitsu.navy` | `#0d1b2a` | Primary text headings, top info bar background, footer background |
| `douitsu.dark` | `#1b263b` | Dark container backgrounds, high-contrast borders |
| `douitsu.blue` | `#1a486c` | Logo dark blue facet, button hover state, badge accent |
| `douitsu.primary` | `#105c8e` | Official DOUITSU brand logo signature blue, primary CTA buttons, active links, focus rings |
| `douitsu.accent` | `#1874b3` | Secondary interactive accents, hover highlights |
| `douitsu.sky` | `#7ba7cc` | Logo light blue facet, subtle icon highlights, top-bar icon accents |
| `douitsu.ice` | `#eff6fa` | Ultra-light blue tint derived from logo blue |
| `douitsu.light` | `#dbeaf3` | Soft icon and badge background tint |
| `douitsu.slate` | `#334155` | Secondary text, subheadings, card descriptions |
| `douitsu.muted` | `#64748b` | Muted captions, form placeholders, metadata labels |
| `douitsu.sakura` | `#f43f5e` | Japanese Sakura cherry blossom accent color |
| `douitsu.sakura-pink` | `#fb7185` | Subtle blossom highlight and card corner accents |
| `douitsu.sakura-soft` | `#fff1f2` | Soft blossom background tint, warm highlight gradient |

### Custom Shadows & Glassmorphism Utilities
- **`shadow-glass`**: `0 8px 32px 0 rgba(31, 38, 135, 0.07)`
- **`shadow-card`**: `0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`
- **`shadow-glow`**: `0 0 25px rgba(16, 92, 142, 0.25)`
- **`.glass-panel`**: `background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(226, 232, 240, 0.8);`
- **`.glass-nav`**: `background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(226, 232, 240, 0.7);`
- **`.sakura-gradient`**: `background: linear-gradient(135deg, #fff1f2 0%, #ffffff 50%, #eff6ff 100%);`

---

## 3. Client Reactivity & State Management (Alpine.js)

The project deliberately avoids heavy React/Vue/Svelte runtimes in favor of lightweight, vanilla-friendly **Alpine.js (v3.14.8)**.

### Local Bundling Strategy (No External CDN)
Alpine.js is bundled directly by Vite/Astro from `node_modules` in `src/layouts/Layout.astro`:
```html
<script>
  import Alpine from 'alpinejs';
  // @ts-ignore
  window.Alpine = Alpine;
  Alpine.start();
</script>
```
*Gzip bundle size: only ~19.76 kB.*

### Global Reactive State Schema
Declared on the `<html>` root tag in `Layout.astro`:
```html
<html
  lang="ja"
  class="scroll-smooth"
  x-data="{
    lang: 'ja',
    lightboxImg: null,
    lightboxTitle: '',
    mobileMenuOpen: false
  }"
>
```

#### Reactive State Variables:
1. `lang`: Current active language code (`'ja'` | `'en'` | `'my'`).
   - Always defaults to `'ja'` on initial load and page refresh.
   - User language choice is reactive within the active session without persistent localStorage retention.
   - All components react instantly via `x-show="lang === 'ja'"` with zero page reloads.
2. `lightboxImg`: String URL of active image for modal enlargement, or `null` when closed.
3. `lightboxTitle`: String caption for current lightbox view.
4. `mobileMenuOpen`: Boolean governing responsive mobile drawer visibility.

---

## 4. Typography & Self-Hosted Zero-CDN Font Pipeline

To maintain strict data privacy, offline resilience, and fast TTFB, **zero external font CDNs (e.g. Google Fonts CDN) are used**.

### Local TTF Font Files (`public/fonts/`):
- `local-font-1.ttf` — Plus Jakarta Sans Regular (400)
- `local-font-4.ttf` — Plus Jakarta Sans Medium (500)
- `local-font-7.ttf` — Plus Jakarta Sans SemiBold (600)
- `local-font-5.ttf` — Plus Jakarta Sans Bold (700)
- `local-font-8.ttf` — Plus Jakarta Sans ExtraBold (800)
- `local-font-2.ttf` — Noto Sans Myanmar Regular (400)
- `local-font-6.ttf` — Noto Sans Myanmar SemiBold (600)
- `local-font-3.ttf` — Noto Sans Myanmar Bold (700)

### CSS Font-Family Stack (`tailwind.config.mjs` & `src/styles/global.css`):
```css
font-family: "Plus Jakarta Sans", "Noto Sans Myanmar", "Noto Sans JP", "Hiragino Sans", "Meiryo", system-ui, sans-serif;
```
All font faces are configured with `font-display: swap` in `src/styles/fonts.css` for optimal Core Web Vitals (zero layout shifts / FOUT).

---

## 5. Performance, SEO & Structured Data

1. **Preloaded Critical Assets**:
   - `<link rel="preload" as="image" href="/images/landing/hero-bg.webp" type="image/webp" fetchpriority="high" />` in `Layout.astro`.
2. **Schema.org Structured Data**:
   - Embedded `LocalBusiness` JSON-LD in `Layout.astro` containing company name, phone (`042-497-1537`), email, address in Tokyo Kiyose-shi, and geo-coordinates.
3. **OpenGraph & Twitter Card Meta Tags**:
   - Standard 1200x630 social share banner (`/images/landing/banner.jpg`).
   - Dynamic canonical link tags based on current route.
4. **Touch & Favicon Icons**:
   - Multi-size Apple touch icons (`180x180` and standard `apple-touch-icon.png`).
   - Favicon (`/favicon.ico`).

---

## 6. Development & Build Lifecycle

```bash
# 1. Start local development server (with hot module reload)
npm run dev
# Accessible at http://localhost:4321

# 2. Production Static Build
npm run build
# Compiles static HTML and bundled assets to dist/ in ~1.3 seconds

# 3. Preview Static Build locally
npm run preview
# Serves dist/ at http://localhost:4321
```
