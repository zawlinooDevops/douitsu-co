# DOUITSU LLC (DOUITSU合同会社) — Agent Guidelines & System Architecture

This repository contains the official modernized website for **DOUITSU LLC (DOUITSU合同会社)**, an officially registered **Touroku Shien Kikan (出入国在留管理庁 登録支援機関 25登－012206)** in Japan.

All future AI agents working on this codebase must read and adhere to the specialized rule files located in [`.agents/rules/`](./.agents/rules/):

---

## 📚 Master Index of Rule Specifications

| Rule Document | Scope & Purpose |
|---|---|
| [**`about-this-business.md`**](./.agents/rules/about-this-business.md) | Company background, legal status (25登－012206), office address in Kiyose-shi Tokyo, phone numbers, sending agency in Myanmar, and in-depth operational breakdown of all **10 Statutory Support Duties (法定支援10項目)**. |
| [**`tech-stack.md`**](./.agents/rules/tech-stack.md) | Technical architecture: Astro 5 SSG, Tailwind CSS 3 with custom `douitsu` palette tokens, Cloudflare Workers with Static Assets runtime, local Alpine.js reactivity, 100% self-hosted TTF typography (Zero CDN), and build configs. |
| [**`layout.md`**](./.agents/rules/layout.md) | Visual design, unified single-page route structure (`/`), two-tier header (`Navbar.astro`), section mapping (`#home`, `#about`, `#services`, `#support`, `#flow`, `#faq`, `#contact`), and footer layout. |
| [**`section-backgrounds-and-patterns.md`**](./.agents/rules/section-backgrounds-and-patterns.md) | Background colors, inline SVG patterns (Dot-Grid, Shippo, Seigaiha, Coordinates Matrix), ambient glow orbs, and visual rhythm. |
| [**`components.md`**](./.agents/rules/components.md) | Component hierarchy, props contracts, Alpine.js lightbox modal, mobile drawer, interactive contact form with validation, and section components. |
| [**`data-and-i18n.md`**](./.agents/rules/data-and-i18n.md) | Centralized content schema (`src/data/content.ts`), trilingual schema (`ja`, `en`, `my`), Alpine.js zero-reload toggle patterns, and legal immigration terminology glossary. |
| [**`assets-and-images.md`**](./.agents/rules/assets-and-images.md) | Complete directory inventory of images (`public/images/`), 7 job recruitment flyers (`public/images/jobs/`), Kaigo exam PDF textbooks (38.8MB & 14.1MB), and local font files. |
| [**`deployment.md`**](./.agents/rules/deployment.md) | Build commands (`npm run build`), Cloudflare Workers with Static Assets (`src/worker.ts` + `dist/`), `wrangler.jsonc`, Pages/Nginx fallback, caching headers, and pre-deployment verification checklist. |
| [**`validation-pipeline.md`**](./.agents/rules/validation-pipeline.md) | 5-stage pre-flight quality gate: ESLint, Stylelint CSS check, Astro check, static SSG build, and HTML5 validator on `dist/`. Mandatory before git commits and pushes. |
| [**`versioning-and-releases.md`**](./.agents/rules/versioning-and-releases.md) | Semantic versioning (`major.minor.patch`), pre-push confirmation protocol (asking user with recommendation), and footer version badge sync. |
| [**`form-validation-pipeline.md`**](./.agents/rules/form-validation-pipeline.md) | Multi-tier validation pipeline: Frontend field rules, dual honeypots (field + time heuristic), Cloudflare Turnstile canonical siteverify, CSRF/Origin checks, and Resend delivery. |
| [**`roadmap.md`**](./.agents/rules/roadmap.md) | Completed Phase 1 modernization milestones, and Phase 2 backlog (API form submission, dynamic job filters, sitemap generation). |

---

## 🛠️ Quick Development Commands

```bash
# Start local development server with hot-reload
npm run dev

# Run full 5-stage validation pipeline (ESLint, CSS, Astro check, Build, HTML Validate)
npm run validate

# Run static site production build
npm run build

# Preview static distribution (dist/)
npm run preview
```

---

## ⚠️ Core Engineering Constraints for AI Agents

1. **Zero External CDN Policy**: Never import stylesheets, scripts, or fonts from external CDNs (Google Fonts, unpkg, cdnjs). All assets and fonts MUST be local in `public/`.
2. **Synchronous Trilingual Parity**: Whenever updating copy or adding UI elements, always provide parallel text in all three supported languages (`ja`, `en`, `my`) in `src/data/content.ts`.
3. **No Heavy Framework Runtimes**: Do not inject React, Vue, or Svelte libraries unless explicitly instructed. Keep client interactivity lightweight with Alpine.js.
4. **Preserve Static Generation**: Do not convert the project to SSR (`output: 'server'`) unless server-side dynamic features are explicitly requested. Keep the build output static (`dist/index.html`).
