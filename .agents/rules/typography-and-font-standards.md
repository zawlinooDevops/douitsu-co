# Master Web Typography & UI/UX Hierarchy Specification
*(DOUITSU LLC နှင့် အခြားသော Web Projects များတွင် မဖြစ်မနေ လိုက်နာရမည့် စာလုံးအရွယ်အစားနှင့် UI ဒီဇိုင်းစံနှုန်းများ)*

---

## ၁။ အခြေခံ အဓိက ရွှေရောင်စည်းမျဉ်း ၃ ရပ် (Core Golden Rules)

> [!IMPORTANT]
> ### 🛑 မဖြစ်မနေ လိုက်နာရမည့် စာလုံးအရွယ်အစားနှင့် ပုံစံစည်းမျဉ်းများ (Mandatory Directives)
> 1. **ဖတ်ရှုရန် စာပိုဒ်များ အားလုံး (Readable Body Copy & Paragraphs)**:
>    - **အနိမ့်ဆုံး စံနှုန်း (Minimum Floor)**: မဖြစ်မနေ အနည်းဆုံး **`text-sm` (14px / `0.875rem`)** ဖြစ်ရမည်။
>    - **ပုံမှန် အကြံပြု စံနှုန်း (Recommended Standard)**: **`text-base` (16px / `1rem`)** ကို ဦးစားပေး သုံးရမည်။
>    - ရှင်းလင်းချက်များ၊ Card Descriptions၊ FAQ အဖြေများ အားလုံးတွင် `14px` အောက် မည်သည့်အခါမျှ မကျဆင်းစေရ။
> 
> 2. **Badges / Buttons / Labels / Microcopy များ အားလုံး**:
>    - **အနိမ့်ဆုံး အောက်ခြေစံနှုန်း (Absolute Minimum Floor)**: မဖြစ်မနေ **`text-xs` (12px / `0.75rem`)** ဖြစ်ရမည်။
>    - **တင်းကျပ်သည့် တားမြစ်ချက် (Strict Prohibition)**: စာလုံးအရွယ်အစားသည် **12px အောက် မည်သည့်အခါမျှ လုံးဝ (လုံးဝ) မကျဆင်းစေရ**။
>    - `text-[9px]`, `text-[10px]`, `text-[11px]` စသည့် 12px အောက် အတိုကောက် အရွယ်အစားများကို **လုံးဝ အသုံးမပြုရ**။
> 
> 3. **မြန်မာစာနှင့် အာရှစာလုံးများအတွက် လိုင်းကွာဝေး (Line-Height / Leading)**:
>    - လုံးကြီးတင်၊ ဆန်ခတ်၊ ယပင့်၊ ရရစ်၊ ဝဆွဲ၊ ခြေထောက် အစရှိသော အပေါ်တင်/အောက်ဆွဲ သင်္ကေတများ ဖြတ်တောက်ခံရခြင်းမှ ကာကွယ်ရန် Single-line တွင် အနည်းဆုံး `leading-normal` (1.5) နှင့် စာပိုဒ်များတွင် အနည်းဆုံး `leading-relaxed` (1.625) ကို မဖြစ်မနေ သုံးရမည်။

---

## ၂။ UI Element အမျိုးအစားအလိုက် အသေးစိတ် စံနှုန်းသတ်မှတ်ချက်များ (Comprehensive UI Hierarchy)

---

### (က) Section အဆင့် (ကဏ္ဍကြီးများ)
ဝဘ်ဆိုက်၏ အဓိက Section တစ်ခုချင်းစီ၏ မျက်စိကျရာ ဦးစားပေးအလိုက် စံနှုန်းများ:

| Section Element | Tailwind Class (Mobile → Desktop) | Pixel အတိုင်းအတာ | ရှင်းလင်းချက်နှင့် အသုံးပြုပုံ |
|---|---|---|---|
| **Section Eyebrow / Pill Badge** | `text-xs font-bold uppercase tracking-wider` | **12px** | ခေါင်းစဉ်အပေါ်ရှိ ကဏ္ဍခွဲအညွှန်း (ဥပမာ - `SERVICES`, `ABOUT US`) |
| **Section Main Title (H2 / H1)** | `text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight` | **24px – 36px+** | ကဏ္ဍ၏ ပင်မခေါင်းစဉ်ကြီး (အမြင့်ဆုံး Visual Weight) |
| **Section Subtitle / Lead Text** | `text-sm sm:text-base md:text-lg font-normal leading-relaxed` | **14px – 18px** | ခေါင်းစဉ်အောက်ရှိ ရှင်းလင်းချက် အဖွင့်စာပိုဒ် (စာဖတ်သူ မျက်စိမညောင်းစေရန်) |
| **Section Description Text** | `text-sm sm:text-base font-normal leading-relaxed` | **14px – 16px** | ကဏ္ဍအတွင်းရှိ အသေးစိတ် ရှင်းလင်းချက် စာပိုဒ်များ |

