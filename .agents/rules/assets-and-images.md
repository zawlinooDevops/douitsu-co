---
trigger: always_on
description: Asset Catalog, Image Inventory, PDF Documents, and Zero-CDN Font Pipeline for DOUITSU LLC
---

# Asset Catalog & Media Pipeline Specifications

## 1. Directory Structure

All static media, documents, and fonts are stored under `public/`, served directly by Astro at root URLs:

```text
public/
├── favicon.ico                         # Root multi-resolution website favicon (16-256px)
├── favicon-16x16.png                   # Standard 16x16 PNG favicon
├── favicon-32x32.png                   # Standard 32x32 PNG favicon
├── favicon-48x48.png                   # Standard 48x48 PNG favicon
├── apple-touch-icon.png                # Standard iOS touch icon (180x180)
├── site.webmanifest                    # Web App manifest with icons & brand colors
├── robots.txt                          # Search engine exclusion protocol & sitemap indexes
├── sitemap.xml                         # Root XML sitemap for crawlers
├── fonts/                              # 100% Local TTF font files
│   ├── local-font-1.ttf                # Plus Jakarta Sans Regular (400)
│   ├── local-font-2.ttf                # Noto Sans Myanmar Regular (400)
│   ├── local-font-3.ttf                # Noto Sans Myanmar Bold (700)
│   ├── local-font-4.ttf                # Plus Jakarta Sans Medium (500)
│   ├── local-font-5.ttf                # Plus Jakarta Sans Bold (700)
│   ├── local-font-6.ttf                # Noto Sans Myanmar SemiBold (600)
│   ├── local-font-7.ttf                # Plus Jakarta Sans SemiBold (600)
│   └── local-font-8.ttf                # Plus Jakarta Sans ExtraBold (800)
└── images/
    ├── icons/                          # Web icons, Apple device icons & PWA
    │   ├── android-chrome-192x192.png  # Android home screen icon
    │   ├── android-chrome-512x512.png  # Android splash screen icon
    │   ├── maskable-icon-512x512.png   # PWA adaptive maskable icon
    │   ├── apple-touch-icon-180x180.png# iPhone Retina @3x (180x180)
    │   ├── apple-touch-icon-167x167.png# iPad Pro @2x (167x167)
    │   ├── apple-touch-icon-152x152.png# iPad Retina @2x (152x152)
    │   ├── apple-touch-icon-144x144.png# iPad Retina legacy (144x144)
    │   ├── apple-touch-icon-120x120.png# iPhone Retina @2x (120x120)
    │   ├── apple-touch-icon-114x114.png# iPhone legacy Retina (114x114)
    │   ├── apple-touch-icon-76x76.png  # iPad non-retina (76x76)
    │   ├── apple-touch-icon-72x72.png  # iPad legacy (72x72)
    │   ├── apple-touch-icon-60x60.png  # iPhone legacy (60x60)
    │   ├── apple-touch-icon-57x57.png  # iPhone 1x legacy (57x57)
    │   ├── apple-touch-icon.png        # Default Apple touch icon (180x180)
    │   ├── favicon-16x16.png           # 16x16 PNG favicon
    │   ├── favicon-32x32.png           # 32x32 PNG favicon
    │   ├── favicon-48x48.png           # 48x48 PNG favicon
    │   └── favicon.ico                 # Multi-resolution ICO (16-256px)
    ├── jobs/                           # Job recruitment flyers (7 files)
    │   ├── job-1.jpg
    │   ├── job-2025-11fudo.jpg
    │   ├── job-viber-1.jpg
    │   ├── job-viber-2.jpg
    │   ├── job-viber-3.jpg
    │   ├── job-viber-4.jpg
    │   └── job-yamaguchi.jpg
    └── landing/                        # Landing page visuals & emblems
        ├── about-main.png              # Support workers infographic (2.7 MB)
        ├── banner.jpg                  # OpenGraph & social preview image
        ├── cherry-48.png               # Sakura corner emblem (48x48)
        ├── cherry.png                  # Sakura header decorative emblem
        ├── contact-laptop.jpg          # Contact section visual
        ├── handshake-contract.jpg      # Contract signing visual
        ├── hero-bg.webp                # Optimized hero background (Mt. Fuji)
        ├── license-certificate.jpg     # 2025.7 Official registration certificate
        ├── logo-mark.png               # Main navbar brand emblem
        ├── logo.png                    # Full brand logo
        └── snow-bg.jpg                 # Background subtle texture
```

