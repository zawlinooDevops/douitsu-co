# Douitsu-co Scraping & Data Extraction Report

ဤအစီရင်ခံစာသည် **https://www.douitsu-co.com/** ဝဘ်ဆိုက်အား scraping ပြုလုပ်ပြီး ရယူစုစည်းထားသော စာသားများ၊ ရုပ်ပုံများ၊ section များနှင့် ၎င်းတို့၏ ချိတ်ဆက်မှုများကို စနစ်တကျ မှတ်တမ်းတင်ထားခြင်း ဖြစ်ပါသည်။

---

## 1. ဝဘ်ဆိုက်၏ တည်ဆောက်ပုံ အကျဉ်းချုပ် (Website Structure)

- **ပုံစံ (Architecture)**: **Single Page Scroll Website (Section by Scroll Navigation)**
- **အဓိက စာမျက်နှာ**: `index.html` (Landing Page)
- **နောက်ဆက်တွဲ စာမျက်နှာ**: `job.html` (အလုပ်ခေါ်ယူမှု ကြော်ငြာပိုစတာများ စာမျက်နှာ)
- **Navigation Type**: Anchor Scroll (`#section_1`, `#section_2`, `#section_3`, `#section_4`)

---

## 2. Section အရေအတွက် (Sections Breakdown)

ဝဘ်ဆိုက်တွင် **အဓိက Section ၅ ခု** နှင့် Header, Footer တို့ ပါဝင်ဖွဲ့စည်းထားပါသည်:

| စဉ် | Section ID / အမည် | Section အမျိုးအစား | အဓိက အကြောင်းအရာ |
|---|---|---|---|
| **0** | `Header / Navbar` | Sticky Navigation Bar | Douitsu Logo၊ Scroll Menu များနှင့် ဖုန်းနံပါတ် |
| **1** | `#section_1` | Hero Banner Section | **登録支援機関とは** (မှတ်ပုံတင် ထောက်ပံ့ရေးအဖွဲ့အစည်း ဆိုသည်မှာ) |
| **2** | `#section_2` | About / Support Plan | **私たちが全力で支援します** (အပြည့်အဝ ထောက်ပံ့ကူညီမည့် တာဝန် ၁၀ ချက်) |
| **3** | `featured` | Company Profile & Downloads | **企業情報** (ကုမ္ပဏီအချက်အလက်) နှင့် **Download PDF** (ဂျပန်/မြန်မာ ဖတ်စာအုပ်များ) |
| **4** | `#section_3` | Service Features | **特定技能・外国人採用支援サービスの特徴** (ကတ် ၃ ခု၊ လိုင်စင်မှတ်ပုံတင်လက်မှတ်) |
| **5** | `#section_4` | Contact & Map Section | **お問い合わせ** (လိပ်စာ၊ ဖုန်း၊ အီးမေးလ်၊ Form နှင့် Social Media) |
| **6** | `Footer` | Site Footer | မူပိုင်ခွင့် (Copyright © 2025 Douitsu) |
| **+** | `job.html` | Subpage (求人票) | ဂျပန်နိုင်ငံ အလုပ်ခေါ် ကြော်ငြာပိုစတာ ၇ ခု |

---

## 3. ရုပ်ပုံများ စာရင်းနှင့် အရေအတွက် (Images Inventory)

ဝဘ်ဆိုက်တစ်ခုလုံးမှ ရုပ်ပုံနှင့် ဖိုင် စုစုပေါင်း **၂၁ ခု** (ရုပ်ပုံ ၁၉ ပုံ + PDF ၂ စောင်) ကို အောင်မြင်စွာ ဒေါင်းလုဒ်ဆွဲပြီး သိမ်းဆည်းထားပါသည်:

### (က) Landing Page ပင်မ ရုပ်ပုံများ (`raw-data/images/landing/`) - ၉ ပုံ
1. `login-logo.jpg` (18.3 KB) — DOUITSU ကုမ္ပဏီ Logo
2. `banner.jpg` (437.8 KB) — Hero Banner ပုံ (16:9 Tokyo/Fuji/Skilled Workers)
3. `about-main.png` (2.7 MB) — Tokutei Ginou ပညာရှင်များ သရုပ်ဖော်ပိုစတာ
4. `cherry.png` (5.9 KB) — ဆာကူရာ ပန်းပွင့် ခေါင်းစဉ်အလှဆင်ပုံ
5. `cherry-48.png` (2.1 KB) — ဆာကူရာ ပန်းပွင့် ကတ်ထောင့် အလှဆင်ပုံ
6. `license-certificate.jpg` (254.9 KB) — ၂၀၂၅.၇ တရားဝင် မှတ်ပုံတင်လိုင်စင်စာရွက်
7. `handshake-contract.jpg` (24.0 KB) — စာချုပ်ချုပ်ဆိုခြင်း လက်ဆွဲနှုတ်ဆက် avatar ပုံ
8. `contact-laptop.jpg` (32.5 KB) — ဆက်သွယ်ရန် ခေါင်းစဉ် avatar ပုံ (Laptop အသုံးပြုနေပုံ)
9. `snow-bg.jpg` (206.1 KB) — Website နောက်ခံ Wallpaper texture