---

### (ခ) Card အဆင့် (ကတ်များနှင့် အကွက်ငယ်များ)
Features, Services, Sector, Team နှင့် Flow Card များအတွက် စံနှုန်းများ:

| Card Element | Tailwind Class (Mobile → Desktop) | Pixel အတိုင်းအတာ | ရှင်းလင်းချက်နှင့် အသုံးပြုပုံ |
|---|---|---|---|
| **Card Category / Tag** | `text-xs font-semibold uppercase tracking-wide` | **12px** | Card ထိပ်ဆုံးရှိ အမျိုးအစား tag သို့မဟုတ် အဆင့်သတ်မှတ်ချက် |
| **Card Title (H3 / H4)** | `text-base sm:text-lg lg:text-xl font-bold leading-snug` | **16px – 20px** | Card ၏ ပင်မခေါင်းစဉ် |
| **Card Subtitle / Role** | `text-xs sm:text-sm font-medium text-slate-500` | **12px – 14px** | ရာထူး၊ အဆင့် သို့မဟုတ် အကျဉ်းချုပ် tag line |
| **Card Body / Description Text** | `text-sm font-normal leading-relaxed` | **14px** *(Floor)* | Card အတွင်းရှိ အဓိက ဖတ်ရှုရန် စာပိုဒ် (14px အောက် လုံးဝ မကျရ) |
| **Card Key-Value Specs** | `text-xs sm:text-sm font-medium` | **12px – 14px** | ဈေးနှုန်း၊ သတ်မှတ်ချက်ဇယား၊ အချက်အလက်စာရင်းများ |
| **Card Footer / Action Link** | `text-xs sm:text-sm font-bold inline-flex items-center` | **12px – 14px** | `အသေးစိတ်ကြည့်ရန် >` သို့မဟုတ် `မေးမြန်းရန် >` လင့်ခ်များ |

---

### (ဂ) Form အဆင့် (အချက်အလက် ဖြည့်သွင်းသည့် Form များ)
User များ အမှားအယွင်းမရှိ ချောမောစွာ ဖြည့်သွင်းနိုင်စေရန် သတ်မှတ်ချက်များ:

| Form Element | Tailwind Class (Mobile → Desktop) | Pixel အတိုင်းအတာ | ရှင်းလင်းချက်နှင့် အသုံးပြုပုံ |
|---|---|---|---|
| **Form Heading / Intro** | `text-lg sm:text-xl font-bold` | **18px – 20px** | Form ၏ အဖွင့်ခေါင်းစဉ် |
| **Field Label** | `text-xs sm:text-sm font-bold text-slate-700` | **12px – 14px** | အမည်၊ ဖုန်း၊ အီးမေးလ် စသည့် Input အညွှန်းခေါင်းစဉ် |
| **Input / Select / Textarea Text** | `text-base sm:text-sm px-4 py-2.5` | **16px (Mobile) / 14px (Desktop)** | **အရေးကြီး**: Mobile တွင် iOS Safari auto-zoom မဖြစ်စေရန် အနည်းဆုံး 16px ထားရမည် |
| **Input Placeholder** | `text-sm text-slate-400 font-normal` | **14px** | ဖြည့်သွင်းရန် လမ်းညွှန်သည့် Placeholder စာသား |
| **Helper Text / Note** | `text-xs text-slate-500` | **12px** | လျှို့ဝှက်နံပါတ် စည်းကမ်းချက်၊ အက္ခရာကန့်သတ်ချက်များ |
| **Validation Error Message** | `text-xs font-semibold text-rose-600` | **12px** *(Floor)* | မှားယွင်းမှု အသိပေးချက် (12px အောက် မကျဆင်းစေရ) |
| **Submit / Action Button** | `text-sm sm:text-base font-bold py-3 px-6` | **14px – 16px** | ပေးပို့ရန်၊ စာရင်းသွင်းရန် ပင်မခလုတ်ကြီး |

