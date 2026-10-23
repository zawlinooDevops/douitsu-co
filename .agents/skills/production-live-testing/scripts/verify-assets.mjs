#!/usr/bin/env node
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../..');
const publicDir = path.join(projectRoot, 'public');

const TARGET_HOST = 'https://douitsu-co.com';
const R2_HOST = 'https://files.douitsu-co.com';

const R2_PDFS = [
  'kaigo-tokuteiginou-japanese.pdf',
  'kaigo-tokuteiginou-myanmar.pdf'
];

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function checkUrl(url, timeoutMs = 10000) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      signal: AbortSignal.timeout(timeoutMs)
    });
    return {
      url,
      status: res.status,
      ok: res.ok,
      contentLength: res.headers.get('content-length'),
      contentType: res.headers.get('content-type')
    };
  } catch (err) {
    return { url, status: err.name === 'TimeoutError' ? 'TIMEOUT' : err.message, ok: false };
  }
}

async function run() {
  console.log(`\n🔍 Scanning public directory: ${publicDir}`);
  const allPublicPaths = getFiles(publicDir).map(p => path.relative(publicDir, p));
  console.log(`📦 Found ${allPublicPaths.length} static assets in public/`);

  console.log(`🚀 Checking assets against production (${TARGET_HOST})...\n`);

  // Run in concurrent batches of 8 to avoid socket starvation
  const BATCH_SIZE = 8;
  const results = [];
  const urlsToCheck = [
    ...allPublicPaths.map(rel => `${TARGET_HOST}/${rel}`),
    ...R2_PDFS.map(pdf => `${R2_HOST}/${pdf}`)
  ];

  for (let i = 0; i < urlsToCheck.length; i += BATCH_SIZE) {
    const batch = urlsToCheck.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(url => checkUrl(url, 10000)));
    results.push(...batchResults);
  }

  const failed = results.filter(r => !r.ok);
  const passed = results.filter(r => r.ok);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Passed: ${passed.length} / ${results.length}`);
  if (failed.length > 0) {
    console.error(`❌ Failed: ${failed.length}`);
    console.error('\nFailed URLs:');
    for (const f of failed) {
      console.error(`  - [${f.status}] ${f.url}`);
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.exit(1);
  } else {
    console.log('🎉 100% of static assets & R2 PDFs are LIVE and returning HTTP 200!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.exit(0);
  }
}

run().catch((err) => {
  console.error('Fatal error during asset verification:', err);
  process.exit(1);
});
