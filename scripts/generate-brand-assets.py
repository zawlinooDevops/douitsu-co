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
    print("Generating OpenGraph & Twitter Cards (1200x630)...")
    W, H = 1200, 630

    # Load Background: Mt Fuji darkened with navy overlay
    bg_photo = Image.open('public/images/landing/hero-bg.webp').convert('RGBA')
    bg_ratio = max(W / bg_photo.width, H / bg_photo.height)
    bg_resized = bg_photo.resize((int(bg_photo.width * bg_ratio), int(bg_photo.height * bg_ratio)), Image.Resampling.LANCZOS)
    left = (bg_resized.width - W) // 2
    top = (bg_resized.height - H) // 2
    bg = bg_resized.crop((left, top, left + W, top + H))
    bg = bg.filter(ImageFilter.GaussianBlur(radius=4))

    # Rich Navy Gradient Overlay
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_ol = ImageDraw.Draw(overlay)
    for y in range(H):
        factor = y / H
        r = int(11 + factor * 6)
        g = int(22 + factor * 12)
        b = int(42 + factor * 22)
        alpha = int(225 + factor * 20)
        draw_ol.line([(0, y), (W, y)], fill=(r, g, b, alpha))
    bg.paste(overlay, (0, 0), overlay)

    # Accent gradient glow behind logo & header
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_glow = ImageDraw.Draw(glow)
    draw_glow.ellipse([70, 90, 480, 500], fill=(37, 99, 235, 75))
    draw_glow.ellipse([650, 40, 1150, 320], fill=(30, 58, 138, 55))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=65))
    bg.paste(glow, (0, 0), glow)

    # Left: White Card for Logo-Mark
    card_w, card_h = 330, 370
    card_x, card_y = 70, (H - card_h) // 2 - 20

    # Soft shadow for card
    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_sh = ImageDraw.Draw(shadow)
    draw_sh.rounded_rectangle([card_x-4, card_y+10, card_x+card_w+4, card_y+card_h+20], radius=28, fill=(0, 0, 0, 110))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=16))
    bg.paste(shadow, (0, 0), shadow)

    card = Image.new('RGBA', (card_w, card_h), (255, 255, 255, 248))
    draw_card = ImageDraw.Draw(card)
    draw_card.rounded_rectangle([0, 0, card_w-1, card_h-1], radius=24, outline=(226, 232, 240, 255), width=2)

    # Place logo in card
    logo_target_h = int(card_h * 0.74)
    l_ratio = logo_target_h / logo.height
    logo_target_w = int(logo.width * l_ratio)
    logo_r = logo.resize((logo_target_w, logo_target_h), Image.Resampling.LANCZOS)
    card.paste(logo_r, ((card_w - logo_target_w) // 2, (card_h - logo_target_h) // 2), logo_r)

    mask_card = Image.new('L', (card_w, card_h), 0)
    ImageDraw.Draw(mask_card).rounded_rectangle([0, 0, card_w-1, card_h-1], radius=24, fill=255)
    bg.paste(card, (card_x, card_y), mask_card)

    # Right: Typography & Content
    draw = ImageDraw.Draw(bg)

    tx = 445
    ty = card_y + 8

    # 1. Government Registration Badge
    f_badge = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc', 16)
    badge_text = '出入国在留管理庁 登録支援機関 (REG:0A32ES43)'
    badge_bbox = f_badge.getbbox(badge_text)
    bw = badge_bbox[2] - badge_bbox[0] + 50
    bh = 34
    badge_img = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
    draw_b = ImageDraw.Draw(badge_img)
    draw_b.rounded_rectangle([0, 0, bw-1, bh-1], radius=17, fill=(15, 38, 72, 230), outline=(59, 130, 246, 140), width=1)
    # Green pulse dot
    draw_b.ellipse([14, 12, 22, 20], fill=(16, 185, 129, 255))
    draw_b.text((30, 7), badge_text, font=f_badge, fill=(240, 247, 255, 255))
    bg.paste(badge_img, (tx, ty), badge_img)

    # 2. Main Title Row
    ty += 48
    f_jp_title = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc', 48)
    f_en_title = ImageFont.truetype('public/fonts/local-font-8.ttf', 28)
    draw.text((tx, ty), 'DOUITSU合同会社', font=f_jp_title, fill=(255, 255, 255, 255))

    # Subtitle / English Company
    ty += 64
    draw.text((tx, ty), 'DOUITSU LLC  —  Registered Support Organization', font=f_en_title, fill=(96, 165, 250, 255))

    # 3. Tagline / Services
    ty += 52
    f_sub = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc', 23)
    draw.text((tx, ty), '特定技能 1号 外国人採用・生活就労支援', font=f_sub, fill=(241, 245, 249, 255))

    # 4. Sector Pills
    ty += 44
    f_pill = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc', 15)

    pills = [
        '介護 (Kaigo)',
        '外食業 (Food Service)',
        '食品製造業 (Food Mfg)'
    ]
    px = tx
    for p_label in pills:
        p_box = f_pill.getbbox(p_label)
        pw = p_box[2] - p_box[0] + 32
        ph = 32
        p_img = Image.new('RGBA', (pw, ph), (0, 0, 0, 0))
        p_draw = ImageDraw.Draw(p_img)
        p_draw.rounded_rectangle([0, 0, pw-1, ph-1], radius=10, fill=(30, 58, 105, 210), outline=(96, 165, 250, 110), width=1)
        p_draw.ellipse([10, 13, 16, 19], fill=(96, 165, 250, 255))
        p_draw.text((22, 6), p_label, font=f_pill, fill=(255, 255, 255, 255))
        bg.paste(p_img, (px, ty), p_img)
        px += pw + 10

    # Language indicators pill (Shaped with RAQM)
    f_pill_my = ImageFont.truetype('public/fonts/local-font-6.ttf', 15, layout_engine=ImageFont.Layout.RAQM)
    lang_img = Image.new('RGBA', (215, 32), (0, 0, 0, 0))
    l_draw = ImageDraw.Draw(lang_img)
    l_draw.rounded_rectangle([0, 0, 214, 31], radius=10, fill=(16, 35, 60, 200), outline=(148, 163, 184, 80), width=1)
    f_lang_en = ImageFont.truetype('public/fonts/local-font-7.ttf', 13)
    f_lang_jp = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc', 13)
    l_draw.text((12, 7), '日本語', font=f_lang_jp, fill=(203, 213, 225, 255))
    l_draw.text((64, 7), '|', font=f_lang_en, fill=(100, 116, 139, 255))
    l_draw.text((78, 7), 'ENGLISH', font=f_lang_en, fill=(203, 213, 225, 255))
    l_draw.text((144, 7), '|', font=f_lang_en, fill=(100, 116, 139, 255))
    l_draw.text((158, 6), 'မြန်မာ', font=f_pill_my, fill=(203, 213, 225, 255))
    bg.paste(lang_img, (px, ty), lang_img)

    # Statutory summary
    ty += 46
    f_stat = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc', 18)
    draw.text((tx, ty), '法定支援10項目を完全網羅  •  企業と外国人財をつなぐワンストップ伴走', font=f_stat, fill=(148, 163, 184, 255))

    # Bottom Bar
    f_foot_en = ImageFont.truetype('public/fonts/local-font-7.ttf', 18)
    f_foot_jp = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc', 17)

    draw.line([(70, H - 72), (W - 70, H - 72)], fill=(255, 255, 255, 45), width=1)

    bot_y = H - 50
    draw.text((70, bot_y), 'WEB: www.douitsu-co.com', font=f_foot_en, fill=(147, 197, 253, 255))
    draw.text((450, bot_y), '所在地: 東京都清瀬市元町1-11-21', font=f_foot_jp, fill=(148, 163, 184, 255))
    draw.text((860, bot_y), 'TEL: 042-497-1537', font=f_foot_en, fill=(226, 232, 240, 255))

    # Corner sakura accent
    cherry = Image.open('public/images/landing/cherry-48.png').convert('RGBA')
    cherry_r = cherry.resize((36, 36), Image.Resampling.LANCZOS)
    bg.paste(cherry_r, (W - 80, 36), cherry_r)

    # Save Output Formats
    bg_rgb = bg.convert('RGB')
    bg_rgb.save('public/images/landing/banner.jpg', format='JPEG', quality=95)
    bg.save('public/images/landing/banner.png', format='PNG')
    bg_rgb.save('public/images/landing/twitter-image.jpg', format='JPEG', quality=95)
    print("✓ OpenGraph and Twitter images saved to public/images/landing/.")

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
  "theme_color": "#1e3a8a",
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
