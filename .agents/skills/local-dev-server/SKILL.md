---
name: local-dev-server
description: >-
  Start, stop, check, and manage the local Astro development server on port 4002 (with strictPort)
  for local previewing and Caddy reverse proxy integration.
---

# Local Development Server Runner Skill (Port 4002 / Caddy Integration)

This skill manages the local Astro development server configured to run strictly on **port 4002** with `strictPort: true` to seamlessly connect with a local **Caddy** web server / reverse proxy.

Whenever the user or agent asks to:
- Start the local development server ("run local server", "start dev server", "local server စ run ပေးပါ", "run local caddy dev server")
- Check the local dev server status on port 4002
- Stop or restart the local dev server
- Integrate or verify reverse proxy routing with local Caddy

Follow the procedures outlined below.

---

## 🎯 Target Configuration

| Parameter | Value | Reference |
|---|---|---|
| **Port** | `4002` | `astro.config.mjs` (`server.port: 4002`) |
| **Strict Port** | `true` | Fails immediately if 4002 is taken (never auto-increments) |
| **Local URL** | `http://localhost:4002/` | Local dev server endpoint |
| **Caddy Target** | `localhost:4002` | `reverse_proxy localhost:4002` |

---

## 🚀 Execution Procedures

### 1. Check Server Status
Verify if the dev server is already running on port 4002:

```bash
curl -I http://localhost:4002/
```
Or check the listening process:
```bash
lsof -i :4002
```

### 2. Start Dev Server

#### Option A: Direct Bash Script (Terminal)
```bash
bash .agents/skills/local-dev-server/scripts/start-dev-server.sh
# or standard npm command
npm run dev
```

#### Option B: Background Task (Agent Environment)
In agent workflows, launch via `run_command` with `IsDaemon: true` and `WaitMsBeforeAsync: 3000`:
- **CommandLine**: `npm run dev`
- **IsDaemon**: `true`
- **WaitMsBeforeAsync**: `3000`
- **toolSummary**: `Start local dev server`

Then verify with:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:4002/
```

### 3. Stop Dev Server
To stop the server running on port 4002:

```bash
bash .agents/skills/local-dev-server/scripts/stop-dev-server.sh
```
Or manually:
```bash
fuser -k 4002/tcp
```

---

## 🌐 Caddyfile Reverse Proxy Configuration

To forward traffic from Caddy to this Astro dev server on port 4002, add the reverse proxy directive to your `Caddyfile`:

```caddyfile
# Example 1: Local domain (e.g. douitsu.local)
douitsu.local {
    reverse_proxy localhost:4002
}

# Example 2: Standard localhost port (e.g. 80 or 8080)
localhost:8080 {
    reverse_proxy localhost:4002
}
```

Reload Caddy after modifying your `Caddyfile`:
```bash
caddy reload
```
