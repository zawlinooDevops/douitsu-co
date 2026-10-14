---
trigger: always_on
description: Background Colors, SVG Patterns, Graphic Shapes, and Visual Rhythm Specifications for DOUITSU LLC Sections
---

# Section Background Colors, Patterns & Graphic Shapes Specifications

This document defines the visual atmosphere, color transitions, vector patterns, and decorative graphic shapes across all landing page sections for **DOUITSU LLC (DOUITSU合同会社)**.

---

## 1. Visual Rhythm & Section Alternation Strategy

To prevent visual fatigue and create a structured B2B corporate browsing journey, sections follow an alternating contrast rhythm:

```text
[#home: Rich Fuji & Wave] -> [#about: Slate-50 + Dot Grid] -> [#services: Pure White + Shippo Rings] -> [#support: Ice-Blue + Seigaiha Waves] -> [#career: Slate-50 + Diagonal Lines] -> [#contact: White/Ice + Coordinate Grid] -> [Footer: Deep Navy]
```

### Core Constraints & Guidelines:
1. **Zero External CDN**: Never load patterns, textures, or shapes from external CDNs. All patterns must be pure inline SVG `<defs><pattern>` or Tailwind utility gradients.
2. **Strict Opacity Range (3% – 6%)**: Background vector patterns must remain subtle background textures (`opacity-[0.03]` to `opacity-[0.05]`) so they never degrade text legibility or WCAG AAA contrast compliance.
3. **Hardware Acceleration & Pointer Isolation**: All decorative layers must include `pointer-events-none` and `overflow-hidden` to avoid layout thrashing and preserve smooth scrolling.

---

## 2. Section-by-Section Specifications

| Section ID & Component | Background Styling | Vector Pattern | Graphic Shapes & Accents | Psychological Intent |
|---|---|---|---|---|
| **#about** (`Featured.astro`) | `bg-slate-50/90 border-b border-slate-200/60` | **Technical Dot-Grid** (`24x24` grid with `r=1.5` circles, `opacity-[0.04]`) | Top wave continuation, floating soft sky glow orb (`bg-douitsu-sky/15 blur-3xl`), card border notches | Corporate authenticity, registered agency trust, statutory precision |
| **#services** (`Services.astro`) | `bg-white border-b border-slate-200/60` | **Japanese Shippo (七宝)** (`40x40` intersecting connection circles, `opacity-[0.035]`) | Clean minimal presentation with subtle geometric hover borders on cards | Harmony, bilateral partnership (Japan ⇄ Myanmar), structured career growth |
| **#support** (`About.astro`) | `bg-gradient-to-b from-douitsu-ice/85 via-blue-50/40 to-slate-50/80 border-b border-slate-200/60` | **Japanese Seigaiha (青海波)** (`50x25` traditional calm ocean waves, `opacity-[0.035]`) | Flowing organic wave ribbons, step connector lines between the 10 statutory pillar cards, soft navy glow | Peace, long-term safety, compassionate statutory care for foreign personnel |
| **#career** (`Career.astro`) | `bg-slate-50/90 border-b border-slate-200/60` | **45° Micro Diagonal Lines** (`16x16` tech hatching, `opacity-[0.035]`) | Clean full-width search & filter panel, transparent compensation table | Dynamic opportunity, momentum, transparent compensation display |
| **#contact** (`Contact.astro`) | `bg-gradient-to-b from-white via-slate-50/50 to-douitsu-ice/30` | **Topographic Coordinates Grid** (`36x36` lat/long crosshair grid, `opacity-[0.035]`) | Modern card drop shadows, clean consultation form, smooth horizon gradient fading into deep navy footer | Accessibility, verified Tokyo Kiyose HQ presence, reassuring consultation |

---

## 3. Pattern Implementation Standards

### A. Technical Dot-Grid (`#about`)
```html
<div class="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="about-dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#105c8e" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#about-dot-grid)" />
  </svg>
</div>
```

### B. Japanese Shippo (七宝 - Connection Rings) (`#services`)
```html
<div class="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.035]">
  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="services-shippo" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="0" cy="0" r="20" fill="none" stroke="#105c8e" stroke-width="1.2" />
        <circle cx="40" cy="0" r="20" fill="none" stroke="#105c8e" stroke-width="1.2" />
        <circle cx="0" cy="40" r="20" fill="none" stroke="#105c8e" stroke-width="1.2" />
        <circle cx="40" cy="40" r="20" fill="none" stroke="#105c8e" stroke-width="1.2" />
        <circle cx="20" cy="20" r="20" fill="none" stroke="#105c8e" stroke-width="1.2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#services-shippo)" />
  </svg>
</div>
```

### C. Japanese Seigaiha (青海波 - Ocean Waves) (`#support`)
```html
<div class="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.035]">
  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="support-seigaiha" width="50" height="25" patternUnits="userSpaceOnUse">
        <path d="M 0,25 A 25,25 0 0,1 50,25 M 5,25 A 20,20 0 0,1 45,25 M 10,25 A 15,15 0 0,1 40,25 M 15,25 A 10,10 0 0,1 35,25 M 20,25 A 5,5 0 0,1 30,25" fill="none" stroke="#105c8e" stroke-width="1.2" />
        <path d="M 25,0 A 25,25 0 0,1 75,0 M 30,0 A 20,20 0 0,1 70,0 M 35,0 A 15,15 0 0,1 65,0 M 40,0 A 10,10 0 0,1 60,0 M 45,0 A 5,5 0 0,1 55,0" fill="none" stroke="#105c8e" stroke-width="1.2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#support-seigaiha)" />
  </svg>
</div>
```

### D. Dynamic 45° Diagonal Hatching (`#career`)
```html
<div class="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="career-stripes" width="16" height="16" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="16" stroke="#105c8e" stroke-width="2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#career-stripes)" />
  </svg>
</div>
```

### E. Coordinates Matrix / Map Crosshairs (`#contact`)
```html
<div class="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.035]">
  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="contact-coords" width="36" height="36" patternUnits="userSpaceOnUse">
        <path d="M 18,14 L 18,22 M 14,18 L 22,18" stroke="#105c8e" stroke-width="1" />
        <circle cx="18" cy="18" r="1" fill="#105c8e" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#contact-coords)" />
  </svg>
</div>
```
