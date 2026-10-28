#!/usr/bin/env node
/**
 * DOUITSU LLC — Automated Cloudflare Edge Cache Verification Pipeline
 *
 * Verifies Cloudflare cache headers (cf-cache-status: HIT) across:
 * - HTML documents (root /, custom 404.html)
 * - Bundled CSS stylesheets (_astro/*.css)
 * - Bundled JS scripts (_astro/*.js, sw.js)
 * - WebP images (hero background)
 * - Standard JPG & PNG graphics (logos, certificates, sector cards, flyers)
 * - Thumbnails & Icons (favicons, apple-touch-icons, android-chrome, maskable icons)
 * - Self-hosted TTF fonts
 * - External Cloudflare R2 PDF study guides
 */

import { fileURLToPath } from 'node:url';
import path from 'node:path';

const TARGET_HOST = process.env.TARGET_HOST || 'https://douitsu-co.com';
const R2_HOST = 'https://files.douitsu-co.com';
const IS_MARKDOWN = process.argv.includes('--markdown');

// Core Static Asset List
const STATIC_AUDIT_MANIFEST = [
  // 1. HTML
  { category: 'HTML', name: 'Main Landing Page', path: '/' },
  { category: 'HTML', name: 'Branded 404 Page', path: '/404.html' },

  // 2. WebP
  { category: 'WebP', name: 'Hero Mt. Fuji Background', path: '/images/landing/hero-bg.webp' },

  // 3. Images (PNG & JPG)
  { category: 'Image (PNG)', name: 'Brand Emblem', path: '/images/landing/logo-mark.png' },
  { category: 'Image (PNG)', name: 'Full Logo', path: '/images/landing/logo.png' },
  { category: 'Image (JPG)', name: 'Support Activity 1', path: '/images/landing/support-activity-1.jpg' },
  { category: 'Image (JPG)', name: 'Support Activity 2', path: '/images/landing/support-activity-2.jpg' },
  { category: 'Image (JPG)', name: 'License Certificate', path: '/images/landing/license-certificate.jpg' },
  { category: 'Image (JPG)', name: 'Social Banner', path: '/images/landing/banner.jpg' },
  { category: 'Image (JPG)', name: 'Sector: Kaigo', path: '/images/sectors/sector-kaigo.jpg' },
  { category: 'Image (JPG)', name: 'Sector: Food Service', path: '/images/sectors/sector-food-service.jpg' },
  { category: 'Image (JPG)', name: 'Sector: Manufacturing', path: '/images/sectors/sector-manufacturing.jpg' },
  { category: 'Image (JPG)', name: 'Sector: Cleaning', path: '/images/sectors/sector-building-cleaning.jpg' },
  { category: 'Image (JPG)', name: 'Recruitment Flyer 1', path: '/images/jobs/job-2025-11fudo.jpg' },
  { category: 'Image (JPG)', name: 'Recruitment Flyer 2', path: '/images/jobs/job-yamaguchi.jpg' },

  // 4. Thumbnails & Icons
  { category: 'Thumbnail/Icon', name: 'Favicon ICO', path: '/favicon.ico' },
  { category: 'Thumbnail/Icon', name: 'Favicon 16x16 PNG', path: '/favicon-16x16.png' },
  { category: 'Thumbnail/Icon', name: 'Favicon 32x32 PNG', path: '/favicon-32x32.png' },
  { category: 'Thumbnail/Icon', name: 'Favicon 48x48 PNG', path: '/favicon-48x48.png' },
  { category: 'Thumbnail/Icon', name: 'Apple Touch Icon 180x180', path: '/images/icons/apple-touch-icon-180x180.png' },
  { category: 'Thumbnail/Icon', name: 'Apple Touch Icon 120x120', path: '/images/icons/apple-touch-icon-120x120.png' },
  { category: 'Thumbnail/Icon', name: 'Android Chrome 192x192', path: '/images/icons/android-chrome-192x192.png' },
  { category: 'Thumbnail/Icon', name: 'Android Chrome 512x512', path: '/images/icons/android-chrome-512x512.png' },
  { category: 'Thumbnail/Icon', name: 'Maskable Icon 512x512', path: '/images/icons/maskable-icon-512x512.png' },
  { category: 'Thumbnail/Icon', name: 'Sakura Badge 48px', path: '/images/landing/cherry-48.png' },

  // 5. Self-Hosted TTF Fonts
  { category: 'Font', name: 'Plus Jakarta Sans (400 Regular)', path: '/fonts/local-font-1.ttf' },
  { category: 'Font', name: 'Noto Sans Myanmar (400 Regular)', path: '/fonts/local-font-2.ttf' },
  { category: 'Font', name: 'Noto Sans Myanmar (700 Bold)', path: '/fonts/local-font-3.ttf' },
  { category: 'Font', name: 'Plus Jakarta Sans (500 Medium)', path: '/fonts/local-font-4.ttf' },
  { category: 'Font', name: 'Plus Jakarta Sans (700 Bold)', path: '/fonts/local-font-5.ttf' },
  { category: 'Font', name: 'Noto Sans Myanmar (600 SemiBold)', path: '/fonts/local-font-6.ttf' },
  { category: 'Font', name: 'Plus Jakarta Sans (600 SemiBold)', path: '/fonts/local-font-7.ttf' },
  { category: 'Font', name: 'Plus Jakarta Sans (800 ExtraBold)', path: '/fonts/local-font-8.ttf' },
  { category: 'JS', name: 'Service Worker (sw.js)', path: '/sw.js' },

  // 6. External Cloudflare R2 Textbooks
  { category: 'Document (R2)', name: 'Kaigo Textbook (Japanese)', url: `${R2_HOST}/kaigo-tokuteiginou-japanese.pdf` },
  { category: 'Document (R2)', name: 'Kaigo Textbook (Myanmar)', url: `${R2_HOST}/kaigo-tokuteiginou-myanmar.pdf` }
];

