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
[#home: Rich Fuji & Wave] -> [#about: Pure White + Sakura Chirashi Top-Fade] -> [#services: Pure White + Shippo Rings] -> [#support: Ice-Blue + Seigaiha Waves] -> [#flow: Pure White (Clean Minimalist)] -> [#faq: Pure White + Left/Right Dashed Square Grid Accents] -> [#contact: Solid Ice-Blue (#eff6fa)] -> [Footer: Deep Navy]
```

### Core Constraints & Guidelines:
1. **Zero External CDN**: Never load patterns, textures, or shapes from external CDNs. All patterns must be pure inline SVG `<defs><pattern>` or Tailwind utility gradients.
2. **Strict Opacity Range (3% – 14%)**: Subtle background textures range from `opacity-[0.035]` to `opacity-[0.14]` depending on pattern density to maintain pristine readability and WCAG AAA contrast compliance.
3. **Hardware Acceleration & Pointer Isolation**: All decorative layers must include `pointer-events-none` and `overflow-hidden` to avoid layout thrashing and preserve smooth scrolling.
4. **Top-to-Bottom Pattern Fade**: Sections such as `#about` utilize CSS mask gradients (`[mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_90%)]` and `[-webkit-mask-image:...]`) constrained to the top area (`h-[480px] md:h-[540px]`). This enriches the section header and title with brand texture while dissolving cleanly into the solid background behind cards and steps for maximum readability.

---

## 2. Section-by-Section Specifications

| Section ID & Component | Background Styling | Vector Pattern | Graphic Shapes & Accents | Psychological Intent |
|---|---|---|---|---|
| **#about** (`Featured.astro`) | `bg-white border-b border-slate-200/60` | **Japanese Sakura Chirashi (桜散らし - Floating Cherry Flowers & Petals)** (`80x80` tile, top fade mask, `opacity-[0.14]`) | Base wave continuation from Hero (`fill="#ffffff"`), floating 5-petal cherry blossoms with drifting petals | Spring fresh start, welcoming foreign talent, warm corporate authenticity |
| **#services** (`Services.astro`) | `bg-white border-b border-slate-200/60` | **Japanese Shippo (七宝)** (`40x40` intersecting connection circles, `opacity-[0.035]`) | Clean minimal presentation with subtle geometric hover borders on cards | Harmony, bilateral partnership (Japan ⇄ Myanmar), structured career growth |
| **#support** (`About.astro`) | `bg-gradient-to-b from-douitsu-ice/85 via-blue-50/40 to-slate-50/80 border-b border-slate-200/60` | **Japanese Seigaiha (青海波)** (`50x25` traditional calm ocean waves, `opacity-[0.035]`) | Flowing organic wave ribbons, step connector lines between the 10 statutory pillar cards, soft navy glow | Peace, long-term safety, compassionate statutory care for foreign personnel |
| **#flow** (`Flow.astro`) | `bg-white border-b border-slate-200/60` | None (Clean Minimalist White) | 6 sequential onboarding cards with primary blue number badges (`1` to `6`), step indicators, and bottom CTA banner | Procedural precision, structured onboarding steps, administrative clarity |
| **#faq** (`Faq.astro`) | `bg-white border-b border-slate-200/60` | **Dashed Square Grid Flanks (ဘယ်/ညာ အစက်ပြောက် စတုရန်းကွက် ဒီဇိုင်း)** (`32x32` square grid, `stroke-dasharray="3,3"`, `stroke="#94a3b8"`, inward fade mask) | Left and right decorative grid accents flanking 5 interactive Q&A accordion cards with Q/A badges | Modern UI clarity, structured precision, resolving uncertainties with calm elegance |
| **#contact** (`Contact.astro`) | `bg-douitsu-ice relative overflow-hidden scroll-mt-24` | None (Solid Ice-Blue `#eff6fa`) | Elevated white office info & form cards (`bg-white shadow-sm border border-slate-200/80`), smooth transition into deep navy footer | Accessibility, verified Tokyo Kiyose HQ presence, reassuring consultation |

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

### D. Coordinates Matrix / Map Crosshairs (`#contact`)
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

### E. Japanese Sakura Chirashi (桜散らし - Floating Cherry Flowers & Petals with Top Fade) (`#flow`)
```html
<div class="absolute inset-x-0 top-0 h-[480px] md:h-[540px] pointer-events-none overflow-hidden opacity-[0.14] [mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_90%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_90%)]">
  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="flow-sakura-chirashi" width="80" height="80" patternUnits="userSpaceOnUse">
        <g fill="none" stroke="#105c8e" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">
          <!-- Center Full Blossom (40, 40) -->
          <g transform="translate(40, 40) rotate(15) scale(0.8)">
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(72)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(144)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(216)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(288)" />
            <circle cx="0" cy="0" r="1.8" fill="#105c8e" />
          </g>
          <!-- Corner Blossoms (0,0 / 80,0 / 0,80 / 80,80) -->
          <g transform="translate(0, 0) rotate(48) scale(0.8)">
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(72)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(144)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(216)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(288)" />
            <circle cx="0" cy="0" r="1.8" fill="#105c8e" />
          </g>
          <!-- Floating Petals Dancing in the Breeze -->
          <path d="M 0,-6 C -2.2,-4 -3.8,-1 -2.2,2.2 C -1,4.5 1.5,5 2.5,3 C 3.8,0.8 3.2,-2 1.5,-4.2 C 0.8,-5.5 0,-6 0,-6 Z" transform="translate(20, 22) rotate(75) scale(1.1)" />
          <path d="M 0,-6 C -2.2,-4 -3.8,-1 -2.2,2.2 C -1,4.5 1.5,5 2.5,3 C 3.8,0.8 3.2,-2 1.5,-4.2 C 0.8,-5.5 0,-6 0,-6 Z" transform="translate(62, 18) rotate(-40) scale(0.95)" />
          <path d="M 0,-6 C -2.2,-4 -3.8,-1 -2.2,2.2 C -1,4.5 1.5,5 2.5,3 C 3.8,0.8 3.2,-2 1.5,-4.2 C 0.8,-5.5 0,-6 0,-6 Z" transform="translate(18, 60) rotate(35) scale(1.15)" />
          <path d="M 0,-6 C -2.2,-4 -3.8,-1 -2.2,2.2 C -1,4.5 1.5,5 2.5,3 C 3.8,0.8 3.2,-2 1.5,-4.2 C 0.8,-5.5 0,-6 0,-6 Z" transform="translate(60, 62) rotate(-15) scale(1.0)" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#flow-sakura-chirashi)" />
  </svg>
</div>
```

### F. Japanese Sakura-Kikkou (桜亀甲 - Corporate Hexagonal Sakura Lattice with Top Fade) (`#faq`)
```html
<div class="absolute inset-x-0 top-0 h-[480px] md:h-[540px] pointer-events-none overflow-hidden opacity-[0.14] [mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_90%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_90%)]">
  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="faq-sakura-kikkou" width="40" height="72" patternUnits="userSpaceOnUse">
        <!-- Hexagonal Honeycomb Framework -->
        <path
          d="M 0,24 L 20,12 L 40,24 M 0,48 L 20,60 L 40,48 M 0,24 L 0,48 M 20,60 L 20,84"
          fill="none"
          stroke="#105c8e"
          stroke-width="1.15"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <!-- Delicate Sakura Blossoms centered in each cell -->
        <g fill="none" stroke="#105c8e" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
          <g transform="translate(20, 36) scale(0.45)">
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(72)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(144)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(216)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(288)" />
            <circle cx="0" cy="0" r="2" fill="#105c8e" />
          </g>
          <g transform="translate(0, 0) rotate(36) scale(0.45)">
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(72)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(144)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(216)" />
            <path d="M 0,0 C -3.5,-3.5 -6.5,-8.5 -4.5,-13 C -2.5,-15.5 -0.8,-13.2 0,-10.5 C 0.8,-13.2 2.5,-15.5 4.5,-13 C 6.5,-8.5 3.5,-3.5 0,0 Z" transform="rotate(288)" />
            <circle cx="0" cy="0" r="2" fill="#105c8e" />
          </g>
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#faq-sakura-kikkou)" />
  </svg>
</div>
```
