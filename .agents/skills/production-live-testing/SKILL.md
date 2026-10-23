---
name: production-live-testing
description: >-
  Run end-to-end live testing on the DOUITSU LLC production website (https://douitsu-co.com).
  Verifies HTTP/2 status, SSL, canonical www redirect, all 62+ public assets & images,
  PDF textbooks on Cloudflare R2, in-page navigation anchors, Alpine.js trilingual switching,
  FAQ accordion, photo stack lightbox modal, mobile drawer, contact form validation,
  Cloudflare Turnstile CAPTCHA, bot honeypots, and CSRF security API endpoints.
---

# DOUITSU LLC — Production Live Testing Runbook & Quality Assurance Skill

This skill provides a standardized, automated procedure to perform end-to-end live testing on the production deployment of **DOUITSU LLC (DOUITSU合同会社)** at [https://douitsu-co.com](https://douitsu-co.com).

Whenever asked to test, audit, or verify the live site, links, images, or contact forms, follow the multi-stage quality gates below.

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

---

## 🚀 Testing Stages & Execution Order

### Stage 1: Domain, HTTPS & Canonical Redirect Gate

Verify DNS, SSL certificates, HSTS, and canonical redirection:

```bash
# 1. Verify root canonical domain returns HTTP/2 200 with Cloudflare Edge Cache
curl -I https://douitsu-co.com

# 2. Verify www subdomain permanently redirects (301) to canonical root
curl -I https://www.douitsu-co.com
```

* **Pass Criteria**:
  * `https://douitsu-co.com` returns `HTTP/2 200`.
  * `https://www.douitsu-co.com` returns `HTTP/2 301` with `location: https://douitsu-co.com/`.

---

### Stage 2: Automated Assets & Images Pipeline Audit

Run the automated Node.js test script to verify all static files in `public/` and textbooks on Cloudflare R2:

```bash
node .agents/skills/production-live-testing/scripts/verify-assets.mjs
```

* **Pass Criteria**:
  * 100% of files in `public/` (logos, icons, self-hosted fonts, hero background, certificates) return `HTTP 200`.
  * Cloudflare R2 textbooks (`kaigo-tokuteiginou-japanese.pdf` 39.7MB and `kaigo-tokuteiginou-myanmar.pdf` 14.4MB) return `HTTP 200`.
  * Failed URLs count must be `0`.

---

### Stage 3: Links, Navigation & PDF Downloads

Check all unique anchor links and external schemes:

1. **In-Page Anchor Targets**:
   Verify that all `#hash` links target existing `<section>` tags in the DOM:
   * `#home` -> Hero section
   * `#about` -> Company profile & registration info
   * `#services` -> Tokutei Ginou support features
   * `#support` -> 10 Statutory support duties & photo stack
   * `#flow` -> 6-step onboarding process
   * `#faq` -> 5 FAQ accordion items
   * `#contact` -> Inquiries & contact form

2. **Actionable External Links**:
   * Phone link: `tel:+81424971537` (Proper international tel link)
   * Mailto link: `mailto:info@douitsu-co.com`

---

### Stage 4: Interactive UI & Alpine.js Client Reactivity

Using Chrome DevTools MCP or a browser context, verify the client-side behaviors:

#### 1. Instant Trilingual Switcher (Zero Page Reload)
Evaluate in browser console:
```javascript
// Test switching between ja, en, and my
Alpine.$data(document.documentElement).lang = 'ja';
// Heading shows Japanese: "登録支援機関とは"

Alpine.$data(document.documentElement).lang = 'en';
// Heading shows English: "What is a Registered Support Organization?"

Alpine.$data(document.documentElement).lang = 'my';
// Heading shows Myanmar: "မှတ်ပုံတင်ထောက်ပံ့ရေးအဖွဲ့အစည်း ဆိုသည်မှာ"
```

#### 2. FAQ Accordion
* Click each of the 5 question buttons.
* Verify `aria-expanded="true"` and answer container smoothly reveals.

#### 3. Photo Stack Lightbox Modal
* In `#support`, click the active photo card (or trigger `window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { img: '/images/landing/support-activity-1.jpg' } }))`).
* Verify modal opens (`display: flex`, opacity: 1, full-res image loaded).
* Click the close button or press `Escape` key; verify modal returns to `display: none;`.

#### 4. Responsive Mobile Navigation Drawer
* Resize viewport to mobile width (`< 1024px`, e.g. 390x844).
* Click hamburger button (`aria-label="Toggle navigation menu"`).
* Verify drawer opens (`display: block`). Click again to close (`display: none`).

---

### Stage 5: Contact Form & Backend Security API Pipeline

Execute the automated backend API security audit script:

```bash
.agents/skills/production-live-testing/scripts/test-contact-api.sh
```

The script verifies 8 automated security boundaries:
1. **HTTP Method Gate**: `GET /api/contact` -> Returns `405 Method Not Allowed`.
2. **Content-Type Restriction**: `POST` with non-JSON media type -> Returns `415 Unsupported Media Type`.
3. **Payload Size Guard**: `POST` with body exceeding 10KB -> Returns `413 Payload Too Large`.
4. **CSRF / Origin Gate**: `POST` from untrusted origin -> Returns `403 Forbidden` (`CSRF_FORBIDDEN`).
5. **Turnstile Enforcement**: `POST` without captcha token -> Returns `403 Forbidden` (`CAPTCHA_REQUIRED`).
6. **Field Honeypot Bot Trap**: `POST` with `website` field filled -> Returns `200 OK` (`shadow-drop-honeypot`) without dispatch.
7. **Speed-submission Time Heuristic**: Rapid submissions under 2.5s -> Returns `200 OK` (`shadow-drop-speed`) without dispatch.
8. **Link Spam Threshold**: Payloads with excessive URLs (> 2) -> Returns `200 OK` (`shadow-drop-url`) without dispatch.

#### Client-side Field Validation:
* Submit empty form: All 4 fields display required warnings in active language (`ja`, `en`, `my`).
* Invalid values (e.g. 1-character name, malformed email, phone under 8 digits, message under 10 chars) show specific validation errors.
* Form without completing Turnstile displays `CAPTCHA_REQUIRED` toast.

---

### Stage 6: SEO, PWA & Custom 404 Error Handling

Verify edge assets and crawler configurations:

```bash
# 1. Sitemaps & Crawler rules
curl -I https://douitsu-co.com/sitemap.xml
curl -I https://douitsu-co.com/robots.txt

# 2. PWA Manifest & Service Worker
curl -I https://douitsu-co.com/site.webmanifest
curl -I https://douitsu-co.com/sw.js

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

1. **Domain & HTTPS**:
   - Canonical Domain: 200 OK (Cloudflare HIT, HSTS)
   - WWW Redirection: 301 Moved Permanently -> https://douitsu-co.com/

2. **Assets & Media**:
   - 62 Public Assets: 100% HTTP 200 OK (0 Failed)
   - Kaigo PDFs on R2: 2/2 HTTP 200 OK (39.7MB & 14.4MB)

3. **Links & Navigation**:
   - 28 Section Hash Anchors: Verified active targets
   - Direct Call & Email: tel: and mailto: verified

4. **Client UI & Alpine.js Reactivity**:
   - Trilingual Switcher: ja / en / my instant toggle
   - FAQ Accordion: 5 Q&As expanding & ARIA compliant
   - Lightbox Modal: Fullscreen zoom & smooth escape dismiss
   - Mobile Drawer: Responsive hamburger toggle

5. **Form & Security Gate**:
   - Client Validation: Trilingual field errors operational
   - Turnstile CAPTCHA: Widget rendered & required
   - Honeypot Trap: Silent shadow-drop 200 OK
   - Origin / CSRF: 403 Forbidden on untrusted origins
   - HTTP Method: 405 Method Not Allowed on GET

6. **SEO, PWA & 404 Error Handling**:
   - sitemap.xml, robots.txt, sw.js: 200 OK
   - Custom 404: 404 status with trilingual brand page
```
