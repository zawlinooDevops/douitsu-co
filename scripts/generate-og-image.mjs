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
