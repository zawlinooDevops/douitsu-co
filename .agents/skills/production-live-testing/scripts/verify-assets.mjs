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

function checkUrl(url, timeoutMs = 8000) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD', headers: { 'User-Agent': 'DouitsuVerifier/1.0' } }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        ok: res.statusCode === 200,
        contentLength: res.headers['content-length'] || null,
        contentType: res.headers['content-type'] || null
      });
    });

    req.on('error', (err) => {
      resolve({ url, status: err.message, ok: false });
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT', ok: false });
    });

    req.end();
  });
}

async function run() {
  console.log(`\n🔍 Scanning public directory: ${publicDir}`);
  const allPublicPaths = getFiles(publicDir).map(p => path.relative(publicDir, p));
  console.log(`📦 Found ${allPublicPaths.length} static assets in public/`);

  console.log(`🚀 Checking assets against production (${TARGET_HOST})...\n`);

  const checks = [];

  // Check all public assets
  for (const rel of allPublicPaths) {
    const fullUrl = `${TARGET_HOST}/${rel}`;
    checks.push(checkUrl(fullUrl));
  }

  // Check R2 hosted PDFs
  for (const pdf of R2_PDFS) {
    const fullUrl = `${R2_HOST}/${pdf}`;
    checks.push(checkUrl(fullUrl));
  }

  // Run in concurrent batches of 10 to avoid socket starvation
  const BATCH_SIZE = 10;
  const results = [];
  for (let i = 0; i < checks.length; i += BATCH_SIZE) {
    const batch = checks.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch);
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
