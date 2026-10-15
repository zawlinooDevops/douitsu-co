---
trigger: always_on
description: Comprehensive Component Architecture, Props Interfaces, and Behavioral Contracts for DOUITSU LLC
---

# Component Architecture & Specifications

## 1. Component Hierarchy & Dependency Tree

```text
src/layouts/Layout.astro (Root Shell, HTML, SEO, Alpine Lightbox Modal)
├── src/components/Navbar.astro (Two-Tier Sticky Header, Language Switcher, Mobile Drawer)
├── [Main Page: src/pages/index.astro]
│   ├── src/components/Hero.astro (Hero Banner, Trust Badges)
│   ├── src/components/Featured.astro (Company Profile DL / About Us, Kaigo PDF Downloads)
│   ├── src/components/Services.astro (3 Feature Cards, Certificate Lightbox)
│   ├── src/components/About.astro (10 Statutory Support Pillars, Main Visual Lightbox)
│   ├── src/components/Career.astro (Career Job Openings, Left Poster Visual, Right 6-Job Table with Flyer Lightbox)
│   └── src/components/Contact.astro (Office Details Card, Alpine Interactive Form)
└── src/components/Footer.astro (Global Dark Footer, Copyright, Back-to-Top)
```

---

## 2. Layout Component (`src/layouts/Layout.astro`)

### Props Interface
```typescript
interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
}
```

### Key Responsibilities:
1. **HTML Root & Global Alpine State**:
   - Manages global reactive state on `<html>`: `lang`, `lightboxImg`, `lightboxTitle`, `mobileMenuOpen`.
   - Handles language initialization from browser `localStorage` with fallback to `'ja'`.
2. **SEO & Head Optimization**:
   - Dynamic canonical URL construction using `Astro.url.pathname` and `siteData.meta.siteUrl`.
   - Image preloading for critical above-the-fold asset (`/images/landing/hero-bg.webp`).
   - OpenGraph and Twitter card social meta tags.
   - Schema.org `LocalBusiness` JSON-LD structured data.
3. **Global Lightbox Modal (`x-show="lightboxImg !== null"`)**:
   - Fixed full-screen backdrop (`bg-slate-900/85 backdrop-blur-md z-50`).
   - Modal card with header title, close button (`Esc` key or click-outside).
   - High-resolution image viewport with responsive height constraint (`max-h-[75vh]`).
   - Footer bar with "画像を保存" (Direct image download button).
4. **Alpine.js Local Initialization**:
   - Bundles and starts Alpine via ESM without any external network request.

---

## 3. Navbar Component (`src/components/Navbar.astro`)

### Responsibilities:
1. **Top Utility Bar**:
   - Direct telephone tap link (`tel:042-497-1537`).
   - Direct email tap link (`mailto:info@douitsu-co.com`).
   - Trilingual toggle pills (`🇯🇵 日本語`, `🇺🇸 English`, `🇲🇲 မြန်မာ`) setting `lang` and `localStorage.douitsu_lang`.
2. **Sticky Main Navigation**:
   - Company brand emblem and registration number subtitle.
   - Filtered desktop nav items (`siteData.navigation` excluding `'phone'` and `'contact'`).
   - Dedicated "お問い合わせ / Contact Us" action button.
   - Mobile hamburger toggle icon button.
3. **Mobile Drawer Menu**:
   - Displays animated dropdown when `mobileMenuOpen` is true.
   - Closes drawer on link click (`@click="mobileMenuOpen = false"`).

---

## 4. Hero Component (`src/components/Hero.astro`)

### Key Design & Structural Features:
1. **Background & Atmosphere**:
   - Full-bleed background of Mt. Fuji & Sakura (`/images/landing/hero-bg.webp`).
   - Dark gradient overlay for text readability without obscuring scenic elements.
2. **Government Registration Badge**:
   - Green pulsing live indicator dot (`w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200 animate-pulse`).
   - Text: `出入国在留管理庁 登録支援機関 (登録番号: 0A32ES43)`.
3. **Dual Action CTA Buttons**:
   - Primary: Anchor link to `#support` with chevron-down icon.
   - Secondary: Route link to `/#career` with briefcase icon.
