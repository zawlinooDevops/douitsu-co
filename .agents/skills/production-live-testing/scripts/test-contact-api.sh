#!/usr/bin/env bash
set -euo pipefail

TARGET_HOST="https://douitsu-co.com"
ENDPOINT="${TARGET_HOST}/api/contact"

echo "============================================================"
echo "🛡️  DOUITSU LLC Contact API & Edge Security Gate Audit"
echo "Target Endpoint: ${ENDPOINT}"
echo "============================================================"
echo ""

TOTAL_TESTS=8
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

# Test 2: Non-JSON Content-Type should be rejected with 415 Unsupported Media Type
echo "▶ Test 2: Verifying Content-Type restriction (!application/json -> 415)..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${ENDPOINT}" \
  -H "Content-Type: text/plain" \
  -d "plain text body")
if [ "${HTTP_CODE}" = "415" ]; then
  echo "  ✅ PASS: Invalid media type rejected with 415 Unsupported Media Type"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo "  ❌ FAIL: Expected 415, got ${HTTP_CODE}"
fi

# Test 3: Oversized payload (> 10KB) should be rejected with 413 Payload Too Large
echo "▶ Test 3: Verifying Payload Size Guard (>10KB buffer flood -> 413)..."
HTTP_CODE=$(python3 -c "import sys; sys.stdout.write('A'*11000)" | curl -s -o /dev/null -w "%{http_code}" -X POST "${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -H "Origin: ${TARGET_HOST}" \
  --data-binary @-)
if [ "${HTTP_CODE}" = "413" ]; then
  echo "  ✅ PASS: Oversized payload rejected with 413 Payload Too Large"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo "  ❌ FAIL: Expected 413, got ${HTTP_CODE}"
fi

# Test 4: Untrusted Origin should be rejected with 403 Forbidden (CSRF protection)
echo "▶ Test 4: Verifying CSRF / Untrusted Origin Gate..."
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

# Test 5: Missing Turnstile Token should be rejected with 403 CAPTCHA_REQUIRED
echo "▶ Test 5: Verifying Cloudflare Turnstile token enforcement..."
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

# Test 6: Honeypot field filled should be shadow-dropped with 200 OK
echo "▶ Test 6: Verifying Field Honeypot bot trap shadow-drop..."
RESPONSE_BODY=$(curl -s -X POST "${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -H "Origin: ${TARGET_HOST}" \
  -d '{"name":"Bot Spammer","email":"spambot@example.com","phone":"08012345678","message":"Spam payload","website":"http://spamlink.com","turnstileToken":"dummy-token"}')
if echo "${RESPONSE_BODY}" | grep -q "shadow-drop-honeypot"; then
  echo "  ✅ PASS: Field honeypot triggered with silent 200 OK (shadow-drop-honeypot)"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo "  ❌ FAIL: Expected shadow-drop-honeypot response, got: ${RESPONSE_BODY}"
fi

# Test 7: Fast-submission (< 2.5s) should be shadow-dropped via Time Heuristic
echo "▶ Test 7: Verifying Speed-submission Time Heuristic bot trap..."
NOW=$(node -e 'console.log(Date.now())')
RESPONSE_BODY=$(curl -s -X POST "${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -H "Origin: ${TARGET_HOST}" \
  -d "{\"name\":\"Speed Bot\",\"email\":\"speedbot@example.com\",\"phone\":\"08012345678\",\"message\":\"Rapid script payload\",\"renderedAt\":${NOW},\"turnstileToken\":\"dummy-token\"}")
if echo "${RESPONSE_BODY}" | grep -q "shadow-drop-speed"; then
  echo "  ✅ PASS: Fast submission caught with silent 200 OK (shadow-drop-speed)"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo "  ❌ FAIL: Expected shadow-drop-speed response, got: ${RESPONSE_BODY}"
fi

# Test 8: Multiple URL links (> 2 links) should be shadow-dropped via Link Spam Heuristic
echo "▶ Test 8: Verifying Link Spam Injection Heuristic bot trap..."
RESPONSE_BODY=$(curl -s -X POST "${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -H "Origin: ${TARGET_HOST}" \
  -d '{"name":"SEO Spammer","email":"seospam@example.com","phone":"08012345678","message":"Buy now https://promo1.example.com and https://promo2.example.com and https://promo3.example.com","turnstileToken":"dummy-token"}')
if echo "${RESPONSE_BODY}" | grep -q "shadow-drop-url"; then
  echo "  ✅ PASS: Link spam injection caught with silent 200 OK (shadow-drop-url)"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo "  ❌ FAIL: Expected shadow-drop-url response, got: ${RESPONSE_BODY}"
fi

echo ""
echo "============================================================"
echo "📊 Results: ${PASSED_TESTS} / ${TOTAL_TESTS} Security Tests Passed"
if [ "${PASSED_TESTS}" -eq "${TOTAL_TESTS}" ]; then
  echo "🎉 Live Edge Security & Contact API pipeline is 100% operational!"
  echo "============================================================"
  exit 0
else
  echo "⚠️ Some security tests failed! Check output above."
  echo "============================================================"
  exit 1
fi