### (ခ) Icons & Favicons (`raw-data/images/icons/`) - ၄ ခု
1. `favicon.ico` (33.7 KB) — Website Favicon
2. `apple-touch-icon.png` (3.1 KB) — Apple Touch Icon
3. `apple-touch-icon-180x180.png` (20.0 KB) — Apple Touch Icon (HD)
4. `jp-dictionary-icon.png` (3.3 KB) — JP Dictionary အဘိဓာန် Icon (Base64 မှ ထုတ်ယူထားခြင်း)

### (ဂ) အလုပ်ခေါ် ပိုစတာ ရုပ်ပုံများ (`raw-data/images/jobs/`) - ၇ ပုံ
1. `job-1.jpg` (57.5 KB) — အလုပ်ခေါ် ကြော်ငြာပိုစတာ ၁
2. `job-2025-11fudo.jpg` (253.9 KB) — စားသောက်ကုန်ထုတ်လုပ်ရေး အလုပ်ခေါ် ပိုစတာ
3. `job-viber-1.jpg` (247.4 KB) — အလုပ်ခေါ်ယူမှု ကြေညာချက် ၁
4. `job-viber-2.jpg` (247.4 KB) — အလုပ်ခေါ်ယူမှု ကြေညာချက် ၂
5. `job-viber-3.jpg` (195.1 KB) — အလုပ်ခေါ်ယူမှု ကြေညာချက် ၃
6. `job-yamaguchi.jpg` (441.0 KB) — Yamaguchi အလုပ်ခေါ်ယူမှု ပိုစတာ
7. `job-viber-4.jpg` (238.0 KB) — အလုပ်ခေါ်ယူမှု ကြေညာချက် ၄

### (ဃ) လေ့လာရန် စာအုပ် PDF ဖိုင်များ (`raw-data/files/`) - ၂ စောင်
1. `kaigo-tokuteiginou-japanese.pdf` (38.8 MB) — 介護特定技能評価試験 (日本語) 学習テキスト
2. `kaigo-tokuteiginou-myanmar.pdf` (14.1 MB) — 介護特定技能評価試験 (ミャンマー語) 学習テキスト

---

## 4. Section နှင့် Image များ၏ ချိတ်ဆက်မှု (Section to Image Mapping)

| Section | မူရင်း HTML Element | ချိတ်ဆက်ထားသော ရုပ်ပုံဖိုင် | ဖော်ပြသည့် အခန်းကဏ္ဍ (Role) |
|---|---|---|---|
| **Header / Nav** | `<a class="navbar-brand"><img ...>` | `raw-data/images/landing/login-logo.jpg` | အမှတ်တံဆိပ် Brand Logo |
| **Section 1 (Hero)** | `<div class="ratio ratio-16x9"><img ...>` | `raw-data/images/landing/banner.jpg` | Main 16:9 Hero Graphic Banner |
| **Section 2 (About)** | `<div class="col-lg-6"><img ...>` | `raw-data/images/landing/about-main.png` | Tokutei Ginou အဓိက သရုပ်ဖော်ပိုစတာ |
| **Section 2 (About)** | `<div class="section-title-wrap"><img ...>` | `raw-data/images/landing/cherry.png` | Section Title ဘေး ဆာကူရာအလှဆင်ပုံ |
| **Section 2 (About)** | `<div class="o-popup-tag"><img ...>` | `raw-data/images/icons/jp-dictionary-icon.png` | အဘိဓာန် Popup Icon |
| **Featured** | `<div class="profile-thumb"><img ...>` | `raw-data/images/landing/login-logo.jpg` | ကုမ္ပဏီအချက်အလက် ကတ်ထဲမှ Logo |
| **Section 3 (Services)** | `<div class="section-title-wrap"><img ...>` | `raw-data/images/landing/handshake-contract.jpg` | Section Title အတွက် Circular Avatar |
| **Section 3 (Services)** | `<div class="services-thumb"><img ...>` | `raw-data/images/landing/cherry-48.png` | Feature Card ၃ ခုစီ၏ ညာဘက်ထောင့် Icon |
| **Section 3 (Services)** | `<div class="services-thumb"><p><img ...>` | `raw-data/images/landing/license-certificate.jpg` | ကတ် ၁ တွင် ပြသထားသော လိုင်စင်မှတ်ပုံတင်စာရွက် |
| **Section 4 (Contact)** | `<div class="section-title-wrap"><img ...>` | `raw-data/images/landing/contact-laptop.jpg` | ဆက်သွယ်ရန် Title အတွက် Circular Avatar |
| **Background (Body)** | `body { background: url(...) }` | `raw-data/images/landing/snow-bg.jpg` | တစ်မျက်နှာလုံး၏ နောက်ခံ Wallpaper texture |

