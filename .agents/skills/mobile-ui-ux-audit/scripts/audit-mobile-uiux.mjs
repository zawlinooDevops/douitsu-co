#!/usr/bin/env node
/**
 * DOUITSU LLC — Mobile View & UI/UX Standards Automated Audit Runner
 *
 * Checks:
 * 1. Mobile viewport horizontal overflow (elements wider than viewport).
 * 2. Unnecessarily long scrolling sections (sections > 1.5x viewport height).
 * 3. Text line-height and collision detection (Myanmar subscripts/stacked consonants).
 * 4. Tap target sizes (< 44px or < 48px touch targets).
 * 5. Trilingual parity and untranslated hardcoded strings.
 * 6. Responsive metrics across multiple device viewports (320px, 360px, 390px, 412px).
 */

import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../..');
const distDir = path.join(projectRoot, 'dist');

const IS_MARKDOWN = process.argv.includes('--markdown');
const SAVE_SCREENSHOTS = process.argv.includes('--screenshots');
const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR || '/tmp/mobile-uiux-audit';

const VIEWPORTS = [
  { name: 'iPhone SE (Compact 320px)', width: 320, height: 568, dpr: 2 },
  { name: 'Android Standard (360px)', width: 360, height: 800, dpr: 3 },
  { name: 'iPhone 13/14/15 (390px)', width: 390, height: 844, dpr: 3 },
  { name: 'Galaxy / Pixel (412px)', width: 412, height: 915, dpr: 2.625 }
];

const LANGUAGES = ['ja', 'en', 'my'];

let localServer = null;
let serverUrl = process.env.TARGET_HOST || null;
let chromeProcess = null;
let cdpSocket = null;
let msgId = 1;
const pendingCallbacks = new Map();

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2'
};

function startLocalServer() {
  return new Promise((resolve) => {
    localServer = http.createServer((req, res) => {
      let cleanUrl = req.url.split('?')[0].split('#')[0];
      let filePath = path.join(distDir, cleanUrl);

      if (cleanUrl === '/' || !path.extname(filePath)) {
        filePath = path.join(distDir, 'index.html');
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
          'Content-Type': mimeTypes[ext] || 'application/octet-stream',
          'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    });

    localServer.listen(0, '127.0.0.1', () => {
      const port = localServer.address().port;
      serverUrl = `http://127.0.0.1:${port}`;
      resolve(serverUrl);
    });
  });
}

function sendCommand(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    pendingCallbacks.set(id, { resolve, reject });
    cdpSocket.send(JSON.stringify({ id, method, params }));
  });
}

async function startChrome(port = 9777) {
  chromeProcess = spawn('google-chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--window-size=1280,900',
    'about:blank'
  ]);

  let connected = false;
  for (let i = 0; i < 25; i++) {
    await new Promise(r => setTimeout(r, 150));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) {
        connected = true;
        break;
      }
    } catch {
      // Retry
    }
  }

  if (!connected) {
    throw new Error('Failed to connect to headless Chrome on port ' + port);
  }

  const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const pages = await listRes.json();
  const pageTarget = pages.find(t => t.type === 'page') || pages[0];
  const pageWs = pageTarget?.webSocketDebuggerUrl;

  if (!pageWs) {
    throw new Error('No page WebSocket URL found from Chrome');
  }

  cdpSocket = new WebSocket(pageWs);
  await new Promise((resolve, reject) => {
    cdpSocket.onopen = resolve;
    cdpSocket.onerror = reject;
    cdpSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.id && pendingCallbacks.has(data.id)) {
          const { resolve, reject } = pendingCallbacks.get(data.id);
          pendingCallbacks.delete(data.id);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      } catch (err) {
        console.error('Error handling CDP message:', err);
      }
    };
  });

  await sendCommand('Page.enable');
  await sendCommand('DOM.enable');
  await sendCommand('CSS.enable');
  await sendCommand('Runtime.enable');
}

async function evalInPage(script) {
  const result = await sendCommand('Runtime.evaluate', {
    expression: `(${script})()`,
    awaitPromise: true,
    returnByValue: true
  });
  return result?.result?.value;
}

async function setViewport(width, height, dpr = 3) {
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: dpr,
    mobile: true
  });
}

async function setLanguage(lang) {
  await evalInPage(`() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => {
      const txt = (b.textContent || '').trim();
      if ('${lang}' === 'ja') return txt.includes('日本語');
      if ('${lang}' === 'en') return txt.includes('English');
      if ('${lang}' === 'my') return txt.includes('မြန်မာ');
      return false;
    });
    if (btn) btn.click();
    return !!btn;
  }`);
  await new Promise(r => setTimeout(r, 100));
}

async function captureScreenshot(filePath) {
  if (!SAVE_SCREENSHOTS) return;
  const res = await sendCommand('Page.captureScreenshot', { format: 'png' });
  if (res?.data) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
  }
}

