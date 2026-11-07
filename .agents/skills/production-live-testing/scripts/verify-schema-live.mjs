#!/usr/bin/env node
/**
 * DOUITSU LLC — Live Production Schema.org JSON-LD Structured Data Auditor
 *
 * Verifies live production pages for valid, compliant Schema.org structured data:
 * - JSON-LD syntax and valid parsing
 * - Schema.org @context ("https://schema.org")
 * - Organization / LocalBusiness completeness (name, phone, address, geo, registration)
 * - Optional rich entities (WebSite, WebPage, Service, FAQPage, BreadcrumbList)
 */

const TARGET_HOST = process.env.TARGET_HOST || 'https://douitsu-co.com';
const IS_MARKDOWN = process.argv.includes('--markdown');

// ANSI Color Tokens
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

const AUDIT_PAGES = [
  { name: 'Homepage', path: '/' },
  { name: 'License Support Page', path: '/license/' },
  { name: 'Housing Support Page', path: '/housing/' }
];

async function fetchPage(url) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DouitsuSchemaAuditor/1.0',
      'Accept': 'text/html,application/xhtml+xml'
    }
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

function validateEntity(entity, pagePath, errors) {
  const rawType = entity['@type'];
  const types = Array.isArray(rawType) ? rawType : [rawType];

  if (!rawType || types.length === 0 || !types[0]) {
    errors.push(`[${pagePath}] Entity missing required @type`);
    return types;
  }

  // 1. Organization / LocalBusiness validation
  if (types.includes('LocalBusiness') || types.includes('Organization')) {
    if (!entity.name || typeof entity.name !== 'string') {
      errors.push(`[${pagePath}] LocalBusiness missing "name"`);
    } else if (!entity.name.includes('DOUITSU')) {
      errors.push(`[${pagePath}] LocalBusiness name does not contain "DOUITSU": "${entity.name}"`);
    }

    if (!entity.telephone || typeof entity.telephone !== 'string') {
      errors.push(`[${pagePath}] LocalBusiness missing "telephone"`);
    } else if (!entity.telephone.includes('497-1537')) {
      errors.push(`[${pagePath}] Unexpected phone number: "${entity.telephone}" (expected 042-497-1537)`);
    }

    if (!entity.address || entity.address['@type'] !== 'PostalAddress') {
      errors.push(`[${pagePath}] LocalBusiness missing PostalAddress`);
    } else {
      const addr = entity.address;
      if (!addr.streetAddress || !addr.addressLocality || !addr.addressCountry) {
        errors.push(`[${pagePath}] PostalAddress missing required address components`);
      }
      if (addr.postalCode && !addr.postalCode.includes('204-0021')) {
        errors.push(`[${pagePath}] PostalAddress postalCode mismatch: "${addr.postalCode}"`);
      }
    }

    if (entity.geo && entity.geo['@type'] === 'GeoCoordinates') {
      if (typeof entity.geo.latitude !== 'number' || typeof entity.geo.longitude !== 'number') {
        errors.push(`[${pagePath}] GeoCoordinates contains invalid coordinate values`);
      }
    }

    if (entity.identifier && !entity.identifier.includes('012206')) {
      errors.push(`[${pagePath}] Registration identifier mismatch: "${entity.identifier}"`);
    }
  }

  // 2. WebSite entity validation
  if (types.includes('WebSite')) {
    if (!entity.name) errors.push(`[${pagePath}] WebSite missing "name"`);
    if (!entity.url) errors.push(`[${pagePath}] WebSite missing "url"`);
  }

  // 3. WebPage entity validation
  if (types.includes('WebPage')) {
    if (!entity.name) errors.push(`[${pagePath}] WebPage missing "name"`);
    if (!entity.url) errors.push(`[${pagePath}] WebPage missing "url"`);
  }

  // 4. Service entity validation
  if (types.includes('Service')) {
    if (!entity.name) errors.push(`[${pagePath}] Service missing "name"`);
    if (!entity.provider && !entity.serviceType) {
      errors.push(`[${pagePath}] Service missing "provider" or "serviceType"`);
    }
  }

  // 5. FAQPage entity validation
  if (types.includes('FAQPage')) {
    if (!Array.isArray(entity.mainEntity) || entity.mainEntity.length === 0) {
      errors.push(`[${pagePath}] FAQPage missing non-empty "mainEntity" question list`);
    } else {
      for (const [idx, q] of entity.mainEntity.entries()) {
        if (q['@type'] !== 'Question' || !q.name) {
          errors.push(`[${pagePath}] FAQPage question #${idx + 1} missing valid Question`);
        }
        if (!q.acceptedAnswer || q.acceptedAnswer['@type'] !== 'Answer' || !q.acceptedAnswer.text) {
          errors.push(`[${pagePath}] FAQPage question #${idx + 1} missing valid Answer`);
        }
      }
    }
  }

  // 6. BreadcrumbList entity validation
  if (types.includes('BreadcrumbList')) {
    if (!Array.isArray(entity.itemListElement) || entity.itemListElement.length === 0) {
      errors.push(`[${pagePath}] BreadcrumbList missing "itemListElement" array`);
    } else {
      for (const [idx, item] of entity.itemListElement.entries()) {
        if (item['@type'] !== 'ListItem' || typeof item.position !== 'number' || !item.name) {
          errors.push(`[${pagePath}] BreadcrumbList item #${idx + 1} malformed`);
        }
      }
    }
  }

  return types;
}

