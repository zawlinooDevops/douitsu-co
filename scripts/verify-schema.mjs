#!/usr/bin/env node
/**
 * ==============================================================================
 * DOUITSU LLC — Schema.org JSON-LD Structured Data Validator
 * Validates:
 *   1. JSON-LD syntax and valid JSON parsing in all dist/*.html files
 *   2. Schema.org @context ("https://schema.org")
 *   3. Entity completeness (@type, @id, name, url, telephone, address, etc.)
 *   4. Specialized structures (FAQPage questions/answers, BreadcrumbList items,
 *      Organization/LocalBusiness metadata, Services, WebSite/WebPage)
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

// ANSI formatting
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

console.log(`${BOLD}${CYAN}-------------------------------------------------------${RESET}`);
console.log(`${BOLD}${CYAN}   DOUITSU LLC — Schema.org JSON-LD Validator         ${RESET}`);
console.log(`${BOLD}${CYAN}-------------------------------------------------------${RESET}`);

if (!fs.existsSync(distDir)) {
  console.error(`${RED}Error: dist/ directory not found. Please run 'npm run build' first.${RESET}`);
  process.exit(1);
}

function getAllHtmlFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllHtmlFiles(full, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = getAllHtmlFiles(distDir);
const errors = [];
let totalSchemasFound = 0;
let totalEntitiesChecked = 0;

function validateEntity(entity, relFile) {
  totalEntitiesChecked++;
  const rawType = entity['@type'];
  const types = Array.isArray(rawType) ? rawType : [rawType];

  if (!rawType || types.length === 0 || !types[0]) {
    errors.push({ file: relFile, reason: 'Entity missing required @type attribute', entity });
    return;
  }

  // Check top-level @id requirement
  const isSubEntity = types.includes('ListItem') || types.includes('Question') || types.includes('Answer') || types.includes('ContactPoint') || types.includes('Offer');
  if (!isSubEntity && !entity['@id']) {
    errors.push({ file: relFile, reason: `Top-level entity of type '${types.join('/')}' is missing @id URI` });
  }

  // 1. Organization / LocalBusiness validation
  if (types.includes('LocalBusiness') || types.includes('Organization')) {
    if (!entity.name || typeof entity.name !== 'string') {
      errors.push({ file: relFile, reason: 'Organization/LocalBusiness missing valid "name"' });
    }
    if (!entity.url || typeof entity.url !== 'string') {
      errors.push({ file: relFile, reason: 'Organization/LocalBusiness missing valid "url"' });
    }
    if (!entity.telephone || typeof entity.telephone !== 'string') {
      errors.push({ file: relFile, reason: 'Organization/LocalBusiness missing "telephone"' });
    }
    if (!entity.address || entity.address['@type'] !== 'PostalAddress') {
      errors.push({ file: relFile, reason: 'Organization/LocalBusiness missing valid PostalAddress' });
    } else {
      const addr = entity.address;
      if (!addr.streetAddress || !addr.addressLocality || !addr.addressCountry) {
        errors.push({ file: relFile, reason: 'PostalAddress missing streetAddress, addressLocality, or addressCountry' });
      }
    }
  }

  // 2. WebSite entity validation
  if (types.includes('WebSite')) {
    if (!entity.name) errors.push({ file: relFile, reason: 'WebSite entity missing "name"' });
    if (!entity.url) errors.push({ file: relFile, reason: 'WebSite entity missing "url"' });
  }

  // 3. WebPage entity validation
  if (types.includes('WebPage')) {
    if (!entity.name) errors.push({ file: relFile, reason: 'WebPage entity missing "name"' });
    if (!entity.url) errors.push({ file: relFile, reason: 'WebPage entity missing "url"' });
    if (!entity.isPartOf) errors.push({ file: relFile, reason: 'WebPage entity missing "isPartOf" reference' });
  }

  // 4. Service entity validation
  if (types.includes('Service')) {
    if (!entity.name) errors.push({ file: relFile, reason: 'Service entity missing "name"' });
    if (!entity.provider) errors.push({ file: relFile, reason: 'Service entity missing "provider"' });
  }

  // 5. FAQPage entity validation
  if (types.includes('FAQPage')) {
    if (!Array.isArray(entity.mainEntity) || entity.mainEntity.length === 0) {
      errors.push({ file: relFile, reason: 'FAQPage missing non-empty "mainEntity" question list' });
    } else {
      for (const [idx, q] of entity.mainEntity.entries()) {
        if (q['@type'] !== 'Question' || !q.name) {
          errors.push({ file: relFile, reason: `FAQPage question #${idx + 1} missing valid Question type or name` });
        }
        if (!q.acceptedAnswer || q.acceptedAnswer['@type'] !== 'Answer' || !q.acceptedAnswer.text) {
          errors.push({ file: relFile, reason: `FAQPage question "${q.name || idx + 1}" missing valid Answer text` });
        }
      }
    }
  }

  // 6. BreadcrumbList entity validation
  if (types.includes('BreadcrumbList')) {
    if (!Array.isArray(entity.itemListElement) || entity.itemListElement.length === 0) {
      errors.push({ file: relFile, reason: 'BreadcrumbList missing "itemListElement" array' });
    } else {
      for (const [idx, item] of entity.itemListElement.entries()) {
        if (item['@type'] !== 'ListItem') {
          errors.push({ file: relFile, reason: `BreadcrumbList item #${idx + 1} @type is not ListItem` });
        }
        if (typeof item.position !== 'number') {
          errors.push({ file: relFile, reason: `BreadcrumbList item #${idx + 1} missing integer position` });
        }
        if (!item.name || !item.item) {
          errors.push({ file: relFile, reason: `BreadcrumbList item #${idx + 1} missing name or target item URL` });
        }
      }
    }
  }
}

for (const htmlFile of htmlFiles) {
  const relFile = path.relative(distDir, htmlFile);
  const content = fs.readFileSync(htmlFile, 'utf-8');
  const jsonLdRegex = /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of content.matchAll(jsonLdRegex)) {
    totalSchemasFound++;
    const jsonStr = match[1].trim();

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      errors.push({ file: relFile, reason: `Malformed JSON in application/ld+json: ${e.message}` });
      continue;
    }

    // Verify context
    if (parsed['@context'] !== 'https://schema.org' && parsed['@context'] !== 'http://schema.org') {
      errors.push({ file: relFile, reason: `Invalid @context: "${parsed['@context']}". Expected "https://schema.org"` });
    }

    const graph = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
    for (const entity of graph) {
      validateEntity(entity, relFile);
    }
  }
}

console.log(`  HTML files checked:   ${BOLD}${htmlFiles.length}${RESET}`);
console.log(`  JSON-LD blocks found: ${BOLD}${totalSchemasFound}${RESET}`);
console.log(`  Entities validated:   ${BOLD}${totalEntitiesChecked}${RESET}\n`);

if (errors.length > 0) {
  console.error(`${RED}${BOLD}✗ Schema.org validation failed with ${errors.length} error(s):${RESET}`);
  for (const err of errors) {
    console.error(`  ${RED}• [${err.file}] ${err.reason}${RESET}`);
  }
  console.log('');
  process.exit(1);
}

console.log(`${GREEN}${BOLD}✓ All Schema.org JSON-LD structured data validated successfully!${RESET}\n`);
