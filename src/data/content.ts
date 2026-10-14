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

export interface SupportPhoto {
  id: string;
  image: string;
  tag: {
    ja: string;
    en: string;
    my: string;
  };
  title: {
    ja: string;
    en: string;
    my: string;
  };
  caption: {
    ja: string;
    en: string;
    my: string;
  };
  alt: {
    ja: string;
    en: string;
    my: string;
  };
}

export interface CareerJobItem {
  no: number;
  category: string;
  categoryLabel: {
    ja: string;
    en: string;
    my: string;
  };
  title: {
    ja: string;
    en: string;
    my: string;
  };
  salary: {
    ja: string;
    en: string;
    my: string;
    line1: {
      ja: string;
      en: string;
      my: string;
    };
    line2: {
      ja: string;
      en: string;
      my: string;
    };
  };
  joinDate: {
    ja: string;
    en: string;
    my: string;
  };
  ageLimit: {
    ja: string;
    en: string;
    my: string;
  };
  image: string;
}

export interface WorkerProgram {
  id: string;
  trackNumber: string;
  theme: 'blue' | 'indigo' | 'emerald';
  badge: {
    ja: string;
    en: string;
    my: string;
  };
  title: {
    ja: string;
    en: string;
    my: string;
  };
  subtitle: {
    ja: string;
    en: string;
    my: string;
  };
  description: {
    ja: string;
    en: string;
    my: string;
  };
  specs: {
    duration: { label: { ja: string; en: string; my: string }; value: { ja: string; en: string; my: string } };
    family: { label: { ja: string; en: string; my: string }; value: { ja: string; en: string; my: string } };
    requirement: { label: { ja: string; en: string; my: string }; value: { ja: string; en: string; my: string } };
  };
  supportBadge: {
    ja: string;
    en: string;
    my: string;
  };
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