4. **3 Trust Highlight Pills**:
   - Bilingual/Trilingual capability (日英ミャンマー語対応).
   - 10 Statutory Pillars coverage (法定支援10項目を網羅).
   - Full one-stop companion support (ワンストップ伴走支援).
5. **Bottom Organic SVG Wave Divider (3 Transparent Waves with Logo Colors)**:
   - Replaces the legacy flat bottom border with an organic multi-layer wave that slices into the hero image.
   - **Wave 1 (Deep Navy Blue)**: `#1a486c` at 30% opacity, providing subtle shadow depth across Mt. Fuji's foothills.
   - **Wave 2 (Primary Signature Blue)**: `#105c8e` at 45% opacity, creating rich oceanic brand color blending.
   - **Wave 3 (Light Sky Blue)**: `#7ba7cc` at 60% opacity, adding a vibrant crest highlight.
   - **Wave 4 (Seamless Slate-100 Base)**: Solid `#f1f5f9` matching `#about` (`Featured.astro`) background with `-mb-[1px]` subpixel gap protection, eliminating all straight boundary lines.
   - Responsive height: `h-16 sm:h-22 md:h-28 lg:h-36 xl:h-40` with `preserveAspectRatio="none"`.

---

## 5. About Component (`src/components/About.astro`)

### Responsibilities:
1. **Section Heading & Lead**:
   - Title: "私たちが全力で支援します".
   - Official Touroku Shien Kikan mission definition.
2. **Main Visual Card (`lg:col-span-5`)**:
   - Renders `about-main.png` illustration.
   - Hover zoom effect with "拡大表示 / Zoom In" badge.
   - On click, sets `lightboxImg = '/images/landing/about-main.png'`.
3. **10 Support Pillars Grid (`lg:col-span-7`)**:
   - Iterates over `siteData.about.pillars`.
   - Each item has a navy square badge with white bold number (`1` to `10`).
   - Supports trilingual reactive labels.

---

## 6. Featured Component (`src/components/Featured.astro`)

### Responsibilities:
1. **Company Profile Card (`lg:col-span-6`)**:
   - Clean definition list (`<dl>`) displaying:
     - 会社名: DOUITSU合同会社
     - 設立年: 2025.3.31
     - スタッフ数: 6
     - 登録: REG:0A32ES43
2. **PDF Study Materials Card (`lg:col-span-6`)**:
   - Download cards for official Nursing Care (Kaigo) exams:
     - Japanese Edition: `kaigo-tokuteiginou-japanese.pdf` (38.8 MB)
     - Myanmar Edition: `kaigo-tokuteiginou-myanmar.pdf` (14.1 MB)
   - Features red "PDF" badge, file metadata, and one-click download button.

---

## 7. Services Component (`src/components/Services.astro`)

### Responsibilities:
1. **3 Worker Program Track Cards (`lg:grid-cols-3`)**:
   - Track 01: Specified Skilled Worker 1 (特定技能 1号 / SSW1) — Foundation job-ready workforce.
   - Track 02: Specified Skilled Worker 2 (特定技能 2号 / SSW2) — Advanced supervisory leadership track with unlimited renewals and family accompaniment.
   - Track 03: Training & Employment System (育成就労制度) — Reformed 3-year structured career pathway into SSW1.
2. **Modern Card Title Lockup & Specifications**:
   - Track badge pill, custom SVG icon box (no decorative sakura icon), headline, sub-headline, trilingual description, structured 3-row specifications (stay duration, family sponsorship, requirements), and DOUITSU support badge.
3. **Bottom Consultation Callout**:
   - Executive callout banner with trilingual consultation prompt and direct link to `#contact`.

---

## 8. Career Component (`src/components/Career.astro`)

### Responsibilities:
1. **Full-Width Interactive Search & Filter Form**:
   - Search input box (`x-model="searchQuery"`) with clear button and real-time query matching across titles, categories, salary ranges, and dates.
   - Multi-select sector checkboxes (`x-model="selectedCategories"`) for 6 shortage sectors: 介護 (Care), 食品加工 (Food), 外食業 (Restaurant), 農業 (Agriculture), 機械・製造 (Manufacturing), 清掃 (Cleaning).
   - Reactive result counter pill (`x-text="visibleCount"`) and filter reset button (`@click="resetFilters()"`).
