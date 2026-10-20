---
trigger: always_on
description: Visual Layout Hierarchy, Route Specifications, Section Mapping, and Responsive Grid Architecture for DOUITSU LLC
---

# Layout & Navigation Architecture Specifications

## 1. Route Map & Page Structure

The website uses a unified, high-performance single-page scroll layout:

```text
/ (index.html)                          -> Main Landing Page
  ├── #home        (alias #section_1)   -> Hero Banner (Mt. Fuji & Sakura, Registration Badge)
  ├── #about       (alias #company)     -> Company Profile / About Us & Kaigo PDF Downloads
  ├── #services    (alias #section_3)   -> 3 Feature Cards & Official Registration Certificate
  ├── #support     (alias #section_2)   -> 10 Statutory Support Pillars & Support Gallery
  ├── #flow                             -> Process / Service Flow (ご利用の流れ)
  ├── #faq                              -> Frequently Asked Questions (よくあるご質問)
  └── #contact     (alias #section_4)   -> Office Location & Interactive Contact Form
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
  - Official Badge Subtitle: `登録支援機関 (25登－012206)` in multilingual format.
- **Desktop Navigation Links (`lg:flex`) with Real-time Scrollspy Active State**:
  - `/#home` (ホーム / Home / ပင်မစာမျက်နှာ)
  - `/#about` (会社概要 / About Us / ကုမ္ပဏီအကြောင်း)
  - `/#services` (サービス / Services / ဝန်ဆောင်မှုများ)
  - `/#support` (支援内容 / Support / ထောက်ပံ့မှုများ)
  - `/#flow` (ご利用の流れ / Process / လုပ်ငန်းစဉ်)
  - `/#faq` (よくあるご質問 / FAQ / အမေး/အဖြေ)
  - CTA Button: `/#contact` (お問い合わせ / Contact Us / ဆက်သွယ်ရန်) styled with `bg-douitsu-primary hover:bg-douitsu-blue text-white font-bold px-4 py-2 rounded-xl`.
- **Reactive Scrollspy Active Menu Engine**:
  - Managed via Alpine.js on `<header>` (`activeSection: 'home'`).
  - Active desktop menu items highlight with `text-douitsu-primary bg-douitsu-ice ring-1 ring-douitsu-primary/20 shadow-xs font-extrabold` and an animated accent pill line at the bottom.
  - Active mobile drawer items highlight with `border-l-4 border-douitsu-primary bg-douitsu-ice text-douitsu-primary font-extrabold` and a blue indicator dot.
  - Dynamically detects viewport scroll position across all 7 sections with bottom-of-page contact fallback and hash URL support.
- **Mobile Hamburger Trigger (`lg:hidden`)**:
  - Toggles Alpine.js boolean `mobileMenuOpen`.
- **Mobile Slide-Down Drawer**:
  - `x-show="mobileMenuOpen"` with crisp solid white container and drop shadow.
  - Vertical list of all navigation links with real-time active indicators plus quick-call telephone button.

---

## 3. Detailed Anatomy of Main Landing Page (`/`)

