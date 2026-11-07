#!/usr/bin/env bash
# ==============================================================================
# DOUITSU LLC — Code & Build Validation Pipeline
# Pipeline Stages:
#   1. ESLint (JavaScript / TypeScript / Astro linting)
#   2. CSS Check (Stylelint for Tailwind & Custom CSS)
#   3. Astro Check (TypeScript types & Astro template validation)
#   4. Production Build (Astro SSG static site generation)
#   5. HTML Validate (W3C / HTML5 spec validation on dist/)
#   6. Schema.org Validate (JSON-LD structured data validation on dist/)
#   7. Image & Media Validate (Zero broken images / missing assets on dist/)
#   8. Link & Anchor Validate (Zero broken links / missing anchors on dist/)
# ==============================================================================

set -euo pipefail

# Text formatting
BOLD="\033[1m"
GREEN="\033[0;32m"
RED="\033[0;31m"
CYAN="\033[0;36m"
YELLOW="\033[1;33m"
RESET="\033[0m"

echo -e "\n${BOLD}${CYAN}=====================================================${RESET}"
echo -e "${BOLD}${CYAN}   DOUITSU LLC — Validation Pipeline Starting        ${RESET}"
echo -e "${BOLD}${CYAN}=====================================================${RESET}\n"

# Stage 1: ESLint
echo -e "${YELLOW}[Stage 1/8] Running ESLint...${RESET}"
if npx eslint .; then
  echo -e "${GREEN}✓ Stage 1 Passed: ESLint clean.${RESET}\n"
else
  echo -e "${RED}✗ Stage 1 Failed: ESLint found issues.${RESET}\n"
  exit 1
fi

# Stage 2: CSS Check
echo -e "${YELLOW}[Stage 2/8] Running CSS Stylelint...${RESET}"
if npx stylelint "src/**/*.css"; then
  echo -e "${GREEN}✓ Stage 2 Passed: Stylelint clean.${RESET}\n"
else
  echo -e "${RED}✗ Stage 2 Failed: Stylelint found issues.${RESET}\n"
  exit 1
fi

# Stage 3: Astro Check
echo -e "${YELLOW}[Stage 3/8] Running Astro Type & Diagnostic Check...${RESET}"
if npx astro check; then
  echo -e "${GREEN}✓ Stage 3 Passed: Astro Check clean (0 errors, 0 warnings).${RESET}\n"
else
  echo -e "${RED}✗ Stage 3 Failed: Astro Check found diagnostics.${RESET}\n"
  exit 1
fi

# Stage 4: Astro Build
echo -e "${YELLOW}[Stage 4/8] Running Production Build...${RESET}"
if npm run build; then
  echo -e "${GREEN}✓ Stage 4 Passed: Production Build succeeded.${RESET}\n"
else
  echo -e "${RED}✗ Stage 4 Failed: Production Build failed.${RESET}\n"
  exit 1
fi

# Stage 5: HTML Validate
echo -e "${YELLOW}[Stage 5/8] Running HTML-Validate on dist/ output...${RESET}"
if npx html-validate dist/; then
  echo -e "${GREEN}✓ Stage 5 Passed: HTML Validation clean.${RESET}\n"
else
  echo -e "${RED}✗ Stage 5 Failed: HTML Validation found issues.${RESET}\n"
  exit 1
fi

# Stage 6: Schema.org Validation
echo -e "${YELLOW}[Stage 6/8] Running Schema.org JSON-LD Validation...${RESET}"
if node ./scripts/verify-schema.mjs; then
  echo -e "${GREEN}✓ Stage 6 Passed: Schema.org JSON-LD clean.${RESET}\n"
else
  echo -e "${RED}✗ Stage 6 Failed: Schema.org validation found issues.${RESET}\n"
  exit 1
fi

# Stage 7: Broken Images Check
echo -e "${YELLOW}[Stage 7/8] Running Broken Images & Media Asset Check...${RESET}"
if node ./scripts/verify-images.mjs; then
  echo -e "${GREEN}✓ Stage 7 Passed: All images and media assets verified.${RESET}\n"
else
  echo -e "${RED}✗ Stage 7 Failed: Broken/missing images found.${RESET}\n"
  exit 1
fi

# Stage 8: Broken Links Check
echo -e "${YELLOW}[Stage 8/8] Running Broken Links & Anchor Navigation Check...${RESET}"
if node ./scripts/verify-links.mjs; then
  echo -e "${GREEN}✓ Stage 8 Passed: All links and anchor targets verified.${RESET}\n"
else
  echo -e "${RED}✗ Stage 8 Failed: Broken links/anchors found.${RESET}\n"
  exit 1
fi

echo -e "${BOLD}${GREEN}=====================================================${RESET}"
echo -e "${BOLD}${GREEN}   All 8 Validation Checks Passed Successfully! 🎉  ${RESET}"
echo -e "${BOLD}${GREEN}=====================================================${RESET}\n"
