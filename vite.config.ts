import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://www.betterpuertoprincesa.org';

// Pages that aren't generated from content/. Keep in sync with App.tsx.
const STATIC_ROUTES = [
  '/',
  '/services',
  '/government',
  '/statistics',
  '/transparency',
  '/news',
  '/mining-watch',
  '/prinsesa-ng-baybay',
  '/markets',
  '/advisories',
  '/fare-calculator',
  '/minimum-wage',
  '/hotlines',
];

// content/<section>/<category>/<slug>.md becomes /<section>/<category>/<slug>.
function contentRoutes(section: string): string[] {
  const root = join('content', section);
  const routes: string[] = [];
  for (const category of readdirSync(root)) {
    const dir = join(root, category);
    if (!statSync(dir).isDirectory()) continue;
    routes.push(`/${section}/${category}`);
    for (const file of readdirSync(dir)) {
      if (file.endsWith('.md')) {
        routes.push(`/${section}/${category}/${file.replace(/\.md$/, '')}`);
      }
    }
  }
  return routes;
}

function sitemapPlugin(): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const routes = [
        ...STATIC_ROUTES,
        ...contentRoutes('services'),
        ...contentRoutes('government'),
      ];
      const urls = routes
        .map(route => `  <url><loc>${SITE_URL}${route}</loc></url>`)
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

function devApiPlugin(): Plugin {
  return {
    name: 'dev-api-advisories',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/advisories')) {
          try {
            const { default: handler } = await import('./api/advisories.ts');
            await handler(req, res);
          } catch (e) {
            console.error('Dev API error:', e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to load advisories' }));
          }
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devApiPlugin(), sitemapPlugin()],
  assetsInclude: ['**/*.md'],
});