async function run() {
  console.log(`\n${BOLD}${CYAN}======================================================${RESET}`);
  console.log(`${BOLD}${CYAN}🏷️  DOUITSU LLC — Live Schema.org Structured Data Audit${RESET}`);
  console.log(`${BOLD}${CYAN}Target Host: ${TARGET_HOST}${RESET}`);
  console.log(`${BOLD}${CYAN}======================================================${RESET}\n`);

  const results = [];
  const errors = [];
  let totalSchemasFound = 0;
  let totalEntitiesChecked = 0;

  for (const page of AUDIT_PAGES) {
    const fullUrl = `${TARGET_HOST}${page.path}`;
    try {
      const html = await fetchPage(fullUrl);
      const jsonLdRegex = /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
      const matches = [...html.matchAll(jsonLdRegex)];

      if (matches.length === 0) {
        errors.push(`[${page.path}] No <script type="application/ld+json"> tag found`);
        results.push({ page: page.name, path: page.path, status: 'Missing', count: 0, types: [] });
        continue;
      }

      const entityTypes = [];

      for (const match of matches) {
        totalSchemasFound++;
        const rawJson = match[1].trim();

        let parsed;
        try {
          parsed = JSON.parse(rawJson);
        } catch (err) {
          errors.push(`[${page.path}] JSON parsing error: ${err.message}`);
          continue;
        }

        if (parsed['@context'] !== 'https://schema.org' && parsed['@context'] !== 'http://schema.org') {
          errors.push(`[${page.path}] Invalid @context: "${parsed['@context']}"`);
        }

        const entities = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
        for (const ent of entities) {
          totalEntitiesChecked++;
          const t = validateEntity(ent, page.path, errors);
          entityTypes.push(...t);
        }
      }

      results.push({
        page: page.name,
        path: page.path,
        status: 'Valid',
        count: matches.length,
        types: [...new Set(entityTypes)]
      });

    } catch (err) {
      errors.push(`[${page.path}] Failed to fetch: ${err.message}`);
      results.push({ page: page.name, path: page.path, status: 'Failed', count: 0, types: [] });
    }
  }

  if (IS_MARKDOWN) {
    console.log('### 🏷️ Schema.org Structured Data Live Audit Summary\n');
    console.log('| Page | URL Path | Status | JSON-LD Blocks | Validated Entity Types |');
    console.log('|---|---|:---:|:---:|---|');
    for (const r of results) {
      const badge = r.status === 'Valid' ? '✅ **Valid**' : '❌ **Failed**';
      console.log(`| ${r.page} | \`${r.path}\` | ${badge} | ${r.count} | \`${r.types.join(', ') || 'None'}\` |`);
    }
    console.log('');
  } else {
    for (const r of results) {
      const icon = r.status === 'Valid' ? `${GREEN}✅ PASS${RESET}` : `${RED}❌ FAIL${RESET}`;
      console.log(`${icon} [${r.page}] (${r.path}) -> ${r.count} schema block(s) verified: ${CYAN}${r.types.join(', ')}${RESET}`);
    }
  }

  console.log(`\n------------------------------------------------------`);
  console.log(`📊 Total Pages Checked:    ${AUDIT_PAGES.length}`);
  console.log(`📦 JSON-LD Blocks Found:   ${totalSchemasFound}`);
  console.log(`🧩 Total Entities Checked: ${totalEntitiesChecked}`);
  console.log(`------------------------------------------------------\n`);

  if (errors.length > 0) {
    console.error(`${RED}${BOLD}❌ Schema audit failed with ${errors.length} issue(s):${RESET}`);
    for (const err of errors) {
      console.error(`  ${RED}• ${err}${RESET}`);
    }
    console.log('');
    process.exit(1);
  }

  console.log(`${GREEN}${BOLD}🎉 ALL PRODUCTION PAGES HAVE VALID SCHEMA.ORG STRUCTURED DATA!${RESET}\n`);
  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal error during schema verification:', err);
  process.exit(1);
});
