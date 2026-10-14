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

export const siteData = {
  meta: {
    title: {
      ja: "DOUITSU合同会社 (登録支援機関)",
      en: "DOUITSU LLC (Registered Support Organization)",
      my: "DOUITSU LLC (မှတ်ပုံတင်ထောက်ပံ့ရေးအဖွဲ့အစည်း)",
    },
    description: {
      ja: "１号特定技能外国人が「特定技能」の在留資格に基づく活動を安定的かつ円滑に行うことができるようにするための職業生活上，日常生活上又は社会生活上の支援を行う機関です。",
      en: "A Registered Support Organization providing comprehensive, reliable living and professional support for Specified Skilled Workers (i) in Japan.",
      my: "အမှတ် (၁) သတ်မှတ်ကျွမ်းကျင်လုပ်သား (Tokutei Ginou 1) ဗီဇာဖြင့် နေထိုင်ခွင့်ရရှိထားသော နိုင်ငံခြားသားများ အနေဖြင့် မိမိတို့၏ အလုပ်အကိုင်၊ နေ့စဉ်လူနေမှုဘဝနှင့် လူမှုဆက်ဆံရေးနယ်ပယ်တို့တွင် တည်ငြိမ်ချောမွေ့စွာ နေထိုင်လုပ်ကိုင်နိုင်ရန်အတွက် ဥပဒေအရ သတ်မှတ်ထားသော ပံ့ပိုးကူညီမှုများကို ပေးအပ်ဆောင်ရွက်ပေးပါသည်။",
    },
    siteUrl: "https://www.douitsu-co.com",
    ogImage: "/images/landing/banner.jpg",
    registrationNo: "REG:0A32ES43",
    companyName: "DOUITSU合同会社",
    companyNameEn: "DOUITSU LLC",
    phone: "042-497-1537",
    phoneTel: "+81424971537",
    email: "info@douitsu-co.com",
    address: {
      postalCode: "〒204-0021",
      ja: "東京都清瀬市元町1-11-21 フローレス元町205号",
      en: "Flawless Motomachi 205, 1-11-21 Motomachi, Kiyose-shi, Tokyo",
      my: "တိုကျိုမြို့၊ ခီယိုဆဲမြို့နယ်၊ မိုတိုမာချီ ၁-၁၁-၂၁၊ ဖလော်လက်စ် မိုတိုမာချီ ၂၀၅ ခန်း",
    },
    establishmentDate: "2025.3.31",
    staffCount: "30",
  },

  // Semantic Navigation Bar (Home, About Us, Services, Careers, Contact Us)
  navigation: [
    { id: "home", href: "/#home", label: { ja: "ホーム", en: "Home", my: "ပင်မစာမျက်နှာ" } },
    { id: "about", href: "/#about", label: { ja: "会社概要", en: "About Us", my: "ကုမ္ပဏီအကြောင်း" } },
    { id: "services", href: "/#services", label: { ja: "サービス", en: "Services", my: "ဝန်ဆောင်မှုများ" } },
    { id: "career", href: "/job.html", label: { ja: "採用・求人", en: "Careers", my: "အလုပ်အကိုင်များ" } },
    { id: "contact", href: "/#contact", label: { ja: "お問い合わせ", en: "Contact Us", my: "ဆက်သွယ်ရန်" } },
    { id: "phone", href: "tel:+81424971537", label: { ja: "042-497-1537", en: "042-497-1537", my: "042-497-1537" } },
  ] as NavItem[],

  hero: {
    badge: {
      ja: "出入国在留管理庁 登録支援機関 (登録番号: 0A32ES43)",
      en: "Immigration Services Agency Registered Support Organization (REG: 0A32ES43)",
      my: "တရားဝင် မှတ်ပုံတင်ထောက်ပံ့ရေးအဖွဲ့အစည်း (REG: 0A32ES43)",
    },
    title: {
      ja: "登録支援機関とは",
      en: "What is a Registered Support Organization?",
      my: "မှတ်ပုံတင်ထောက်ပံ့ရေးအဖွဲ့အစည်း ဆိုသည်မှာ",
    },
    description: {
      ja: "特定技能制度において、外国人受入れを行う企業である「受入れ機関（特定技能所属機関）」は、特定技能外国人に対して業務や日常生活を円滑に行えるように、「支援計画」を作成し 、支援を行うことが義務付けられています。",
      en: "Under the Specified Skilled Worker (SSW) system, host companies employing foreign workers—officially designated as \"Accepting Organizations\"—are legally obligated to formulate a comprehensive \"Support Plan\" and provide full support to ensure that foreign personnel can perform their job duties and carry out their daily lives smoothly in Japan.",
      my: "သတ်မှတ်ကျွမ်းကျင်လုပ်သား (Specified Skilled Worker - Tokutei Ginou) စနစ်အရ၊ နိုင်ငံခြားသားများကို လက်ခံခန့်အပ်သည့် ကုမ္ပဏီများဖြစ်သော \"လက်ခံအဖွဲ့အစည်းများ (အလုပ်ခန့်အပ်သည့် လုပ်ငန်းရှင်များ)\" အနေဖြင့် သတ်မှတ်ကျွမ်းကျင်လုပ်သားများ မိမိတို့၏ အလုပ်တာဝန်များနှင့် နေ့စဉ်လူနေမှုဘဝကို ချောမွေ့အဆင်ပြေစွာ လုပ်ကိုင်နေထိုင်နိုင်စေရန်အတွက် \"ထောက်ပံ့ကူညီရေး အစီအစဉ် (Support Plan)\" ကို မဖြစ်မနေ ရေးဆွဲပြီး ပံ့ပိုးကူညီမှုများ ဆောင်ရွက်ပေးရန် ဥပဒေအရ တာဝန်ရှိပါသည်။",
    },
    ctaPrimary: {
      ja: "支援内容を見る",
      en: "View 10 Pillars",
      my: "ထောက်ပံ့မှု ၁၀ ချက် ကြည့်ရန်",
      href: "#support",
    },
    ctaSecondary: {
      ja: "求人情報を見る",
      en: "View Job Openings",
      my: "အလုပ်ခေါ်ယူမှုများ ကြည့်ရန်",
      href: "/job.html",
    },
    highlights: [
      {
        icon: "bilingual",
        ja: "日英ミャンマー語対応",
        en: "Trilingual Support (JP / EN / MY)",
        my: "သုံးဘာသာ ဝန်ဆောင်မှု",
      },
      {
        icon: "shield",
        ja: "法定支援10項目を網羅",
        en: "All 10 Statutory Pillars",
        my: "တရားဝင် ထောက်ပံ့မှု ၁၀ ချက်",
      },
      {
        icon: "handshake",
        ja: "ワンストップ伴走支援",
        en: "Full One-Stop Assistance",
        my: "အစမှအဆုံး ကူညီစောင့်ရှောက်မှု",
      },
    ],
    cta: {
      ja: "支援内容を見る",
      en: "Explore Services",
      my: "ထောက်ပံ့မှု အသေးစိတ် ကြည့်ရန်",
      href: "#support",
    },
  },

  about: {
    title: {
      ja: "私たちが全力で支援します",
      en: "We Support You with Complete Dedication",
      my: "ကျွန်ုပ်တို့မှ အစွမ်းကုန် ကူညီထောက်ပံ့ပေးပါမည်",
    },
    lead: {
      ja: "１号特定技能外国人が「特定技能」の在留資格に基づく活動を安定的かつ円滑に行うことができるようにするための職業生活上，日常生活上又は社会生活上の支援を行う機関です。",
      en: "We are an accredited agency dedicated to providing seamless living, working, and social integration support for Specified Skilled Workers (i) throughout their stay in Japan.",
      my: "အမှတ် (၁) သတ်မှတ်ကျွမ်းကျင်လုပ်သား (Tokutei Ginou 1) ဗီဇာဖြင့် နေထိုင်ခွင့်ရရှိထားသော နိုင်ငံခြားသားများ အနေဖြင့် မိမိတို့၏ အလုပ်အကိုင်၊ နေ့စဉ်လူနေမှုဘဝနှင့် လူမှုဆက်ဆံရေးနယ်ပယ်တို့တွင် တည်ငြိမ်ချောမွေ့စွာ နေထိုင်လုပ်ကိုင်နိုင်ရန်အတွက် ဥပဒေအရ သတ်မှတ်ထားသော ပံ့ပိုးကူညီမှုများကို ပေးအပ်ဆောင်ရွက်ပေးပါသည်။",
    },
    pillars: [
      { number: 1, title: { ja: "事前ガイダンスの実施", en: "Implementation of Pre-arrival Guidance", my: "ကြိုတင်ရှင်းလင်း လမ်းညွှန်မှု ပြုလုပ်ပေးခြင်း" } },
      { number: 2, title: { ja: "出入国送迎の支援", en: "Airport Pickup and Departure Support", my: "လေဆိပ် အကြို/အပို့ ထောက်ပံ့မှု" } },
      { number: 3, title: { ja: "住宅確保のサポート、生活に必要な契約支援", en: "Housing Search and Daily Life Contract Support", my: "နေအိမ်ရှာဖွေရေးနှင့် လူနေမှုဘဝ စာချုပ်များ ချုပ်ဆိုပေးခြင်း" } },
      { number: 4, title: { ja: "生活オリエンテーションの実施", en: "Living Orientation Program", my: "လူနေမှုစနစ် မိတ်ဆက်ဆွေးနွေးပွဲ ပြုလုပ်ပေးခြင်း" } },
      { number: 5, title: { ja: "公的手続きなどへの同行", en: "Accompaniment to Public Administrative Procedures", my: "အစိုးရရုံး လုပ်ထုံးလုပ်နည်းများသို့ အတူလိုက်ပါဆောင်ရွက်ခြင်း" } },
      { number: 6, title: { ja: "日本語学習機会の提供を支援", en: "Japanese Language Learning Support", my: "ဂျပန်စာ လေ့လာသင်ယူခွင့် အခွင့်အလမ်းများ ထောက်ပံ့ပေးခြင်း" } },
      { number: 7, title: { ja: "相談・苦情対応", en: "Consultation and Grievance Handling", my: "တိုင်ပင်ဆွေးနွေးမှုများနှင့် အခက်အခဲများ ဖြေရှင်းပေးခြင်း" } },
      { number: 8, title: { ja: "日本人との交流促進", en: "Facilitation of Exchange with Japanese Community", my: "ဂျပန်လူမျိုးများနှင့် အပြန်အလှန် ချစ်ကြည်ရင်းနှီးမှု မြှင့်တင်ပေးခြင်း" } },
      { number: 9, title: { ja: "転職支援（受入側の都合で雇用契約を解除した場合）", en: "Job Change Support in Case of Involuntary Dismissal", my: "အလုပ်အသစ် ပြောင်းရွှေ့နိုင်ရေး ကူညီထောက်ပံ့ခြင်း" } },
      { number: 10, title: { ja: "定期的面談・行政機関への通報", en: "Regular Periodic Interviews and Reporting to Authorities", my: "ပုံမှန်တွေ့ဆုံမေးမြန်းခြင်းနှင့် အစိုးရသို့ အစီရင်ခံခြင်း" } },
    ] as SupportPillar[],
  },

  featured: {
    company: {
      title: { ja: "企業情報", en: "Company Profile", my: "ကုမ္ပဏီ အချက်အလက်များ" },
      items: [
        {
          label: { ja: "会社名", en: "Company Name", my: "ကုမ္ပဏီအမည်" },
          value: {
            ja: "DOUITSU合同会社",
            en: "DOUITSU LLC",
            my: "DOUITSU LLC (DOUITSU合同会社)",
          },
        },
        { label: { ja: "設立年", en: "Established", my: "တည်ထောင်သည့်ရက်စွဲ" }, value: "2025.3.31" },
        { label: { ja: "スタッフ数", en: "Staff Members", my: "ဝန်ထမ်းအင်အား" }, value: "30" },
        { label: { ja: "登録", en: "Registration", my: "မှတ်ပုံတင်အမှတ်" }, value: "REG:0A32ES43" },
      ],
    },
    downloads: {
      title: { ja: "Download PDF", en: "Study Textbook Downloads", my: "စာအုပ်ဖတ်စာ ဖိုင်များ ဒေါင်းလုဒ်" },
      files: [
        {
          title: { ja: "介護特定技能評価試験 (日本語) 学習テキスト", en: "Nursing Care SSW Exam Study Guide (Japanese Edition)", my: "Kaigo သတ်မှတ်ကျွမ်းကျင်စာမေးပွဲ ဖတ်စာအုပ် (ဂျပန်ဘာသာ)" },
          lang: "日本語版",
          size: "38.8 MB",
          href: "https://files.douitsu-co.com/kaigo-tokuteiginou-japanese.pdf",
        },
        {
          title: { ja: "介護特定技能評価試験 (ミャンマー語) 学習テキスト", en: "Nursing Care SSW Exam Study Guide (Myanmar Edition)", my: "Kaigo သတ်မှတ်ကျွမ်းကျင်စာမေးပွဲ ဖတ်စာအုပ် (မြန်မာဘာသာ)" },
          lang: "ミャンマー語版",
          size: "14.1 MB",
          href: "https://files.douitsu-co.com/kaigo-tokuteiginou-myanmar.pdf",
        },
      ],
    },
  },

  services: {
    title: {
      ja: "特定技能・外国人採用支援サービスの特徴",
      en: "Key Features of Specified Skilled Worker Support Services",
      my: "သတ်မှတ်ကျွမ်းကျင်လုပ်သား ခေါ်ယူထောက်ပံ့ရေး ဝန်ဆောင်မှု၏ အင်္ဂါရပ်များ",
    },
    card1: {
      image: "/images/landing/license-certificate.jpg",
      alt: { ja: "登録支援機関 登録証明書", en: "Registered Support Organization Certificate", my: "မှတ်ပုံတင်ထောက်ပံ့ရေးအဖွဲ့အစည်း မှတ်ပုံတင်လက်မှတ်" },
    },
    card2: {
      title: { ja: "特定技能", en: "Specified Skilled Worker Program", my: "သတ်မှတ်ကျွမ်းကျင်လုပ်သား (Tokutei Ginou)" },
      text: {
        ja: "登録支援機関は、在留資格「特定技能」の制度を利用して、日本で就労する外国人を受け入れる支援機関です。特定技能外国人が日本で働きやすい環境を整える役割を担い、企業や外国人社員のフォロー業務を代行することで、社内工数削減にもつながります。",
        en: "A Registered Support Organization assists companies hiring international personnel under the 'Specified Skilled Worker' status. By creating an optimal workplace environment and managing statutory guidance on behalf of host companies, we significantly reduce internal administrative burdens.",
        my: "မှတ်ပုံတင်ထောက်ပံ့ရေးအဖွဲ့အစည်း (登録支援機関) သည် သတ်မှတ်ကျွမ်းကျင်လုပ်သား ဗီဇာစနစ်ကို အသုံးပြု၍ ဂျပန်နိုင်ငံတွင် လာရောက်လုပ်ကိုင်သော နိုင်ငံခြားသားများအတွက် လိုအပ်သည်များကို ကူညီထောက်ပံ့ပေးသော အဖွဲ့အစည်းဖြစ်ပါသည်။ သတ်မှတ်ကျွမ်းကျင်လုပ်သားများ ဂျပန်တွင် အဆင်ပြေချောမွေ့စွာ အလုပ်လုပ်ကိုင်နိုင်မည့် ပတ်ဝန်းကျင်ကောင်းကို ဖန်တီးပေးပြီး လုပ်ငန်းရှင်များအတွက်လည်း နိုင်ငံခြားသားဝန်ထမ်းများအား စောင့်ရှောက်မှုတာဝန်များကို ကိုယ်စားဆောင်ရွက်ပေးခြင်းဖြင့် ကုမ္ပဏီတွင်း လုပ်ငန်းဝန်ထုပ်ဝန်ပိုးများကို လျှော့ချပေးပါသည်။",
      },
    },
    card3: {
      title: { ja: "内容サービス", en: "Our Comprehensive Services", my: "ဝန်ဆောင်မှု အကြောင်းအရာများ" },
      items: [
        { ja: "事前ガイダンスの実施", en: "Implementation of Pre-arrival Guidance", my: "ကြိုတင်ရှင်းလင်းလမ်းညွှန်မှု ပြုလုပ်ပေးခြင်း" },
        { ja: "出入国送迎のサポート", en: "Airport Pickup and Departure Support", my: "လေဆိပ် အကြို/အပို့ ထောက်ပံ့မှု" },
        { ja: "住宅確保のサポート、生活に必要な契約サポート", en: "Housing Search and Utility Contract Support", my: "နေအိမ်ရှာဖွေရေးနှင့် လူနေမှုဘဝစာချုပ်များ ထောက်ပံ့မှု" },
        { ja: "生活オリエンテーションの実施", en: "Living Orientation Program", my: "လူနေမှုစနစ် မိတ်ဆက်ဆွေးနွေးပွဲ ပြုလုပ်ခြင်း" },
        { ja: "公的手続きなどへの同行", en: "Accompaniment to Public Administrative Procedures", my: "တရားဝင် အစိုးရရုံးလုပ်ထုံးလုပ်နည်းဆိုင်ရာ ကူညီဆောင်ရွက်ခြင်း" },
        { ja: "日本語学習の場の提供をサポート", en: "Japanese Language Learning Support", my: "ဂျပန်စာလေ့လာသင်ယူနိုင်မည့် နေရာနှင့် အခွင့်အလမ်း ပံ့ပိုးပေးခြင်း" },
        { ja: "相談・苦情対応", en: "Consultation and Grievance Handling", my: "တိုင်ပင်ဆွေးနွေးခြင်းနှင့် အခက်အခဲ တိုင်တန်းချက်များ ဖြေရှင်းပေးခြင်း" },
        { ja: "日本人との交流促進", en: "Promoting Exchange with Local Community", my: "ဂျပန်လူမျိုးများနှင့် အပြန်အလှန် ပေါင်းသင်းဆက်ဆံရေး မြှင့်တင်ပေးခြင်း" },
        { ja: "転職支援（受入側の都合で雇用契約を解除した場合）", en: "Job Change Support in Case of Involuntary Dismissal", my: "အလုပ်အကိုင် အသစ်သို့ ပြောင်းရွှေ့နိုင်ရေး ကူညီထောက်ပံ့ခြင်း" },
        { ja: "定期的面談・行政機関への通報", en: "Regular Periodic Interviews & Official Reporting", my: "ပုံမှန်တွေ့ဆုံဆွေးနွေးခြင်းနှင့် အစိုးရအဖွဲ့အစည်းသို့ တရားဝင် အစီရင်ခံခြင်း" },
      ],
    },
  },

  contact: {
    title: { ja: "お問い合わせ", en: "Contact Us", my: "ဆက်သွယ်ရန်" },
    address: {
      label: { ja: "所在地", en: "Address", my: "လိပ်စာ" },
      ja: "東京都清瀬市元町1-11-21 フローレス元町205号",
      en: "Flawless Motomachi 205, 1-11-21 Motomachi, Kiyose-shi, Tokyo",
      my: "တိုကျိုမြို့၊ ခီယိုဆဲမြို့နယ်၊ မိုတိုမာချီ ၁-၁၁-၂၁၊ ဖလော်လက်စ် မိုတိုမာချီ ၂၀၅ ခန်း",
    },
    email: {
      label: { ja: "Eメール", en: "Email", my: "အီးမေးလ်" },
      value: "info@douitsu-co.com",
    },
    phone: {
      label: { ja: "電話番号", en: "Phone", my: "ဖုန်းနံပါတ်" },
      value: "042-497-1537",
      tel: "+81424971537",
    },
    quickLinks: [
      { label: { ja: "特定技能", en: "Specified Skilled Worker", my: "သတ်မှတ်ကျွမ်းကျင်လုပ်သား" }, href: "#services" },
      { label: { ja: "内容サービス", en: "Our Services", my: "ဝန်ဆောင်မှု အကြောင်းအရာများ" }, href: "#services" },
    ],
    social: [
      { name: "Twitter", icon: "bi-twitter", url: "#" },
      { name: "Instagram", icon: "bi-instagram", url: "#" },
      { name: "Pinterest", icon: "bi-pinterest", url: "#" },
      { name: "YouTube", icon: "bi-youtube", url: "#" },
    ],
    form: {
      name: {
        label: { ja: "名前", en: "Full Name", my: "အမည်" },
        placeholder: { ja: "お名前を入力してください", en: "Enter your full name", my: "အမည်" }
      },
      email: {
        label: { ja: "Eメール", en: "Email", my: "အီးမေးလ်" },
        placeholder: { ja: "メールアドレスを入力してください", en: "Enter your email address", my: "အီးမေးလ်" }
      },
      phone: {
        label: { ja: "電話", en: "Phone", my: "ဖုန်းနံပါတ်" },
        placeholder: { ja: "電話番号を入力してください", en: "Enter your phone number", my: "ဖုန်းနံပါတ်" }
      },
      message: {
        label: { ja: "メッセージ", en: "Message", my: "မေးမြန်းလိုသော စာသား" },
        placeholder: { ja: "ご相談・お問い合わせ内容をご記入ください", en: "Enter your inquiry or message", my: "မေးမြန်းလိုသော အကြောင်းအရာ" }
      },
      submit: { ja: "送信", en: "Send Message", my: "ပေးပို့မည်" },
      success: {
        ja: "お問い合わせありがとうございます。送信が完了しました。",
        en: "Thank you for contacting us. Your message has been sent successfully.",
        my: "မေးမြန်းစုံစမ်းမှုအတွက် ကျေးဇူးတင်ရှိပါသည်။ မကြာမီ ပြန်လည်ဆက်သွယ်ပေးပါမည်။",
      },
    },
  },

  jobs: [
    { id: "1", image: "/images/jobs/job-1.jpg", alt: "求人票 1" },
    { id: "2", image: "/images/jobs/job-2025-11fudo.jpg", alt: "求人票 2025.11" },
    { id: "3", image: "/images/jobs/job-viber-1.jpg", alt: "求人票 Viber 1" },
    { id: "4", image: "/images/jobs/job-viber-2.jpg", alt: "求人票 Viber 2" },
    { id: "5", image: "/images/jobs/job-viber-3.jpg", alt: "求人票 Viber 3" },
    { id: "6", image: "/images/jobs/job-yamaguchi.jpg", alt: "求人票 山口" },
    { id: "7", image: "/images/jobs/job-viber-4.jpg", alt: "求人票 Viber 4" },
  ] as JobFlyer[],

  footer: {
    copyright: "Copyright © 2025 Douitsu. All rights reserved.",
  },
};
