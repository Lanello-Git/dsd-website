# Prepared DSD analytics

The tracking module is prepared locally with verified GA4 **`G-QE0P0VT2WH`**, property **`557992234`**, stream **`16064099427`** for **`https://desmetenzoon.be`**, Clarity project **`yu86qiz0xt`**, and the approved public Search Console META. These resources were created separately with user approval; this code has not been deployed.

## Configuration

Set only the verified public GA4 Measurement ID, public verification META and optional Clarity project ID in `src/config/tracking.ts`. Do not enter a Measurement Protocol secret, Clarity export token, customer identifiers or credentials in website code. The current allowed hosts are `desmetenzoon.be` and `www.desmetenzoon.be`, as supplied for the Hostinger target. Local and copied previews do not send production tracking.

`AnalyticsConsent.astro`, included once in `Base.astro`, presents equally styled accept/refuse actions. The footer reopens the preference panel. Until acceptance, neither analytics vendor's script is loaded and the contact handler sends nothing. Acceptance sends one pageview and permits only the exact public phone/email links from the site config to send `click_to_call` / `click_to_email`; the only contact parameter is `contact_method`. Query strings and fragments are removed from the page location/referrer explicitly supplied to GA4. Advertising consent remains denied. Withdrawal disables GA4, sends denied consent to Clarity, clears accessible first-party analytics cookies and reloads the page so vendor code is unloaded. Choices expire after 180 days and are bound to the configured IDs.

This does not claim full provider-payload privacy certification or legal compliance. Clarity can record rendered page content; configure masking and consent mode in the exact project before activation. GA4 form interactions and site search were disabled during the approved stream setup; other enhanced-measurement settings need their own live checks. Existing GHL/chat/reviews/Maps integrations are unchanged and have their own behavior and consent settings.

## Forms

The current form is an iframe on `links.desmetenzoon.be`, form ID `AIDxCNUQKl5KhAKQLBfb`. The parent site does not manufacture a `generate_lead` from iframe loads, button clicks, visits to `/bedankt/`, or unverified `postMessage` payloads. Use a separately verified exact-form integration, with one sender and a coordinated test. This patch does not establish original browser/session attribution in GHL.

## Verification

Use Node 22.18 or later:

```sh
npm ci
npm run test:analytics
npm run check
npm run build
npm run qa
```

Before activation, verify the rendered banner on desktop/mobile, keyboard access and both choices. With a configured test property on an approved host, inspect network requests: no GA4/Clarity traffic before consent or after refusal; one initial pageview after consent; one intended event per public contact click; no form-conversion event. Withdraw, reload and navigate again to verify tracking remains off. Complete live receipt proof only after deployment and a separately coordinated test.

The repository has no GitHub Actions deployment workflow. Hostinger currently uses a source ZIP with Astro on Node 22.x, root folder `dsd-website-claude-dsd-website-build-2fkzbu`, default build/output. The prepared ZIP must include source/config/public assets but no `.git`, `node_modules`, credentials or build caches. The user confirmed `desmetenzoon.be` as the permanent domain: canonical, schema, sitemap, robots and Apache-compatible redirects now use it. Verify the hosting runtime actually honors redirects; `.htaccess` only applies when served through Apache/LiteSpeed.

The public Search Console META value belongs in `tracking.googleSiteVerification`; `Base.astro` emits it once in the head on all pages. It is an ownership-verification value, not an API credential. Complete ownership and property addition in the approved Google account only after checking the public tag.

## Provider references

- [Google basic consent mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic)
- [Google privacy controls](https://developers.google.com/tag-platform/security/guides/privacy)
- [Microsoft Clarity consent V2](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2)

References checked October 7, 2026. No API secrets or export tokens are needed in this static module.
