---
trigger: always_on
description: Mandatory Engineering and Design Standards for Social Share Images, Open Graph (OG) tags, and Twitter Cards (1024x1024 1:1 Square Standard with Anti-Crop Safe-Zone)
---

# Social Share & Open Graph (OG) Asset Standards

This document establishes the mandatory engineering and design standard for Social Share Images, Open Graph (OG) tags, and Twitter Cards across this project.

---

## 📌 1. Core Principles & Architecture
1. **Single Universal Image Architecture (ပုံ ၁ ခုတည်းသာ အသုံးပြုခြင်း):**
   - Both `og:image` and `twitter:image` MUST share a single master image asset (`/images/social-share.png`).
2. **1:1 Square Ratio Standard (`1024 x 1024 px`):**
   - Both Open Graph and Twitter Card adhere to the Square 1:1 Aspect Ratio.
   - `<meta property="og:image:width" content="1024" />`
   - `<meta property="og:image:height" content="1024" />`
   - `<meta name="twitter:card" content="summary" />`
3. **1:1 Anti-Crop Safe-Zone Principle (အပေါ်အောက် မပြတ်စေမည့် Safe-Zone နည်းပညာ):**
   - Facebook and horizontal feed containers crop 1:1 square images into a 1.91:1 horizontal viewport (1024 x 536 px center window, cropping ~244px from top and bottom).
   - To prevent the logo from getting sliced/cropped on Facebook while preserving the 1:1 Square format for Twitter and messaging apps:
     - The brand logo MUST be scaled to 480 x 480 px (or max 500 x 500 px) centered inside the 1024 x 1024 px canvas.
     - This leaves ~272px margin on top and bottom (exceeding Facebook's 244px crop margin).
     - Result: When Facebook crops to 1.91:1, it only cuts the empty white space, leaving the logo 100% complete and uncropped.
     - On Twitter (`summary` card), Telegram, and Viber, the full 1:1 square thumbnail renders cleanly.
4. **Visual Purity & Zero Clutter Policy (အချက်အလက် မပြွတ်သိပ်ရေး မူဝါဒ):**
   - The image MUST contain ONLY the official brand logo mark and typography.
   - STRICT PROHIBITION: Under NO circumstances should phone numbers, email addresses, office locations, license numbers, long slogans, or photo collages be baked into the image.
5. **Solid Clean White Background:**
   - The canvas background MUST be Solid Clean White (`#ffffff`). Transparent backgrounds are strictly forbidden because platforms like Facebook and dark mode clients render transparency as ugly jet black or dark grey.
6. **Dynamic Versioned Cache-Busting:**
   - Every social image URL MUST append a version query parameter linked to package.json (`?v=${pkg.version}`).

---

## 📐 2. Technical Asset Specifications Matrix
| Property | Standard Requirement | Technical Explanation |
| :--- | :--- | :--- |
| Canvas Dimensions | 1024 x 1024 px | Standard 1:1 Square Resolution for Retina & Mobile |
| Aspect Ratio | 1:1 (Square) | Dedicated to `twitter:card = summary` & Square OG |
| Background Color | #ffffff (Solid Clean White) | Prevents dark-mode transparency corruption |
| Logo Size | 480 x 480 px (Centered) | Sits inside the 1024 x 536 px horizontal safe zone |
| Top & Bottom Margin | ~272 px padding | Exceeds Facebook's 244 px crop boundary |
| File Format & Size | PNG (< 60 KB) & JPG Fallback | Ultra-light, crisp vector-like edges |
| Twitter Card Type | summary | Renders compact 1:1 square thumbnail |
| Master File Path | /public/images/social-share.png | Standardized path across all projects |

---

## 🏷️ 3. Mandatory HTML `<head>` Meta Tags Standard
```html
<!-- Open Graph / Social Media (Square Ratio 1:1) -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://<yourdomain>/" />
<meta property="og:title" content="<Page Title>" />
<meta property="og:description" content="<Page Description>" />
<meta property="og:image" content="https://<yourdomain>/images/social-share.png?v=<pkg.version>" />
<meta property="og:image:secure_url" content="https://<yourdomain>/images/social-share.png?v=<pkg.version>" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1024" />
<meta property="og:image:height" content="1024" />
<meta property="og:image:alt" content="Brand Name" />
<meta property="og:site_name" content="Brand Name" />

<!-- Twitter / X Cards (Square Ratio 1:1) -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content="https://<yourdomain>/" />
<meta name="twitter:title" content="<Page Title>" />
<meta name="twitter:description" content="<Page Description>" />
<meta name="twitter:image" content="https://<yourdomain>/images/social-share.png?v=<pkg.version>" />
```

---

## 💻 4. Automated Image Generation Script (Node.js + Sharp)
```javascript
// scripts/generate-og-image.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function generateSocialShareImage() {
  const logoPath = fs.existsSync('public/images/landing/logo-mark.png')
    ? 'public/images/landing/logo-mark.png'
    : 'public/images/logo.png';
  const outPng = 'public/images/social-share.png';
  const outJpg = 'public/images/social-share.jpg';

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(outPng), { recursive: true });

  // 1. Resize master logo to fit within the 480x480 safe zone
  const resizedLogo = await sharp(logoPath)
    .resize(480, 480, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  // 2. Composite onto 1024x1024 solid white square canvas
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 } // Solid White
    }
  })
  .composite([{
    input: resizedLogo,
    gravity: 'center'
  }])
  .png({ quality: 95, compressionLevel: 8 })
  .toFile(outPng);

  // 3. Fallback JPG version
  await sharp(outPng)
    .jpeg({ quality: 90 })
    .toFile(outJpg);

  console.log('✅ Generated 1024x1024 1:1 square social share assets with safe-zone!');
}

generateSocialShareImage();
```

---

## ✅ 5. Pre-Deployment Checklist
- [ ] Canvas Dimension is exactly 1024 x 1024 px (`og:image:width=1024`, `og:image:height=1024`).
- [ ] Twitter card is set to `summary` (Square Thumbnail Card).
- [ ] Safe Zone Margin: Logo is centered within 480x480, leaving ~272px top and bottom margin (prevents Facebook cropping).
- [ ] Background is Solid Clean White (`#ffffff`), no transparency.
- [ ] Cache-busting query parameter `?v=<version>` is attached.
- [ ] Zero unreadable contact numbers, phone/email, or crowded text inside the image.
- [ ] Facebook Sharing Debugger returns 200 OK and logo is completely visible without any cropping.
