/**
 * Validates one content file (service or city) against the brief rules.
 * Run: node --experimental-strip-types scripts/check-content.mjs src/data/pages/services/dakisolatie.ts
 */
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const file = process.argv[2];
if (!file) { console.error('Usage: node --experimental-strip-types scripts/check-content.mjs <file.ts>'); process.exit(2); }

const serviceSlugs = ['dakrenovatie', 'hellende-daken', 'platte-daken', 'dakisolatie', 'dakherstelling', 'dakramen', 'dak-ontmossen', 'gevelbekleding', 'renovatiewerken'];
const citySlugs = ['dakwerker-gent', 'dakwerker-brugge', 'dakwerker-eeklo', 'dakwerker-deinze', 'dakwerker-maldegem'];
const photoKeys = readdirSync('src/assets/photos').filter((f) => f.endsWith('.jpg')).map((f) => f.replace(/\.jpg$/, ''));
const icons = ['phone','mail','map-pin','clock','shield-check','check','check-circle','arrow-right','chevron-down','chevron-right','home','roof','layers','square-flat','thermometer','sun','droplets','sparkles','wrench','hammer','tree-pine','panels-top','ruler','users','star','award','calendar','euro','menu','x','facebook','instagram','message-square','cloud-rain','camera','file-text','handshake','zap','badge-euro'];

const mod = await import(pathToFileURL(resolve(file)).href);
const c = mod.default;
const problems = [];
const warnings = [];
const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F900}-\u{1F9FF}]/u;
let words = 0;

function scan(val, path) {
  if (typeof val === 'string') {
    words += val.split(/\s+/).filter(Boolean).length;
    if (val.includes('—')) problems.push(`${path}: em dash`);
    if (val.includes('–')) problems.push(`${path}: en dash (use a hyphen or comma)`);
    if (emojiRe.test(val)) problems.push(`${path}: emoji`);
    for (const bad of ['STUB', 'TODO', 'lorem', 'Lorem', 'welkom bij', 'Welkom bij', 'dé specialist', 'dakdekker', 'Dakdekker', 'bouwvergunning', ' steiger', 'kozijn']) if (val.includes(bad)) problems.push(`${path}: contains "${bad}"`);
    for (const bad of [' je ', ' jij ', ' jouw ', 'Je ', 'Jij ', 'Jouw ']) if (val.includes(bad)) problems.push(`${path}: informal "${bad.trim()}" (use u/uw)`);
    if (/subsidie/i.test(val) && !/premies en subsidies/i.test(val)) warnings.push(`${path}: "subsidie" (prefer "premie")`);
    if ((val.match(/!/g) || []).length > 1) warnings.push(`${path}: more than one exclamation mark`);
    if (/\b(1[0-9]|[2-9][0-9])\s*(5-)?sterren|\d,\d\s*\/\s*5|google reviews?\b.*\d/i.test(val)) problems.push(`${path}: looks like a rating claim`);
    if (/sinds 2022|opgericht in 2022/i.test(val)) problems.push(`${path}: implies experience started in 2022`);
    return;
  }
  if (Array.isArray(val)) { val.forEach((v, i) => scan(v, `${path}[${i}]`)); return; }
  if (val && typeof val === 'object') { for (const [k, v] of Object.entries(val)) scan(v, `${path}.${k}`); }
}
scan(c, 'content');

const req = (path, cond, msg) => { if (!cond) problems.push(`${path}: ${msg}`); };
const str = (v) => typeof v === 'string' && v.trim().length > 0;
const arr = (v, n) => Array.isArray(v) && v.length >= n;

req('slug', str(c.slug), 'missing');
req('seo.title', str(c.seo?.title), 'missing');
if (c.seo?.title && c.seo.title.length > 65) warnings.push(`seo.title is ${c.seo.title.length} chars (aim for 60 or less)`);
req('seo.title', /DSD Dakwerken/.test(c.seo?.title ?? ''), 'must contain "DSD Dakwerken"');
req('seo.description', str(c.seo?.description), 'missing');
if (c.seo?.description && (c.seo.description.length < 130 || c.seo.description.length > 165)) warnings.push(`seo.description is ${c.seo.description.length} chars (aim for 140 to 160)`);
req('seo.keyword', str(c.seo?.keyword), 'missing');
req('seo.secondary', arr(c.seo?.secondary, 2), 'need 2 or 3 secondary terms');
req('hero.h1', str(c.hero?.h1), 'missing');
req('hero.intro', str(c.hero?.intro), 'missing');
req('image', photoKeys.includes(c.image), `unknown photo key "${c.image}". Valid: ${photoKeys.join(', ')}`);
req('imageAlt', str(c.imageAlt), 'missing');
req('faq', arr(c.faq, 6) && c.faq.length <= 8, `need 6 to 8 FAQ items (has ${c.faq?.length ?? 0})`);
(c.faq ?? []).forEach((f, i) => { req(`faq[${i}].q`, /\?$/.test(f.q ?? ''), 'question must end with ?'); req(`faq[${i}].a`, (f.a ?? '').length >= 120, 'answer too short (2 to 4 sentences)'); });
req('cta.heading', str(c.cta?.heading), 'missing');
req('cta.text', str(c.cta?.text), 'missing');

