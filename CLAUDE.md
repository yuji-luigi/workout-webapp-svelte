# workout-webapp-svelte

SvelteKit 2 + Svelte 5 (runes) app, package manager: **pnpm**. Local persistence via Dexie (IndexedDB) + Yjs.

## Dev server — one instance, one port

The dev server is fixed to **port 3030** (`server.port` in [vite.config.ts](vite.config.ts)). Never start a second
instance and never let Vite fall back to another port — multiple instances mean two IndexedDB/Yjs clients and
screenshots taken against the wrong build.

**Before running `pnpm dev`, always check whether it is already up:**

```bash
lsof -nP -iTCP:3030 -sTCP:LISTEN
```

- **Output present** → the server is already running. Reuse it at http://localhost:3030 — do not start another.
- **No output** → start it in the background with `pnpm dev`, then wait for the port to accept connections.

Quick liveness check (expects an HTTP status, `000` means nothing is listening):

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3030/
```

Only kill the running server if the user explicitly asks (config change requiring a restart, wedged process):

```bash
lsof -ti tcp:3030 | xargs kill
```

## Routes

`/` redirects; main entry points are `/home`, `/workout`, `/routine`, `/timer`, `/manage`.
