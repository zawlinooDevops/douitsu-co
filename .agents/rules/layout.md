---
trigger: always_on
description: Visual Layout Hierarchy, Route Specifications, Section Mapping, and Responsive Grid Architecture for DOUITSU LLC
---

# Layout & Navigation Architecture Specifications

## 1. Route Map & Page Structure

The website uses a hybrid single-page scroll layout combined with a dedicated subpage for recruitment flyers:

```text
/ (index.html)                          -> Main Landing Page
  ├── #home        (alias #section_1)   -> Hero Banner (Mt. Fuji & Sakura, Registration Badge, CTAs)
  ├── #support     (alias #section_2)   -> 10 Statutory Support Pillars & Support Gallery
  ├── #company     (alias #featured)    -> Company Profile & Kaigo PDF Downloads
  ├── #services    (alias #section_3)   -> 3 Feature Cards & Official Registration Certificate
  └── #contact     (alias #section_4)   -> Office Location & Interactive Contact Form

/job.html (src/pages/job.astro)          -> Subpage: Job Recruitment Flyers Gallery
  ├── Breadcrumb & Back to Home
  ├── Header & Instructions
  └── Responsive 7-Poster Grid with Lightbox Zoom & Download
```

---

## 2. Header & Two-Tier Navigation (`src/components/Navbar.astro`)

The global header is fixed to the top viewport (`fixed top-0 left-0 right-0 z-50`) and consists of two coordinated tiers:

### Tier 1: Top Utility Bar
- **Styling**: `bg-douitsu-navy text-slate-200 text-xs py-2 border-b border-white/10 shadow-xs`.
- **Left Elements**:
  - Telephone link (`tel:042-497-1537`) with phone SVG icon.
  - Email link (`mailto:info@douitsu-co.com`) with envelope SVG icon (hidden on small mobile screens).
- **Right Elements**:
  - **Trilingual Language Switcher**:
    - Japanese (`🇯🇵 日本語`), English (`🇺🇸 English`), Myanmar (`🇲🇲 မြန်မာ`).
    - Active language highlighted with `bg-douitsu-blue text-white shadow-xs font-bold`.
    - Click updates Alpine reactive state `lang` and browser `localStorage`.

### Tier 2: Sticky Main Navbar
- **Styling**: `bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-2 sm:py-2.5`.
- **Brand Lockup (Left)**:
  - Brand Logo (`/images/landing/logo-mark.png`, `h-9 sm:h-11 lg:h-12`).
  - Company Typography: `DOUITSU合同会社` in bold navy (`text-douitsu-navy`).
  - Official Badge Subtitle: `登録支援機関 (REG:0A32ES43)` in multilingual format.
- **Desktop Navigation Links (`lg:flex`)**:
  - `/#home` (ホーム / Home / ပင်မစာမျက်နှာ)
  - `/#support` (支援内容 / 10 Support Pillars / ထောက်ပံ့မှု ၁၀ ချက်)
  - `/#company` (企業情報 / Company / ကုမ္ပဏီ အချက်အလက်)
  - `/#services` (サービス / Services / ဝန်ဆောင်မှုများ)
  - `/job.html` (採用・求人 / Careers / အလုပ်ခေါ်ယူမှု)
  - CTA Button: `/#contact` (お問い合わせ / Contact Us / ဆက်သွယ်ရန်) styled with `bg-douitsu-primary hover:bg-douitsu-blue text-white font-bold px-4 py-2 rounded-xl`.
- **Mobile Hamburger Trigger (`lg:hidden`)**:
  - Toggles Alpine.js boolean `mobileMenuOpen`.
- **Mobile Slide-Down Drawer**:
  - `x-show="mobileMenuOpen"` with backdrop blur and smooth transitions.
  - Vertical list of all navigation links plus quick-call telephone button.

---

## 3. Detailed Anatomy of Main Landing Page (`/`)

### Section 1: Hero Banner (`#home` / `src/components/Hero.astro`)
- **Background**: High-resolution WebP hero image (`/images/landing/hero-bg.webp`) depicting Mt. Fuji with blossoming cherry blossoms.
- **Backdrop Gradient**: `bg-gradient-to-r from-slate-950/60 via-slate-900/30 to-transparent` to ensure high contrast for typography while keeping natural scenery visible.
- **Content Container**: Frosted Glassmorphism card (`p-6 sm:p-10 md:p-12 rounded-3xl bg-white/92 backdrop-blur-md border border-white/90 shadow-2xl`).
- **Elements**:
  1. **Government Trust Badge**: Pulsing green dot with `出入国在留管理庁 登録支援機関 (登録番号: 0A32ES43)`.
  2. **Main Headline**: Multilingual typography in `text-douitsu-navy font-extrabold`.
  3. **Description Paragraph**: Highlighting one-stop statutory support for host companies and foreign personnel.
  4. **Dual CTAs**:
     - Primary: `[支援内容を見る]` -> `#support` (Blue button with down arrow).
     - Secondary: `[求人情報を見る]` -> `/job.html` (White bordered button with briefcase icon).
  5. **Trust Highlights Grid (3 Pills)**:
     - Trilingual Support (日英ミャンマー語対応)
     - All 10 Statutory Pillars (法定支援10項目を網羅)
     - Full One-Stop Assistance (ワンストップ伴走支援)

