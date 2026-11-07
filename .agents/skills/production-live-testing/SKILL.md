---
name: production-live-testing
description: >-
  Run end-to-end live testing on the DOUITSU LLC production website (https://douitsu-co.com).
  Verifies HTTP/2 status, SSL, canonical www redirect, 5 Global Edge Security Headers,
  all 66+ public assets & images, 4 sector visuals, Cloudflare Edge Cache (cf-cache-status: HIT),
  Schema.org JSON-LD structured data (Organization, LocalBusiness, Address, Registration 25登－012206),
  PDF textbooks on Cloudflare R2, in-page navigation anchors (including #sectors and scroll-margin),
  Alpine.js trilingual switching, FAQ accordion, photo stack lightbox modal, automated mobile
  viewports (320px-412px) & zero-overflow standards, contact form validation, Cloudflare Turnstile
  CAPTCHA, bot honeypots, and 9 CSRF/Edge API security gates.
---

# DOUITSU LLC — Production Live Testing Runbook & Quality Assurance Skill

This skill provides a standardized, automated procedure to perform comprehensive end-to-end live testing on the production deployment of **DOUITSU LLC (DOUITSU合同会社)** at [https://douitsu-co.com](https://douitsu-co.com).

Whenever asked to test, audit, or verify the live site, links, images, contact forms, edge caching, or mobile responsiveness, follow the multi-stage quality gates below.

---

## 🎯 Production Targets & Ground Truth

| Resource | Expected Value / Endpoint |
|---|---|
| **Canonical Production Domain** | `https://douitsu-co.com/` |
| **Secondary Subdomain (Redirect)** | `https://www.douitsu-co.com/` (must 301 redirect to root) |
| **Contact Submission API** | `POST https://douitsu-co.com/api/contact` |
| **Kaigo PDF Storage (Cloudflare R2)** | `https://files.douitsu-co.com/` |
| **Turnstile Site Key** | `0x4AAAAAAFYQzIK4TKPrb3od` |
| **Official Phone / Email** | `042-497-1537` / `info@douitsu-co.com` |
| **Official Legal Registration** | 登録支援機関 `25登－012206` |

---

## 🚀 Master Automated Live Test Command

Run the entire end-to-end test suite in a single command:

```bash
# Execute master production test suite (Stages 1 through 6)
npm run audit:live

# Or directly execute shell runner
bash .agents/skills/production-live-testing/scripts/run-all-live-tests.sh
```

---

## 🔬 Testing Stages & Execution Order

### Stage 1: Domain, HTTPS, Canonical Redirect & Global Security Headers Gate

Verify DNS, SSL certificates, HSTS, canonical redirection, and Worker edge security middleware headers:

```bash
# 1. Verify root canonical domain returns HTTP/2 200 with Cloudflare Edge Cache & Security Headers
curl -sI https://douitsu-co.com

# 2. Verify www subdomain permanently redirects (301) to canonical root
curl -sI https://www.douitsu-co.com
```

* **Pass Criteria**:
  * `https://douitsu-co.com` returns `HTTP/2 200`.
  * `https://www.douitsu-co.com` returns `HTTP/2 301` with `location: https://douitsu-co.com/`.
  * **5 Global Edge Security Headers** are present on all responses:
    1. `X-Frame-Options: SAMEORIGIN` (Clickjacking defense)
    2. `X-Content-Type-Options: nosniff` (MIME sniffing defense)
    3. `Referrer-Policy: strict-origin-when-cross-origin`
    4. `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`
    5. `Cross-Origin-Opener-Policy: same-origin-allow-popups`

---

### Stage 2: Automated Assets & Cloudflare Edge Cache Pipeline Audit

Run the automated Node.js test script to verify all static files in `public/` (excluding config files like `_headers`) and textbooks on Cloudflare R2:

```bash
# 1. Verify all 66+ static assets and R2 PDFs return HTTP 200
npm run audit:assets

# 2. Verify Cloudflare Edge Cache (HIT / REVALIDATED) across all asset categories
npm run audit:cache
```

* **Pass Criteria**:
  * 100% of files in `public/` (logos, icons, self-hosted fonts, hero background, certificates, 4 sector photos) return `HTTP 200`.
  * Cloudflare R2 textbooks (`kaigo-tokuteiginou-japanese.pdf` 39.7MB and `kaigo-tokuteiginou-myanmar.pdf` 14.4MB) return `HTTP 200`.
  * Failed URLs count must be `0`.
  * Assets monitored by `audit:cache` return `cf-cache-status: HIT` from Cloudflare Edge PoPs (SIN, NRT, HKG).

---

### Stage 3: Links, Navigation, Supported Sectors & Scroll-Margin Alignment

Check all unique anchor links, section scroll-margins, and external schemes:

1. **In-Page Anchor Targets**:
   Verify that all `#hash` links target existing `<section>` tags in the DOM with active scroll margin offset (`scroll-mt-[72px] lg:scroll-mt-[96px]`):
   * `#home` -> Hero section (breathing Mt. Fuji & falling sakura petals)
   * `#about` -> Company profile & registration info (25登－012206)
   * `#services` -> Tokutei Ginou support features & 3 core pillar cards
   * `#sectors` -> 4 Approved Shortage Sectors (Nursing Care, Food Service, Manufacturing, Building Cleaning)
   * `#support` -> 10 Statutory support duties & photo stack
   * `#flow` -> 6-step onboarding process
   * `#faq` -> 5 FAQ accordion items
   * `#contact` -> Inquiries & contact form

2. **Actionable External Links**:
   * Phone link: `tel:+81424971537` (Proper international tel link)
   * Mailto link: `mailto:info@douitsu-co.com`

---

### Stage 4: Live Schema.org JSON-LD Structured Data Audit

Verify that all production pages contain valid, compliant Schema.org JSON-LD structured data:

```bash
npm run audit:schema
# or: node .agents/skills/production-live-testing/scripts/verify-schema-live.mjs
```

* **Pass Criteria**:
  * All production pages (`/`, `/license/`, `/housing/`) return valid JSON-LD without syntax errors.
  * `@context` strictly equals `https://schema.org` (or `http://schema.org`).
  * `LocalBusiness` / `Organization` entities contain verified legal identifiers (`25登－012206`), correct company phone (`042-497-1537`), email, address in Tokyo Kiyose-shi (`元町1-11-21 フローレス元町205号`), and geo-coordinates (`35.7876`, `139.5298`).
  * Rich entities (`Service`, `FAQPage`, `BreadcrumbList`, `WebSite`) are validated when present.

---

### Stage 5: Interactive UI, Alpine.js Client Reactivity & Mobile Viewport Standards

#### 1. Instant Trilingual Switcher (Zero Page Reload)
Evaluate in browser console or Alpine.js state:
```javascript
// Test switching between ja, en, and my
Alpine.$data(document.documentElement).lang = 'ja';
// Heading shows Japanese: "登録支援機関とは"

Alpine.$data(document.documentElement).lang = 'en';
// Heading shows English: "What is a Registered Support Organization?"

Alpine.$data(document.documentElement).lang = 'my';
// Heading shows Myanmar: "မှတ်ပုံတင်ထောက်ပံ့ရေးအဖွဲ့အစည်း ဆိုသည်မှာ"
```

#### 2. FAQ Accordion & Modal Reactivity
* Click each of the 5 question buttons; verify `aria-expanded="true"` and answer container smoothly reveals.
* In `#support`, click active photo card; verify fullscreen lightbox modal opens (`display: flex`, opacity: 1).
* Press `Escape` key or click close button; verify modal returns to `display: none;`.

#### 3. Automated Mobile Viewport & UI/UX Audit
Run the automated mobile viewport audit across all 4 device screen tiers:
```bash
npm run audit:mobile
```
* **Pass Criteria**:
  * **Zero Horizontal Overflow**: `scrollWidth <= clientWidth` across 320px, 360px, 390px, and 412px viewports.
  * **Myanmar Line-Height**: Headings maintain `line-height >= 1.4` (`leading-normal` or `leading-relaxed`) with zero diacritic/tone clipping.
  * **Touch Target Accessibility**: Interactive buttons, inputs, and links maintain minimum size of `44x44px` (or `48x48px`).

---

### Stage 6: Contact Form & Backend Security API Pipeline (9 Gates)

Execute the automated backend API security audit script:

```bash
npm run audit:security
# or: bash .agents/skills/production-live-testing/scripts/test-contact-api.sh
```

The script verifies **9 automated edge security boundaries**:
1. **HTTP Method Gate**: `GET /api/contact` -> Returns `405 Method Not Allowed`.
2. **Content-Type Restriction**: `POST` with non-JSON media type -> Returns `415 Unsupported Media Type`.
3. **Payload Size Guard**: `POST` with body exceeding 10KB -> Returns `413 Payload Too Large`.
4. **CSRF / Origin Gate**: `POST` from untrusted origin -> Returns `403 Forbidden` (`CSRF_FORBIDDEN`).
5. **Turnstile Enforcement**: `POST` without captcha token -> Returns `403 Forbidden` (`CAPTCHA_REQUIRED`).
6. **Field Honeypot Bot Trap**: `POST` with `website` field filled -> Returns `200 OK` (`shadow-drop-honeypot`) without dispatch.
7. **Speed-submission Time Heuristic**: Rapid submissions under 2.0s -> Returns `200 OK` (`shadow-drop-speed`) without dispatch.
8. **Link Spam Threshold**: Payloads with excessive URLs (> 2) -> Returns `200 OK` (`shadow-drop-url`) without dispatch.
9. **Global Edge Response Security Headers**: Verifies `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin` on responses.

---

### Stage 7: SEO, PWA & Custom 404 Error Handling

Verify edge assets and crawler configurations:

```bash
# 1. Sitemaps & Crawler rules
curl -sI https://douitsu-co.com/sitemap.xml
curl -sI https://douitsu-co.com/robots.txt

# 2. PWA Manifest & Service Worker
curl -sI https://douitsu-co.com/site.webmanifest
curl -sI https://douitsu-co.com/sw.js

# 3. Custom Branded 404 Handling
curl -sI https://douitsu-co.com/non-existent-page/
```

* **Pass Criteria**:
  * `/sitemap.xml`, `/robots.txt`, `/site.webmanifest`, `/sw.js` all return `HTTP 200`.
  * `/non-existent-page/` returns `HTTP 404` and serves the branded trilingual 404 page (`404.html`) rather than a default Cloudflare error.

---

## 📋 Reporting Template

When delivering live test results to the user, format the summary using this structure:

```markdown
### 📊 Production Live Testing Summary (https://douitsu-co.com)

1. **Domain & Edge Security**:
   - Canonical Domain: 200 OK (Cloudflare Edge, HSTS enabled)
   - WWW Redirection: 301 Moved Permanently -> https://douitsu-co.com/
   - Global Security Headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP (100% verified)

2. **Assets, Sectors & Edge Cache**:
   - 66 Public Assets: 100% HTTP 200 OK (0 Failed)
   - 4 Sector Visual Cards: Verified live (Kaigo, Food Service, Manufacturing, Cleaning)
   - Kaigo PDFs on R2: 2/2 HTTP 200 OK (39.7MB & 14.4MB)
   - Cloudflare Edge Cache: Verified cf-cache-status HIT / REVALIDATED

3. **Schema.org Structured Data**:
   - Live JSON-LD Blocks: 100% valid syntax on /, /license/, /housing/
   - Legal Identifiers: 25登－012206, contact phone 042-497-1537, address in Kiyose-shi Tokyo verified

4. **Links & Navigation**:
   - Section Anchors: #home, #about, #services, #sectors, #support, #flow, #faq, #contact verified
   - Header Offset: scroll-mt-[72px] lg:scroll-mt-[96px] verified
   - Direct Call & Email: tel: and mailto: verified

5. **Client UI & Mobile Viewports**:
   - Trilingual Switcher: ja / en / my instant toggle
   - Mobile Viewports (320px, 360px, 390px, 412px): Zero horizontal overflow
   - Myanmar Typography: line-height >= 1.4, no diacritic collision
   - Accordion & Lightbox: Smooth expand & fullscreen modal

6. **Form & Security Gate (9/9 Passed)**:
   - Method (405), Media (415), Buffer Guard (413) verified
   - Origin / CSRF: 403 Forbidden on untrusted origins
   - Turnstile CAPTCHA: Token required & enforced
   - Honeypot, Time Heuristic & Link Spam Traps: Silent 200 shadow-drop
   - Response Security Headers: Verified active

7. **SEO, PWA & 404 Error Handling**:
   - sitemap.xml, robots.txt, site.webmanifest, sw.js: 200 OK
   - Custom 404: 404 status with trilingual brand page
```
