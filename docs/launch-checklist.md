# DSD Dakwerken, launch checklist

For the Lanello delivery team. Tick everything before the site goes live on dsddakwerken.be.

## 1. Lead path (most important, verify, never assume)

- [x] GHL form embedded on every page that has a form: "Website form - With email" (AIDxCNUQKl5KhAKQLBfb on links.desmetenzoon.be), configured in `src/config/site.ts`. The native fallback form stays in the code for the day the embed URL is cleared.
- [ ] Style the GHL form to match the site: button background #b8974f with text #141414, hover #86682b with white text, 6 px radius, Source Sans 3 bold; input borders #8f877a, focus ring #86682b.
- [ ] Rebuild (`npm run build`) and submit a real test lead from the live site. Confirm it lands in GHL and that Peter gets the notification (bellen, sms, e-mail were his preferred channels).
- [ ] Confirm the phone number 0460 23 15 34 is the number Peter wants on the site, or swap in the GHL tracking number in `src/config/site.ts` (`phoneDisplay` and `phoneE164`). Every tel: link on the site reads from that one place.
- [ ] Confirm info@dsddakwerken.be is live and monitored (ClickUp lists it; the old site used dsddakwerken@gmail.com).

## 2. Facts to confirm with Peter

- [ ] Opening hours in `src/config/site.ts` (now: ma-vr 07:30-18:00, za 08:00-12:00, a placeholder).
- [ ] Price ranges on the service pages are Belgian market richtprijzen for 2026 (sources in `docs/content-brief.md`). Ask Peter if he is comfortable publishing them, or wants his own numbers.
- [ ] Which certificates he has (ClickUp only says "Ja"). If he has a specific label, add it to the about page and the trust bar.
- [ ] His son's first name, if he wants it on the about page.
- [ ] Whether the 10-year guarantee applies to all roof work (site says: on waterdichtheid of every roof DSD places or renovates).

## 3. Google Business Profile alignment (NAP)

- [ ] GBP name, address and phone must read exactly: DSD Dakwerken, Geuzestraat 18, 9910 Aalter, 0460 23 15 34. The site footer, contact page and JSON-LD use this exact string.
- [ ] Set the GBP website URL to https://dsddakwerken.be/ and the category to "Dakdekker" (Google's Dutch category label) with services listed as on the site.
- [ ] Paste the GBP "Schrijf een review" link into `reviewsUrl` in `src/config/site.ts`.
- [ ] Add the Facebook page and, if any, Instagram to `social` in `src/config/site.ts`.

## 4. Hosting (Hostinger) and redirects

- [ ] Upload the contents of `dist/` to the web root (public_html). Keep `.htaccess` (it is a hidden file).
- [ ] Test the old URLs: /dakwerken, /renovaties, /velux-ramen, /daken-ontmossen, /typography must 301 to the new pages. /contact and /gevelbekleding keep their URL.
- [ ] Test https://www.dsddakwerken.be redirects to https://dsddakwerken.be.
- [ ] SSL active, mixed-content free.
- [ ] Turn on LiteSpeed cache if available; the `.htaccess` already sets long cache headers for assets.

## 5. Search Console and indexing

- [ ] Add https://dsddakwerken.be to Google Search Console, submit https://dsddakwerken.be/sitemap-index.xml.
- [ ] Request indexing for the home page, /diensten/, /werkgebied/ and the 5 city pages.
- [ ] Also submit in Bing Webmaster Tools (imports from Search Console).
- [ ] Analytics: none installed on purpose (no cookie banner needed). If GA4 or GTM is added later, add a consent banner first (Belgian GBA is strict) and update `/privacybeleid/`.

## 6. Final pass on the live site

- [ ] Run `npm run qa` on the final build (checks em dashes, emojis, broken links, alt text, titles).
- [ ] Run `node scripts/similarity.mjs` (city pages under 20% overlap).
- [ ] Click every nav and footer link on the live site, on a phone.
- [ ] Check the Google Maps "Kaart tonen" button on /contact/ loads the map.
- [ ] Test the mobile menu and the Diensten submenu on iOS Safari and Android Chrome.