const isCity = 'city' in c;
if (!isCity) {
  req('slug', serviceSlugs.includes(c.slug), `not a known service slug`);
  req('name', str(c.name), 'missing'); req('navLabel', str(c.navLabel), 'missing');
  req('icon', icons.includes(c.icon), `unknown icon "${c.icon}". Valid: ${icons.join(', ')}`);
  req('summary', str(c.summary) && c.summary.length <= 200, 'missing or over 200 chars');
  req('problem.paragraphs', arr(c.problem?.paragraphs, 2), 'need 2 or 3 paragraphs');
  req('included.items', arr(c.included?.items, 6), 'need at least 6 items');
  req('pricing.rows', arr(c.pricing?.rows, 3), 'need at least 3 rows');
  req('pricing.note', str(c.pricing?.note), 'missing');
  req('pricing.intro', /plaatsbezoek/i.test(c.pricing?.intro ?? '') || /plaatsbezoek/i.test(c.pricing?.note ?? ''), 'must say the exact price follows the free plaatsbezoek');
  req('local.paragraphs', arr(c.local?.paragraphs, 2), 'need 2 paragraphs');
  req('why.items', arr(c.why?.items, 4), 'need 4 to 6 items');
  req('related', arr(c.related, 2) && c.related.every((s) => serviceSlugs.includes(s) && s !== c.slug), 'need 2 or 3 valid related service slugs (not itself)');
  if (c.process) req('process.steps', arr(c.process.steps, 3), 'need at least 3 steps');
  (c.gallery ?? []).forEach((g, i) => { req(`gallery[${i}].image`, photoKeys.includes(g.image), `unknown photo key "${g.image}"`); req(`gallery[${i}].alt`, str(g.alt), 'missing alt'); });
  if (words < 900) warnings.push(`only ${words} words; service pages should have at least 900`);
} else {
  req('slug', citySlugs.includes(c.slug), 'not a known city slug');
  req('city', str(c.city), 'missing');
  req('province', ['Oost-Vlaanderen', 'West-Vlaanderen'].includes(c.province), 'invalid');
  req('postalCodes', arr(c.postalCodes, 1), 'need at least 1');
  req('distanceKm', typeof c.distanceKm === 'number' && c.distanceKm > 0 && c.distanceKm < 60, 'invalid');
  req('hero.h1', new RegExp(c.city, 'i').test(c.hero?.h1 ?? ''), 'H1 must contain the city name');
  req('seo.title', new RegExp(c.city, 'i').test(c.seo?.title ?? ''), 'title must contain the city name');
  req('about.paragraphs', arr(c.about?.paragraphs, 2), 'need 2 or 3 paragraphs');
  req('neighbourhoods.items', arr(c.neighbourhoods?.items, 5), 'need at least 5 deelgemeenten or wijken');
  req('services.items', arr(c.services?.items, 5) && c.services.items.every((s) => serviceSlugs.includes(s.slug) && str(s.text)), 'need at least 5 items with valid service slugs and text');
  req('localProof.paragraphs', arr(c.localProof?.paragraphs, 1), 'need at least 1 paragraph');
  req('nearby', arr(c.nearby, 2) && c.nearby.every((s) => citySlugs.includes(s) && s !== c.slug), 'need 2 or 3 valid nearby city slugs (not itself)');
  if (words < 700) warnings.push(`only ${words} words; city pages should have at least 700`);
}

console.log(`${file}: ${words} words`);
if (warnings.length) { console.log('Warnings:'); warnings.forEach((w) => console.log('  - ' + w)); }
if (problems.length) { console.log('Problems:'); problems.forEach((p) => console.log('  - ' + p)); process.exit(1); }
console.log('OK');