  // Semantic Navigation Bar (Home, About Us, Services, Support, Careers, Contact Us)
  navigation: [
    { id: "home", href: "/#home", label: { ja: "ホーム", en: "Home", my: "ပင်မစာမျက်နှာ" } },
    { id: "about", href: "/#about", label: { ja: "会社概要", en: "About Us", my: "ကုမ္ပဏီအကြောင်း" } },
    { id: "services", href: "/#services", label: { ja: "サービス", en: "Services", my: "ဝန်ဆောင်မှုများ" } },
    { id: "support", href: "/#support", label: { ja: "支援内容", en: "Support", my: "ထောက်ပံ့မှုများ" } },
    { id: "career", href: "/#career", label: { ja: "採用・求人", en: "Careers", my: "အလုပ်အကိုင်များ" } },
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
      href: "#career",
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
    photos: [
      {
        id: "support-1",
        image: "/images/landing/support-activity-1.jpg",
        tag: {
          ja: "支援活動 #1",
          en: "Activity #1",
          my: "ထောက်ပံ့မှု မှတ်တမ်း #၁",
        },
        title: {
          ja: "企業配属・生活オリエンテーション",
          en: "Enterprise Placement & Orientation",
          my: "လုပ်ငန်းခွင် ဝင်ရောက်ခြင်းနှင့် မိတ်ဆက်လမ်းညွှန်မှု",
        },
        caption: {
          ja: "特定技能外国人の入社初日同行と生活ルールの対面ガイダンス実施風景",
          en: "First-day workplace accompaniment & comprehensive living guidance in Japan",
          my: "သတ်မှတ်ကျွမ်းကျင်လုပ်သားများ အလုပ်စတင်ဝင်ရောက်ချိန် အတူလိုက်ပါပေးခြင်းနှင့် ဂျပန်လူနေမှုစနစ် မိတ်ဆက်ဆွေးနွေးပွဲ",
        },
        alt: {
          ja: "特定技能外国人 企業配属・生活オリエンテーション",
          en: "Enterprise Placement and Orientation Support",
          my: "သတ်မှတ်ကျွမ်းကျင်လုပ်သားများ လုပ်ငန်းခွင် ဝင်ရောက်ခြင်းနှင့် မိတ်ဆက်လမ်းညွှန်မှု",
        },
      },
      {
        id: "support-2",
        image: "/images/landing/support-activity-2.jpg",
        tag: {
          ja: "支援活動 #2",
          en: "Activity #2",
          my: "ထောက်ပံ့မှု မှတ်တမ်း #၂",
        },
        title: {
          ja: "公的手続き・郵便局/口座開設同行",
          en: "Post Office & Administrative Procedures",
          my: "အစိုးရရုံး၊ စာတိုက်နှင့် ဘဏ်အကောင့် ဖွင့်လှစ်ခြင်း",
        },
        caption: {
          ja: "住民登録・小鹿野郵便局での通帳口座開設など公的手続きに完全同行",
          en: "Accompanying candidates to municipal office and Ogano Post Office for banking setup",
          my: "ရပ်ကွက်ရုံး နေထိုင်ခွင့်စာရင်းသွင်းခြင်း၊ အိုဂနိုစာတိုက်တွင် ဘဏ်စာအုပ်နှင့် အကောင့်ဖွင့်ခြင်းတို့ကို အပြည့်အဝ အတူလိုက်ပါကူညီပေးခြင်း",
        },
        alt: {
          ja: "公的手続き・郵便局/口座開設同行支援",
          en: "Accompaniment to Post Office and Official Procedures",
          my: "အစိုးရရုံး၊ စာတိုက်နှင့် ဘဏ်အကောင့် ဖွင့်လှစ်ခြင်းသို့ အတူလိုက်ပါဆောင်ရွက်ပေးခြင်း",
        },
      },
    ] as SupportPhoto[],
    interactive: {
      dragHint: {
        ja: "カードを左右にドラッグして切り替え",
        en: "Drag or swipe cards to switch",
        my: "ဖဲချပ်ကို ဘေးသို့ဆွဲဖယ်၍ ကြည့်ပါ",
      },
      switchBtn: {
        ja: "写真を切り替え",
        en: "Switch Photo",
        my: "ဖဲချပ်လှန်ရန်",
      },
      zoomBtn: {
        ja: "拡大表示",
        en: "Zoom In",
        my: "အကြီးချဲ့ရန်",
      },
      photoLabel: {
        ja: "写真",
        en: "Photo",
        my: "ဓာတ်ပုံ",
      },
    },
  },