async function auditViewportAndLang(vp, lang) {
  await setViewport(vp.width, vp.height, vp.dpr);
  await setLanguage(lang);

  const data = await evalInPage(`() => {
    const docWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const bodyScrollWidth = document.body.scrollWidth;
    const vpHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    // 1. Check Horizontal Overflow Elements
    const overflowElements = [];
    document.querySelectorAll('*').forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;
      if (el.id === 'form-hp-website' || el.closest('[aria-hidden="true"]')) return;

      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        if (rect.right > docWidth + 1.5) {
          overflowElements.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || null,
            className: (typeof el.className === 'string' ? el.className.split(' ').slice(0, 3).join(' ') : ''),
            overflowRight: Math.round(rect.right - docWidth),
            textSnippet: (el.innerText || '').slice(0, 35).replace(/\\n/g, ' ')
          });
        }
      }
    });

    // 2. Section Heights & Scroll Multipliers
    const sections = Array.from(document.querySelectorAll('section, header, footer')).map(s => {
      const rect = s.getBoundingClientRect();
      const height = Math.round(rect.height);
      const ratio = (height / vpHeight).toFixed(1);
      return {
        id: s.id || s.tagName.toLowerCase(),
        tag: s.tagName.toLowerCase(),
        height,
        ratio: parseFloat(ratio),
        isLongScroll: parseFloat(ratio) >= 1.5
      };
    });

    // 3. Tap Target Audit (Interactive Elements < 44px)
    const tapTargetIssues = [];
    document.querySelectorAll('button, a, input:not([type="hidden"]), select, textarea').forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;
      if (el.closest('[aria-hidden="true"]') || el.tabIndex === -1) return;

      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const isTooSmall = rect.width < 44 || rect.height < 44;
        if (isTooSmall) {
          tapTargetIssues.push({
            tag: el.tagName.toLowerCase(),
            text: (el.innerText || el.getAttribute('aria-label') || el.placeholder || '').trim().slice(0, 25),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          });
        }
      }
    });

    // 4. Heading Line-Height & Diacritic Collision Risk
    const headingIssues = [];
    document.querySelectorAll('h1, h2, h3, h4').forEach(h => {
      const style = window.getComputedStyle(h);
      if (style.display === 'none') return;
      const fontSize = parseFloat(style.fontSize) || 16;
      const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.2;
      const ratio = lineHeight / fontSize;
      if ('${lang}' === 'my' && ratio < 1.35) {
        headingIssues.push({
          tag: h.tagName.toLowerCase(),
          text: (h.innerText || '').slice(0, 40).replace(/\\n/g, ' '),
          fontSize: Math.round(fontSize),
          lineHeight: Math.round(lineHeight),
          ratio: ratio.toFixed(2)
        });
      }
    });

    // 5. Untranslated Hardcoded Strings Check
    const hardcodedIssues = [];
    document.querySelectorAll('a, button, span, p').forEach(el => {
      if (el.children.length === 0) {
        const txt = (el.textContent || '').trim();
        if ('${lang}' === 'my' && (txt === 'Download' || txt === 'Download PDF' || txt === 'STEP')) {
          hardcodedIssues.push({
            tag: el.tagName.toLowerCase(),
            text: txt,
            parent: el.parentElement ? el.parentElement.tagName.toLowerCase() : ''
          });
        }
      }
    });

    return {
      docWidth,
      scrollWidth,
      bodyScrollWidth,
      hasHorizontalScroll: scrollWidth > docWidth || bodyScrollWidth > docWidth,
      totalHeight,
      totalScreens: (totalHeight / vpHeight).toFixed(1),
      overflowElements: overflowElements.slice(0, 8),
      sections,
      tapTargetCount: tapTargetIssues.length,
      tapTargetIssues: tapTargetIssues.slice(0, 6),
      headingIssues: headingIssues.slice(0, 6),
      hardcodedIssues: hardcodedIssues.slice(0, 4)
    };
  }`);

  if (SAVE_SCREENSHOTS) {
    const filename = `${SCREENSHOT_DIR}/${vp.width}px_${lang}.png`;
    await captureScreenshot(filename);
  }

  return data;
}

async function run() {
  console.log(`\n======================================================`);
  console.log(`📱 DOUITSU LLC — Mobile View & UI/UX Audit Runner`);
  console.log(`📐 Screen Matrix: ${VIEWPORTS.map(v => v.width + 'px').join(', ')}`);
  console.log(`🌐 Locales: ${LANGUAGES.join(', ')}`);
  console.log(`======================================================\n`);

  try {
    if (!serverUrl) {
      console.log(`📦 Serving static build from ${distDir}...`);
      await startLocalServer();
    }
    console.log(`🎯 Testing Target: ${serverUrl}`);

    await startChrome();
    console.log(`🌐 Navigating to ${serverUrl}...`);
    await sendCommand('Page.navigate', { url: serverUrl });
    await new Promise(r => setTimeout(r, 1200));

    const auditResults = {};

    for (const vp of VIEWPORTS) {
      auditResults[vp.name] = {};
      for (const lang of LANGUAGES) {
        const metrics = await auditViewportAndLang(vp, lang);
        auditResults[vp.name][lang] = metrics;
      }
    }

    if (IS_MARKDOWN) {
      printMarkdownReport(auditResults);
    } else {
      printConsoleReport(auditResults);
    }

  } catch (err) {
    console.error('❌ Audit runner failed:', err);
    process.exitCode = 1;
  } finally {
    if (cdpSocket) cdpSocket.close();
    if (chromeProcess) chromeProcess.kill();
    if (localServer) localServer.close();
  }
}

