#!/usr/bin/env bash
# ==============================================================================
# DOUITSU LLC — Local Development Server Runner (Port 4002 / Caddy Integration)
# ==============================================================================

set -euo pipefail

PORT=4002
HOST="127.0.0.1"

# Check if port 4002 is already occupied
PID=$(lsof -ti :${PORT} 2>/dev/null || ss -lptn "sport = :${PORT}" 2>/dev/null | grep -oP 'pid=\K[0-9]+' | head -n 1 || true)

if [ -n "${PID}" ]; then
  # Check if it responds to HTTP
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://${HOST}:${PORT}/" || echo "000")
  if [ "${HTTP_STATUS}" != "000" ]; then
    echo "⚡ Dev server is already running on port ${PORT} (PID: ${PID}, HTTP ${HTTP_STATUS})."
    echo "🔗 Local URL: http://localhost:${PORT}/"
    echo "🌐 Caddy reverse_proxy target: localhost:${PORT}"
    exit 0
  else
    echo "⚠️ Port ${PORT} is occupied by process PID ${PID}, but not responding on HTTP."
    echo "To terminate and free port ${PORT}, run: kill -9 ${PID}"
    exit 1
  fi
fi

echo "🚀 Starting Astro local dev server on port ${PORT} (strictPort: true)..."
exec npm run dev
