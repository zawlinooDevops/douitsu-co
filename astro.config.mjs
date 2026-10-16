import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
import { handleContactSubmission } from './functions/api/contact';

// Dev middleware plugin for local testing of /api/contact via npm run dev
function localContactApiPlugin() {
  return {
    name: 'local-contact-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          try {
            const env = { ...process.env, ...loadEnv('development', process.cwd(), '') };
            const chunks = [];
            for await (const chunk of req) {
              chunks.push(chunk);
            }
            const bodyStr = Buffer.concat(chunks).toString('utf-8');

            const origin = `http://${req.headers.host || 'localhost:4321'}`;
            const headers = new Headers();
            for (const [key, val] of Object.entries(req.headers)) {
              if (Array.isArray(val)) {
                for (const v of val) headers.append(key, v);
              } else if (val) {
                headers.set(key, val);
              }
            }

            const webRequest = new Request(`${origin}/api/contact`, {
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
            console.error('[local-contact-api dev error]:', err);
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
      });
    }
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    plugins: [localContactApiPlugin()]
  },
  site: 'https://demo.douitsu-co.com',
  build: {
    format: 'file'
  }
});