### Section 2: Support Plan & 10 Pillars (`#support` / `src/components/About.astro`)
- **Background**: Clean White (`bg-white border-b border-slate-200/60 py-20 md:py-28`).
- **Heading**: "私たちが全力で支援します" with statutory agency mission statement lead paragraph.
- **2-Column Responsive Layout (`grid-cols-1 lg:grid-cols-12 gap-10`)**:
  - **Left Column (`lg:col-span-5`)**:
    - Main visual poster (`/images/landing/about-main.png`) inside a rounded card with hover zoom effect.
    - Click triggers Alpine.js global lightbox modal with high-resolution view.
  - **Right Column (`lg:col-span-7`)**:
    - Sub-grid of 10 support cards (`grid-cols-1 sm:grid-cols-2 gap-3.5`).
    - Each card displays a prominent numbered square badge (`1` to `10`) in `bg-douitsu-blue` and bold multilingual duty description.

### Section 3: Company Profile & PDF Downloads (`#company` / `src/components/Featured.astro`)
- **Background**: Slate Tint (`bg-slate-100 border-b border-slate-200/60 py-16`).
- **2-Column Equal Card Layout (`grid-cols-1 lg:grid-cols-12 gap-8`)**:
  - **Left Card (`lg:col-span-6`) — 企業情報 (Company Profile)**:
    - Definition list (`<dl>`) with divided rows:
      - 会社名: DOUITSU合同会社
      - 設立年: 2025.3.31
      - スタッフ数: 30
      - 登録: REG:0A32ES43
  - **Right Card (`lg:col-span-6`) — Download PDF (介護テキスト)**:
    - Card 1: Japanese Nursing Care Exam Textbook (38.8 MB) with direct download button.
    - Card 2: Myanmar Nursing Care Exam Textbook (14.1 MB) with direct download button.

### Section 4: Service Features (`#services` / `src/components/Services.astro`)
- **Background**: Clean White (`bg-white border-b border-slate-200/60 py-20 md:py-28`).
- **Heading**: "特定技能・外国人採用支援サービスの特徴".
- **3-Column Feature Cards (`grid-cols-1 md:grid-cols-3 gap-8`)**:
  - **Card 1 (Registration Document)**:
    - Embeds official 2025.7 Registration Certificate (`/images/landing/license-certificate.jpg`).
    - Clickable to trigger Alpine.js lightbox view.
    - Top-right corner decorated with Sakura icon (`cherry-48.png`).
  - **Card 2 (Tokutei Ginou Explanation)**:
    - Details the SSW visa system, role of Touroku Shien Kikan, and labor burden reduction for host companies.
    - Top-right Sakura icon.
  - **Card 3 (10 Service Points)**:
    - Clean numbered checklist of statutory duties from pre-guidance to periodic reporting.
    - Top-right Sakura icon.

### Section 5: Inquiries & Contact (`#contact` / `src/components/Contact.astro`)
- **Background**: Clean White (`bg-white py-20 md:py-28`).
- **2-Column Responsive Layout (`grid-cols-1 lg:grid-cols-12 gap-12`)**:
  - **Left Column (`lg:col-span-5`) — Office Information**:
    - Company title lockup.
    - Office Address card with map pin icon.
    - Direct phone link (`042-497-1537`).
    - Direct email link (`info@douitsu-co.com`).
  - **Right Column (`lg:col-span-7`) — Interactive Form**:
    - Form fields: Name (お名前), Email (Eメール), Phone (電話番号), Message (メッセージ).
    - Handled via Alpine.js component state (`formData`, `submitForm()`, `formSubmitted`).
    - Required field validation and success message notification box.

---

## 4. Subpage Architecture: Careers & Job Flyers (`/job.html`)

- **Page Component**: `src/pages/job.astro`.
- **Layout Shell**: Reuses `src/layouts/Layout.astro` with custom page title.
- **Top Header**: Centered title ("求人票 / Job Openings / အလုပ်ခေါ် ကြော်ငြာပိုစတာများ") and click-to-enlarge instruction prompt.
- **Responsive Flyer Grid**:
  - Columns: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`.
  - Maps 7 flyer objects from `siteData.jobs` in `src/data/content.ts`.
  - Aspect ratio: `aspect-[3/4]` with top-aligned object cover.
  - Hover effect: Dark overlay with "拡大表示 / Zoom In / အကြီးချဲ့ရန်" badge.
  - Click behavior: Sets `lightboxImg` and `lightboxTitle`, opening the global Alpine modal.
- **Back Navigation**: Bottom button returning smoothly to `/#home`.

---

## 5. Site Footer (`src/components/Footer.astro`)

- **Styling**: `bg-douitsu-navy text-slate-300 py-12 border-t border-slate-800`.
- **Top Row**:
  - Left: DOUITSU logo mark with white background pad + Company Name & Registration number.
  - Right: Horizontal navigation link menu.
- **Bottom Row**:
  - Left: Copyright string (`Copyright © 2025 Douitsu. All rights reserved.`).
  - Right: Smooth scroll anchor linking to `#home` ("▲ ページ上部へ / Back to top / စာမျက်နှာ ထိပ်ဆုံးသို့").