---

### (ဃ) Badges, Buttons, Chips & Status Indicators
အပြန်အလှန် အလုပ်လုပ်သည့် ခလုတ်များနှင့် အညွှန်းတံဆိပ်များ:

| Element | Tailwind Class | Pixel အတိုင်းအတာ | ရှင်းလင်းချက်နှင့် အသုံးပြုပုံ |
|---|---|---|---|
| **Primary CTA Button** | `text-sm sm:text-base font-bold` | **14px – 16px** | ပင်မလုပ်ဆောင်ချက် ခလုတ်ကြီးများ (Contact, Buy Now, Get Started) |
| **Secondary / Ghost Button** | `text-xs sm:text-sm font-semibold` | **12px – 14px** | ဒုတိယဦးစားပေး ခလုတ်များ (Cancel, Download, Learn More) |
| **Status Badge / Pill** | `text-xs font-bold px-2.5 py-1 rounded-full` | **12px** *(Floor)* | `Active`, `Pending`, `ဓာတ်ပုံ ထည့်သွင်းဆဲ`, `နမူနာပုံ` တံဆိပ်များ |
| **Numbered Step Badge** | `text-xs sm:text-sm font-mono font-bold w-8 h-8` | **12px – 14px** | အဆင့်ဆင့် ပြသသော နံပါတ်တံဆိပ်များ (`01`, `02`, `STEP 01`) |

---

### (င) Header, Navigation & Footer အဆင့်
ဝဘ်ဆိုက် အပေါ်ဘားနှင့် အောက်ခြေပိုင်း အညွှန်းစနစ်:

| Navigation Element | Tailwind Class (Mobile → Desktop) | Pixel အတိုင်းအတာ | ရှင်းလင်းချက်နှင့် အသုံးပြုပုံ |
|---|---|---|---|
| **Top Info Bar (Phone/Email)** | `text-xs font-medium tracking-wide` | **12px** | အပေါ်ဆုံးဘားရှိ ဆက်သွယ်ရန် ဖုန်းနှင့် အီးမေးလ် |
| **Language Switcher Buttons** | `text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1` | **12px** | ဘာသာစကား ရွေးချယ်သည့် ခလုတ်များ (`🇯🇵 日本語`, `🇺🇸 English`, `🇲🇲 မြန်မာ`) |
| **Brand Logo Subtitle** | `text-xs font-semibold text-slate-500` | **12px** | Logo အောက်ရှိ တရားဝင် မှတ်ပုံတင်နံပါတ် သို့မဟုတ် ကုမ္ပဏီအမျိုးအစား |
| **Main Navigation Links** | `text-xs lg:text-sm font-semibold` | **12px – 14px** | Navbar ပေါ်ရှိ ပင်မ Menu ခလုတ်များ |
| **Footer Navigation Links** | `text-xs text-slate-400 hover:text-white` | **12px** | Footer ရှိ အမြန်သွား လင့်ခ်များ |
| **Footer Legal / Copyright** | `text-xs text-slate-500` | **12px** | မူပိုင်ခွင့်၊ Terms, Privacy Policy နှင့် Version Badge (`v1.x.x`) |

---

## ၃။ Device Viewport Matrix (Mobile vs Tablet vs Desktop တိုက်ရိုက် နှိုင်းယှဉ်ချက်)

Screen အရွယ်အစား မတူညီသော Device ၃ မျိုးအလိုက် စာလုံးအရွယ်အစား (Font Size) များကို အောက်ပါ Matrix အတိုင်း တိကျစွာ သတ်မှတ်သည်:

