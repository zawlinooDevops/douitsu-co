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
| [**`content-integrity-rules.md`**](./.agents/rules/content-integrity-rules.md) | Strict protection policy for business facts, legal identifiers (25登－012206), office contact channels, 10 Statutory Support Duties, services scope, and trilingual copywriting. Zero tolerance for unauthorized copy edits. |
| [**`cloudflare-deployment-rules.md`**](./.agents/rules/cloudflare-deployment-rules.md) | Strict authorization policy for Cloudflare Workers & Wrangler: Prohibits unauthorized remote deployments, variables, bindings, or settings changes, and mandates verifying the Cloudflare Account Name before execution. |
| [**`typography-and-font-standards.md`**](./.agents/rules/typography-and-font-standards.md) | **Master Web Typography & UI/UX Hierarchy Specification**: Full-system typography standards covering Sections, Cards, Forms, Badges, Buttons, Labels (Body min `text-sm` 14px, Badges/Labels floor `text-xs` 12px, never < 12px), Myanmar line-height, and zero-CDN architecture. |
| [**`form-validation-pipeline.md`**](./.agents/rules/form-validation-pipeline.md) | Multi-tier validation pipeline: Frontend field rules, dual honeypots (field + time heuristic), Cloudflare Turnstile canonical siteverify, CSRF/Origin checks, and Resend delivery. |
| [**`roadmap.md`**](./.agents/rules/roadmap.md) | Completed Phase 1 modernization milestones, and Phase 2 backlog (API form submission, dynamic job filters, sitemap generation). |

---

## 🧰 Reusable Workspace Skills (`.agents/skills/`)

| Skill | Scope & Automation |
|---|---|
| [**`production-live-testing`**](./.agents/skills/production-live-testing/SKILL.md) | End-to-end live testing runbook: Automated static asset audit ([`scripts/verify-assets.mjs`](./.agents/skills/production-live-testing/scripts/verify-assets.mjs)), Contact API & security gate audit ([`scripts/test-contact-api.sh`](./.agents/skills/production-live-testing/scripts/test-contact-api.sh)), trilingual reactivity, anchor links, and custom 404 error handling. |
| [**`cloudflare-cache-audit`**](./.agents/skills/cloudflare-cache-audit/SKILL.md) | Automated Cloudflare Edge Cache audit ([`scripts/audit-cloudflare-cache.mjs`](./.agents/skills/cloudflare-cache-audit/scripts/audit-cloudflare-cache.mjs)): Verifies 100% `cf-cache-status: HIT` across HTML, CSS, JS, WebP, JPG/PNG images, thumbnails, icons, self-hosted fonts, and R2 PDF revalidation. |
| [**`mobile-ui-ux-audit`**](./.agents/skills/mobile-ui-ux-audit/SKILL.md) | Automated Mobile View & UI/UX Standards audit ([`scripts/audit-mobile-uiux.mjs`](./.agents/skills/mobile-ui-ux-audit/scripts/audit-mobile-uiux.mjs)): Audits responsive viewports (320px-412px), horizontal overflows, Myanmar font line-height/diacritic collisions, excessive section scroll lengths, and tap target accessibility. |
| [**`local-dev-server`**](./.agents/skills/local-dev-server/SKILL.md) | Local Astro development server manager on port 4002 with `strictPort: true` for Caddy reverse proxy integration, port status checks, and process controls. |

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
5. **Strict Content & Business Data Integrity**: AI agents are strictly forbidden from modifying, rephrasing, optimizing, or fabricating Business Data, Contact Details, 10 Statutory Support Duties, or Copywriting without explicit user authorization (see [`content-integrity-rules.md`](./.agents/rules/content-integrity-rules.md)).
6. **Strict Cloudflare & Wrangler Operations Authorization**: AI agents are strictly forbidden from executing `wrangler` commands (deployments, variables, bindings, settings) to connect directly with Cloudflare Workers without explicit user permission. Even when permitted, the agent must confirm the target Cloudflare account name before proceeding (see [`cloudflare-deployment-rules.md`](./.agents/rules/cloudflare-deployment-rules.md)).
