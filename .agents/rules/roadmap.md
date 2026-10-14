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

---

## 2. Planned Features & Enhancements (Phase 2)

### 1. Transactional Form API Integration
- **Current State**: Contact form performs client-side validation and sets `formSubmitted = true`.
- **Target**:
  - Connect form submission to Cloudflare Workers or serverless function.
  - Implement spam prevention using Cloudflare Turnstile CAPTCHA.
  - Deliver transactional email notifications to `info@douitsu-co.com` via Resend API or SMTP provider.

### 2. Job Openings Dynamic Filtering
- **Current State**: Static 7-flyer grid on `/job.html`.
- **Target**:
  - Category tags (e.g. 介護 Nursing Care, 外食業 Food Service, 食品製造 Food Processing, 地域 Regional).
  - Alpine.js category filter pills (All, Nursing Care, Food Processing, Restaurant, Regional).
  - Search bar to filter flyers by job title or location.

### 3. SEO Sitemap & Robots Configuration
- Add `@astrojs/sitemap` integration to automatically generate `sitemap-index.xml` upon build.
- Create `public/robots.txt` specifying crawl rules and sitemap location.

### 4. Media & Testimonials Section
- Add video embed or worker interview testimonials showcasing successful workplace adaptations in Japan.
- Add an interactive FAQ accordion answering frequent host company and foreign worker inquiries.