| UI Element အမျိုးအစား | 📱 Mobile View (< 640px / 320px–412px) | 📱 Tablet View (640px–1023px / `sm:` ~ `md:`) | 💻 Desktop View (1024px+ / `lg:` ~ `xl:`) |
|---|---|---|---|
| **Hero Main Title (H1)** | `text-2xl` ~ `text-3xl` (24px – 30px) | `text-3xl` ~ `text-4xl` (30px – 36px) | `text-4xl` ~ `text-5xl` (36px – 48px+) |
| **Section Title (H2)** | `text-xl` ~ `text-2xl` (20px – 24px) | `text-2xl` ~ `text-3xl` (24px – 30px) | `text-3xl` ~ `text-4xl` (30px – 36px) |
| **Card / Modal Title (H3/H4)** | `text-base` (16px) | `text-lg` (18px) | `text-lg` ~ `text-xl` (18px – 20px) |
| **Primary Lead Paragraph** | `text-sm` ~ `text-base` (14px – 16px) | `text-base` (16px) | `text-base` ~ `text-lg` (16px – 18px) |
| **Card Body Description** | **`text-sm` (14px Floor)** | `text-sm` (14px) | `text-sm` ~ `text-base` (14px – 16px) |
| **Form Input Fields** | **`text-base` (16px - iOS Zoom Prevention)** | `text-sm` (14px) | `text-sm` (14px) |
| **Form Labels & Helpers** | `text-xs` (12px) | `text-xs` ~ `text-sm` (12px – 14px) | `text-sm` (14px) |
| **Badges / Status Chips** | **`text-xs` (12px Floor)** | `text-xs` (12px) | `text-xs` (12px) |
| **CTA / Submit Buttons** | `text-sm` (14px) | `text-sm` ~ `text-base` (14px – 16px) | `text-sm` ~ `text-base` (14px – 16px) |
| **Navbar Menu Links** | Mobile Drawer (`text-sm` ~ `text-base`) | Header Menu (`text-xs` ~ `text-sm`) | Header Menu (`text-sm`) |
| **Footer & Meta Info** | `text-xs` (12px) | `text-xs` (12px) | `text-xs` (12px) |

### Tablet View (iPad, Surface, Foldable Tablets) သီးခြား လိုက်နာရန် အချက်များ:
- **Viewport အကျယ်**: 640px မှ 1023px အထိ (Tailwind breakpoints: `sm:` နှင့် `md:`).
- **Multi-column Rhythm**: Mobile တွင် 1 column ပြသသော ကတ်များကို Tablet တွင် 2 columns (`sm:grid-cols-2`) အဖြစ် ပြသပြီး Card Body စာပိုဒ်များကို `text-sm` (14px) အဖြစ် ထိန်းသိမ်းရမည်။
- **Touch Target Resilience**: Tablet များသည် Touch Screen စနစ် ဖြစ်သောကြောင့် ခလုတ်များနှင့် Interactive Links များ၏ Tap Target သည် အနည်းဆုံး 44px × 44px ပြည့်မီနေရမည်။

---

## ၄။ အပြည်ပြည်ဆိုင်ရာ စံနှုန်းများနှင့် အဆင့်ဆင့် နှိုင်းယှဉ်ချက် (Design Systems Comparison)

```
[UI Component Scale]
  Headings (H1/H2)   ───▶ 24px - 48px+   (Display / Bold Hierarchy)
  Card Titles / H3   ───▶ 16px - 20px    (Headline)
  Primary Body       ───▶ 16px           (Material 3 / Apple / Tailwind Default)
  Secondary Body     ───▶ 14px           (ABSOLUTE MINIMUM for Paragraphs) 🛑
  Badges / Microcopy ───▶ 12px           (ABSOLUTE FLOOR - NEVER BELOW 12px) 🛑
```

| သတ်မှတ်ချက် အဆင့် | Tailwind Token | CSS Value | သင့်တော်သည့် UI နေရာများ | တားမြစ်ချက် |
|---|---|---|---|---|
| **Headline Large** | `text-3xl` ~ `text-5xl` | 30px – 48px+ | Hero Slogans, Main Landing Banners | မိုဘိုင်းတွင် စာလုံးမပြတ်စေရန် ညှိရမည် |
| **Headline Medium** | `text-xl` ~ `text-2xl` | 20px – 24px | Section Titles (H2), Feature Group Titles | — |
| **Headline Small** | `text-base` ~ `text-lg` | 16px – 18px | Card Titles, Modal Titles, Flow Titles | — |
| **Body Standard** | `text-base` | 16px (1rem) | Lead Paragraphs, Long Articles, Mobile Inputs | — |
| **Body Minimum** | `text-sm` | 14px (0.875rem) | Card Bodies, FAQ Answers, Duty Descriptions | **14px အောက် စာပိုဒ် လုံးဝ မထားရ** |
| **Microcopy Floor** | `text-xs` | 12px (0.75rem) | Badges, Buttons, Tags, Form Errors, Meta, Footer | **12px အောက် လုံးဝ မကျဆင်းစေရ** |
| ⛔ **Forbidden** | `text-[<12px]` | 9px – 11px | — | **ဝဘ်ဆိုက်တစ်ခုလုံးတွင် သုံးစွဲခွင့် မရှိပါ** |