### Section 1: Hero Banner (`#home` / `src/components/Hero.astro`)
- **Background**: High-resolution WebP hero image (`/images/landing/hero-bg.webp`) depicting Mt. Fuji with blossoming cherry blossoms.
- **Backdrop Gradient**: `bg-gradient-to-r from-slate-950/60 via-slate-900/30 to-transparent` to ensure high contrast for typography while keeping natural scenery visible.
- **Content Container**: Frosted Glassmorphism card (`p-6 sm:p-10 md:p-12 rounded-3xl bg-white/92 backdrop-blur-md border border-white/90 shadow-2xl`).
- **Elements**:
  1. **Government Trust Badge**: Pulsing green dot with `出入国在留管理庁 登録支援機関 (登録番号: 25登－012206)`.
  2. **Main Headline**: Multilingual typography in `text-douitsu-navy font-extrabold`.
  3. **Description Paragraph**: Highlighting one-stop statutory support for host companies and foreign personnel.
  4. **Dual CTAs**:
     - Primary: `[支援内容を見る]` -> `#support` (Blue button with down arrow).
     - Secondary: `[求人情報を見る]` -> `/#career` (White bordered button with briefcase icon).
  5. **Trust Highlights Grid (3 Pills)**:
     - Trilingual Support (日英ミャンマー語対応)
     - All 10 Statutory Pillars (法定支援10項目を網羅)
     - Full One-Stop Assistance (ワンストップ伴走支援)
  6. **Bottom Organic SVG Wave Divider**:
     - 3 transparent wave ribbons using official DOUITSU brand logo blues:
       - Wave 1: `#1a486c` (Deep Navy Blue, 30% opacity)
       - Wave 2: `#105c8e` (Primary Blue, 45% opacity)
       - Wave 3: `#7ba7cc` (Sky Blue, 60% opacity)
     - Wave 4 base is solid `#f1f5f9` (Slate-100), carving the hero photo with an organic wave cut that flows seamlessly into `#about` (`Featured.astro`) without any straight boundary line or subpixel gap.

### Section 2: Company Profile & PDF Downloads (`#about` / `src/components/Featured.astro`)
- **Background**: Slate Tint (`bg-slate-100/90 border-b border-slate-200/60 py-16 md:py-24`).
- **Pattern**: Technical Dot-Grid (`24x24`, `opacity-[0.04]`).
- **Graphic Shapes**: Top wave continuation, floating soft sky/navy ambient glow orbs (`bg-douitsu-sky/15`, `bg-douitsu-primary/10 blur-3xl`).
- **2-Column Equal Card Layout (`grid-cols-1 lg:grid-cols-12 gap-8`)**:
  - **Left Card (`lg:col-span-6`) — 会社概要 (Company Profile / About Us)**:
    - Definition list (`<dl>`) with divided rows:
      - 会社名: DOUITSU合同会社
      - 設立年: 2025.3.31
      - スタッフ数: 6
      - 登録番号: 25登－012206
  - **Right Card (`lg:col-span-6`) — Download PDF (介護テキスト)**:
    - Card 1: Japanese Nursing Care Exam Textbook (38.8 MB) with direct download button.
    - Card 2: Myanmar Nursing Care Exam Textbook (14.1 MB) with direct download button.