  featured: {
    title: { ja: "会社概要", en: "About Us", my: "ကုမ္ပဏီအကြောင်း" },
    subtitle: {
      ja: "DOUITSU合同会社の基本情報および介護試験テキスト教材のダウンロード",
      en: "Corporate profile of DOUITSU LLC and official nursing care study resources.",
      my: "DOUITSU LLC ၏ အခြေခံအချက်အလက်များနှင့် ခိုင်ဂိုစာမေးပွဲ ဖတ်စာအုပ် ဒေါင်းလုဒ်များ",
    },
    company: {
      title: { ja: "会社概要", en: "About Us", my: "ကုမ္ပဏီအကြောင်း" },
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
    subtitle: {
      ja: "受入れ企業の負担を軽減し、安心できる外国人雇用環境をトータルサポートいたします。",
      en: "We reduce host enterprise burden and provide end-to-end support for a secure foreign employment environment.",
      my: "အလုပ်ခန့်အပ်သည့် လုပ်ငန်းရှင်များ၏ ဝန်ထုပ်ဝန်ပိုးကို လျှော့ချပေးပြီး စိတ်ချရသော နိုင်ငံခြားသား အလုပ်အကိုင် ပတ်ဝန်းကျင်ကို အပြည့်အဝ ပံ့ပိုးပေးပါသည်။",
    },
    programs: [
      {
        id: "ssw-1",
        trackNumber: "TRACK 01",
        theme: "blue",
        badge: {
          ja: "特定技能 1号",
          en: "SSW-1 Track",
          my: "သတ်မှတ်ကျွမ်းကျင် ၁号",
        },
        title: {
          ja: "特定技能 1号 (SSW1)",
          en: "Specified Skilled Worker 1",
          my: "အမှတ် (၁) သတ်မှတ်ကျွမ်းကျင်လုပ်သား",
        },
        subtitle: {
          ja: "即戦力として活躍する基幹技能人材",
          en: "Field-Ready Core Operational Workforce",
          my: "လုပ်ငန်းခွင် ချက်ချင်းဝင်ရောက်နိုင်သော အခြေခံကျွမ်းကျင်လုပ်သား",
        },
        description: {
          ja: "一定の専門技能と日本語能力（N4水準）を有し、介護、外食、飲食料品製造などの人手不足分野で即戦力として活躍できる在留資格です。登録支援機関による法定10項目の支援計画の策定・実施が義務付けられています。",
          en: "Designed for international personnel with certified technical skills and Japanese proficiency (JLPT N4/JFT). Qualified to work immediately in shortage sectors. Host enterprises are legally required to provide 10 statutory support items via a Registered Support Organization.",
          my: "သတ်မှတ်ကျွမ်းကျင်မှုနှင့် ဂျပန်စာ N4 အဆင့်ရှိပြီး ဘိုးဘွားစောင့်ရှောက်ရေး၊ စားသောက်ဆိုင်၊ စားသောက်ကုန်ထုတ်လုပ်ရေး စသည့် လုပ်သားလိုအပ်ချက်မြင့်မားသော ကဏ္ဍများတွင် ချက်ချင်းလုပ်ကိုင်နိုင်သော ဗီဇာဖြစ်ပါသည်။ ဥပဒေအရ သတ်မှတ်ထားသော ထောက်ပံ့ကူညီမှု ၁၀ ချက်ကို DOUITSU မှ အပြည့်အဝ တာဝန်ယူ ဆောင်ရွက်ပေးပါသည်။",
        },
        specs: {
          duration: {
            label: { ja: "在留期間", en: "Stay Duration", my: "သက်တမ်း" },
            value: { ja: "最長5年間 (通算)", en: "Up to 5 years total", my: "အများဆုံး ၅ နှစ်အထိ" },
          },
          family: {
            label: { ja: "家族帯同", en: "Family Sponsorship", my: "မိသားစုခေါ်ယူခွင့်" },
            value: { ja: "原則不可", en: "Not permitted", my: "ခေါ်ယူခွင့် မရရှိနိုင်ပါ" },
          },
          requirement: {
            label: { ja: "取得要件", en: "Requirements", my: "သတ်မှတ်ချက်" },
            value: { ja: "技能試験 + 日本語N4/JFT", en: "Skills Test + JLPT N4 / JFT", my: "ကျွမ်းကျင်မှုစာမေးပွဲ + N4/JFT" },
          },
        },
        supportBadge: {
          ja: "法定支援10項目 完全対応",
          en: "All 10 Statutory Duties Covered",
          my: "ဥပဒေပြဋ္ဌာန်းချက် ၁၀ ချက် အပြည့်အဝထောက်ပံ့",
        },
      },
      {
        id: "ssw-2",
        trackNumber: "TRACK 02",
        theme: "indigo",
        badge: {
          ja: "特定技能 2号",
          en: "SSW-2 Track",
          my: "သတ်မှတ်ကျွမ်းကျင် ၂号",
        },
        title: {
          ja: "特定技能 2号 (SSW2)",
          en: "Specified Skilled Worker 2",
          my: "အမှတ် (၂) သတ်မှတ်ကျွမ်းကျင်လုပ်သား",
        },
        subtitle: {
          ja: "熟練技能を持つ現場の指導・監督リーダー",
          en: "High-Skill Supervisory & Master Craft Track",
          my: "အတွေ့အကြုံရင့် ကြီးကြပ်ခေါင်းဆောင် အဆင့်မြင့်လုပ်သား",
        },
        description: {
          ja: "現場での長年の実務経験と熟練した技能を持つ外国人材を対象とした上位資格です。在留期間の更新制限がなく、将来的な永住申請や家族（配偶者・子）の帯同が認められており、長期的なキャリア形成が可能です。",
          en: "An advanced qualification for seasoned professionals possessing master craftsmanship and supervisory capability. Features unlimited visa renewals, family accompaniment (spouse & children), and an eligible pathway toward Japanese permanent residency.",
          my: "လုပ်ငန်းခွင်အတွင်း နှစ်ရှည်အတွေ့အကြုံနှင့် စီမံကြီးကြပ်နိုင်သော အဆင့်မြင့် ကျွမ်းကျင်မှုရှိသူများအတွက် ဗီဇာဖြစ်ပါသည်။ သက်တမ်းကန့်သတ်ချက်မရှိ သက်တမ်းတိုးနိုင်ပြီး မိသားစု (ဇနီး/ခင်ပွန်း နှင့် သားသမီး) ခေါ်ယူခွင့်ရှိကာ ဂျပန်တွင် အမြဲတမ်းနေထိုင်ခွင့် (PR) လျှောက်ထားနိုင်ပါသည်။",
        },
        specs: {
          duration: {
            label: { ja: "在留期間", en: "Stay Duration", my: "သက်တမ်း" },
            value: { ja: "上限なし (更新可能)", en: "Renewable without cap", my: "ကန့်သတ်ချက်မရှိ သက်တမ်းတိုးနိုင်" },
          },
          family: {
            label: { ja: "家族帯同", en: "Family Sponsorship", my: "မိသားစုခေါ်ယူခွင့်" },
            value: { ja: "配偶者・子の帯同可能", en: "Spouse & children allowed", my: "ခေါ်ယူခွင့်ရှိပါသည်" },
          },
          requirement: {
            label: { ja: "取得要件", en: "Requirements", my: "သတ်မှတ်ချက်" },
            value: { ja: "実務経験 + 2号技能試験", en: "Supervisory experience + SSW2 Exam", my: "ကြီးကြပ်မှုအတွေ့အကြုံ + အဆင့် ၂ စာမေးပွဲ" },
          },
        },
        supportBadge: {
          ja: "永住申請・キャリア定着支援",
          en: "PR Pathway & Long-term Retention",
          my: "ရေရှည်နေထိုင်ခွင့်နှင့် အလုပ်အကိုင်တိုးတက်ရေး ထောက်ပံ့",
        },
      },
      {
        id: "ikusei-shuro",
        trackNumber: "TRACK 03",
        theme: "emerald",
        badge: {
          ja: "育成就労制度",
          en: "Ikusei Shuro",
          my: "လေ့ကျင့်ပျိုးထောင်ရေးစနစ်သစ်",
        },
        title: {
          ja: "育成就労制度 (新制度)",
          en: "Training & Employment System",
          my: "အလုပ်အကိုင် လေ့ကျင့်ပျိုးထောင်ရေးစနစ်",
        },
        subtitle: {
          ja: "特定技能1号を目指す計画的キャリア育成",
          en: "Structured 3-Year Pathway to SSW1",
          my: "SSW1 အဆင့်သို့ စနစ်တကျ ကူးပြောင်းမည့် မွေးထုတ်ပျိုးထောင်မှု",
        },
        description: {
          ja: "従来の技能実習制度を発展的に改編し、3年間の計画的就労・教育を通じて「特定技能1号」水準の人材を育成する新制度です。一定要件での転籍や明確なキャリアパスにより、外国人材と企業の確実な信頼関係を築きます。",
          en: "The historic statutory reform superseding Technical Intern Training, engineered to cultivate candidates up to SSW1 standards through 3 years of structured employment and skills training. Supports standardized job transfers and long-term retention.",
          my: "ယခင်အလုပ်သင်စနစ်အစား အသစ်ပြဋ္ဌာန်းထားသော စနစ်ဖြစ်ပြီး ၃ နှစ်တာ စနစ်တကျ လုပ်ကိုင်သင်ယူခြင်းဖြင့် သတ်မှတ်ကျွမ်းကျင်လုပ်သား (SSW1) အဆင့်သို့ ရောက်ရှိစေရန် ပျိုးထောင်ပေးပါသည်။ သတ်မှတ်ချက်များနှင့်အညီ အလုပ်ရှင်ပြောင်းရွှေ့ခွင့်နှင့် ခိုင်မာသော အနာဂတ်လမ်းကြောင်းများ ပါဝင်ပါသည်။",
        },
        specs: {
          duration: {
            label: { ja: "育成期間", en: "Training Period", my: "ကာလ" },
            value: { ja: "基本3年間 (特定技能へ移行)", en: "3-year bridge to SSW1", my: "၃ နှစ် (SSW1 သို့ ကူးပြောင်း)" },
          },
          family: {
            label: { ja: "家族帯同", en: "Family Sponsorship", my: "မိသားစုခေါ်ယူခွင့်" },
            value: { ja: "原則不可", en: "Not permitted", my: "ခေါ်ယူခွင့် မရရှိနိုင်ပါ" },
          },
          requirement: {
            label: { ja: "育成目標", en: "Core Target", my: "ရည်မှန်းချက်" },
            value: { ja: "特定技能1号への円滑移行", en: "Direct transition to SSW1", my: "SSW1 အဆင့်သို့ စနစ်တကျ ကူးပြောင်းရေး" },
          },
        },
        supportBadge: {
          ja: "育成計画策定・転籍サポート",
          en: "Training Plan & Compliance Setup",
          my: "လေ့ကျင့်ရေးအစီအစဉ်နှင့် ဥပဒေလိုက်နာမှု ထောက်ပံ့",
        },
      },
    ] as WorkerProgram[],
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
    subtitle: {
      ja: "特定技能外国人の受入れや支援計画に関するご相談・ご質問等、お気軽にお問い合わせください。",
      en: "Please feel free to contact us regarding SSW employment or statutory support planning.",
      my: "သတ်မှတ်ကျွမ်းကျင်လုပ်သား ခေါ်ယူခန့်ထားရေးနှင့် ထောက်ပံ့ရေးအစီအစဉ်များအတွက် မည်သည့်မေးခွန်းမဆို အခမဲ့ ဆွေးနွေးမေးမြန်းနိုင်ပါသည်။",
    },
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

  career: {
    title: {
      ja: "採用・求人情報",
      en: "Job Openings & Careers",
      my: "အလုပ်ခေါ်ယူမှုနှင့် အလုပ်အကိုင်များ",
    },
    subtitle: {
      ja: "特定技能外国人の皆様へ、安心・安定して日本で働ける最新の求人情報をご案内いたします。",
      en: "Explore our latest verified Specified Skilled Worker job opportunities across Japan.",
      my: "ဂျပန်နိုင်ငံတွင် တည်ငြိမ်စိတ်ချစွာ လုပ်ကိုင်နိုင်မည့် နောက်ဆုံးရ သတ်မှတ်ကျွမ်းကျင်လုပ်သား အလုပ်အကိုင်များ ဖြစ်ပါသည်။",
    },
    featuredImage: "/images/jobs/job-2025-11fudo.jpg",
    filter: {
      searchPlaceholder: {
        ja: "職種・キーワードで検索 (例: 介護, 食品, 農業)...",
        en: "Search by title or keyword (e.g. Care, Food)...",
        my: "အလုပ်အကိုင် သို့မဟုတ် စကားလုံးဖြင့် ရှာဖွေရန်...",
      },
      sectorLabel: {
        ja: "業種で絞り込み (複数選択可)",
        en: "Filter by Industry Sector",
        my: "လုပ်ငန်းကဏ္ဍအလိုက် စစ်ထုတ်ရန်",
      },
      resultsLabel: {
        ja: "該当求人",
        en: "Jobs Found",
        my: "တွေ့ရှိသည့် အလုပ်",
      },
      resetLabel: {
        ja: "条件クリア",
        en: "Reset Filters",
        my: "စစ်ထုတ်မှု ရှင်းလင်းမည်",
      },
      noResults: {
        ja: "該当する求人は見つかりませんでした。検索条件を変更するか、条件をリセットしてください。",
        en: "No job openings found matching your criteria. Please adjust your filters or reset.",
        my: "ရှာဖွေမှုနှင့် ကိုက်ညီသော အလုပ် မတွေ့ရှိပါ။ စစ်ထုတ်မှုများကို ပြန်လည်ချိန်ညှိပါ။",
      },
      categories: [
        { id: "kaigo", label: { ja: "介護 (Nursing)", en: "Nursing Care", my: "ဘိုးဘွားရိပ်သာ" } },
        { id: "food", label: { ja: "食品加工 (Food)", en: "Food Processing", my: "စားသောက်ကုန်" } },
        { id: "restaurant", label: { ja: "外食業 (Restaurant)", en: "Food Service", my: "စားသောက်ဆိုင်" } },
        { id: "agriculture", label: { ja: "農業 (Agriculture)", en: "Agriculture", my: "စိုက်ပျိုးရေး" } },
        { id: "manufacturing", label: { ja: "機械・製造 (Manufacturing)", en: "Manufacturing", my: "စက်မှုထုတ်လုပ်ရေး" } },
        { id: "cleaning", label: { ja: "清掃・ビルメン (Cleaning)", en: "Building Cleaning", my: "သန့်ရှင်းရေး" } },
      ],
    },
    tableHeaders: {
      no: { ja: "No.", en: "No.", my: "စဉ်" },
      title: { ja: "職種 / 業務内容", en: "Job Title", my: "အလုပ်အကိုင်" },
      salary: { ja: "給与 (月給目安)", en: "Salary", my: "လစာ" },
      joinDate: { ja: "入社時期", en: "Join Date", my: "ဝင်ရောက်ရမည့် ကာလ" },
      ageLimit: { ja: "年齢制限", en: "Age Limit", my: "အသက်ကန့်သတ်ချက်" },
    },
    jobs: [
      {
        no: 1,
        category: "kaigo",
        categoryLabel: {
          ja: "介護",
          en: "Care",
          my: "ခိုင်ဂို",
        },
        title: {
          ja: "介護施設スタッフ (高齢者ケア)",
          en: "Nursing Care Staff (Elderly Care)",
          my: "ဘိုးဘွားရိပ်သာ စောင့်ရှောက်ရေး (ခိုင်ဂို)",
        },
        salary: {
          ja: "月給 210,000円〜260,000円",
          en: "¥210,000 - ¥260,000 / mo",
          my: "လစာ ၂၁၀,၀၀၀ ~ ၂၆၀,၀၀၀ ယန်း",
          line1: {
            ja: "月給 210,000円〜",
            en: "¥210,000 ~",
            my: "၂၁၀,၀၀၀ ယန်း〜",
          },
          line2: {
            ja: "260,000円",
            en: "¥260,000",
            my: "၂၆၀,၀၀၀ ယန်း",
          },
        },
        joinDate: {
          ja: "随時 (2026年5月〜)",
          en: "Rolling (May 2026~)",
          my: "အမြဲမပြတ် (၂၀၂၆ မေလ~)",
        },
        ageLimit: {
          ja: "18歳〜38歳",
          en: "18 - 38 years",
          my: "၁၈ နှစ် ~ ၃၈ နှစ်",
        },
        image: "/images/jobs/job-2025-11fudo.jpg",
      },
      {
        no: 2,
        category: "food",
        categoryLabel: {
          ja: "食品加工",
          en: "Food",
          my: "စားသောက်ကုန်",
        },
        title: {
          ja: "食品加工・お弁当惣菜製造",
          en: "Food Processing & Bento Manufacturing",
          my: "စားသောက်ကုန်နှင့် ဘင်တိုထုတ်လုပ်ရေး",
        },
        salary: {
          ja: "月給 200,000円〜245,000円",
          en: "¥200,000 - ¥245,000 / mo",
          my: "လစာ ၂၀၀,၀၀၀ ~ ၂၄၅,၀၀၀ ယန်း",
          line1: {
            ja: "月給 200,000円〜",
            en: "¥200,000 ~",
            my: "၂၀၀,၀၀၀ ယန်း〜",
          },
          line2: {
            ja: "245,000円",
            en: "¥245,000",
            my: "၂၄၅,၀၀၀ ယန်း",
          },
        },
        joinDate: {
          ja: "2026年6月入社",
          en: "June 2026",
          my: "၂၀၂၆ ဇွန်လ",
        },
        ageLimit: {
          ja: "18歳〜35歳",
          en: "18 - 35 years",
          my: "၁၈ နှစ် ~ ၃၅ နှစ်",
        },
        image: "/images/jobs/job-2025-11fudo.jpg",
      },
      {
        no: 3,
        category: "restaurant",
        categoryLabel: {
          ja: "外食業",
          en: "Restaurant",
          my: "စားသောက်ဆိုင်",
        },
        title: {
          ja: "外食業 (ホール・キッチンスタッフ)",
          en: "Food Service (Hall & Kitchen Staff)",
          my: "စားသောက်ဆိုင် ဝန်ဆောင်မှုနှင့် မီးဖိုချောင်",
        },
        salary: {
          ja: "月給 205,000円〜250,000円",
          en: "¥205,000 - ¥250,000 / mo",
          my: "လစာ ၂၀၅,၀၀၀ ~ ၂၅၀,၀၀၀ ယန်း",
          line1: {
            ja: "月給 205,000円〜",
            en: "¥205,000 ~",
            my: "၂၀၅,၀၀၀ ယန်း〜",
          },
          line2: {
            ja: "250,000円",
            en: "¥250,000",
            my: "၂၅၀,၀၀၀ ယန်း",
          },
        },
        joinDate: {
          ja: "2026年6月入社",
          en: "June 2026",
          my: "၂၀၂၆ ဇွန်လ",
        },
        ageLimit: {
          ja: "18歳〜32歳",
          en: "18 - 32 years",
          my: "၁၈ နှစ် ~ ၃၂ နှစ်",
        },
        image: "/images/jobs/job-2025-11fudo.jpg",
      },
      {
        no: 4,
        category: "agriculture",
        categoryLabel: {
          ja: "農業",
          en: "Agriculture",
          my: "စိုက်ပျိုးရေး",
        },
        title: {
          ja: "農業・施設園芸・野菜果物栽培",
          en: "Agriculture & Crop Cultivation",
          my: "စိုက်ပျိုးရေးနှင့် သီးနှံစိုက်ပျိုးစနစ်",
        },
        salary: {
          ja: "月給 195,000円〜235,000円",
          en: "¥195,000 - ¥235,000 / mo",
          my: "လစာ ၁၉၅,၀၀၀ ~ ၂၃၅,၀၀၀ ယန်း",
          line1: {
            ja: "月給 195,000円〜",
            en: "¥195,000 ~",
            my: "၁၉၅,၀၀၀ ယန်း〜",
          },
          line2: {
            ja: "235,000円",
            en: "¥235,000",
            my: "၂၃၅,၀၀၀ ယန်း",
          },
        },
        joinDate: {
          ja: "2026年7月入社",
          en: "July 2026",
          my: "၂၀၂၆ ဇူလိုင်လ",
        },
        ageLimit: {
          ja: "18歳〜40歳",
          en: "18 - 40 years",
          my: "၁၈ နှစ် ~ ၄၀ နှစ်",
        },
        image: "/images/jobs/job-yamaguchi.jpg",
      },
      {
        no: 5,
        category: "manufacturing",
        categoryLabel: {
          ja: "機械・製造",
          en: "Manufacturing",
          my: "စက်မှုထုတ်လုပ်ရေး",
        },
        title: {
          ja: "機械加工・工場製造ラインオペレーター",
          en: "Machinery Processing & Factory Line",
          my: "စက်မှုစက်ရုံ ထုတ်လုပ်ရေးလိုင်း",
        },
        salary: {
          ja: "月給 215,000円〜270,000円",
          en: "¥215,000 - ¥270,000 / mo",
          my: "လစာ ၂၁၅,၀၀၀ ~ ၂၇၀,၀၀၀ ယန်း",
          line1: {
            ja: "月給 215,000円〜",
            en: "¥215,000 ~",
            my: "၂၁၅,၀၀၀ ယန်း〜",
          },
          line2: {
            ja: "270,000円",
            en: "¥270,000",
            my: "၂၇၀,၀၀၀ ယန်း",
          },
        },
        joinDate: {
          ja: "2026年7月入社",
          en: "July 2026",
          my: "၂၀၂၆ ဇူလိုင်လ",
        },
        ageLimit: {
          ja: "18歳〜35歳",
          en: "18 - 35 years",
          my: "၁၈ နှစ် ~ ၃၅ နှစ်",
        },
        image: "/images/jobs/job-yamaguchi.jpg",
      },
      {
        no: 6,
        category: "cleaning",
        categoryLabel: {
          ja: "清掃",
          en: "Cleaning",
          my: "သန့်ရှင်းရေး",
        },
        title: {
          ja: "ビルクリーニング・施設衛生管理",
          en: "Building Cleaning & Sanitation Management",
          my: "အဆောက်အအုံ သန့်ရှင်းရေးနှင့် ထိန်းသိမ်းရေး",
        },
        salary: {
          ja: "月給 198,000円〜240,000円",
          en: "¥198,000 - ¥240,000 / mo",
          my: "လစာ ၁၉၈,၀၀၀ ~ ၂၄၀,၀၀၀ ယန်း",
          line1: {
            ja: "月給 198,000円〜",
            en: "¥198,000 ~",
            my: "၁၉၈,၀၀၀ ယန်း〜",
          },
          line2: {
            ja: "240,000円",
            en: "¥240,000",
            my: "၂၄၀,၀၀၀ ယန်း",
          },
        },
        joinDate: {
          ja: "随時 (2026年5月〜)",
          en: "Rolling (May 2026~)",
          my: "အမြဲမပြတ် (၂၀၂၆ မေလ~)",
        },
        ageLimit: {
          ja: "18歳〜42歳",
          en: "18 - 42 years",
          my: "၁၈ နှစ် ~ ၄၂ နှစ်",
        },
        image: "/images/jobs/job-yamaguchi.jpg",
      },
    ] as CareerJobItem[],
  },

  jobs: [
    { id: "1", image: "/images/jobs/job-2025-11fudo.jpg", alt: "求人票 (食品加工・お弁当惣菜製造)" },
    { id: "2", image: "/images/jobs/job-yamaguchi.jpg", alt: "求人票 (山口・機械加工・工場製造)" },
  ] as JobFlyer[],

  footer: {
    copyright: "Copyright © 2025 Douitsu. All rights reserved.",
  },
};