---

## ၅။ မြန်မာစာ (Myanmar Unicode) အတွက် အထူး လိုက်နာရမည့် နည်းပညာ စံနှုန်းများ

1. **စာလုံးအစင်းများ ပြတ်တောက်ခြင်း မရှိစေရေး (Diacritic Clipping Prevention)**:
   - မြန်မာစာတွင် အပေါ်တင် ( ိ ် ံ ့ း) နှင့် အောက်ဆွဲ ( ျ ြ ွ ှ ု ူ ္ ) များစွာ ပါဝင်သောကြောင့် `overflow-hidden` ရှိသော ကွန်တိန်နာများတွင် `leading-none` သို့မဟုတ် `leading-tight` (1.0 – 1.25) ကို လုံးဝ မသုံးရပါ။
   - အနည်းဆုံး `leading-normal` (1.5) သို့မဟုတ် `leading-relaxed` (1.625) ကို သုံးရမည်။
2. **Standard Unicode အာမခံချက်**:
   - မည်သည့်အခါမျှ Zawgyi Encoding ကို မသုံးရ။ နိုင်ငံတကာသုံး UTF-8 Standard Unicode (`Noto Sans Myanmar` သို့မဟုတ် System Unicode) ကိုသာ အသုံးပြုရမည်။
3. **Sub-12px ပြဿနာ ကာကွယ်ရေး**:
   - မြန်မာစာလုံးများသည် 12px အောက်တွင် ဗျည်းအခြေခံအရွယ်အစားသည် 5px ခန့်အထိ သေးငယ်သွားသဖြင့် အောက်ဆွဲနှင့် အပေါ်တင်များ ပေါင်းစပ်ပြီး မှုန်ဝါးသွားတတ်သည်။ ထို့ကြောင့် 12px Floor ကို မဖြစ်မနေ စောင့်ထိန်းရမည်။

---

## ၆။ Mobile Screen (320px – 412px) Responsive သတိပြုရန်အချက်များ

1. **iOS Safari Auto-Zoom ကာကွယ်ခြင်း**:
   - `<input>`, `<select>`, `<textarea>` များတွင် `font-size: 16px` (`text-base sm:text-sm`) သတ်မှတ်ပေးရမည်။ (16px ထက် ငယ်ပါက iPhone အသုံးပြုသူများ စာရိုက်ရန် နှိပ်လိုက်သည်နှင့် မျက်နှာပြင်တစ်ခုလုံး အလိုအလျောက် zoom ဆွဲသွားပြီး UX ပျက်စီးစေသည်)။
2. **အနည်းဆုံး ထိတွေ့ဧရိယာ (Touch Target)**:
   - စာလုံးအရွယ်အစား `text-xs` (12px) သုံးထားသော်လည်း ခလုတ်၏ နှိပ်နိုင်သော အကျယ်အဝန်း (Padding + Height) သည် အနည်းဆုံး **44px × 44px** (သို့မဟုတ် မိုဘိုင်းအတွက် အနည်းဆုံး 36px–40px) ပြည့်မီစေရန် Padding (`px-3 py-2`) ကို လုံလောက်စွာ ထည့်သွင်းရမည်။
3. **Horizontal Overflow ကင်းစင်ရေး**:
   - မိုဘိုင်းကျဉ်းကျဉ်းများတွင် စာသားများ ဘေးဘက်သို့ လျှံမထွက်စေရန် `break-words` သို့မဟုတ် အရေးကြီး label များအတွက် `shrink-0 whitespace-nowrap` ကို စနစ်တကျ တွဲဖက်သုံးရမည်။

---

## ၇။ DOUITSU LLC Self-Hosted Zero-CDN Font Pipeline

DOUITSU LLC ၏ Privacy-First မူဝါဒအရ:
- Google Fonts သို့မဟုတ် ပြင်ပ Font CDN များကို လုံးဝ (လုံးဝ) မခေါ်ယူရ။
- ဖောင့်ဖိုင်များအားလုံးသည် `public/fonts/` အောက်ရှိ self-hosted TTF ဖိုင်များသာ ဖြစ်ရမည်:
  * `local-font-1.ttf` ~ `local-font-8.ttf` (Plus Jakarta Sans & Noto Sans Myanmar)
- ဖောင့်အားလုံးတွင် `font-display: swap` ပါဝင်ရမည်ဖြစ်ပြီး Layout Shift (CLS) ကင်းစင်ရမည်။
