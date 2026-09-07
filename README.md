# DSD Dakwerken website

Static, SEO-first website for DSD Dakwerken (Peter De Smet), dakwerker in Aalter (Knesselare), Belgium. Belgian Dutch, 20 content pages plus privacy, thank-you and 404.

Built with [Astro](https://astro.build) as plain HTML, CSS and a few lines of JavaScript. No CMS, no tracking, self-hosted fonts.

## Run it

```bash
npm install
npm run dev        # local preview on http://localhost:4321
npm run build      # writes the finished site to dist/
npm run qa         # checks dist/ for em dashes, emojis, broken links, missing alt, duplicate titles
node scripts/similarity.mjs   # checks city and service pages for too much text overlap
```

## Where things live

| What | Where |
|---|---|
| Business facts (name, address, phone, hours, form endpoint) | `src/config/site.ts` |
| Service page copy (one file per service) | `src/data/pages/services/*.ts` |
| City page copy (one file per city) | `src/data/pages/cities/*.ts` |
| Service and city registries (order, slugs, towns served) | `src/data/services.ts`, `src/data/cities.ts` |
| Home, over ons, diensten, werkgebied, realisaties, contact, privacy | `src/pages/` |
| Design tokens (colours, type, spacing) | `src/styles/global.css` |
| Photos (real DSD job photos, EXIF stripped) | `src/assets/photos/` |
| Redirects from the old site, caching | `public/.htaccess` (Apache/LiteSpeed) and `public/_redirects` (Netlify/Cloudflare) |
| Content rules for writers | `docs/content-brief.md` |
| Page and keyword plan | `docs/page-plan.md` |

## Before launch

1. **Lead form.** Set `formEndpoint` (a GoHighLevel inbound webhook that accepts JSON) or `ghlFormEmbedUrl` (a GHL form URL, rendered as iframe) in `src/config/site.ts`. Until one is set, the form shows a visible "bel ons" notice instead of failing silently. Test a real submission.
2. **Opening hours** in `src/config/site.ts` are a placeholder to confirm with Peter.
3. **Google review link** (`reviewsUrl`) and Instagram URL in `src/config/site.ts`.
4. Upload `dist/` to the web root on Hostinger. The `.htaccess` in it forces HTTPS, redirects the old URLs and sets caching.
5. Submit `https://dsddakwerken.be/sitemap-index.xml` in Google Search Console.

## Adding a page

Copy an existing file in `src/data/pages/services/` or `src/data/pages/cities/`, change the slug, add the slug to the list in `src/data/services.ts` or `src/data/cities.ts`, then run:

```bash
node --experimental-strip-types scripts/check-content.mjs src/data/pages/services/<slug>.ts
```

The checker enforces the house rules (Belgian Dutch, formal u, no em dashes, valid photo keys, FAQ shape).
