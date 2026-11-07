export interface NavItem {
  id: string;
  href: string;
  label: {
    ja: string;
    en: string;
    my: string;
  };
}

export interface FooterSpecialLink {
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

export interface FlowStep {
  number: number;
  title: {
    ja: string;
    en: string;
    my: string;
  };
}

export interface FaqItem {
  id: string;
  question: {
    ja: string;
    en: string;
    my: string;
  };
  answer: {
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

export interface SupportedSector {
  id: string;
  image?: string;
  alt: {
    ja: string;
    en: string;
    my: string;
  };
  title: {
    ja: string;
    en: string;
    my: string;
  };
  description: {
    ja: string;
    en: string;
    my: string;
  };
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


export interface WorkerProgram {
  id: string;
  trackNumber?: string;
  theme: 'blue' | 'indigo' | 'emerald';
  badge?: {
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
      ja: "DOUITSU合同会社｜特定技能の登録支援機関｜ミャンマー人材｜介護・ビルクリーニング・外食・製造（東京都清瀬市）",
      en: "DOUITSU合同会社｜特定技能の登録支援機関｜ミャンマー人材｜介護・ビルクリーニング・外食・製造（東京都清瀬市）",
      my: "DOUITSU合同会社｜特定技能の登録支援機関｜ミャンマー人材｜介護・ビルクリーニング・外食・製造（東京都清瀬市）",
    },
    description: {
      ja: "東京都清瀬市の登録支援機関。特定技能外国人（ミャンマー人材）の支援を、介護・ビルクリーニング・外食・製造業の分野でサポート。受入れ支援計画の作成から実施まで、法定10項目の支援に対応します。",
      en: "東京都清瀬市の登録支援機関。特定技能外国人（ミャンマー人材）の支援を、介護・ビルクリーニング・外食・製造業の分野でサポート。受入れ支援計画の作成から実施まで、法定10項目の支援に対応します。",
      my: "東京都清瀬市の登録支援機関。特定技能外国人（ミャンマー人材）の支援を、介護・ビルクリーニング・外食・製造業の分野でサポート。受入れ支援計画の作成から実施まで、法定10項目の支援に対応します。",
    },
    siteUrl: "https://douitsu-co.com",
    ogImage: "/images/landing/logo-square.png",
    registrationNo: "25登－012206",
    companyName: "DOUITSU合同会社",
    companyNameEn: "DOUITSU LLC",
    phone: "042-497-1537",
    phoneTel: "+81424971537",
    email: "info@douitsu-co.com",
    address: {
      postalCode: "〒204-0021",
      ja: "東京都清瀬市元町1-11-21 フローレス元町205号",
      en: "Room 205, Flores Motomachi, 1-11-21 Motomachi, Kiyose-shi, Tokyo 204-0021, Japan",
      my: "တိုကျိုမြို့၊ ခီယိုဆဲမြို့၊ မိုတိုမာချီ ၁-၁၁-၂၁၊ ဖလိုရက်စ် မိုတိုမာချီ အခန်း ၂၀၅",
    },
    establishmentDate: "2025.3.31",
    staffCount: "6",
    version: "1.4.3",
  },

  // Semantic Navigation Bar (Home, About Us, Services, Support, Process, FAQ, Contact Us)
  navigation: [
    { id: "home", href: "/#home", label: { ja: "ホーム", en: "Home", my: "ပင်မစာမျက်နှာ" } },
    { id: "about", href: "/#about", label: { ja: "会社概要", en: "About Us", my: "ကုမ္ပဏီအကြောင်း" } },
    { id: "services", href: "/#services", label: { ja: "サービス", en: "Services", my: "ဝန်ဆောင်မှုများ" } },
    { id: "support", href: "/#support", label: { ja: "支援内容", en: "Support", my: "ထောက်ပံ့မှုများ" } },
    { id: "flow", href: "/#flow", label: { ja: "ご利用の流れ", en: "Process", my: "လုပ်ငန်းစဉ်" } },
    { id: "faq", href: "/#faq", label: { ja: "よくあるご質問", en: "FAQ", my: "အမေး/အဖြေ" } },
    { id: "contact", href: "/#contact", label: { ja: "お問い合わせ", en: "Contact Us", my: "ဆက်သွယ်ရန်" } },
    { id: "phone", href: "tel:+81424971537", label: { ja: "042-497-1537", en: "042-497-1537", my: "042-497-1537" } },
  ] as NavItem[],

  // Footer Special Links (Replacing main menu on right side)
  footerCommunity: {
    label: {
      ja: "ミャンマーの方へ：",
      en: "For Myanmar residents: ",
      my: "မြန်မာလူမျိုးများအတွက်：",
    },
    links: [
      {
        id: "license",
        href: "/license/",
        label: {
          ja: "運転免許切り替え",
          en: "Driver's License Conversion",
          my: "လိုင်စင်ပြောင်း",
        },
      },
      {
        id: "housing",
        href: "/housing/",
        label: {
          ja: "賃貸物件紹介",
          en: "Housing",
          my: "အိမ်ငှားရန်",
        },
      },
    ] as FooterSpecialLink[],
  },
  footerLinks: [
    {
      id: "license",
      href: "/license/",
      label: {
        ja: "運転免許切り替え",
        en: "Driver's License Conversion",
        my: "လိုင်စင်ပြောင်း",
      },
    },
    {
      id: "housing",
      href: "/housing/",
      label: {
        ja: "賃貸物件紹介",
        en: "Housing",
        my: "အိမ်ငှားရန်",
      },
    },
  ] as FooterSpecialLink[],

  hero: {
    badge: {
      ja: "出入国在留管理庁 登録支援機関 (登録番号: 25登－012206)",
      en: "Immigration Services Agency Registered Support Organization (Registration No. 25登－012206)",
      my: "တရားဝင် မှတ်ပုံတင်ထောက်ပံ့ရေးအဖွဲ့အစည်း (မှတ်ပုံတင်အမှတ်: 25登－012206)",
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
      ja: "支援内容",
      en: "Support",
      my: "ထောက်ပံ့မှုများ",
    },
    lead: {
      ja: "私たちが全力で支援します。１号特定技能外国人が「特定技能」の在留資格に基づく活動を安定的かつ円滑に行うことができるようにするための職業生活上，日常生活上又は社会生活上の支援を行う機関です。",
      en: "We Support You with Complete Dedication. We are an accredited agency dedicated to providing seamless living, working, and social integration support for Specified Skilled Workers throughout their stay in Japan.",
      my: "ကျွန်ုပ်တို့မှ အစွမ်းကုန် ကူညီထောက်ပံ့ပေးပါမည်။ အမှတ် (၁) သတ်မှတ်ကျွမ်းကျင်လုပ်သား (Tokutei Ginou 1) ဗီဇာဖြင့် နေထိုင်ခွင့်ရရှိထားသော နိုင်ငံခြားသားများ အနေဖြင့် မိမိတို့၏ အလုပ်အကိုင်၊ နေ့စဉ်လူနေမှုဘဝနှင့် လူမှုဆက်ဆံရေးနယ်ပယ်တို့တွင် တည်ငြိမ်ချောမွေ့စွာ နေထိုင်လုပ်ကိုင်နိုင်ရန်အတွက် ဥပဒေအရ သတ်မှတ်ထားသော ပံ့ပိုးကူညီမှုများကို ပေးအပ်ဆောင်ရွက်ပေးပါသည်။",
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
        { label: { ja: "スタッフ数", en: "Staff Members", my: "ဝန်ထမ်းအင်အား" }, value: "6" },
        { label: { ja: "登録番号", en: "Registration No.", my: "မှတ်ပုံတင်အမှတ်" }, value: "25登－012206" },
      ],
    },
    downloads: {
      title: { ja: "学習テキストダウンロード", en: "Study Textbook Downloads", my: "စာအုပ်ဖတ်စာ ဖိုင်များ ဒေါင်းလုဒ်" },
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

  sectors: {
    eyebrow: "SECTORS",
    title: {
      ja: "対応分野",
      en: "Supported Sectors",
      my: "ပံ့ပိုးဆောင်ရွက်ပေးနိုင်တဲ့ကဏ္ဍများ",
    },
    imageLabel: {
      ja: "イメージ",
      en: "Image",
      my: "နမူနာပုံ",
    },
    items: [
      {
        id: "sector-kaigo",
        image: "/images/sectors/sector-kaigo.jpg",
        title: {
          ja: "介護",
          en: "Nursing Care",
          my: "ဘိုးဘွားစောင့်ရှောက်ရေး",
        },
        description: {
          ja: "介護施設での特定技能外国人の受入れを支援します。",
          en: "Support for hiring Specified Skilled Workers at nursing care facilities.",
          my: "介護 ဘိုးဘွားဂေဟာတွေမှာ လုပ်သားခေါ်ယူမှုကို ကူညီပေးပါတယ်။",
        },
        alt: {
          ja: "介護分野のイメージ",
          en: "Nursing Care Sector Illustration",
          my: "ဘိုးဘွားစောင့်ရှောက်ရေးကဏ္ဍ နမူနာပုံ",
        },
      },
      {
        id: "sector-building-cleaning",
        image: "/images/sectors/sector-building-cleaning.jpg",
        title: {
          ja: "ビルクリーニング",
          en: "Building Cleaning",
          my: "အဆောက်အဦ သန့်ရှင်းရေး",
        },
        description: {
          ja: "建物の清掃分野での受入れを支援します。",
          en: "Support for hiring in the building cleaning sector.",
          my: "အဆောက်အဦးသန့်ရှင်းရေးကဏ္ဍမှာ လုပ်သားခေါ်ယူမှုကို ကူညီပေးပါတယ်။",
        },
        alt: {
          ja: "ビルクリーニング分野のイメージ",
          en: "Building Cleaning Sector Illustration",
          my: "အဆောက်အဦ သန့်ရှင်းရေးကဏ္ဍ နမူနာပုံ",
        },
      },
      {
        id: "sector-food-service",
        image: "/images/sectors/sector-food-service.jpg",
        title: {
          ja: "外食",
          en: "Food Service",
          my: "စားသောက်ဆိုင်လုပ်ငန်း",
        },
        description: {
          ja: "飲食店での受入れを支援します。",
          en: "Support for hiring at restaurants and food service businesses.",
          my: "စားသောက်ဆိုင်တွေမှာ လုပ်သားခေါ်ယူမှုကို ကူညီပေးပါတယ်။",
        },
        alt: {
          ja: "外食分野のイメージ",
          en: "Food Service Sector Illustration",
          my: "စားသောက်ဆိုင်လုပ်ငန်းကဏ္ဍ နမူနာပုံ",
        },
      },
      {
        id: "sector-manufacturing",
        image: "/images/sectors/sector-manufacturing.jpg",
        title: {
          ja: "製造業",
          en: "Manufacturing",
          my: "ထုတ်လုပ်ရေးလုပ်ငန်း",
        },
        description: {
          ja: "製造現場での受入れを支援します。",
          en: "Support for hiring at manufacturing sites.",
          my: "ထုတ်လုပ်ရေးလုပ်ငန်းခွင်တွေမှာ လုပ်သားခေါ်ယူမှုကို ကူညီပေးပါတယ်။",
        },
        alt: {
          ja: "製造業分野のイメージ",
          en: "Manufacturing Sector Illustration",
          my: "ထုတ်လုပ်ရေးလုပ်ငန်းကဏ္ဍ နမူနာပုံ",
        },
      },
    ] as SupportedSector[],
  },

  flow: {
    title: {
      ja: "ご利用の流れ",
      en: "Process",
      my: "လုပ်ငန်းစဉ်",
    },
    subtitle: {
      ja: "特定技能外国人の受入れおよび支援開始までの標準的な流れをご案内します。",
      en: "Standard process and workflow from initial consultation to employment and onboarding support.",
      my: "သတ်မှတ်ကျွမ်းကျင်လုပ်သား ခေါ်ယူခန့်ထားခြင်းနှင့် ထောက်ပံ့မှု စတင်ခြင်းဆိုင်ရာ အဆင့်ဆင့် လုပ်ငန်းစဉ်များ။",
    },
    steps: [
      {
        number: 1,
        title: {
          ja: "お問い合わせ・ご相談",
          en: "Inquiry & Consultation",
          my: "မေးမြန်းတိုင်ပင်ခြင်း",
        },
      },
      {
        number: 2,
        title: {
          ja: "受入れ体制の確認",
          en: "Review of Your Hiring Setup",
          my: "လက်ခံမည့် အခြေအနေ စစ်ဆေးခြင်း",
        },
      },
      {
        number: 3,
        title: {
          ja: "支援委託契約の締結",
          en: "Support Outsourcing Agreement",
          my: "ထောက်ပံ့မှု လွှဲအပ်စာချုပ် ချုပ်ဆိုခြင်း",
        },
      },
      {
        number: 4,
        title: {
          ja: "在留資格の申請",
          en: "Residence Status Application",
          my: "နေထိုင်ခွင့် (ဗီဇာ) လျှောက်ထားခြင်း",
        },
      },
      {
        number: 5,
        title: {
          ja: "入国・就労開始",
          en: "Arrival & Start of Work",
          my: "ဂျပန်ရောက်ရှိခြင်းနှင့် အလုပ်စတင်ခြင်း",
        },
      },
      {
        number: 6,
        title: {
          ja: "定期面談・継続支援",
          en: "Regular Interviews & Ongoing Support",
          my: "ပုံမှန်တွေ့ဆုံမေးမြန်းခြင်းနှင့် ဆက်လက်ထောက်ပံ့ခြင်း",
        },
      },
    ] as FlowStep[],
  },

  faq: {
    title: {
      ja: "よくあるご質問",
      en: "FAQ",
      my: "မေးလေ့ရှိသောမေးခွန်းများ",
    },
    subtitle: {
      ja: "受入れ企業様や外国人材の皆様からよくいただくご質問と回答を掲載しています。",
      en: "Answers to frequently asked questions from host companies and international candidates.",
      my: "လက်ခံခန့်အပ်မည့် လုပ်ငန်းရှင်များနှင့် နိုင်ငံခြားသား ဝန်ထမ်းများ မကြာခဏ မေးလေ့ရှိသော မေးခွန်းများနှင့် အဖြေများ။",
    },
    items: [
      {
        id: "faq-1",
        question: {
          ja: "登録支援機関に委託できる支援の範囲は？",
          en: "What support can we entrust to a Registered Support Organization?",
          my: "登録支援機関 ကို ဘယ်လို ထောက်ပံ့မှုတွေ လွှဲအပ်လို့ရလဲ။",
        },
        answer: {
          ja: "法定10項目の支援（事前ガイダンス、出入国の送迎、住居確保の支援、生活オリエンテーション、公的手続きへの同行、日本語学習の支援、相談・苦情対応、日本人との交流促進、転職支援、定期的な面談）を、すべて委託いただけます。",
          en: "You can entrust all 10 statutory support items, from pre-arrival guidance and airport pickup to housing support, living orientation, accompaniment to public procedures, Japanese learning support, consultation, exchange facilitation, job-change support, and regular interviews.",
          my: "ဥပဒေပြဋ္ဌာန်းထားတဲ့ ထောက်ပံ့မှု ၁၀ ချက် အားလုံးကို လွှဲအပ်နိုင်ပါတယ်။",
        },
      },
      {
        id: "faq-2",
        question: {
          ja: "対応している分野を教えてください。",
          en: "Which sectors do you support?",
          my: "ဘယ်ကဏ္ဍတွေမှာ ကူညီနိုင်လဲ။",
        },
        answer: {
          ja: "介護を中心に、ビルクリーニング、外食、製造業の特定技能外国人の支援に対応しています。",
          en: "We support Specified Skilled Workers mainly in nursing care, as well as in building cleaning, food service, and manufacturing.",
          my: "介護 ကို အဓိကထားပြီး၊ အဆောက်အဦ သန့်ရှင်းရေး (ビルクリーニング)၊ စားသောက်ဆိုင်လုပ်ငန်း (外食)၊ ထုတ်လုပ်ရေးလုပ်ငန်း (製造業) တို့မှာလည်း ကူညီပေးပါတယ်။",
        },
      },
      {
        id: "faq-3",
        question: {
          ja: "ミャンマー人材の受入れは可能ですか？",
          en: "Can we hire Myanmar workers?",
          my: "မြန်မာလုပ်သားတွေ ခေါ်ယူလို့ ရလား။",
        },
        answer: {
          ja: "はい、可能です。ミャンマー語での支援に対応しており、来日前のガイダンスから来日後の生活支援まで、ミャンマー語でサポートします。",
          en: "Yes. We provide support in the Myanmar language, from pre-arrival guidance to living support after arrival.",
          my: "ရပါတယ်။ မြန်မာဘာသာနဲ့ ကူညီပေးပါတယ်။",
        },
      },
      {
        id: "faq-4",
        question: {
          ja: "支援委託費の目安は？",
          en: "What is the typical fee for outsourcing support?",
          my: "ထောက်ပံ့မှု လွှဲအပ်ခ ဘယ်လောက်ကျလဲ။",
        },
        answer: {
          ja: "対象の人数や支援内容により異なります。個別にお見積りしますので、お気軽にお問い合わせください。",
          en: "It depends on the number of workers and the scope of support. We provide an individual quote, so please feel free to contact us.",
          my: "လုပ်သားဦးရေနဲ့ ထောက်ပံ့မှုပေါ် မူတည်ပြီး တစ်ဦးချင်း ဈေးနှုန်း ထုတ်ပေးပါတယ်။",
        },
      },
      {
        id: "faq-5",
        question: {
          ja: "自社で支援する場合と、委託する場合の違いは？",
          en: "What is the difference between supporting in-house and outsourcing?",
          my: "ကိုယ်တိုင် ထောက်ပံ့တာနဲ့ လွှဲအပ်တာ ဘာကွာလဲ။",
        },
        answer: {
          ja: "自社で支援を行うには、支援責任者・担当者の選任や、外国人が理解できる言語での対応など、一定の基準を満たす必要があります。委託する場合は、これらの支援を登録支援機関が担います。",
          en: "To provide support in-house, a company must meet certain standards, such as appointing support staff and communicating in a language the worker understands. When you outsource, a Registered Support Organization handles these duties.",
          my: "လွှဲအပ်ရင် ထောက်ပံ့မှုအားလုံးကို 登録支援機関 က တာဝန်ယူပါတယ်။",
        },
      },
    ] as FaqItem[],
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
      en: "Room 205, Flores Motomachi, 1-11-21 Motomachi, Kiyose-shi, Tokyo, Japan",
      my: "တိုကျိုမြို့၊ ခီယိုဆဲမြို့၊ မိုတိုမာချီ ၁-၁၁-၂၁၊ ဖလိုရက်စ် မိုတိုမာချီ အခန်း ၂၀၅",
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
        label: { ja: "お名前", en: "Full Name", my: "အမည်" },
        placeholder: { ja: "お名前を入力してください", en: "Enter your full name", my: "အမည် အပြည့်အစုံ ရိုက်ထည့်ပါ" }
      },
      email: {
        label: { ja: "メールアドレス", en: "Email Address", my: "အီးမေးလ်" },
        placeholder: { ja: "メールアドレスを入力してください", en: "Enter your email address", my: "အီးမေးလ်လိပ်စာ ရိုက်ထည့်ပါ" }
      },
      phone: {
        label: { ja: "電話番号", en: "Phone Number", my: "ဖုန်းနံပါတ်" },
        placeholder: { ja: "電話番号を入力してください", en: "Enter your phone number", my: "ဖုန်းနံပါတ် ရိုက်ထည့်ပါ" }
      },
      message: {
        label: { ja: "お問い合わせ内容", en: "Inquiry Details", my: "မေးမြန်းလိုသော အကြောင်းအရာ" },
        placeholder: { ja: "ご相談・お問い合わせ内容をご記入ください", en: "Enter your consultation or inquiry details", my: "ဆွေးနွေးမေးမြန်းလိုသည့် အကြောင်းအရာများကို ရေးသားပါ" }
      },
      submit: { ja: "送信する", en: "Send Message", my: "ပေးပို့မည်" },
      sending: { ja: "送信中...", en: "Sending...", my: "ပေးပို့နေပါသည်..." },
      success: {
        ja: "お問い合わせありがとうございます。送信が完了しました。",
        en: "Thank you for contacting us. Your message has been sent successfully.",
        my: "မေးမြန်းစုံစမ်းမှုအတွက် ကျေးဇူးတင်ရှိပါသည်။ မကြာမီ ပြန်လည်ဆက်သွယ်ပေးပါမည်။",
      },
      error: {
        ja: "送信に失敗しました。時間をおいてもう一度お試しください。",
        en: "Failed to send message. Please try again later.",
        my: "ပေးပို့မှု မအောင်မြင်ပါ။ ခေတ္တစောင့်ဆိုင်းပြီး နောက်တစ်ကြိမ် ထပ်မံကြိုးစားပေးပါ။",
      },
      captchaError: {
        ja: "セキュリティ認証（Turnstile）を完了してください。",
        en: "Please complete the security check (Turnstile).",
        my: "ကျေးဇူးပြု၍ လုံခြုံရေးအတည်ပြုချက် (Turnstile) ကို လုပ်ဆောင်ပေးပါ။",
      },
      requiredError: {
        ja: "必須項目をすべて入力してください。",
        en: "Please fill in all required fields.",
        my: "လိုအပ်သော အချက်အလက်များ အားလုံး ဖြည့်သွင်းပေးပါ။",
      },
      nameError: {
        ja: "お名前を2文字以上で入力してください。",
        en: "Please enter a valid name (at least 2 characters).",
        my: "ကျေးဇူးပြု၍ အမည်ကို အနည်းဆုံး ၂ လုံးနှင့်အထက် မှန်ကန်စွာ ဖြည့်သွင်းပေးပါ။",
      },
      emailError: {
        ja: "有効なメールアドレスを入力してください。",
        en: "Please enter a valid email address.",
        my: "မှန်ကန်သော အီးမေးလ်လိပ်စာ ရိုက်ထည့်ပေးပါ။",
      },
      phoneError: {
        ja: "有効な電話番号を入力してください（8桁以上）。",
        en: "Please enter a valid phone number (at least 8 digits).",
        my: "မှန်ကန်သော ဖုန်းနံပါတ် ရိုက်ထည့်ပေးပါ (အနည်းဆုံး ၈ လုံး)။",
      },
      messageError: {
        ja: "お問い合わせ内容を10文字以上で入力してください。",
        en: "Please enter your inquiry details (at least 10 characters).",
        my: "ကျေးဇူးပြု၍ မေးမြန်းလိုသော အကြောင်းအရာကို အနည်းဆုံး စာလုံးရေ ၁၀ လုံးနှင့်အထက် ရေးသားပေးပါ။",
      },
    },
  },


  jobs: [
    { id: "1", image: "/images/jobs/job-2025-11fudo.jpg", alt: "求人票 (食品加工・お弁当惣菜製造)" },
    { id: "2", image: "/images/jobs/job-yamaguchi.jpg", alt: "求人票 (山口・機械加工・工場製造)" },
  ] as JobFlyer[],

  networkToast: {
    offline: {
      ja: "オフラインモードです（保存されたキャッシュを表示中）",
      en: "Offline Mode — Browsing cached content",
      my: "အင်တာနက် ချိတ်ဆက်မှု မရှိပါ (Offline စနစ်ဖြင့် ကြည့်ရှုနေပါသည်)",
    },
    online: {
      ja: "オンラインに復帰しました",
      en: "Online connection restored",
      my: "အင်တာနက် ပြန်လည်ချိတ်ဆက်မိပါပြီ",
    },
  },

  notFound: {
    badge: {
      ja: "404 エラー",
      en: "404 Error",
      my: "၄၀၄ ချို့ယွင်းချက်",
    },
    title: {
      ja: "お探しのページが見つかりませんでした",
      en: "Page Not Found",
      my: "ရှာဖွေနေသော စာမျက်နှာ မတွေ့ရှိပါ",
    },
    description: {
      ja: "アクセスしようとしたページは削除されたか、URLが変更されたか、一時的に利用できない可能性があります。",
      en: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
      my: "သင်ဝင်ရောက်လိုသော စာမျက်နှာသည် ပယ်ဖျက်ခံရခြင်း၊ လိပ်စာပြောင်းလဲခြင်း သို့မဟုတ် ယာယီအသုံးပြု၍မရခြင်း ဖြစ်နိုင်ပါသည်။",
    },
    backHome: {
      ja: "トップページへ戻る",
      en: "Back to Home",
      my: "ပင်မစာမျက်နှာသို့ ပြန်သွားရန်",
    },
    contactUs: {
      ja: "お問い合わせはこちら",
      en: "Contact Us",
      my: "ဆက်သွယ်မေးမြန်းရန်",
    },
    phoneLabel: {
      ja: "お電話でのご相談・お問い合わせ",
      en: "Telephone Inquiry & Support",
      my: "ဖုန်းဖြင့် ဆက်သွယ်ဆွေးနွေးရန်",
    },
    supportHours: {
      ja: "平日 9:00〜18:00（土日祝日を除く）",
      en: "Weekdays 9:00 - 18:00 (Excl. Weekends & Holidays)",
      my: "တနင်္လာ မှ သောကြာ (၉:၀၀ မှ ၁၈:၀၀ ထိ)",
    },
  },

  footer: {
    copyright: "Copyright © 2025 DOUITSU LLC. All rights reserved.",
  },

  licensePage: {
    eyebrow: {
      ja: "外免切替サポート",
      en: "DRIVING LICENSE CONVERSION",
      my: "外免切替 အကူအညီ",
    },
    metaTitle: {
      ja: "ミャンマーの運転免許を日本の免許に切り替え｜外免切替サポート｜DOUITSU合同会社（東京・清瀬）",
      en: "Convert Myanmar Driver's License to Japanese License (Gaimen Kirikae) Support | DOUITSU LLC",
      my: "မြန်မာမော်တော်ယာဉ်မောင်းလိုင်စင်ကို ဂျပန်လိုင်စင်သို့ ပြောင်းလဲရန် (外免切替) အကူအညီ｜DOUITSU合同会社",
    },
    metaDescription: {
      ja: "ミャンマーの運転免許証を日本の免許に切り替える「外免切替」を、日本語・ミャンマー語でサポート。書類の準備から手続きの流れまで、東京都清瀬市のDOUITSU合同会社にご相談ください。",
      en: "Support for converting Myanmar driver's licenses to Japanese licenses (Gaimen Kirikae) in Japanese and Myanmar. From document preparation to procedures and driving test practice, consult DOUITSU LLC in Kiyose, Tokyo.",
      my: "ဂျပန်မှာ နေထိုင်တဲ့ မြန်မာများအတွက် မြန်မာလိုင်စင်ကို ဂျပန်လိုင်စင်သို့ ပြောင်းလဲခြင်း (外免切替) ကို ဂျပန်ဘာသာ၊ မြန်မာဘာသာနဲ့ ကူညီပေးပါတယ်။ အမောင်းလေ့ကျင့်ပေးခြင်းကိုလဲယဥ်မောင်းကွင်းတွင်စနစ်တကျလေ့ကျင့်ပေးသည်။စာရွက်စာတမ်း ပြင်ဆင်ခြင်းကနေ လုပ်ငန်းစဉ်အထိ ကျွန်တော်တို့ကို တိုင်ပင်ပါ။",
    },
    h1: {
      ja: "ミャンマーの運転免許を日本の免許に切り替えたい方へ",
      en: "For Those Seeking to Convert a Myanmar Driver's License to a Japanese License",
      my: "မြန်မာလိုင်စင်ကို ဂျပန်လိုင်စင် ပြောင်းချင်သူများအတွက်",
    },
    h1Lead: {
      ja: "ミャンマー語で、書類の準備から手続きの流れまでサポートします。",
      en: "To drive in Japan, there is a procedure (Gaimen Kirikae) to convert your Myanmar driver's license to a Japanese license. Required documents and procedures can be complex, especially without Japanese proficiency. DOUITSU assists your preparation in both Japanese and Myanmar languages.",
      my: "ဂျပန်မှာ ကားမောင်းဖို့အတွက် မြန်မာလိုင်စင်ကို ဂျပန်လိုင်စင်သို့ ပြောင်းလဲရတဲ့ လုပ်ငန်းစဉ် (外免切替) ရှိပါတယ်။ လိုအပ်တဲ့ စာရွက်စာတမ်းတွေနဲ့ လုပ်ငန်းစဉ်က နားလည်ရခက်ပြီး၊ ဂျပန်စာ မကျွမ်းကျင်ရင် ပိုခက်ပါတယ်။ DOUITSU က ဂျပန်ဘာသာနဲ့ မြန်မာဘာသာ နှစ်မျိုးလုံးနဲ့ ပြင်ဆင်ရာမှာ ကူညီပေးပါတယ်။",
    },
    highlights: [
      {
        ja: "必要書類の確認と準備のお手伝い",
        en: "Assistance with checking and preparing required documents",
        my: "လိုအပ်တဲ့ စာရွက်စာတမ်း စစ်ဆေးခြင်းနဲ့ ပြင်ဆင်ရာမှာ ကူညီခြင်း",
      },
      {
        ja: "手続きの流れをミャンマー語でご説明",
        en: "Explaining the procedure workflow in Myanmar language",
        my: "လုပ်ငန်းစဉ်ကို မြန်မာဘာသာနဲ့ နားလည်လွယ်အောင် ရှင်းပြခြင်း",
      },
      {
        ja: "日本語・ミャンマー語・英語でご相談OK",
        en: "Consultations available in Japanese, Myanmar, and English",
        my: "ဂျပန်၊ မြန်မာ၊ အင်္ဂလိပ်ဘာသာနဲ့ တိုင်ပင်နိုင်ခြင်း",
      },
      {
        ja: "技能試験（実技）合格に向けた練習サポート",
        en: "Driving practice and training at the course to pass the test",
        my: "အမောင်းဖြေအောင်ဖို့အတွက်သင်ကြားပေးခြင်း",
      },
    ],
    concerns: {
      title: {
        ja: "このようなお悩みはありませんか？",
        en: "Are you worried about any of these?",
        my: "ဒီလို စိတ်ပူနေပါသလား?",
      },
      items: [
        {
          ja: "どんな書類が必要かわからない",
          en: "Don't know what documents are required?",
          my: "ဘာစာရွက်စာတမ်းတွေ လိုလဲ မသိဘူး?",
        },
        {
          ja: "手続きの流れがわからず、どこから始めればよいか不安",
          en: "Unsure about the procedure and where to start?",
          my: "လုပ်ငန်းစဉ်ကို မသိလို့ ဘယ်ကနေ စရမလဲ စိတ်ပူနေတယ်",
        },
        {
          ja: "日本語で書かれた説明や書類が読めない",
          en: "Difficult to read explanations or documents in Japanese?",
          my: "ဂျပန်လို ရေးထားတဲ့ ရှင်းလင်းချက်၊ စာရွက်စာတမ်းတွေကို မဖတ်တတ်ဘူး",
        },
        {
          ja: "運転免許試験場に一人で行くのが不安",
          en: "Worried about visiting the test center alone?",
          my: "စာမေးပွဲကျင်းပရာ နေရာကို တစ်ယောက်တည်း သွားဖို့ စိတ်ပူတယ်",
        },
        {
          ja: "実技試験に合格するための練習方法がわからない",
          en: "Wondering how to practice to pass the driving test?",
          my: "အမောင်းဖြေအောင်ဖို့အတွက်ဘယ်လိုလေ့ကျင့်ရမလဲ",
        },
      ],
    },
    services: {
      title: {
        ja: "DOUITSUのサポート内容",
        en: "What DOUITSU Can Help With",
        my: "ကူညီပေးနိုင်တာများ",
      },
      items: [
        {
          ja: "必要書類の確認と準備のお手伝い",
          en: "Checking and preparing required documents",
          my: "လိုအပ်တဲ့ စာရွက်စာတမ်း စစ်ဆေးခြင်းနဲ့ ပြင်ဆင်ရာမှာ ကူညီခြင်း",
        },
        {
          ja: "手続きの流れをミャンマー語で分かりやすくご説明",
          en: "Explaining the procedure workflow clearly in Myanmar language",
          my: "လုပ်ငန်းစဉ်ကို မြန်မာဘာသာနဲ့ နားလည်လွယ်အောင် ရှင်းပြခြင်း",
        },
        {
          ja: "日本語・ミャンマー語・英語の3言語で相談可能",
          en: "Trilingual consultation in Japanese, Myanmar, and English",
          my: "ဂျပန်၊ မြန်မာ၊ အင်္ဂလိပ်ဘာသာနဲ့ တိုင်ပင်နိုင်ခြင်း",
        },
        {
          ja: "技能試験（実技）合格に向けた丁寧な指導・練習",
          en: "Instruction and coaching to pass the practical driving exam",
          my: "အမောင်းဖြေအောင်ဖို့အတွက်သင်ကြားပေးခြင်း",
        },
      ],
    },
    process: {
      title: {
        ja: "お手続きの流れ",
        en: "Procedure Workflow",
        my: "လုပ်ငန်းစဉ်",
      },
      steps: [
        {
          number: 1,
          ja: "お電話またはメッセージでご相談",
          en: "Consult us via phone or message",
          my: "ဖုန်း (သို့) မက်ဆေ့ချ်နဲ့ တိုင်ပင်ပါ",
        },
        {
          number: 2,
          ja: "現在お持ちの免許証と在留資格の確認",
          en: "Check current license and residency status",
          my: "လက်ရှိ လိုင်စင်နဲ့ နေထိုင်ခွင့် အခြေအနေကို စစ်ဆေးပါ",
        },
        {
          number: 3,
          ja: "必要書類の準備・作成",
          en: "Prepare required documents",
          my: "လိုအပ်တဲ့ စာရွက်စာတမ်း ပြင်ဆင်ပါ",
        },
        {
          number: 4,
          ja: "運転免許試験場での申請・適性検査・技能試験",
          en: "Procedures and examinations at the Driver's License Center",
          my: "စာမေးပွဲကျင်းပရာ နေရာမှာ လုပ်ငန်းစဉ်နဲ့ စစ်ဆေးမှု",
        },
        {
          number: 5,
          ja: "日本の運転免許証を取得",
          en: "Obtain your Japanese driver's license",
          my: "ဂျပန်မော်တော်ယာဉ်မောင်းလိုင်စင် ရရှိပါ",
        },
      ],
    },
    faqs: {
      title: {
        ja: "よくあるご質問",
        en: "Frequently Asked Questions",
        my: "မေးလေ့ရှိတဲ့ မေးခွန်းများ",
      },
      items: [
        {
          id: "license-faq-1",
          q: {
            ja: "ミャンマーの運転免許証があれば、日本ですぐに運転できますか？",
            en: "Can I drive directly in Japan with my Myanmar driver's license?",
            my: "မြန်မာလိုင်စင်ရှိရင် ဂျပန်မှာ ဒီအတိုင်း ကားမောင်းလို့ ရလား။",
          },
          a: {
            ja: "国や免許の種類により条件が異なりますが、ミャンマーの免許証のまま日本で運転することは原則できません。日本の運転免許証へ切り替える外免切替手続きが必要です。まずはお気軽にご相談ください。",
            en: "Conditions vary depending on the country and license category, but generally you cannot drive directly in Japan with only a Myanmar license. Converting to a Japanese license (Gaimen Kirikae) is required. Please consult us first.",
            my: "နိုင်ငံနဲ့ လိုင်စင်အမျိုးအစားပေါ် မူတည်ပြီး အခြေအနေ မတူပါဘူး။ ဂျပန်မှာ ကားမောင်းဖို့ ဂျပန်လိုင်စင်သို့ ပြောင်းလဲဖို့ လိုတာက များပါတယ်။ ပထမဆုံး တိုင်ပင်ပါ။",
          },
        },
        {
          id: "license-faq-2",
          q: {
            ja: "外免切替に試験はありますか？",
            en: "Are there examinations during the conversion process?",
            my: "ပြောင်းလဲရာမှာ စာမေးပွဲ ရှိလား။",
          },
          a: {
            ja: "外免切替では、交通規則の知識確認（学科確認）と運転技能の確認（実技試験）が行われます。試験内容や審査基準は最新の法令に基づき詳しくご案内いたします。",
            en: "Gaimen Kirikae typically includes a traffic knowledge check and a practical driving test. Requirements can change, so we explain based on the latest official information.",
            my: "外免切替 မှာ ယာဉ်စည်းမျဉ်း အသိပညာ စစ်ဆေးမှုနဲ့ ကားမောင်းနိုင်စွမ်း စစ်ဆေးမှု ပါလေ့ရှိပါတယ်။ အကြောင်းအရာနဲ့ စံနှုန်းတွေက ပြောင်းလဲနိုင်လို့ နောက်ဆုံးအချက်အလက်အတိုင်း ရှင်းပြပေးပါမယ်။",
          },
        },
        {
          id: "license-faq-3",
          q: {
            ja: "何から始めればいいですか？",
            en: "Where should I start?",
            my: "ဘာကနေ စရမလဲ။",
          },
          a: {
            ja: "まずはお電話またはメッセージでお気軽にご相談ください。現在お持ちの免許証と在留状況を確認した上で、必要な書類と手続きの流れをご案内します。",
            en: "First, consult with us via phone or message. We will review your current license and status of residence, and explain the necessary documents and workflow.",
            my: "ဖုန်း (သို့) မက်ဆေ့ချ်နဲ့ အရင် တိုင်ပင်ပါ။ လက်ရှိ လိုင်စင်နဲ့ နေထိုင်ခွင့်ကို စစ်ဆေးပြီး လိုအပ်တဲ့ စာရွက်စာတမ်းနဲ့ လုပ်ငန်းစဉ်ကို ရှင်းပြပေးပါမယ်။",
          },
        },
        {
          id: "license-faq-4",
          q: {
            ja: "ミャンマー語で相談できますか？",
            en: "Can I consult in Myanmar language?",
            my: "မြန်မာဘာသာနဲ့ တိုင်ပင်လို့ ရလား။",
          },
          a: {
            ja: "はい、可能です。日本語・ミャンマー語・英語の3言語すべてで対応しておりますので、母国語で安心してご連絡ください。",
            en: "Yes, absolutely. We support all three languages: Japanese, Myanmar, and English.",
            my: "ရပါတယ်။ ဂျပန်၊ မြန်မာ၊ အင်္ဂလိပ်ဘာသာ သုံးမျိုးလုံးနဲ့ ဆက်သွယ်နိုင်ပါတယ်။",
          },
        },
      ],
    },
    contact: {
      title: {
        ja: "お問い合わせ",
        en: "Contact Us",
        my: "ဆက်သွယ်ရန်",
      },
      company: {
        ja: "DOUITSU合同会社（東京都清瀬市）",
        en: "DOUITSU LLC (Kiyose, Tokyo)",
        my: "DOUITSU合同会社",
      },
      phoneTel: "042-497-1537",
      mobileTel: "080-3476-8194",
    },
  },

  housingPage: {
    eyebrow: {
      ja: "お部屋探しサポート",
      en: "HOUSING SEARCH SUPPORT",
      my: "အိမ်ရှာပေးခြင်း ဝန်ဆောင်မှု",
    },
    metaTitle: {
      ja: "ミャンマーの方の賃貸物件紹介｜外国人のお部屋探しをサポート｜DOUITSU合同会社（東京・清瀬）",
      en: "Rental Housing Introductions for Myanmar Residents | Foreigner Apartment Search Support | DOUITSU LLC",
      my: "ဂျပန်မှာ အိမ်ငှားရန် အိမ်ရှာပေးခြင်း｜မြန်မာများအတွက် ဘာသာစကားနှစ်မျိုးနဲ့ အကူအညီ｜DOUITSU合同会社",
    },
    metaDescription: {
      ja: "日本でお部屋を探すミャンマーの方へ。物件探しから契約、入居後の生活まで、日本語・ミャンマー語でサポートします。東京都清瀬市のDOUITSU合同会社。",
      en: "For Myanmar nationals looking for housing in Japan. We support apartment searches, lease contracts, and daily living after moving in, in Japanese and Myanmar. DOUITSU LLC in Kiyose, Tokyo.",
      my: "ဂျပန်မှာ အိမ်ရှာနေတဲ့ မြန်မာများအတွက် အိမ်ရှာခြင်း၊ စာချုပ်ချုပ်ခြင်းကနေ ဝင်ရောက်နေထိုင်ပြီးနောက် နေထိုင်မှုအထိ ဂျပန်၊ မြန်မာဘာသာနဲ့ ကူညီပေးပါတယ်။  DOUITSU合同会社။",
    },
    h1: {
      ja: "日本でのお部屋探しを、ミャンマー語でサポートします",
      en: "Assisting Apartment Searches in Japan in Myanmar Language",
      my: "ဂျပန်မှာ အိမ်ရှာတာကို မြန်မာလို ကူညီပေးပါတယ်",
    },
    h1Lead: {
      ja: "DOUITSU合同会社は、ミャンマー語が話せる担当者が、物件探しから入居までをサポートします。",
      en: "When renting an apartment in Japan, many foreign residents encounter challenges such as language barriers, complex lease rules, and guarantor (Hoshonin) requirements. At DOUITSU LLC, our Myanmar-speaking staff supports you from housing search to moving in.",
      my: "ဂျပန်မှာ အိမ်ငှားတဲ့အခါ ဘာသာစကားအတားအဆီး၊ စာချုပ်စည်းမျဉ်းတွေ၊ အာမခံသူ (保証人) ပြဿနာတွေကြောင့် ခက်ခဲနေတဲ့ နိုင်ငံခြားသားတွေ အများကြီး ရှိပါတယ်။ DOUITSU合同会社 မှာ မြန်မာစကားပြောတတ်တဲ့ တာဝန်ခံက အိမ်ရှာခြင်းကနေ ဝင်ရောက်နေထိုင်တဲ့အထိ ကူညီပေးပါတယ်။",
    },
    highlights: [
      {
        ja: "外国人入居可の物件をご紹介",
        en: "Introducing apartments that welcome foreign residents",
        my: "နိုင်ငံခြားသား ဝင်ခွင့်ပြုတဲ့ အိမ်များ မိတ်ဆက်ပေးခြင်း",
      },
      {
        ja: "契約内容をミャンマー語でご説明",
        en: "Explaining lease contract terms in Myanmar language",
        my: "စာချုပ်အကြောင်းအရာကို မြန်မာဘာသာနဲ့ ရှင်းပြခြင်း",
      },
      {
        ja: "保証人がいない場合もご相談ください",
        en: "Consultations available even if you do not have a guarantor",
        my: "အာမခံသူ (保証人) မရှိဘူး (အာမခံသူမရှိလျှင်လည်း တိုင်ပင်နိုင်ပါသည်)",
      },
      {
        ja: "入居後の生活ルールをご案内",
        en: "Guidance on community rules and living etiquette after move-in",
        my: "ဝင်နေပြီးနောက် နေထိုင်မှု စည်းမျဉ်းများ ညွှန်ကြားခြင်း",
      },
    ],
    concerns: {
      title: {
        ja: "このようなお悩みはありませんか？",
        en: "Are you worried about any of these?",
        my: "ဒီလို စိတ်ပူနေပါသလား",
      },
      items: [
        {
          ja: "外国人を受け入れてくれる賃貸物件の探し方がわからない",
          en: "Don't know how to find apartments that rent to foreign residents?",
          my: "နိုင်ငံခြားသားကို ငှားတဲ့ အိမ်တွေ ဘယ်လိုရှာရမလဲ မသိဘူး",
        },
        {
          ja: "日本語で書かれた契約書が読めず、内容がよく理解できない",
          en: "Cannot read the Japanese contract or understand the terms?",
          my: "ဂျပန်လို ရေးထားတဲ့ စာချုပ်ကို မဖတ်တတ်ဘူး၊ အကြောင်းအရာကို နားမလည်ဘူး",
        },
        {
          ja: "日本に保証人になってくれる人がいない",
          en: "Do not have a guarantor (Hoshonin) in Japan?",
          my: "အာမခံသူ (保証人) မရှိဘူး",
        },
        {
          ja: "入居後のルール（ゴミ出しや騒音マナーなど）が心配",
          en: "Worried about rules after moving in (trash sorting, noise etiquette, etc.)?",
          my: "ဝင်နေပြီးနောက် စည်းမျဉ်းတွေ (အမှိုက်စည်းမျဉ်း၊ ဆူညံသံ စသည်) အတွက် စိတ်ပူတယ်",
        },
      ],
    },
    services: {
      title: {
        ja: "DOUITSUがサポートできること",
        en: "What DOUITSU Can Help With",
        my: "ကူညီပေးနိုင်တာများ",
      },
      items: [
        {
          ja: "ご希望条件（家賃・場所・広さ・入居人数など）の丁寧なヒアリング",
          en: "Listening to your preferences (rent, area, size, number of residents)",
          my: "လိုချင်တဲ့ အချက်တွေ (အိမ်လခ၊ နေရာ၊ အကျယ်အဝန်း၊ နေမယ့်လူအရေအတွက်) ကို မေးမြန်းခြင်း",
        },
        {
          ja: "外国人入居可能な安心できるお部屋のご紹介",
          en: "Introducing foreigner-friendly apartments you can trust",
          my: "နိုင်ငံခြားသား ဝင်ခွင့်ပြုတဲ့ အိမ်များ မိတ်ဆက်ပေးခြင်း",
        },
        {
          ja: "契約内容をミャンマー語で分かりやすくご説明",
          en: "Explaining contract details clearly in Myanmar language",
          my: "စာချုပ်အကြောင်းအရာကို မြန်မာဘာသာနဲ့ ရှင်းပြခြင်း",
        },
        {
          ja: "入居後の生活ルールやマナーのご案内",
          en: "Guiding you on post-move-in living rules and manners",
          my: "ဝင်နေပြီးနောက် နေထိုင်မှု စည်းမျဉ်းများ ညွှန်ကြားခြင်း",
        },
      ],
    },
    process: {
      title: {
        ja: "お手続きの流れ",
        en: "Procedure Workflow",
        my: "လုပ်ငန်းစဉ်",
      },
      steps: [
        {
          number: 1,
          ja: "お電話またはメッセージでご相談",
          en: "Consult us via phone or message",
          my: "ဖုန်း (သို့) မက်ဆေ့ချ်နဲ့ တိုင်ပင်ပါ",
        },
        {
          number: 2,
          ja: "ご希望の条件をお聞かせください",
          en: "Tell us your housing requirements and preferences",
          my: "လိုချင်တဲ့ အချက်တွေ ပြောပြပါ",
        },
        {
          number: 3,
          ja: "お部屋のご紹介・内見",
          en: "Apartment introductions and viewings",
          my: "အိမ်များ မိတ်ဆက်ခြင်းနဲ့ အိမ်သွားကြည့်ခြင်း",
        },
        {
          number: 4,
          ja: "お申し込み・入居審査",
          en: "Application submission and tenant screening",
          my: "လျှောက်ထားခြင်းနဲ့ ဝင်ခွင့်စစ်ဆေးမှု",
        },
        {
          number: 5,
          ja: "ご契約手続き",
          en: "Lease contract signing and important explanation",
          my: "စာချုပ်ချုပ်ဆိုခြင်း",
        },
        {
          number: 6,
          ja: "鍵のお渡し・ご入居",
          en: "Key handover and moving into your new home",
          my: "ဝင်ရောက်နေထိုင်ခြင်း",
        },
      ],
    },
    faqs: {
      title: {
        ja: "よくあるご質問",
        en: "Frequently Asked Questions",
        my: "မေးလေ့ရှိတဲ့ မေးခွန်းများ",
      },
      items: [
        {
          id: "housing-faq-1",
          q: {
            ja: "外国人でもお部屋を借りられますか？",
            en: "Can foreign residents rent apartments in Japan?",
            my: "နိုင်ငံခြားသားလည်း အိမ်ငှားလို့ ရလား။",
          },
          a: {
            ja: "はい、外国人入居可能な物件が多数ございます。ご希望条件をお聞きした上で、借りやすいお部屋をご紹介します。",
            en: "Yes, there are many apartments that accept foreign tenants. After listening to your requirements, we will introduce suitable options.",
            my: "နိုင်ငံခြားသား ဝင်ခွင့်ပြုတဲ့ အိမ်တွေ ရှိပါတယ်။ လိုချင်တဲ့ အချက်တွေ ကြားပြီး ငှားရလွယ်တဲ့ အိမ်တွေကို မိတ်ဆက်ပေးပါမယ်။",
          },
        },
        {
          id: "housing-faq-2",
          q: {
            ja: "保証人がいなくても大丈夫ですか？",
            en: "Can I rent an apartment without a guarantor?",
            my: "အာမခံသူ မရှိလည်း ရလား။",
          },
          a: {
            ja: "はい、連帯保証人の代わりに家賃保証会社を利用できる物件も多数ございます。お客様の状況に合わせてご相談いただけます。",
            en: "Many apartments allow using a guarantor company instead of an individual guarantor. Please consult with us according to your situation.",
            my: "အာမခံသူအစား အာမခံကုမ္ပဏီ (保証会社) ကို သုံးလို့ရတဲ့ အိမ်တွေလည်း ရှိပါတယ်။ အခြေအနေအလိုက် တိုင်ပင်ပါ။",
          },
        },
        {
          id: "housing-faq-3",
          q: {
            ja: "初期費用はどのくらいかかりますか？",
            en: "Approximately how much are the initial move-in costs?",
            my: "ကနဦးကုန်ကျစရိတ်က ဘယ်လောက်လောက် ကျလဲ။",
          },
          a: {
            ja: "一般的には敷金、礼金、仲介手数料、前家賃などがかかります。物件によって異なりますので、ご紹介時に詳しくご説明します。",
            en: "Generally, initial costs include deposit, key money, agency fee, and advance rent. This varies by property, and we explain details upon introduction.",
            my: "ယေဘုယျအားဖြင့် စီစဉ်ငွေ (敷金)၊ ကျေးဇူးတင်ငွေ (礼金)၊ ကြားဝင်ကော်မရှင် (仲介手数料)၊ ကြိုတင်အိမ်လခ စတာတွေ ကျပါတယ်။ အိမ်အလိုက် ကွာပါတယ်။ မိတ်ဆက်တဲ့အခါ အသေးစိတ် ရှင်းပြပေးပါမယ်။",
          },
        },
        {
          id: "housing-faq-4",
          q: {
            ja: "ミャンマー語で相談できますか？",
            en: "Can I consult in Myanmar language?",
            my: "မြန်မာဘာသာနဲ့ တိုင်ပင်လို့ ရလား။",
          },
          a: {
            ja: "はい、可能です。日本語・ミャンマー語・英語の3言語すべてで対応しておりますので、母国語で安心してご連絡ください。",
            en: "Yes, you can. We support Japanese, Myanmar, and English.",
            my: "ရပါတယ်။ ဂျပန်၊ မြန်မာ၊ အင်္ဂလိပ်ဘာသာ သုံးမျိုးလုံးနဲ့ ဆက်သွယ်နိုင်ပါတယ်။",
          },
        },
      ],
    },
    contact: {
      title: {
        ja: "お問い合わせ",
        en: "Contact Us",
        my: "ဆက်သွယ်ရန်",
      },
      company: {
        ja: "DOUITSU合同会社（東京都清瀬市）",
        en: "DOUITSU LLC (Kiyose, Tokyo)",
        my: "DOUITSU合同会社",
      },
      phoneTel: "042-497-1537",
      mobileTel: "080-3476-8194",
    },
  },
};
