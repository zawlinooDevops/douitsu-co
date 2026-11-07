import { siteData } from '../data/content';

/**
 * Builds the canonical Schema.org Organization / LocalBusiness entity.
 * Uses exact verified facts from content-integrity-rules.md and siteData.
 */
function buildOrganizationEntity(baseUrl: string) {
  return {
    '@type': ['LocalBusiness', 'Organization'],
    '@id': `${baseUrl}/#organization`,
    name: siteData.meta.companyName,
    alternateName: [siteData.meta.companyNameEn, 'Douitsu Goudou Kaisha'],
    legalName: siteData.meta.companyName,
    url: `${baseUrl}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${baseUrl}/#logo`,
      url: `${baseUrl}/images/landing/logo.png`,
      caption: siteData.meta.companyName,
    },
    image: `${baseUrl}/images/landing/banner.jpg`,
    description: siteData.meta.description.ja,
    telephone: '+81-42-497-1537',
    email: siteData.meta.email,
    identifier: siteData.meta.registrationNo,
    priceRange: '¥¥',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '元町1-11-21 フローレス元町205号',
      addressLocality: '清瀬市',
      addressRegion: '東京都',
      postalCode: '204-0021',
      addressCountry: 'JP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.7876,
      longitude: 139.5298,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    knowsLanguage: ['ja', 'en', 'my'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+81-42-497-1537',
        contactType: 'customer service',
        areaServed: 'JP',
        availableLanguage: ['Japanese', 'Myanmar', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+81-80-2213-8194',
        contactType: 'multilingual consultation',
        areaServed: 'JP',
        availableLanguage: ['Japanese', 'Myanmar', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+81-80-3476-8194',
        contactType: 'community support hotline',
        areaServed: 'JP',
        availableLanguage: ['Japanese', 'Myanmar', 'English'],
      },
    ],
  };
}

/**
 * Builds the canonical Schema.org WebSite entity.
 */
function buildWebSiteEntity(baseUrl: string) {
  return {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: `${baseUrl}/`,
    name: siteData.meta.companyName,
    alternateName: siteData.meta.companyNameEn,
    description: siteData.meta.description.ja,
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: ['ja', 'en', 'my'],
  };
}

/**
 * Generates the rich @graph JSON-LD structure for the Homepage (/).
 * Includes: Organization, WebSite, WebPage, Touroku Shien Kikan Service, and FAQPage.
 */
export function getHomepageSchema() {
  const baseUrl = siteData.meta.siteUrl;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationEntity(baseUrl),
      buildWebSiteEntity(baseUrl),
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/#webpage`,
        url: `${baseUrl}/`,
        name: siteData.meta.title.ja,
        description: siteData.meta.description.ja,
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        about: {
          '@id': `${baseUrl}/#organization`,
        },
        inLanguage: 'ja',
      },
      {
        '@type': 'Service',
        '@id': `${baseUrl}/#service-ssw`,
        name: '特定技能外国人 登録支援機関 支援サービス (10 Statutory Support Duties)',
        serviceType: '出入国在留管理庁 登録支援機関 (25登－012206)',
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Japan',
        },
        description: siteData.meta.description.ja,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '法定支援10項目 (10 Statutory Support Duties)',
          itemListElement: siteData.about.pillars.map((pillar) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: pillar.title.ja,
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/#faq`,
        isPartOf: {
          '@id': `${baseUrl}/#webpage`,
        },
        mainEntity: siteData.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question.ja,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer.ja,
          },
        })),
      },
    ],
  };
}

/**
 * Generates the rich @graph JSON-LD structure for the License Subpage (/license/).
 * Includes: WebPage, BreadcrumbList, Gaimen Kirikae Service, and FAQPage.
 */
export function getLicensePageSchema() {
  const baseUrl = siteData.meta.siteUrl;
  const pageUrl = `${baseUrl}/license/`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationEntity(baseUrl),
      buildWebSiteEntity(baseUrl),
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: siteData.licensePage.metaTitle.ja,
        description: siteData.licensePage.metaDescription.ja,
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        breadcrumb: {
          '@id': `${pageUrl}#breadcrumb`,
        },
        about: {
          '@id': `${pageUrl}#service`,
        },
        inLanguage: 'ja',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'ホーム',
            item: `${baseUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '外免切替サポート',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'ミャンマーの運転免許を日本の免許に切り替え（外免切替サポート）',
        serviceType: '運転免許切り替え・書類作成支援・技能試験対策',
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Japan',
        },
        description: siteData.licensePage.metaDescription.ja,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        isPartOf: {
          '@id': `${pageUrl}#webpage`,
        },
        mainEntity: siteData.licensePage.faqs.items.map((item) => ({
          '@type': 'Question',
          name: item.q.ja,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a.ja,
          },
        })),
      },
    ],
  };
}

/**
 * Generates the rich @graph JSON-LD structure for the Housing Subpage (/housing/).
 * Includes: WebPage, BreadcrumbList, Housing Introduction Service, and FAQPage.
 */
export function getHousingPageSchema() {
  const baseUrl = siteData.meta.siteUrl;
  const pageUrl = `${baseUrl}/housing/`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationEntity(baseUrl),
      buildWebSiteEntity(baseUrl),
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: siteData.housingPage.metaTitle.ja,
        description: siteData.housingPage.metaDescription.ja,
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        breadcrumb: {
          '@id': `${pageUrl}#breadcrumb`,
        },
        about: {
          '@id': `${pageUrl}#service`,
        },
        inLanguage: 'ja',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'ホーム',
            item: `${baseUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '外国人向け賃貸物件紹介',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: '外国人向け賃貸物件紹介・住まい探しサポート',
        serviceType: '外国人賃貸物件紹介・契約説明・入居生活支援',
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Japan',
        },
        description: siteData.housingPage.metaDescription.ja,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        isPartOf: {
          '@id': `${pageUrl}#webpage`,
        },
        mainEntity: siteData.housingPage.faqs.items.map((item) => ({
          '@type': 'Question',
          name: item.q.ja,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a.ja,
          },
        })),
      },
    ],
  };
}
