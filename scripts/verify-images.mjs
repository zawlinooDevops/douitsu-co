#!/usr/bin/env node
/**
 * ==============================================================================
 * DOUITSU LLC — Static Images & Media Assets Validator
 * Validates:
 *   1. All <img src="..."> tags resolve to existing non-empty files in dist/
 *   2. Favicons, Apple Touch icons, and preloaded images in <link> tags exist
 *   3. OpenGraph (og:image) and Twitter Cards (twitter:image) exist
 *   4. Inline CSS background-image and mask-image assets exist
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
console.log(`${BOLD}${CYAN}   DOUITSU LLC — Image & Media Asset Validator        ${RESET}`);
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
const assetEntries = [];
const missingAssets = [];
const checkedAssets = new Set();

for (const htmlFile of htmlFiles) {
  const relFile = path.relative(distDir, htmlFile);
  const content = fs.readFileSync(htmlFile, 'utf-8');

  // 1. Regular <img> tags (skip Alpine expressions like :src, @src)
  const imgRegex = /<img\b[^>]*?(?<![:@\w])src=["']([^"']+)["'][^>]*>/gi;
  for (const match of content.matchAll(imgRegex)) {
    assetEntries.push({ file: relFile, src: match[1].trim(), type: '<img> src' });
  }

  // 2. <link rel="preload" as="image"> and favicon/icon links
  const linkRegex = /<link\b[^>]+(?:as=["']image["']|rel=["'](?:icon|apple-touch-icon|shortcut icon)["'])[^>]+href=["']([^"']+)["'][^>]*>/gi;
  for (const match of content.matchAll(linkRegex)) {
    assetEntries.push({ file: relFile, src: match[1].trim(), type: '<link> icon/preload' });
  }

  // 3. OpenGraph & Twitter preview images
  const metaRegex = /<meta\b[^>]+(?:property=["']og:image["']|name=["']twitter:image["'])[^>]+content=["']([^"']+)["'][^>]*>/gi;
  for (const match of content.matchAll(metaRegex)) {
    assetEntries.push({ file: relFile, src: match[1].trim(), type: '<meta> social banner' });
  }

  // 4. Inline CSS background-image and mask-image url(...)
  const cssUrlRegex = /url\(["']?(\/[^"')\s]+)["']?\)/gi;
  for (const match of content.matchAll(cssUrlRegex)) {
    const assetUrl = match[1].trim();
    if (assetUrl.endsWith('.png') || assetUrl.endsWith('.jpg') || assetUrl.endsWith('.jpeg') || assetUrl.endsWith('.webp') || assetUrl.endsWith('.svg') || assetUrl.endsWith('.ico')) {
      assetEntries.push({ file: relFile, src: assetUrl, type: 'css url()' });
    }
  }
}

// Check each asset
for (const entry of assetEntries) {
  const src = entry.src;

  // Ignore data URIs or empty strings
  if (src.startsWith('data:') || src === '') continue;

  let localRelativePath = src;
  if (localRelativePath.startsWith('https://douitsu-co.com/')) {
    localRelativePath = localRelativePath.replace('https://douitsu-co.com', '');
  }

  // If still external URL (e.g. third-party), ignore
  if (localRelativePath.startsWith('http://') || localRelativePath.startsWith('https://')) {
    continue;
  }

  const cleanPath = localRelativePath.startsWith('/') ? localRelativePath.slice(1) : localRelativePath;
  const pathnameOnly = cleanPath.split('?')[0].split('#')[0];
  const diskPath = path.join(distDir, pathnameOnly);
  const cacheKey = `${entry.file}::${diskPath}`;

  if (!checkedAssets.has(cacheKey)) {
    checkedAssets.add(cacheKey);

    if (!fs.existsSync(diskPath)) {
      missingAssets.push({
        file: entry.file,
        src: entry.src,
        type: entry.type,
        resolvedPath: path.relative(projectRoot, diskPath),
        reason: 'File does not exist on disk'
      });
    } else {
      const stat = fs.statSync(diskPath);
      if (stat.size === 0) {
        missingAssets.push({
          file: entry.file,
          src: entry.src,
          type: entry.type,
          resolvedPath: path.relative(projectRoot, diskPath),
          reason: 'File exists but is empty (0 bytes)'
        });
      }
    }
  }
}

console.log(`  HTML files scanned:   ${BOLD}${htmlFiles.length}${RESET}`);
console.log(`  Asset references:     ${BOLD}${assetEntries.length}${RESET}`);
console.log(`  Unique disk checks:   ${BOLD}${checkedAssets.size}${RESET}\n`);

if (missingAssets.length > 0) {
  console.error(`${RED}${BOLD}✗ Image verification failed with ${missingAssets.length} broken/missing asset(s):${RESET}`);
  for (const err of missingAssets) {
    console.error(`  ${RED}• [${err.file}] (${err.type}): "${err.src}" → ${err.resolvedPath} (${err.reason})${RESET}`);
  }
  console.log('');
  process.exit(1);
}

console.log(`${GREEN}${BOLD}✓ All static images and media assets exist and are non-empty!${RESET}\n`);
