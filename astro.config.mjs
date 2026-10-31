import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { handleContactSubmission } from './functions/api/contact';

// Dev and Preview middleware plugin for /api/contact via npm run dev and npm run preview
function contactApiPlugin() {
  const handler = async (req, res, next) => {
    const rawUrl = req.originalUrl || req.url || '';
    const protocol = req.headers['x-forwarded-proto'] || (req.connection && req.connection.encrypted ? 'https' : 'http');
    const host = req.headers.host || 'localhost:4002';
    const origin = `${protocol}://${host}`;
    const url = new URL(rawUrl, origin);
    const pathname = url.pathname.replace(/\/+$/, '');

    if (pathname === '/api/contact' && req.method === 'POST') {
      try {
        const env = {
          ...process.env,
          ...loadEnv('development', process.cwd(), ''),
          ...loadEnv('production', process.cwd(), '')
        };
        const chunks = [];
        for await (const chunk of req) {
          chunks.push(chunk);
        }
        const bodyStr = Buffer.concat(chunks).toString('utf-8');

        const headers = new Headers();
        for (const [key, val] of Object.entries(req.headers)) {
          if (Array.isArray(val)) {
            for (const v of val) headers.append(key, v);
          } else if (val) {
            headers.set(key, val);
          }
        }

        const webRequest = new Request(url.toString(), {
          method: 'POST',
          headers,
          body: bodyStr
        });

        const response = await handleContactSubmission(webRequest, env);

        res.statusCode = response.status;
        response.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });
        const text = await response.text();
        res.end(text);
      } catch (err) {
        console.error('[contact-api server error]:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          success: false,
          error: 'DEV_SERVER_ERROR',
          message: err instanceof Error ? err.message : String(err)
        }));
      }
    } else {
      next();
    }
  };

  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4002,
    strictPort: true
  },
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404')
    })
  ],
  vite: {
    plugins: [contactApiPlugin()]
  },
  site: 'https://douitsu-co.com',
  build: {
    format: 'directory'
  }
});