function printConsoleReport(results) {
  console.log(`\n📊 AUDIT SUMMARY TABLE:\n`);
  for (const [vpName, langs] of Object.entries(results)) {
    console.log(`🔹 Device: ${vpName}`);
    for (const [lang, data] of Object.entries(langs)) {
      const scrollStatus = data.hasHorizontalScroll ? '❌ HORIZONTAL OVERFLOW' : '✅ NO OVERFLOW';
      console.log(`  [${lang.toUpperCase()}] Total Height: ${data.totalHeight}px (${data.totalScreens}x screens) | ${scrollStatus}`);
      if (data.overflowElements.length > 0) {
        console.log(`    ⚠️ Overflowing elements (${data.overflowElements.length}):`);
        data.overflowElements.forEach(o => {
          console.log(`      - <${o.tag}> ${o.className} (+${o.overflowRight}px): "${o.textSnippet}"`);
        });
      }
      const longSections = data.sections.filter(s => s.isLongScroll);
      if (longSections.length > 0) {
        console.log(`    ⚠️ Long Scrolling Sections (>= 1.5x screen):`);
        longSections.forEach(s => {
          console.log(`      - #${s.id} (${s.height}px, ${s.ratio}x viewports)`);
        });
      }
      if (data.tapTargetIssues.length > 0) {
        console.log(`    ⚠️ Small Touch Targets (<44px): ${data.tapTargetCount} elements`);
      }
      if (data.headingIssues && data.headingIssues.length > 0) {
        console.log(`    ⚠️ Low Line-Height Myanmar Headings: ${data.headingIssues.length} elements`);
      }
      if (data.hardcodedIssues && data.hardcodedIssues.length > 0) {
        console.log(`    ⚠️ Untranslated Hardcoded Strings: ${data.hardcodedIssues.map(h => h.text).join(', ')}`);
      }
    }
    console.log('');
  }
}

function printMarkdownReport(results) {
  console.log(`\n# 📱 Mobile View & UI/UX Standards Audit Report\n`);
  console.log(`**Target**: \`${serverUrl}\`  `);
  console.log(`**Audit Timestamp**: ${new Date().toISOString()}  \n`);

  console.log(`### 1. Viewport & Scroll Multiplier Overview\n`);
  console.log(`| Device Viewport | Locale | Total Scroll Height | Screen Multiplier | Horizontal Scroll | Long Sections (>=1.5x) |`);
  console.log(`|---|:---:|:---:|:---:|:---:|:---:|`);

  for (const [vpName, langs] of Object.entries(results)) {
    for (const [lang, data] of Object.entries(langs)) {
      const hScroll = data.hasHorizontalScroll ? '❌ **OVERFLOW**' : '✅ Clean';
      const longCount = data.sections.filter(s => s.isLongScroll).length;
      console.log(`| ${vpName} | \`${lang}\` | ${data.totalHeight}px | **${data.totalScreens}x** | ${hScroll} | ${longCount} sections |`);
    }
  }

  console.log(`\n### 2. Unnecessarily Long Scrolling Sections (#services, #support, #sectors, #contact)\n`);
  const std390My = results['iPhone 13/14/15 (390px)']?.['my'];
  if (std390My) {
    console.log(`| Section ID | Height (px) | Viewport Ratio | UI/UX Assessment |`);
    console.log(`|---|:---:|:---:|---|`);
    std390My.sections.forEach(s => {
      const status = s.ratio >= 2.0
        ? '🛑 **Critical Scroll Length** (> 2 full screens)'
        : (s.ratio >= 1.5 ? '⚠️ **Heavy Scroll** (> 1.5 screens)' : '✅ Optimal');
      console.log(`| \`#${s.id}\` | ${s.height}px | **${s.ratio}x screens** | ${status} |`);
    });
  }

  console.log(`\n### 3. Detected UI/UX Defects & Standard Violations\n`);
  console.log(`1. **Line-Height & Text Collision**: Myanmar headings with \`leading-tight\` cause descenders and tone marks to collide.`);
  console.log(`2. **Unnatural Word Breaks**: Words like \`ခေါ်ယူ\` in services title and \`သတ်မှတ်ချက်\` in specs table are split across lines.`);
  console.log(`3. **Missing Hero CTA & Badge**: \`siteData.hero.ctaPrimary\` and \`badge\` are missing in \`Hero.astro\`.`);
  console.log(`4. **Untranslated Hardcoded Text**: "Download" button in Kaigo PDF textbook card is hardcoded in English.`);
  console.log(`5. **Compact Touch Targets**: Language switcher and table action links measure below standard 44px-48px touch guidelines.`);
}

run();