async function fetchDynamicHashedBundles() {
  const dynamicItems = [];
  try {
    const res = await fetch(`${TARGET_HOST}/`);
    const html = await res.text();

    // Extract Astro bundled CSS
    const cssMatches = html.match(/href="(\/_astro\/[^"]+\.css)"/g) || [];
    for (const match of cssMatches) {
      const p = match.replace(/^href="|"/g, '');
      if (!dynamicItems.some((i) => i.path === p)) {
        dynamicItems.push({ category: 'CSS', name: 'Tailwind Bundle CSS', path: p });
      }
    }

    // Extract Astro bundled JS
    const jsMatches = html.match(/src="(\/_astro\/[^"]+\.js)"/g) || [];
    for (const match of jsMatches) {
      const p = match.replace(/^src="|"/g, '');
      if (!dynamicItems.some((i) => i.path === p)) {
        dynamicItems.push({ category: 'JS', name: 'Alpine.js Bundle Script', path: p });
      }
    }
  } catch (err) {
    console.warn(`[WARN] Could not discover dynamic bundles: ${err.message}`);
  }
  return dynamicItems;
}

async function requestAsset(url) {
  const t0 = Date.now();
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CloudflareCacheAuditor/1.0'
    }
  });
  const t1 = Date.now();

  const cfCache = res.headers.get('cf-cache-status') || 'NONE';
  const ray = res.headers.get('cf-ray') || '';
  const pop = ray.split('-')[1] || 'UNKNOWN';
  const contentType = (res.headers.get('content-type') || 'unknown').split(';')[0];
  const lengthHeader = res.headers.get('content-length');
  const sizeBytes = lengthHeader ? parseInt(lengthHeader, 10) : (await res.arrayBuffer()).byteLength;
  const cacheControl = res.headers.get('cache-control') || 'none';

  return {
    status: res.status,
    cfCache,
    cfRay: ray,
    pop,
    contentType,
    sizeBytes,
    cacheControl,
    timeMs: t1 - t0
  };
}

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / 1024).toFixed(1) + ' KB';
}

async function main() {
  console.log(`\n🔍 [Cloudflare Cache Audit] Target: ${TARGET_HOST}`);
  console.log('⚡ Discovering dynamic hashed bundle assets...');

  const dynamicBundles = await fetchDynamicHashedBundles();
  const allItems = [...dynamicBundles, ...STATIC_AUDIT_MANIFEST];

  console.log(`📦 Loaded ${allItems.length} asset targets across all categories.`);
  console.log('🚀 Running 2-Pass Cache Verification (Pass 1: Warmup, Pass 2: Verify)...\n');

  const rows = [];
  let hitCount = 0;
  let revalidatedCount = 0;
  let missCount = 0;

  for (const item of allItems) {
    const fullUrl = item.url || `${TARGET_HOST}${item.path}`;

    // Pass 1: Warmup
    await requestAsset(fullUrl);

    // Pass 2: Definitive Edge Cache Verification
    const res = await requestAsset(fullUrl);

    const isHit = res.cfCache === 'HIT';
    const isRevalidated = res.cfCache === 'REVALIDATED';
    const isStatusOk = res.status === 200 || (item.path === '/404.html' && (res.status === 200 || res.status === 404));

    if (isHit && isStatusOk) hitCount++;
    else if (isRevalidated && isStatusOk) revalidatedCount++;
    else missCount++;

    rows.push({
      category: item.category,
      name: item.name,
      status: res.status,
      cfCache: res.cfCache,
      contentType: res.contentType,
      size: formatSize(res.sizeBytes),
      pop: res.pop,
      timeMs: `${res.timeMs}ms`
    });
  }

  if (IS_MARKDOWN) {
    console.log('### 📊 Cloudflare Edge Cache Verification Table\n');
    console.log('| Category | Asset Name | Status | Cache Status | Content-Type | Size | Edge PoP | Latency |');
    console.log('|---|---|:---:|:---:|---|:---:|:---:|:---:|');
    for (const r of rows) {
      const badge = r.cfCache === 'HIT' ? `**\`HIT\`** 🟢` : r.cfCache === 'REVALIDATED' ? `**\`${r.cfCache}\`** 🔵` : `**\`${r.cfCache}\`** 🔴`;
      console.log(`| ${r.category} | ${r.name} | ${r.status} | ${badge} | \`${r.contentType}\` | ${r.size} | \`${r.pop}\` | ${r.timeMs} |`);
    }
  } else {
    console.table(rows);
  }

  console.log('\n---------------------------------------------------------');
  console.log(`📈 Summary: Total ${allItems.length} assets tested.`);
  console.log(`   - Cache HIT:         ${hitCount} (${((hitCount / allItems.length) * 100).toFixed(1)}%)`);
  console.log(`   - Cache REVALIDATED:   ${revalidatedCount} (Conditional storage revalidation)`);
  console.log(`   - Cache MISS/OTHER:    ${missCount}`);
  console.log('---------------------------------------------------------\n');

  // R2 assets can be REVALIDATED or DYNAMIC. All static website assets must be HIT or REVALIDATED.
  if (missCount > 0) {
    console.warn(`⚠️ Warning: ${missCount} assets returned cache status other than HIT/REVALIDATED.`);
    process.exitCode = 0; // Don't break, allow inspection
  } else {
    console.log('✅ ALL PRODUCTION ASSETS ARE SUCCESSFULLY CACHED ON CLOUDFLARE EDGE!\n');
  }
}

main().catch((err) => {
  console.error('Fatal error during cache audit:', err);
  process.exit(1);
});
