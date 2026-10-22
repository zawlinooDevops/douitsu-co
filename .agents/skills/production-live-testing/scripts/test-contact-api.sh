#!/usr/bin/env bash
set -euo pipefail

TARGET_HOST="https://douitsu-co.com"
ENDPOINT="${TARGET_HOST}/api/contact"

echo "============================================================"
echo "🛡️  DOUITSU LLC Contact API & Security Gate Live Verification"
echo "Target Endpoint: ${ENDPOINT}"
echo "============================================================"
echo ""

TOTAL_TESTS=4
PASSED_TESTS=0

# Test 1: GET Request should be rejected with 405 Method Not Allowed
echo "▶ Test 1: Verifying HTTP Method restriction (GET -> 405)..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X GET "${ENDPOINT}")
if [ "${HTTP_CODE}" = "405" ]; then
  echo "  ✅ PASS: GET request rejected with 405 Method Not Allowed"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo "  ❌ FAIL: Expected 405, got ${HTTP_CODE}"
fi

# Test 2: Untrusted Origin should be rejected with 403 Forbidden (CSRF protection)
echo "▶ Test 2: Verifying CSRF / Untrusted Origin Gate..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -H "Origin: https://malicious-site.example.com" \
  -d '{"name":"Test Bot"}')
if [ "${HTTP_CODE}" = "403" ]; then
  echo "  ✅ PASS: Cross-origin request rejected with 403 Forbidden"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo "  ❌ FAIL: Expected 403, got ${HTTP_CODE}"
fi

# Test 3: Missing Turnstile Token should be rejected with 403 CAPTCHA_REQUIRED
echo "▶ Test 3: Verifying Cloudflare Turnstile token enforcement..."
RESPONSE_BODY=$(curl -s -X POST "${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -H "Origin: ${TARGET_HOST}" \
  -d '{"name":"Test User","email":"test@example.com","phone":"08012345678","message":"Testing message without token"}')
if echo "${RESPONSE_BODY}" | grep -q "CAPTCHA_REQUIRED"; then
  echo "  ✅ PASS: Missing Turnstile token caught (CAPTCHA_REQUIRED)"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo "  ❌ FAIL: Expected CAPTCHA_REQUIRED error, got: ${RESPONSE_BODY}"
fi

# Test 4: Honeypot field filled should be shadow-dropped with 200 OK
echo "▶ Test 4: Verifying Honeypot bot trap shadow-drop..."
RESPONSE_BODY=$(curl -s -X POST "${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -H "Origin: ${TARGET_HOST}" \
  -d '{"name":"Bot Spammer","email":"spambot@example.com","phone":"08012345678","message":"Spam payload","website":"http://spamlink.com","turnstileToken":"dummy-token"}')
if echo "${RESPONSE_BODY}" | grep -q "shadow-drop-honeypot"; then
  echo "  ✅ PASS: Bot trap triggered with silent 200 OK (shadow-drop-honeypot)"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo "  ❌ FAIL: Expected shadow-drop-honeypot response, got: ${RESPONSE_BODY}"
fi

echo ""
echo "============================================================"
echo "📊 Results: ${PASSED_TESTS} / ${TOTAL_TESTS} Tests Passed"
if [ "${PASSED_TESTS}" -eq "${TOTAL_TESTS}" ]; then
  echo "🎉 Live Contact API security pipeline is 100% operational!"
  echo "============================================================"
  exit 0
else
  echo "⚠️ Some security tests failed! Check output above."
  echo "============================================================"
  exit 1
fi
