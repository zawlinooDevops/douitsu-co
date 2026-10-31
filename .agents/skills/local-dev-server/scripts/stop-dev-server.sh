#!/usr/bin/env bash
# ==============================================================================
# DOUITSU LLC — Stop Local Development Server (Port 4002)
# ==============================================================================

set -euo pipefail

PORT=4002
PID=$(lsof -ti :${PORT} 2>/dev/null || ss -lptn "sport = :${PORT}" 2>/dev/null | grep -oP 'pid=\K[0-9]+' | head -n 1 || true)

if [ -z "${PID}" ]; then
  echo "ℹ️ No process found listening on port ${PORT}."
  exit 0
fi

echo "🛑 Stopping process on port ${PORT} (PID: ${PID})..."
kill -15 "${PID}" 2>/dev/null || kill -9 "${PID}" 2>/dev/null || true
sleep 1

if lsof -i :${PORT} >/dev/null 2>&1; then
  echo "⚠️ Process did not terminate gracefully, forcing kill..."
  fuser -k "${PORT}/tcp" 2>/dev/null || true
fi

echo "✓ Port ${PORT} is now free."
