#!/usr/bin/env node
/**
 * ==============================================================================
 * DOUITSU LLC — Link & Anchor Targets Validator
 * Validates:
 *   1. In-page anchor links (#hash) target existing DOM element IDs
 *   2. Internal route links (/housing/, /license/, /) point to generated pages
 *   3. Cross-page anchor links (/#about, /#contact) target existing element IDs
 *   4. Protocol links (tel:, mailto:) have valid formats
 *   5. External URLs have valid format and syntax
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
console.log(`${BOLD}${CYAN}   DOUITSU LLC — Link & Anchor Navigation Validator   ${RESET}`);
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
const fileContents = new Map();
const fileIds = new Map();

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  fileContents.set(file, content);

  const ids = new Set();
  const idRegex = /\bid=["']([^"']+)["']/gi;
  for (const match of content.matchAll(idRegex)) {
    ids.add(match[1]);
  }
  fileIds.set(file, ids);
}

let totalLinksChecked = 0;
const brokenLinks = [];

for (const file of htmlFiles) {
  const relFile = path.relative(distDir, file);
  const content = fileContents.get(file);
  const currentIds = fileIds.get(file);

  const anchorRegex = /<a\b[^>]*?\bhref=["']([^"']+)["'][^>]*>/gi;
  for (const match of content.matchAll(anchorRegex)) {
    totalLinksChecked++;
    const href = match[1].trim();

    // 1. Same-page hash anchor (e.g. #contact, #top)
    if (href.startsWith('#')) {
      const targetId = href.slice(1);
      if (!targetId) {
        brokenLinks.push({ file: relFile, href, reason: 'Empty hash anchor (#)' });
      } else if (!currentIds.has(targetId)) {
        brokenLinks.push({ file: relFile, href, reason: `Target anchor ID "#${targetId}" does not exist in this page` });
      }
      continue;
    }

    // 2. Protocols: tel: and mailto:
    if (href.startsWith('tel:')) {
      const phoneNum = href.replace('tel:', '').replace(/[\s\-\(\)\+]/g, '');
      if (phoneNum.length < 5 || !/^\d+$/.test(phoneNum)) {
        brokenLinks.push({ file: relFile, href, reason: `Invalid telephone number in link: ${href}` });
      }
      continue;
    }

    if (href.startsWith('mailto:')) {
      const email = href.replace('mailto:', '').split('?')[0];
      if (!email.includes('@') || !email.includes('.')) {
        brokenLinks.push({ file: relFile, href, reason: `Invalid email address in link: ${href}` });
      }
      continue;
    }

    if (href.startsWith('javascript:')) {
      // Inline javascript anchor
      continue;
    }

    // 3. Absolute HTTP/HTTPS URLs
    if (href.startsWith('http://') || href.startsWith('https://')) {
      try {
        const parsedUrl = new URL(href);
        // If pointing to canonical domain, also verify local route
        if (parsedUrl.origin === 'https://douitsu-co.com' || parsedUrl.origin === 'http://douitsu-co.com') {
          const localPath = parsedUrl.pathname + (parsedUrl.hash || '');
          checkInternalPath(localPath, relFile, href);
        }
      } catch (err) {
        brokenLinks.push({ file: relFile, href, reason: `Malformed absolute URL: ${err.message}` });
      }
      continue;
    }

    // 4. Root-relative or relative internal paths
    if (href.startsWith('/')) {
      checkInternalPath(href, relFile, href);
      continue;
    }

    brokenLinks.push({ file: relFile, href, reason: `Unrecognized relative link format: "${href}"` });
  }
}

function checkInternalPath(pathWithHash, relFile, originalHref) {
  const [pathname, hash] = pathWithHash.split('#');
  let targetFile = null;

  if (pathname === '/' || pathname === '') {
    targetFile = path.join(distDir, 'index.html');
  } else {
    const clean = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    const asDir = path.join(distDir, clean, 'index.html');
    const asFile = path.join(distDir, clean);

    if (fs.existsSync(asDir)) {
      targetFile = asDir;
    } else if (fs.existsSync(asFile)) {
      targetFile = asFile;
    }
  }

  if (!targetFile || !fs.existsSync(targetFile)) {
    brokenLinks.push({
      file: relFile,
      href: originalHref,
      reason: `Target internal page/route not found: "${pathname}"`
    });
    return;
  }

  // If link specifies a #hash target on the destination page, verify ID exists
  if (hash) {
    const destinationIds = fileIds.get(targetFile);
    if (!destinationIds || !destinationIds.has(hash)) {
      brokenLinks.push({
        file: relFile,
        href: originalHref,
        reason: `Target ID "#${hash}" not found in destination page "${path.relative(distDir, targetFile)}"`
      });
    }
  }
}

console.log(`  HTML files checked:   ${BOLD}${htmlFiles.length}${RESET}`);
console.log(`  Anchor links checked: ${BOLD}${totalLinksChecked}${RESET}\n`);

if (brokenLinks.length > 0) {
  console.error(`${RED}${BOLD}✗ Link verification failed with ${brokenLinks.length} broken link(s):${RESET}`);
  for (const err of brokenLinks) {
    console.error(`  ${RED}• [${err.file}] href="${err.href}" → ${err.reason}${RESET}`);
  }
  console.log('');
  process.exit(1);
}

console.log(`${GREEN}${BOLD}✓ All internal routes, hash anchors, and protocol links are valid!${RESET}\n`);