---

## 2. Landing Page Images (`public/images/landing/`)

| File Name | Dimensions / Format | Semantic Role | Notes |
|---|---|---|---|
| `hero-bg.webp` | WebP (1920x1080) | Above-the-fold hero background | Preloaded in `<head>` for optimal Largest Contentful Paint (LCP) |
| `logo-mark.png` | PNG (Transparent) | Sticky header and footer emblem | Crisp hexagonal brand mark |
| `about-main.png` | PNG (High-Res) | `#support` main infographic | Clickable; triggers Alpine.js lightbox zoom |
| `license-certificate.jpg` | JPEG | `#services` Card 1 official document | Proof of official 2025.7 registration with Immigration Agency |
| `banner.jpg` | JPEG (1200x630) | OpenGraph and Twitter card preview | Branded card with logo-mark, registration badge & company info |
| `banner.png` | PNG (1200x630) | Lossless OpenGraph preview | High-fidelity master banner |
| `twitter-image.jpg` | JPEG (1200x630) | Twitter summary_large_image card | Social card for Twitter / X preview |
| `cherry-48.png` | PNG (48x48) | Feature card top-right ornament | Japanese Sakura cultural motif |
| `cherry.png` | PNG | Decorative title accent | Soft floral branding |

---

## 3. Job Recruitment Posters (`public/images/jobs/`)

Recruitment flyer images utilized in the `#career` interactive table detail popups:

| File Name | Target Industry / Placement | Active Role / Notes |
|---|---|---|
| `job-2025-11fudo.jpg` | Food Processing (食品製造業) | **Active Official Document 1**: High-res A4 recruitment table sheet used in career popups |
| `job-yamaguchi.jpg` | Regional Placement (Yamaguchi / 製造業) | **Active Official Document 2**: High-res A4 recruitment table sheet used in career popups |
| `job-1.jpg` | General Tokutei Ginou | Historical banner archive |
| `job-viber-1.jpg` | Specified Skilled Worker Opening | Historical field photo (Unlinked per user privacy/document-only policy) |
| `job-viber-2.jpg` | Specified Skilled Worker Opening | Historical field photo (Unlinked per user privacy/document-only policy) |
| `job-viber-3.jpg` | Specified Skilled Worker Opening | Historical field photo (Unlinked per user privacy/document-only policy) |
| `job-viber-4.jpg` | Specified Skilled Worker Opening | Historical field photo (Unlinked per user privacy/document-only policy) |

---

## 4. Downloadable Study Guides (Cloudflare R2 Bucket: `https://files.douitsu-co.com/`)

Official exam preparation textbooks for candidates taking the Kaigo (Nursing Care) Tokutei Ginou skill evaluation test, hosted externally on Cloudflare R2 custom domain (`files.douitsu-co.com`) to keep repository and bundle size optimal:

1. **`kaigo-tokuteiginou-japanese.pdf`**:
   - File Size: `38.8 MB`
   - Target Language: Japanese (`日本語版`)
   - URL: `https://files.douitsu-co.com/kaigo-tokuteiginou-japanese.pdf`
   - Content: Complete curriculum for Nursing Care technical terms, hygiene, and caregiving fundamentals.
2. **`kaigo-tokuteiginou-myanmar.pdf`**:
   - File Size: `14.1 MB`
   - Target Language: Myanmar (`ミャンマー語版`)
   - URL: `https://files.douitsu-co.com/kaigo-tokuteiginou-myanmar.pdf`
   - Content: Full translated textbook enabling Myanmar candidates to master caregiving concepts in their native language before sitting for the Japanese exam.

---

## 5. Raw Data Archive (`raw-data/`)

The repository retains a dedicated `raw-data/` folder containing the original website scrapings, section breakdowns, and extraction metadata from October 2026:
- `raw-data/metadata.json`: Machine-readable audit of original HTML structure.
- `raw-data/content.md`: Monolithic extraction of all original page copy.
- `raw-data/sections/`: Individual markdown breakdowns of sections 01 to 07.
- **Rule for Agents**: Do not modify `raw-data/` as it serves as the historical audit trail. All active development takes place in `src/` and `public/`.
