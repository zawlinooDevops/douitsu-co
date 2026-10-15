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
│   ├── src/components/Flow.astro (Process & Service Flow, Header & Placeholder)
│   ├── src/components/Faq.astro (Frequently Asked Questions, Header & Placeholder)
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
   - Trilingual toggle pills (`🇯🇵 日本語`, `🇺🇸 English`, `🇲🇲 မြန်မာ`) setting `lang` (always defaulting to Japanese on load).
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
   - Title: "支援内容" (Support / 私たちが全力で支援します).
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

## 8. Flow Component (`src/components/Flow.astro`)

### Responsibilities:
1. **Section Heading & Subtitle**:
   - Eyebrow: `PROCESS`
   - Title: "ご利用の流れ" (Process / လုပ်ငန်းစဉ်)
   - Subtitle: Standard SSW onboarding procedure explanation.
2. **6 Process Steps Grid (`siteData.flow.steps`)**:
   - Step 1: お問い合わせ・ご相談 / Inquiry & Consultation / မေးမြန်းတိုင်ပင်ခြင်း
   - Step 2: 受入れ体制の確認 / Review of Your Hiring Setup / လက်ခံမည့် အခြေအနေ စစ်ဆေးခြင်း
   - Step 3: 支援委託契約の締結 / Support Outsourcing Agreement / ထောက်ပံ့မှု လွှဲအပ်စာချုပ် ချုပ်ဆိုခြင်း
   - Step 4: 在留資格の申請 / Residence Status Application / နေထိုင်ခွင့် (ဗီဇာ) လျှောက်ထားခြင်း
   - Step 5: 入国・就労開始 / Arrival & Start of Work / ဂျပန်ရောက်ရှိခြင်းနှင့် အလုပ်စတင်ခြင်း
   - Step 6: 定期面談・継続支援 / Regular Interviews & Ongoing Support / ပုံမှန်တွေ့ဆုံမေးမြန်းခြင်းနှင့် ဆက်လက်ထောက်ပံ့ခြင်း
3. **Card Styling (Support List Card Style)**:
   - 3-column responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) with primary blue number badge (`1` to `6`), `STEP 01` tag, and bold trilingual titles.
4. **Bottom Consultation Callout Banner**:
   - CTA banner linking directly to `#contact` for corporate consultations.

---

## 9. FAQ Component (`src/components/Faq.astro`)

### Responsibilities:
1. **Section Heading & Subtitle**:
   - Eyebrow: `FAQ`
   - Title: "よくあるご質問" (Frequently Asked Questions / မေးလေ့ရှိသောမေးခွန်းများ)
   - Subtitle: Prompt for host company and candidate inquiries.
2. **5 FAQ Interactive Accordion Items (`siteData.faq.items`)**:
   - Q1: 登録支援機関に委託できる支援の範囲は？ (Scope of support)
   - Q2: 介護分野でも対応できますか？ (Nursing care sector support)
   - Q3: ミャンマー人材の受入れは可能ですか？ (Myanmar workers recruitment)
   - Q4: 支援委託費の目安は？ (Outsourcing fee estimate)
   - Q5: 自社で支援する場合と、委託する場合の違いは？ (In-house vs outsourcing differences)
3. **Card & Accordion Architecture**:
   - Pure white background flanked by left and right dashed square grid patterns (`stroke="#94a3b8"`, `32x32` square grid with inward gradient masks).
   - Independent Alpine.js accordion state (`x-data="{ isOpen: index === 0 }"`) with Q-badge, chevron rotation, and A-badge answer box.

---

## 10. Contact Component (`src/components/Contact.astro`)

### Background & Visual Rhythm:
- **Background**: Solid Ice-Blue (`bg-douitsu-ice relative overflow-hidden scroll-mt-24` / `#eff6fa`), providing strong contrast and visual anchor above the dark navy footer.

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
1. **Office Information Column (`lg:col-span-5`)**:
   - Company title lockup (`DOUITSU合同会社 / DOUITSU LLC`).
   - Audited & verified trilingual address:
     - **JA**: `東京都清瀬市元町1-11-21 フローレス元町205号`
     - **EN**: `Room 205, Flores Motomachi, 1-11-21 Motomachi, Kiyose-shi, Tokyo, Japan`
     - **MY**: `တိုကျိုမြို့၊ ခီယိုဆဲမြို့၊ မိုတိုမာချီ ၁-၁၁-၂၁၊ ဖလိုရက်စ် မိုတိုမာချီ အခန်း ၂၀၅`
   - Direct phone link (`042-497-1537`).
   - Direct email link (`info@douitsu-co.com`).
2. **Interactive Form Column (`lg:col-span-7`)**:
   - Professional B2B Japanese field labels:
     - `お名前` (Your Name / Full Name / အမည်)
     - `メールアドレス` (Email Address / အီးမေးလ်)
     - `電話番号` (Phone Number / ဖုန်းနံပါတ်)
     - `お問い合わせ内容` (Inquiry Details / မေးမြန်းလိုသော အကြောင်းအရာ)
   - Dynamic placeholders dynamically bound via `:placeholder` to `siteData.contact.form`:
     - Name: `お名前を入力してください` / `Enter your full name` / `အမည် အပြည့်အစုံ ရိုက်ထည့်ပါ`
     - Email: `メールアドレスを入力してください` / `Enter your email address` / `အီးမေးလ်လိပ်စာ ရိုက်ထည့်ပါ`
     - Phone: `電話番号を入力してください` / `Enter your phone number` / `ဖုန်းနံပါတ် ရိုက်ထည့်ပါ`
     - Message: `ご相談・お問い合わせ内容をご記入ください` / `Enter your consultation or inquiry details` / `ဆွေးနွေးမေးမြန်းလိုသည့် အကြောင်းအရာများကို ရေးသားပါ`
   - Submit Button: `送信する` (Polite active verb) / `Send Message` / `ပေးပို့မည်`
   - Client-side validation alert for required inputs (`必須項目をすべて入力してください。` / `Please fill in all required fields.` / `လိုအပ်သော အချက်အလက်များ အားလုံး ဖြည့်သွင်းပေးပါ။`).
   - Displays emerald confirmation success box upon submission with reset option (`もう一度送信する` / `Send another message` / `ထပ်မံပေးပို့ရန်`).

---

## 11. Footer Component (`src/components/Footer.astro`)

### Responsibilities:
1. **Brand Lockup**: White-backed DOUITSU logo mark with company name and registration code.
2. **Nav Links**: Horizontal list of site links with hover color transitions.
3. **Copyright & Back-to-Top**:
   - `Copyright © 2025 Douitsu. All rights reserved.`
   - Smooth scroll anchor linking to `#home` ("▲ ページ上部へ").

---

## 12. Reusable Section Header (`src/components/SectionHeader.astro`)

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
