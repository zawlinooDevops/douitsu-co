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
│   ├── src/components/Hero.astro (Hero Banner, Trust Badges, Dual CTAs)
│   ├── src/components/About.astro (10 Statutory Support Pillars, Main Visual Lightbox)
│   ├── src/components/Featured.astro (Company Profile DL, Kaigo PDF Downloads)
│   ├── src/components/Services.astro (3 Feature Cards, Certificate Lightbox)
│   └── src/components/Contact.astro (Office Details Card, Alpine Interactive Form)
├── [Subpage: src/pages/job.astro]
│   └── (Inline Responsive 7-Flyer Gallery with Zoom & Download Action)
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
   - Secondary: Route link to `/job.html` with briefcase icon.
4. **3 Trust Highlight Pills**:
   - Bilingual/Trilingual capability (日英ミャンマー語対応).
   - 10 Statutory Pillars coverage (法定支援10項目を網羅).
   - Full one-stop companion support (ワンストップ伴走支援).

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
     - スタッフ数: 30
     - 登録: REG:0A32ES43
2. **PDF Study Materials Card (`lg:col-span-6`)**:
   - Download cards for official Nursing Care (Kaigo) exams:
     - Japanese Edition: `kaigo-tokuteiginou-japanese.pdf` (38.8 MB)
     - Myanmar Edition: `kaigo-tokuteiginou-myanmar.pdf` (14.1 MB)
   - Features red "PDF" badge, file metadata, and one-click download button.

---

## 7. Services Component (`src/components/Services.astro`)

### Responsibilities:
1. **3 Feature Cards Layout**:
   - Card 1: Official registration certificate document (`license-certificate.jpg`) with click-to-enlarge lightbox trigger.
   - Card 2: Tokutei Ginou visa system overview, detailing benefits for Japanese host enterprises.
   - Card 3: 10 statutory service points checklist.
2. **Decorative Sakura Corner Accent**:
   - Every card features a top-right cherry blossom emblem (`cherry-48.png`, `w-6 h-6`).

---

## 8. Contact Component (`src/components/Contact.astro`)

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

## 9. Footer Component (`src/components/Footer.astro`)

### Responsibilities:
1. **Brand Lockup**: White-backed DOUITSU logo mark with company name and registration code.
2. **Nav Links**: Horizontal list of site links with hover color transitions.
3. **Copyright & Back-to-Top**:
   - `Copyright © 2025 Douitsu. All rights reserved.`
   - Smooth scroll anchor linking to `#home` ("▲ ページ上部へ").

---

## 10. Job Subpage (`src/pages/job.astro`)

### Responsibilities:
1. Renders 7 high-resolution recruitment posters from `siteData.jobs`.
2. Clean card container with `aspect-[3/4]` photo frame and title bar.
3. On card click: opens global Alpine lightbox modal with zoom and download options.
4. Provides a "Back to Home" button returning to `/#home`.
