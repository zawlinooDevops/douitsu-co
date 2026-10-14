---
trigger: always_on
description: Content Architecture, Trilingual Schema (Japanese, English, Myanmar), and Alpine.js i18n Patterns for DOUITSU LLC
---

# Content Architecture & Trilingual (i18n) Specifications

## 1. Centralized Data Architecture (`src/data/content.ts`)

All user-facing copy, navigation links, company metadata, statutory support duties, and job flyer definitions are strictly centralized in `src/data/content.ts`. No raw hardcoded text strings should be scattered across Astro components.

### Core TypeScript Interfaces:

```typescript
export interface NavItem {
  id: string;
  href: string;
  label: {
    ja: string;
    en: string;
    my: string;
  };
}

export interface SupportPillar {
  number: number;
  title: {
    ja: string;
    en: string;
    my: string;
  };
}

export interface JobFlyer {
  id: string;
  image: string;
  alt: string;
}
```

---

## 2. Supported Languages & Locales

The site natively supports three languages:

1. **Japanese (`ja`) — Primary / Canonical**:
   - The authoritative legal language for all Japanese immigration and statutory requirements.
   - Used for Japanese host enterprise clients, official government terminology, and default site metadata.
2. **English (`en`) — Global Business**:
   - International partner communications, general B2B inquiries, and global compliance representation.
3. **Myanmar (`my`) — Core Community & Worker Language**:
   - Essential for Myanmar candidates, technical interns, and Specified Skilled Workers transitioning to Japan.
   - Written in standard Unicode (rendered via self-hosted `Noto Sans Myanmar`).

---

## 3. Alpine.js Zero-Reload i18n Engine

Rather than duplicating page routes (e.g. `/ja/`, `/en/`, `/my/`) which would require complex static routing or server middleware, the site uses an instant, zero-reload reactive toggle powered by Alpine.js.

### Reactive State Binding
Declared on `<html>` in `src/layouts/Layout.astro`:
```html
<html
  lang="ja"
  x-data="{
    lang: (typeof localStorage !== 'undefined' && localStorage.getItem('douitsu_lang')) || 'ja'
  }"
>
```

### Display Pattern & FOUC Prevention
To prevent brief flashes of translated content during initial page load, non-default language nodes include an inline `style="display: none;"`:

```html
<span x-show="lang === 'ja'">{siteData.hero.title.ja}</span>
<span x-show="lang === 'en'" style="display: none;">{siteData.hero.title.en}</span>
<span x-show="lang === 'my'" style="display: none;">{siteData.hero.title.my}</span>
```

### Language Switcher Implementation (`Navbar.astro`)
The switcher updates both the Alpine reactive variable and `localStorage` simultaneously:

```html
<button
  type="button"
  @click="lang = 'ja'; localStorage.setItem('douitsu_lang', 'ja')"
  :class="{ 'bg-douitsu-blue text-white shadow-xs font-bold': lang === 'ja', 'text-slate-300 hover:text-white': lang !== 'ja' }"
  class="px-2 py-0.5 text-[11px] rounded transition-all flex items-center gap-1"
>
  <span>🇯🇵</span>
  <span>日本語</span>
</button>
```

---

## 4. Legal & Domain Terminology Mapping

When updating or modifying translations, agents must adhere to the standardized terminology below:

| English | Japanese (Official Legal Term) | Myanmar (မြန်မာပြန် ဝေါဟာရ) |
|---|---|---|
| Specified Skilled Worker (SSW) | 特定技能 (Tokutei Ginou) | သတ်မှတ်ကျွမ်းကျင်လုပ်သား |
| Category 1 Specified Skilled Worker | 1号特定技能外国人 | အမှတ် (၁) သတ်မှတ်ကျွမ်းကျင်လုပ်သား |
| Registered Support Organization | 登録支援機関 (Touroku Shien Kikan) | မှတ်ပုံတင်ထောက်ပံ့ရေးအဖွဲ့အစည်း |
| Immigration Services Agency of Japan | 出入国在留管理庁 (Shutsunyuukoku Zairyu Kanrichou) | ဂျပန်နိုင်ငံ လူဝင်မှုကြီးကြပ်ရေးနှင့် နေထိုင်ခွင့်စီမံခန့်ခွဲရေး ဦးစီးဌာန |
| Host Organization / Accepting Enterprise | 受入れ機関 / 受入れ企業 | လက်ခံအလုပ်ခန့်အပ်သည့် လုပ်ငန်းရှင်/ကုမ္ပဏီ |
| Support Plan | 支援計画 (Shien Keikaku) | ထောက်ပံ့ကူညီရေး အစီအစဉ် |
| Pre-arrival Guidance | 事前ガイダンス (Jizen Guidance) | ကြိုတင်ရှင်းလင်း လမ်းညွှန်မှု |
| Living Orientation | 生活オリエンテーション | ဂျပန်နိုင်ငံ လူနေမှုစနစ် မိတ်ဆက်ဆွေးနွေးပွဲ |
| Nursing Care Sector | 介護 (Kaigo) | ဘိုးဘွားရိပ်သာ စောင့်ရှောက်ရေး (ခိုင်ဂို) |
| Food Service / Restaurant Sector | 外食業 (Gaishokugyou) | စားသောက်ဆိုင်နှင့် ဝန်ဆောင်မှုလုပ်ငန်း |
| Food & Beverage Manufacturing | 飲食料品製造業 / 食品加工 | စားသောက်ကုန် ထုတ်လုပ်ရေးလုပ်ငန်း |

---

## 5. Guidelines for Content Additions

1. **Synchronous Trilingual Updates**: Never add a new content key in only one language. Always provide `ja`, `en`, and `my` keys in `siteData`.
2. **Myanmar Font Standard**: Always use standard Unicode encoding for Myanmar text (no legacy Zawgyi encoding).
3. **Typography Spacing**: Myanmar script requires slightly taller line-height (`leading-relaxed` or `leading-normal`) to avoid clipping diacritics and stacked consonants.
