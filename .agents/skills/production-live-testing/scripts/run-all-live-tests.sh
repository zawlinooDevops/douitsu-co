#!/usr/bin/env bash
set -euo pipefail

TARGET_HOST="${TARGET_HOST:-https://douitsu-co.com}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"

echo "=================================================================="
echo "🚀 DOUITSU LLC — Master Production Live Testing Suite"
echo "🌐 Target Host: ${TARGET_HOST}"
echo "📅 Date: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
echo "=================================================================="
echo ""

# ------------------------------------------------------------------
# Stage 1: Domain, HTTPS & Canonical Redirect Gate
# ------------------------------------------------------------------
echo "▶ [Stage 1/6] Domain, SSL & Canonical Redirects Gate..."
ROOT_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${TARGET_HOST}")
WWW_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://www.douitsu-co.com")
WWW_LOCATION=$(curl -sI "https://www.douitsu-co.com" | grep -i "location:" | tr -d '\r\n' || echo "")

if [ "${ROOT_STATUS}" = "200" ]; then
  echo "  ✅ PASS: Canonical domain ${TARGET_HOST} returned HTTP 200"
else
  echo "  ❌ FAIL: Canonical domain returned HTTP ${ROOT_STATUS}"
  exit 1
fi

if [ "${WWW_STATUS}" = "301" ]; then
  echo "  ✅ PASS: www.douitsu-co.com correctly 301 redirects (${WWW_LOCATION})"
else
  echo "  ⚠️ WARN: www.douitsu-co.com returned HTTP ${WWW_STATUS}"
fi
echo ""

# ------------------------------------------------------------------
# Stage 2: Static Assets & R2 Storage Verification
# ------------------------------------------------------------------
echo "▶ [Stage 2/6] Static Assets & R2 Storage Pipeline Audit..."
node "${SCRIPT_DIR}/verify-assets.mjs"
echo ""

# ------------------------------------------------------------------
# Stage 3: Cloudflare Edge Cache Audit
# ------------------------------------------------------------------
echo "▶ [Stage 3/6] Cloudflare Edge Cache Verification (cf-cache-status)..."
node "${SKILLS_DIR}/cloudflare-cache-audit/scripts/audit-cloudflare-cache.mjs"
echo ""

# ------------------------------------------------------------------
# Stage 4: Live Schema.org JSON-LD Structured Data Audit
# ------------------------------------------------------------------
echo "▶ [Stage 4/6] Schema.org JSON-LD Structured Data Audit..."
node "${SCRIPT_DIR}/verify-schema-live.mjs"
echo ""

# ------------------------------------------------------------------
# Stage 5: Contact API & Edge Security Gate
# ------------------------------------------------------------------
echo "▶ [Stage 5/6] Contact API & Edge Security Gate (9 Automated Tests)..."
bash "${SCRIPT_DIR}/test-contact-api.sh"
echo ""

# ------------------------------------------------------------------
# Stage 6: Mobile Viewport & UI/UX Standards Audit
# ------------------------------------------------------------------
echo "▶ [Stage 6/6] Mobile Viewport & UI/UX Standards Audit..."
TARGET_HOST="${TARGET_HOST}" node "${SKILLS_DIR}/mobile-ui-ux-audit/scripts/audit-mobile-uiux.mjs"
echo ""

echo "=================================================================="
echo "🎉 ALL PRODUCTION LIVE TESTING STAGES COMPLETED SUCCESSFULLY!"
echo "=================================================================="
