#!/usr/bin/env python3
"""
Generate Favicon, App Icons, Apple Device Icons, OG Image, and Twitter Image
using the modern textless / dotless logo-mark.png for DOUITSU LLC.
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def make_dirs():
    os.makedirs('public', exist_ok=True)
    os.makedirs('public/images/icons', exist_ok=True)
    os.makedirs('public/images/landing', exist_ok=True)

def generate_favicons(logo: Image.Image):
    print("Generating Favicons...")
    # Master frame for multi-size ICO
    master = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    target_h = int(256 * 0.90)
    ratio = target_h / logo.height
    target_w = int(logo.width * ratio)
    logo_r = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    master.paste(logo_r, ((256 - target_w) // 2, (256 - target_h) // 2), logo_r)

    # Save individual PNGs for 16, 32, 48
    for size in [16, 32, 48]:
        frame = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        th = int(size * 0.92) if size <= 32 else int(size * 0.88)
        r = th / logo.height
        tw = int(logo.width * r)
        lr = logo.resize((tw, th), Image.Resampling.LANCZOS)
        frame.paste(lr, ((size - tw) // 2, (size - th) // 2), lr)
        frame.save(f'public/favicon-{size}x{size}.png', format='PNG')
        frame.save(f'public/images/icons/favicon-{size}x{size}.png', format='PNG')

    # Save multi-resolution .ico containing 16, 32, 48, 64, 128, 256
    ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    master.save('public/favicon.ico', format='ICO', sizes=ico_sizes)
    master.save('public/images/icons/favicon.ico', format='ICO', sizes=ico_sizes)
    print("✓ Multi-resolution Favicons generated successfully.")

def generate_apple_icons(logo: Image.Image):
    print("Generating Apple Device Icons...")
    # Apple device icon sizes:
    # 180 (iPhone retina @3x)
    # 167 (iPad Pro)
    # 152 (iPad retina @2x)
    # 144 (iPad legacy @2x)
    # 120 (iPhone retina @2x)
    # 114 (iPhone legacy retina)
    # 76 (iPad 1x)
    # 72 (iPad legacy)
    # 60 (iPhone legacy)
    # 57 (iPhone 1x legacy)
    apple_sizes = [180, 167, 152, 144, 120, 114, 76, 72, 60, 57]
    
    for size in apple_sizes:
        # Apple icons must be opaque (white background)
        icon = Image.new('RGBA', (size, size), (255, 255, 255, 255))
        # 72% logo height provides safe margins away from squircle corners
        target_h = int(size * 0.72)
        ratio = target_h / logo.height
        target_w = int(logo.width * ratio)
        logo_resized = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
        pos_x = (size - target_w) // 2
        pos_y = (size - target_h) // 2
        icon.paste(logo_resized, (pos_x, pos_y), logo_resized)
        
        # Save as RGB PNG (Apple HIG standard)
        icon_rgb = icon.convert('RGB')
        icon_rgb.save(f'public/images/icons/apple-touch-icon-{size}x{size}.png', format='PNG')
        
        # Default root and icon fallback (180x180)
        if size == 180:
            icon_rgb.save('public/apple-touch-icon.png', format='PNG')
            icon_rgb.save('public/images/icons/apple-touch-icon.png', format='PNG')
            
    print(f"✓ {len(apple_sizes)} Apple Touch Icons generated.")

def generate_android_pwa_icons(logo: Image.Image):
    print("Generating Android & PWA App Icons...")
    # 192x192
    for size in [192, 512]:
        icon = Image.new('RGBA', (size, size), (255, 255, 255, 255))
        target_h = int(size * 0.72)
        ratio = target_h / logo.height
        target_w = int(logo.width * ratio)
        logo_resized = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
        pos_x = (size - target_w) // 2
        pos_y = (size - target_h) // 2
        icon.paste(logo_resized, (pos_x, pos_y), logo_resized)
        icon.convert('RGB').save(f'public/images/icons/android-chrome-{size}x{size}.png', format='PNG')
    
    # Maskable Icon (safe zone is center 80% circle, so logo ~60% height)
    size = 512
    maskable = Image.new('RGBA', (size, size), (255, 255, 255, 255))
    target_h = int(size * 0.60)
    ratio = target_h / logo.height
    target_w = int(logo.width * ratio)
    logo_resized = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    pos_x = (size - target_w) // 2
    pos_y = (size - target_h) // 2
    maskable.paste(logo_resized, (pos_x, pos_y), logo_resized)
    maskable.convert('RGB').save('public/images/icons/maskable-icon-512x512.png', format='PNG')
    
    print("✓ Android & PWA Icons generated.")

def generate_og_twitter_banner(logo: Image.Image):
    print("Generating Minimalist OpenGraph & Twitter Cards (1200x630)...")
    W, H = 1200, 630

    # Fonts
    f_jp_title = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc', 46)
    f_jp_sub = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc', 19)
    f_jp_badge = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc', 15)
    f_en_title = ImageFont.truetype('public/fonts/local-font-8.ttf', 24)
    f_en_url = ImageFont.truetype('public/fonts/local-font-7.ttf', 16)

    # Luxury Deep Navy Background
    bg = Image.new('RGBA', (W, H), (11, 21, 38, 255))
    
    # Soft ambient glow behind card
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_g = ImageDraw.Draw(glow)
    draw_g.ellipse([W//2 - 400, H//2 - 260, W//2 + 400, H//2 + 260], fill=(16, 92, 142, 65))
    draw_g.ellipse([W//2 - 200, H//2 - 150, W//2 + 200, H//2 + 150], fill=(24, 116, 179, 45))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=80))
    bg.paste(glow, (0, 0), glow)

    # Floating Minimalist White Card
    cw, ch = 950, 420
    cx, cy = (W - cw) // 2, (H - ch) // 2

    # Drop shadow
    sh = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_s = ImageDraw.Draw(sh)
    draw_s.rounded_rectangle([cx - 4, cy + 12, cx + cw + 4, cy + ch + 26], radius=32, fill=(0, 0, 0, 115))
    sh = sh.filter(ImageFilter.GaussianBlur(radius=22))
    bg.paste(sh, (0, 0), sh)

    # Crisp White Card
    card = Image.new('RGBA', (cw, ch), (255, 255, 255, 255))
    draw_c = ImageDraw.Draw(card)
    draw_c.rounded_rectangle([0, 0, cw-1, ch-1], radius=28, outline=(226, 232, 240, 255), width=2)

    # Left: Logo Mark
    logo_h = 240
    ratio = logo_h / logo.height
    logo_w = int(logo.width * ratio)
    logo_resized = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    
    lx = 60 + (230 - logo_w) // 2
    ly = (ch - logo_h) // 2
    card.paste(logo_resized, (lx, ly), logo_resized)

    # Vertical subtle separator
    sep_x = 330
    draw_c.line([(sep_x, 55), (sep_x, ch - 55)], fill=(226, 232, 240, 255), width=1)

    # Right Content Area (Clean, Uncluttered)
    rx = 375
    ry = 70

    # 1. Authority Badge Pill
    badge_text = "出入国在留管理庁 登録支援機関 (REG:0A32ES43)"
    bbox = f_jp_badge.getbbox(badge_text)
    bw = bbox[2] - bbox[0] + 46
    bh = 32
    b_img = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(b_img)
    b_draw.rounded_rectangle([0, 0, bw-1, bh-1], radius=16, fill=(240, 253, 244, 255), outline=(187, 247, 208, 255), width=1)
    b_draw.ellipse([14, 11, 22, 19], fill=(16, 185, 129, 255))
    b_draw.text((28, 6), badge_text, font=f_jp_badge, fill=(22, 101, 52, 255))
    card.paste(b_img, (rx, ry), b_img)

    # 2. Main Title
    ry += 52
    draw_c.text((rx, ry), "DOUITSU合同会社", font=f_jp_title, fill=(13, 27, 42, 255))

    # 3. English Subtitle
    ry += 66
    draw_c.text((rx, ry), "DOUITSU LLC", font=f_en_title, fill=(16, 92, 142, 255))

    # 4. Clean Focus Tagline
    ry += 42
    draw_c.text((rx, ry), "特定技能外国人の受入れ支援・生活就労サポート", font=f_jp_sub, fill=(100, 116, 139, 255))

    # 5. Clean Domain Pill
    ry += 48
    domain_text = "demo.douitsu-co.com"
    d_bbox = f_en_url.getbbox(domain_text)
    dw = d_bbox[2] - d_bbox[0] + 32
    dh = 30
    d_img = Image.new('RGBA', (dw, dh), (0, 0, 0, 0))
    d_draw = ImageDraw.Draw(d_img)
    d_draw.rounded_rectangle([0, 0, dw-1, dh-1], radius=15, fill=(239, 246, 255, 255), outline=(191, 219, 254, 255), width=1)
    d_draw.text((16, 5), domain_text, font=f_en_url, fill=(2, 132, 199, 255))
    card.paste(d_img, (rx, ry), d_img)

    # Mask and paste onto background
    mask = Image.new('L', (cw, ch), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, cw-1, ch-1], radius=28, fill=255)
    bg.paste(card, (cx, cy), mask)

    # Save Output Formats
    bg_rgb = bg.convert('RGB')
    bg_rgb.save('public/images/landing/banner.jpg', format='JPEG', quality=95)
    bg.save('public/images/landing/banner.png', format='PNG')
    bg_rgb.save('public/images/landing/twitter-image.jpg', format='JPEG', quality=95)
    print("✓ Minimalist OpenGraph and Twitter images saved to public/images/landing/.")

def generate_manifest():
    print("Writing site.webmanifest...")
    manifest_content = """{
  "name": "DOUITSU合同会社 (DOUITSU LLC)",
  "short_name": "DOUITSU",
  "description": "出入国在留管理庁 登録支援機関 (REG:0A32ES43)",
  "icons": [
    {
      "src": "/images/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/images/icons/maskable-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "theme_color": "#105c8e",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/"
}
"""
    with open('public/site.webmanifest', 'w', encoding='utf-8') as f:
        f.write(manifest_content)
    print("✓ public/site.webmanifest written.")

def main():
    make_dirs()
    logo_path = 'public/images/landing/logo-mark.png'
    if not os.path.exists(logo_path):
        raise FileNotFoundError(f"Logo mark not found at {logo_path}")
    
    logo = Image.open(logo_path).convert('RGBA')
    print(f"Loaded logo mark: {logo.size}")
    
    generate_favicons(logo)
    generate_apple_icons(logo)
    generate_android_pwa_icons(logo)
    generate_og_twitter_banner(logo)
    generate_manifest()
    
    print("\n🎉 All brand assets generated successfully from logo-mark.png!")

if __name__ == '__main__':
    main()
