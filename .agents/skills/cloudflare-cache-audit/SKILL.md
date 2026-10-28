---
name: cloudflare-cache-audit
description: >-
  Audits and verifies Cloudflare Edge Cache status (HIT/MISS/REVALIDATED) across all production assets
  on https://douitsu-co.com (HTML, CSS, JS, WebP, JPG/PNG images, thumbnails, icons, and R2 PDFs).
  Use when testing CDN caching, edge performance, or verifying that production assets are served from cache.
---

# Cloudflare Edge Cache Verification & Performance Audit Skill

This skill provides an automated procedure to audit and verify that production assets on **DOUITSU LLC (`https://douitsu-co.com`)** are actively cached and served with **`cf-cache-status: HIT`** by Cloudflare Edge Points of Presence (PoPs).

Whenever the user or an agent asks to:
- Check Cloudflare Cache HIT or MISS status
- Audit edge caching for HTML, CSS, JS, WebP, JPG/PNG images, thumbnails, and icons
- Benchmark CDN latency and edge PoP responses (SIN, HKG, NRT)
- Verify Cloudflare R2 conditional revalidations (`REVALIDATED`)

Run this skill and follow the standard runbook below.

---

## 🚀 Automated Execution Command

Run the automated Node.js cache verification pipeline:

```bash
# Standard console table output
node .agents/skills/cloudflare-cache-audit/scripts/audit-cloudflare-cache.mjs

# Or generate clean GitHub Flavored Markdown table for chat reports
node .agents/skills/cloudflare-cache-audit/scripts/audit-cloudflare-cache.mjs --markdown
```

Or via npm script:
```bash
npm run audit:cache
```

---

## 🎯 Scope of Monitored Assets

The automated runner tests assets across all 6 core production categories:

| Asset Category | Monitored Files / Endpoints | Target Cache Status |
|---|---|:---:|
| **1. HTML Documents** | `/` (Main landing page), `/404.html` (Branded custom 404) | `HIT` 🟢 |
| **2. Bundled CSS** | Dynamically extracted `/_astro/index.*.css` | `HIT` 🟢 |
| **3. Bundled JS** | Dynamically extracted `/_astro/*.js`, `/sw.js` (Service Worker) | `HIT` 🟢 |
| **4. WebP Visuals** | `/images/landing/hero-bg.webp` (Mt. Fuji hero background) | `HIT` 🟢 |
| **5. Standard Images (PNG & JPG)** | Brand logos (`logo.png`, `logo-mark.png`), support photos (`support-activity-*.jpg`), license certificate, 4 sector cards (`sector-*.jpg`), recruitment flyers (`job-*.jpg`) | `HIT` 🟢 |
| **6. Thumbnails & Icons** | Favicons (`16x16`, `32x32`, `48x48`, `ico`), Apple touch icons (`180x180`, `120x120`), Android Chrome icons (`192x192`, `512x512`), Maskable PWA icon, Sakura badges (`cherry-48.png`) | `HIT` 🟢 |
| **7. Self-Hosted Fonts** | `/fonts/local-font-1.ttf` through `/fonts/local-font-8.ttf` (Plus Jakarta Sans & Noto Sans Myanmar - all weights) | `HIT` 🟢 |
| **8. Cloudflare R2 Textbooks** | `https://files.douitsu-co.com/kaigo-tokuteiginou-japanese.pdf` (38.8 MB), `https://files.douitsu-co.com/kaigo-tokuteiginou-myanmar.pdf` (14.1 MB) | `REVALIDATED` / `HIT` 🔵 |

---

## 🔬 Cloudflare Edge Cache Mechanics & PoP Behavior

1. **Anycast Routing & Cold Edge Nodes**:
   - Cloudflare routes visitors through multiple regional PoPs (e.g. `SIN` for Singapore, `HKG` for Hong Kong, `NRT` for Tokyo).
   - If a specific PoP has not yet served an asset, the very first request will return `cf-cache-status: MISS` while it pulls and caches the asset from the Workers Assets store.
   - The test script employs a **2-Pass verification** (Pass 1: Warmup, Pass 2: Verify) to ensure accurate measurement of edge cache persistence.

2. **Cache Headers & Revalidation**:
   - `cf-cache-status: HIT`: The resource was served directly from Cloudflare edge memory/SSD without hitting the origin worker.
   - `cf-cache-status: REVALIDATED`: For very large R2 bucket objects, Cloudflare verified the ETag/304 against storage and served from cache.
   - `cache-control: public, max-age=0, must-revalidate`: Standard Cloudflare Workers Assets header ensuring browsers perform conditional checks while edge caches retain content.

---

## ✅ Pass Criteria

- **100% of website assets** (HTML, CSS, JS, WebP, Images, Thumbnails) must return **`HTTP 200`**.
- **`cf-cache-status`** on Pass 2 must be **`HIT`** for all web assets.
- R2 PDF downloads must return **`HTTP 200`** with status **`REVALIDATED`** or **`HIT`**.
