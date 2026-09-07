import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dsddakwerken.be',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/bedankt'),
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],
  image: {
    // Sharp is the default service; keep defaults for widest compatibility.
  },
});
