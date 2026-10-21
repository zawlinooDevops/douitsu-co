---
trigger: always_on
description: Project Milestones, Modernization Status, and Future Engineering Roadmap for DOUITSU LLC
---

# Project Milestones & Engineering Roadmap

## 1. Completed Modernization (Phase 1)

The legacy web presence has been overhauled and modernized into a high-performance static website:

- [x] **Astro 5 SSG Architecture**: Replaced legacy multi-file assets with modern component-based static generation.
- [x] **Zero External CDN & Privacy-First Policy**: Removed all third-party external CDN scripts, trackers, and Google Fonts links. Fonts (`Plus Jakarta Sans` and `Noto Sans Myanmar`) are 100% self-hosted under `public/fonts/`.
- [x] **Trilingual Reactivity (Japanese / English / Myanmar)**: Implemented seamless instant language switching via local Alpine.js state and `localStorage` persistence with zero page reloads.
- [x] **Tailwind Design System**: Custom B2B corporate palette (`douitsu` tokens) with subtle Japanese Sakura accents and oceanic blues.
- [x] **Statutory 10 Duties Interactive Cards**: Comprehensive representation of all legally mandated Registered Support Organization obligations.
- [x] **Interactive Flyer Gallery (`/job.html`)**: Subpage displaying 7 recruitment flyers with Alpine lightbox modal zoom and download features.
- [x] **Kaigo PDF Study Guides**: Direct downloads for official Nursing Care examination textbooks in both Japanese (38.8 MB) and Myanmar (14.1 MB).
- [x] **SEO & Schema.org**: Fully integrated `LocalBusiness` JSON-LD structured data and OpenGraph tags.
- [x] **Hero Transparent 3-Wave SVG Divider**: Multi-layer organic wave divider using official DOUITSU brand logo blue tokens with seamless cutout transition into `#about`.
- [x] **6-Step Statutory Onboarding Flow (`#flow`)**: Structured process cards matching `#support` statutory list style with primary blue numbered badges (`1` to `6`).
- [x] **Interactive FAQ Accordion (`#faq`)**: 5 core Q&As in interactive Alpine.js accordion format with symmetric dashed square grid accents.
- [x] **Audited Contact Section & B2B Form (`#contact`)**: Solid Ice-Blue background (`bg-douitsu-ice`), fully audited trilingual address (`Flores Motomachi`, `Kiyose City`, `Room 205`), polite Japanese B2B form labels, and actionable dynamic placeholders.
- [x] **Canonical Japanese Default Language**: Defaulting strictly to Japanese (`ja`) on fresh load/refresh without browser `localStorage` retention.
- [x] **Hero Section Sakura Petals Falling Canvas & Mt. Fuji Cinematic Breathing Motion**: Ultra-lightweight native Canvas 2D simulation with 3D tumbling petals, interactive mouse breeze, viewport intersection observer auto-pause, and smooth 22s Ken Burns background breathing effect.
- [x] **Production PWA & Version-Synced Service Worker**: Automated cache versioning (`douitsu-v{version}`) compiling `src/pages/sw.js.ts` to `dist/sw.js`, Network-First freshness routing, offline app shell pre-caching, and trilingual real-time connection monitor toast (`NetworkStatus.astro`).

---

## 2. Planned Features & Enhancements (Phase 2)

- [x] **Transactional Form API & Cloudflare Workers with Static Assets (Workers Assets + Turnstile + Resend)**: Modernized deployment to Cloudflare Workers with Static Assets (`src/worker.ts` + `dist/`), Cloudflare Turnstile bot verification (`spin/prompt.md` canonical contract), triple bot heuristics (field honeypot, time heuristic, and URL link spam shadow-drop), and automated transactional email dispatch via Resend API.
- [x] **Branded Trilingual 404 Custom Error Handling**: Built dedicated 404 page (`src/pages/404.astro` -> `dist/404.html`) with full brand navigation, language switcher, glassmorphic card, quick helpline, and automated asset not-found handling via `wrangler.jsonc`.
- [x] **Production Custom Domain & Observability Integration**: Attached custom domains (`douitsu-co.com` and `www.douitsu-co.com`), disabled `workers_dev: false`, grounded all canonical URLs, social share banners, and Schema.org metadata in `https://douitsu-co.com`, and configured native Cloudflare Observability (`Logs`, `Traces`, `Issues`) in `wrangler.jsonc`.
- [x] **Strict Turnstile Hostname Security Gate**: Enforced strict canonical hostnames (`douitsu-co.com` & `www.douitsu-co.com`) across both frontend (`Contact.astro`) and backend (`functions/api/contact.ts`), strictly adhering to Cloudflare's `spin/prompt.md` verification standard.
- [x] **SEO Sitemap & Robots Exclusion Protocol**: Integrated `@astrojs/sitemap` auto-generating `sitemap-index.xml` and `sitemap-0.xml` with 404 exclusion, created direct `public/sitemap.xml`, and created `public/robots.txt` specifying search engine crawl directives.

### 2. Job Openings Dynamic Filtering
- **Current State**: Static 7-flyer grid on `/job.html`.
- **Target**:
  - Category tags (e.g. 介護 Nursing Care, 外食業 Food Service, 食品製造 Food Processing, 地域 Regional).
  - Alpine.js category filter pills (All, Nursing Care, Food Processing, Restaurant, Regional).
  - Search bar to filter flyers by job title or location.

### 3. Media & Testimonials Section
- Add video embed or worker interview testimonials showcasing successful workplace adaptations in Japan.
