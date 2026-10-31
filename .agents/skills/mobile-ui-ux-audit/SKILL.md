---
name: mobile-ui-ux-audit
description: >-
  Automated and manual audit procedures for mobile viewports, responsive layouts,
  typography line-heights, Myanmar script diacritic collisions, tap targets, and
  excessive section scroll lengths on DOUITSU LLC (https://douitsu-co.com or local dist/).
---

# Mobile View & UI/UX Standards Audit Skill

This skill provides automated and manual procedures to inspect, benchmark, and audit the mobile responsiveness, visual layout quality, typography line-heights, and UI/UX standards on **DOUITSU LLC (`https://douitsu-co.com` or local `dist/`)**.

Whenever the user or an agent asks to:
- Test mobile viewports (320px, 360px, 375px, 390px, 412px)
- Check for horizontal overflow (`scrollWidth > clientWidth`)
- Detect overlapping / colliding text or Myanmar diacritic clipping
- Audit sections with excessively long scrolling (sections > 1.5x - 2.0x viewport height)
- Verify mobile touch target sizes (< 44px or < 48px guidelines)
- Inspect trilingual layout parity across Japanese (`ja`), English (`en`), and Myanmar (`my`)

Run this skill and follow the standard procedures below.

---

## 🚀 Automated Execution Command

Run the zero-dependency automated Node.js CDP audit runner:

```bash
# Standard console table output (tests local dist/ automatically)
node .agents/skills/mobile-ui-ux-audit/scripts/audit-mobile-uiux.mjs

# Or generate clean GitHub-Flavored Markdown table for chat reports
node .agents/skills/mobile-ui-ux-audit/scripts/audit-mobile-uiux.mjs --markdown

# Or test live production directly
TARGET_HOST=https://douitsu-co.com node .agents/skills/mobile-ui-ux-audit/scripts/audit-mobile-uiux.mjs

# Or via npm script
npm run audit:mobile
```

---

## 📐 Monitored Mobile Matrix

The automated runner tests across all 4 standard industry mobile screen tiers:

| Device Tier | Viewport Dimensions | Device Pixel Ratio (DPR) | Target Use Case |
|---|:---:|:---:|---|
| **1. Ultra-Compact** | `320 x 568` | `2.0` | iPhone SE (1st Gen), small entry Android |
| **2. Android Standard** | `360 x 800` | `3.0` | Samsung Galaxy S-series, Redmi, Vivo |
| **3. iPhone Modern** | `390 x 844` | `3.0` | iPhone 12, 13, 14, 15, 16 standard |
| **4. Android Large** | `412 x 915` | `2.625` | Google Pixel 7/8/9, Galaxy Plus / Ultra |

---

## 🔬 Core UI/UX Verification Gates

### 1. Zero Horizontal Overflow Gate
* **Rule**: Neither `<html>` nor `<body>` may have `scrollWidth > clientWidth`.
* **Sub-element Boundary**: No child element bounding rect may exceed `clientWidth + 1px`.
* **Common Pitfalls**:
  * Unconstrained CSS blur glow orbs (`w-96` with `-right-20` without `overflow-x-clip`).
  * Rotated elements (`transform: rotate(4.5deg) translate3d(12px, ...)`) protruding past screen edges.

### 2. Excessive Section Scroll Length Gate
* **Threshold**:
  * Normal section height: `< 1.2x` mobile viewport height.
  * Heavy section height: `1.5x - 2.0x` mobile viewport height (requires optimization).
  * Critical section height: `> 2.0x` mobile viewport height (causes user fatigue).
* **Monitored Sections**:
  * `#services`: Must not stack 3 giant cards with bloated vertical padding.
  * `#support`: 10 statutory support duties must use a compact layout rather than 10 separate full-width vertical blocks.
  * `#sectors`: 4 sector cards must use compact cards or 2-column grid instead of 4 giant vertical image blocks.

### 3. Myanmar Typography & Line-Height Standards
* **Line-Height Standard**: Myanmar Unicode script requires `line-height >= 1.4` (Tailwind `leading-normal` or `leading-relaxed`). Never use `leading-tight` on headings containing Myanmar text.
* **Diacritic & Tone Collision**: Subscripts (`ု`, `္`, `ှ`) and superscripts/tone marks (`ေ`, `ံ`, `့`) must not collide between adjacent lines or touch decorative underline rules.
* **Compound Word Breaking**: Do not split Myanmar compound words across lines (e.g., `ခေါ်` and `ယူ`, `သတ်မှတ်` and `ချက်`).

### 4. Mobile Touch Target Accessibility (WCAG 2.5.5)
* **Standard**: All interactive elements (`<button>`, `<a>`, `<input>`, `<textarea>`) must meet the minimum target size of `44 x 44px` (Apple Human Interface Guidelines) or `48 x 48px` (Google Material Design & Android Accessibility).
* **Audit Check**: Language switcher buttons, close icons, accordion toggles, and form inputs must provide adequate touch padding.

### 5. Synchronous Trilingual Parity
* **Rule**: Every user-facing UI label, button, and badge must have valid strings in all three languages (`ja`, `en`, `my`). Hardcoded English strings (e.g. "Download") in non-English modes are strictly prohibited.

---

## 🛠️ Step-by-Step UI/UX Audit Runbook

1. **Pre-flight Build**: Ensure the static build is updated:
   ```bash
   npm run build
   ```
2. **Execute Automated Mobile Audit**:
   ```bash
   node .agents/skills/mobile-ui-ux-audit/scripts/audit-mobile-uiux.mjs --markdown
   ```
3. **Inspect Output**:
   - Check if any viewport flags `❌ HORIZONTAL OVERFLOW`.
   - Review the list of sections exceeding `1.5x` screen multiplier.
   - Inspect low line-height headings and small tap targets.
4. **Visual Review with Headless Screenshots (Optional)**:
   ```bash
   SAVE_SCREENSHOTS=true node .agents/skills/mobile-ui-ux-audit/scripts/audit-mobile-uiux.mjs
   ```
5. **Verify Quality Pipeline**: Ensure all code changes pass the full project validation:
   ```bash
   npm run validate
   ```