### Section 3: Service Features (`#services` / `src/components/Services.astro`)
- **Background**: Clean White (`bg-white border-b border-slate-200/60 py-20 md:py-28`).
- **Pattern**: Japanese Shippo (七宝 - Connection Rings, `40x40`, `opacity-[0.035]`).
- **Graphic Shapes**: 3-Track ambient glow orbs (Blue for SSW1, Indigo for SSW2, Emerald for Ikusei Shuro), Sakura floral soft glow accent (`bg-douitsu-sakura-soft/60`).
- **Heading**: "特定技能・外国人採用支援サービスの特徴".
- **3 Worker Program Track Cards (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`)**:
  - **Track 01 (SSW1 - 特定技能 1号)**: Foundation operational workforce, 5-year stay, N4 + skill test requirement, 10 statutory support duties.
  - **Track 02 (SSW2 - 特定技能 2号)**: Advanced supervisory craft track, unlimited stay renewals, family accompaniment, PR path.
  - **Track 03 (Ikusei Shuro - 育成就労制度)**: 3-year structured career pathway into SSW1 superseding Technical Intern Training.
- **Card Design**: Custom SVG icon box (no sakura icons), trilingual title & description, structured 3-row specs table, and DOUITSU support badge.
- **Bottom Callout**: Dark gradient B2B consultation box with CTA linking to `#contact`.

### Section 4: Support Plan & 10 Pillars (`#support` / `src/components/About.astro`)
- **Background**: Ice-Blue Gradient (`bg-gradient-to-b from-douitsu-ice/85 via-blue-50/40 to-slate-50/80 border-b border-slate-200/60 py-20 md:py-28`).
- **Pattern**: Japanese Seigaiha (青海波 - Calm Ocean Waves, `50x25`, `opacity-[0.035]`).
- **Graphic Shapes**: Organic ambient glow orbs (`bg-douitsu-primary/10`, `bg-douitsu-sky/15 blur-3xl`), step connector feel.
- **Heading**: "支援内容" (Support / 私たちが全力で支援します) with statutory agency mission statement lead paragraph.
- **2-Column Responsive Layout (`grid-cols-1 lg:grid-cols-12 gap-10`)**:
  - **Left Column (`lg:col-span-5`)**:
    - Main visual poster (`/images/landing/about-main.png`) inside a rounded card with hover zoom effect.
    - Click triggers Alpine.js global lightbox modal with high-resolution view.
  - **Right Column (`lg:col-span-7`)**:
    - Sub-grid of 10 support cards (`grid-cols-1 sm:grid-cols-2 gap-3.5`).
    - Each card displays a prominent numbered square badge (`1` to `10`) in `bg-douitsu-primary` and bold multilingual duty description.

### Section 5: Process & Workflow (`#flow` / `src/components/Flow.astro`)
- **Background**: Pure White (`bg-white border-b border-slate-200/60 py-20 md:py-28`).
- **Heading**: "ご利用の流れ" (Process / လုပ်ငန်းစဉ်) with standard onboarding process lead.
- **6-Step Statutory Onboarding Cards (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`)**:
  - Structured after the `#support` statutory list card style.
  - Each card features a solid primary blue number badge (`w-10 h-10` or `w-12 h-12`), a `STEP 01` tag, and bold multilingual duty titles:
    1. お問い合わせ・ご相談 / Inquiry & Consultation / မေးမြန်းတိုင်ပင်ခြင်း
    2. 受入れ体制の確認 / Review of Your Hiring Setup / လက်ခံမည့် အခြေအနေ စစ်ဆေးခြင်း
    3. 支援委託契約の締結 / Support Outsourcing Agreement / ထောက်ပံ့မှု လွှဲအပ်စာချုပ် ချုပ်ဆိုခြင်း
    4. 在留資格の申請 / Residence Status Application / နေထိုင်ခွင့် (ဗီဇာ) လျှောက်ထားခြင်း
    5. 入国・就労開始 / Arrival & Start of Work / ဂျပန်ရောက်ရှိခြင်းနှင့် အလုပ်စတင်ခြင်း
    6. 定期面談・継続支援 / Regular Interviews & Ongoing Support / ပုံမှန်တွေ့ဆုံမေးမြန်းခြင်းနှင့် ဆက်လက်ထောက်ပံ့ခြင်း
- **Bottom Callout**: Consultation invitation banner linking directly to `#contact`.

### Section 6: Frequently Asked Questions (`#faq` / `src/components/Faq.astro`)
- **Background**: Pure White (`bg-white border-b border-slate-200/60 py-20 md:py-28`).
- **Pattern**: Dual Dashed Square Grid Flanks (`stroke="#94a3b8"`, `32x32` grid, `stroke-dasharray="3,3"`, masked with inward horizontal gradient) positioned symmetrically on left and right borders.
- **Heading**: "よくあるご質問" (FAQ / မေးလေ့ရှိသောမေးခွန်းများ) with inquiry prompt.
- **5 Trilingual Accordion Cards**:
  - Independent Alpine.js toggle state (`x-data="{ isOpen: index === 0 }"`).
  - Prominent question badge `Q` (`bg-douitsu-primary/10 text-douitsu-primary font-bold`), animated rotating chevron, and answer box with `A` badge (`bg-emerald-50 text-emerald-600 font-bold`).
  - Covers:
    1. 登録支援機関に委託できる支援の範囲は？ (Scope of 10 statutory items)
    2. 介護分野でも対応できますか？ (Nursing care sector expertise)
    3. ミャンマー人材の受入れは可能ですか？ (Myanmar personnel recruitment)
    4. 支援委託費の目安は？ (Outsourcing fee estimate)
    5. 自社で支援する場合と、委託する場合の違いは？ (In-house vs outsourcing requirements)

### Section 7: Inquiries & Contact (`#contact` / `src/components/Contact.astro`)
- **Background**: Solid Ice-Blue (`bg-douitsu-ice relative overflow-hidden scroll-mt-24` / `#eff6fa`) providing high-contrast visual separation and reassuring stability.
- **2-Column Responsive Layout (`grid-cols-1 lg:grid-cols-12 gap-12`)**:
  - **Left Column (`lg:col-span-5`) — Office Information**:
    - Company title lockup (`DOUITSU合同会社 / DOUITSU LLC`).
    - Office Address card with map pin icon and fully verified trilingual address:
      - **JA**: `東京都清瀬市元町1-11-21 フローレス元町205号`
      - **EN**: `Room 205, Flores Motomachi, 1-11-21 Motomachi, Kiyose-shi, Tokyo, Japan` (Corrected "Flores", added "Room 205")
      - **MY**: `တိုကျိုမြို့၊ ခီယိုဆဲမြို့၊ မိုတိုမာချီ ၁-၁၁-၂၁၊ ဖလိုရက်စ် မိုတိုမာချီ အခန်း ၂၀၅` (Corrected "ဖလိုရက်စ်", "အခန်း ၂၀၅", and "ခီယိုဆဲမြို့")
    - Direct phone link (`042-497-1537`).
    - Direct email link (`info@douitsu-co.com`).
  - **Right Column (`lg:col-span-7`) — Interactive Form**:
    - Professional B2B form labels:
      - Name: `お名前` / `Full Name` / `အမည်`
      - Email: `メールアドレス` / `Email Address` / `အီးမေးလ်`
      - Phone: `電話番号` / `Phone Number` / `ဖုန်းနံပါတ်`
      - Message: `お問い合わせ内容` / `Inquiry Details` / `မေးမြန်းလိုသော အကြောင်းအရာ`
    - Actionable dynamic placeholders bound to `siteData.contact.form`:
      - Name: `お名前を入力してください` / `Enter your full name` / `အမည် အပြည့်အစုံ ရိုက်ထည့်ပါ`
      - Email: `メールアドレスを入力してください` / `Enter your email address` / `အီးမေးလ်လိပ်စာ ရိုက်ထည့်ပါ`
      - Phone: `電話番号を入力してください` / `Enter your phone number` / `ဖုန်းနံပါတ် ရိုက်ထည့်ပါ`
      - Message: `ご相談・お問い合わせ内容をご記入ください` / `Enter your consultation or inquiry details` / `ဆွေးနွေးမေးမြန်းလိုသည့် အကြောင်းအရာများကို ရေးသားပါ`
    - Submit Button: `送信する` / `Send Message` / `ပေးပို့မည်`
    - Alpine.js validation alert (`必須項目をすべて入力してください。` / `Please fill in all required fields.` / `လိုအပ်သော အချက်အလက်များ အားလုံး ဖြည့်သွင်းပေးပါ။`) and emerald success confirmation box.

---

## 4. Site Footer (`src/components/Footer.astro`)

- **Styling**: `bg-douitsu-navy text-slate-300 py-12 border-t border-slate-800`.
- **Top Row**:
  - Left: DOUITSU logo mark with white background pad + Company Name & Registration number.
  - Right: Horizontal navigation link menu.
- **Bottom Row**:
  - Left: Copyright string (`Copyright © 2025 DOUITSU LLC. All rights reserved.`).
  - Right: Smooth scroll anchor linking to `#home` ("▲ ページ上部へ / Back to top / စာမျက်နှာ ထိပ်ဆုံးသို့") and Version Badge pill (`v{siteData.meta.version}` in `font-mono text-slate-400 bg-slate-800/80 border border-slate-700/60`).