---

## 5. ဖိုင်ဖွဲ့စည်းပုံ လမ်းညွှန် (Folder Structure)

```text
/home/zawlinnoo/projects/douitsu-co/raw-data/
├── README.md                      # ဤအကျဉ်းချုပ် အစီရင်ခံစာ
├── content.md                     # ဝဘ်ဆိုက်တစ်ခုလုံး၏ စာသားအပြည့်အစုံ Markdown
├── metadata.json                  # Astro SSG တွင် တိုက်ရိုက် သုံးနိုင်သော JSON data
├── files/                         # PDF စာအုပ်များ
│   ├── kaigo-tokuteiginou-japanese.pdf
│   └── kaigo-tokuteiginou-myanmar.pdf
├── images/
│   ├── icons/                     # Favicons & Web Icons
│   │   ├── apple-touch-icon-180x180.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon.ico
│   │   └── jp-dictionary-icon.png
│   ├── jobs/                      # Job Recruitment Flyers (7 Images)
│   │   ├── job-1.jpg
│   │   ├── job-2025-11fudo.jpg
│   │   ├── job-viber-1.jpg
│   │   ├── job-viber-2.jpg
│   │   ├── job-viber-3.jpg
│   │   ├── job-viber-4.jpg
│   │   └── job-yamaguchi.jpg
│   └── landing/                   # Landing Page Images (9 Images)
│       ├── about-main.png
│       ├── banner.jpg
│       ├── cherry-48.png
│       ├── cherry.png
│       ├── contact-laptop.jpg
│       ├── handshake-contract.jpg
│       ├── license-certificate.jpg
│       ├── login-logo.jpg
│       └── snow-bg.jpg
└── sections/                      # Section အလိုက် ခွဲခြားထားသော Markdown ဖိုင်များ
    ├── 00-navigation.md
    ├── 01-hero.md
    ├── 02-about-support.md
    ├── 03-company-profile-downloads.md
    ├── 04-services-tokuteiginou.md
    ├── 05-contact.md
    ├── 06-footer.md
    └── 07-job-recruitment.md
```

---

## 6. နောင်တွင် Astro SSG [Tailwind + AlpineJS] တည်ဆောက်ရန် အကြံပြုချက်များ

1. **Astro Component Architecture**:
   - `src/components/Header.astro`
   - `src/components/Hero.astro`
   - `src/components/About.astro`
   - `src/components/CompanyProfile.astro`
   - `src/components/Services.astro`
   - `src/components/Contact.astro`
   - `src/components/Footer.astro`
2. **Alpine.js Use Cases**:
   - Mobile Hamburger Menu Toggle (`x-data="{ open: false }"`)
   - Smooth Scroll Spy & Active Nav Indicator
   - Contact Form Interactive Validation & Submission Feedback
   - Lightbox / Modal Image Viewer for Job Flyers and Certificates (`x-data="{ activeModal: null }"`)
3. **Tailwind CSS Styling**:
   - Modern Glassmorphism Card Design
   - Custom Sakura Pink accents (`#ff88b5` / `#e91e63`)
   - Responsive Grid (1-col on mobile, 2/3-col on desktop)
4. **Data Driven**:
   - `raw-data/metadata.json` မှတစ်ဆင့် `company_info`, `navigation_menu`, `10 Support Items` စသည်တို့ကို Astro တွင် `import metadata from '../data/metadata.json'` ဖြင့် Component-based clean rendering ပြုလုပ်နိုင်ပါသည်။