2. **Full-Width Job Table (`min-w-[720px]`)**:
   - Renders 6 in-demand job items from `siteData.career.jobs`.
   - Table columns: No., Job Title (with sector category pill badge), Salary (2-line compact display), Join Date, Age Limit, and Flyer Action.
   - **Compact Two-Line Salary**:
     - Line 1: `[月給] 210,000円〜` (Starting pay with period badge).
     - Line 2: `〜 260,000円` (Maximum pay in bold brand blue).
     - Minimizes column width (~120px) to prevent layout cramping.
   - Each row is interactive (`cursor-pointer`): clicking any row opens the global lightbox modal with that job's full recruitment flyer (`job.image`).
   - Empty state row displayed when search/filter returns zero results with a "Show All Jobs" button.
   - Bottom inquiry prompt with CTA button linking directly to `#contact`.

---

## 9. Contact Component (`src/components/Contact.astro`)

### Interactive State Contract (Alpine.js):
```javascript
x-data="{
  formSubmitted: false,
  formData: {
    name: '',
    email: '',
    phone: '',
    message: ''
  },
  submitForm() {
    if (!this.formData.name || !this.formData.email || !this.formData.phone) {
      alert(lang === 'ja' ? '必須項目をすべて入力してください。' : (lang === 'en' ? 'Please fill in all required fields.' : 'လိုအပ်သော အချက်အလက်များ အားလုံး ဖြည့်သွင်းပေးပါ။'));
      return;
    }
    this.formSubmitted = true;
  }
}"
```

### Responsibilities:
1. **Office Information Column**:
   - Displays office address in Tokyo Kiyose-shi.
   - Clickable telephone link (`042-497-1537`).
   - Clickable email link (`info@douitsu-co.com`).
2. **Interactive Form Column**:
   - Inputs for Name, Email, Phone, and Message textarea.
   - Placeholder and label react smoothly to active language `lang`.
   - Client-side validation for required fields.
   - Displays emerald confirmation success box upon submission.

---

## 10. Footer Component (`src/components/Footer.astro`)

### Responsibilities:
1. **Brand Lockup**: White-backed DOUITSU logo mark with company name and registration code.
2. **Nav Links**: Horizontal list of site links with hover color transitions.
3. **Copyright & Back-to-Top**:
   - `Copyright © 2025 Douitsu. All rights reserved.`
   - Smooth scroll anchor linking to `#home` ("▲ ページ上部へ").

---

## 11. Reusable Section Header (`src/components/SectionHeader.astro`)

### Props Interface:
```typescript
interface Props {
  eyebrow: string;
  title: { ja: string; en: string; my: string };
  subtitle?: { ja: string; en: string; my: string };
  isH1?: boolean;
  class?: string;
}
```

### Visual Specifications:
1. **Left Alignment**: Completely left-aligned (`text-left`) layout for modern visual balance.
2. **Top Eyebrow Badge**: Soft-tinted pill badge with primary logo blue dot (`bg-douitsu-primary/10 border border-douitsu-primary/20 text-douitsu-primary font-bold uppercase tracking-wider`).
3. **Left Vertical Gradient Bar**: `w-1.5 sm:w-2 bg-gradient-to-b from-douitsu-primary via-douitsu-accent to-douitsu-sky rounded-full` preceding the headline.
4. **Headline**: Solid Deep Navy typography (`text-douitsu-navy font-extrabold tracking-tight`).
5. **Dual Accent Bottom Line**: Short primary blue pill (`w-12 sm:w-16 h-1 bg-douitsu-primary rounded-full`) coupled with a subtle fading sky gradient line (`w-20 sm:w-28 h-[2px] bg-gradient-to-r from-douitsu-sky/70 to-transparent`).
6. **Synchronous Trilingual Subtitle**: Placed directly underneath the accent line with clean indentation.
