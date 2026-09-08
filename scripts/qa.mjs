/**
 * Post-build QA for dist/. Fails (exit 1) on anything that would embarrass us in front of the client.
 * Run: npm run build && npm run qa
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const problems = [];
const warnings = [];
const pages = [];

function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) pages.push(p);
  }
}
walk(DIST);

const titles = new Map();
const descs = new Map();
const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F900}-\u{1F9FF}]/u;
const noindexPage = (html) => /name="robots" content="noindex/.test(html);
const bodyText = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');

for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  const rel = '/' + relative(DIST, p).replace(/\\/g, '/');
  const text = bodyText(html);

  if (text.includes('—')) problems.push(`${rel}: em dash found`);
  if (text.includes('–')) warnings.push(`${rel}: en dash found`);
  if (emojiRe.test(text)) problems.push(`${rel}: emoji found`);
  const visible = text.replace(/<[^>]+>/g, ' ');
  for (const bad of ['STUB', 'lorem ipsum', 'Lorem ipsum', 'TODO', 'placeholder', 'Almighty', 'Mutual Electric', 'Bonney Lake', 'undefined', '[object Object]']) {
    if (visible.includes(bad)) problems.push(`${rel}: contains "${bad}"`);
  }

  const h1s = (text.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${rel}: ${h1s} H1 tags`);

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? '';
  if (!title) problems.push(`${rel}: missing title`);
  if (title.length > 70) warnings.push(`${rel}: title ${title.length} chars: "${title}"`);
  if (titles.has(title)) problems.push(`${rel}: duplicate title with ${titles.get(title)}`);
  titles.set(title, rel);

  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? '';
  if (!desc) problems.push(`${rel}: missing meta description`);
  if (desc.length < 100 || desc.length > 170) warnings.push(`${rel}: meta description ${desc.length} chars`);
  if (descs.has(desc)) problems.push(`${rel}: duplicate meta description with ${descs.get(desc)}`);
  descs.set(desc, rel);

  if (!noindexPage(html) && !html.includes('rel="canonical"')) problems.push(`${rel}: missing canonical`);
  if (html.includes('data-endpoint=""')) warnings.push(`${rel}: LEAD FORM NOT WIRED (set formEndpoint or ghlFormEmbedUrl in src/config/site.ts before launch)`);
  if (!html.includes('application/ld+json')) problems.push(`${rel}: missing JSON-LD`);

  // images without alt attribute
  const imgs = text.match(/<img\b[^>]*>/g) || [];
  for (const img of imgs) if (!/\balt(=|\s|>)/.test(img)) problems.push(`${rel}: <img> without alt`);

  // internal links must resolve
  const hrefs = [...text.matchAll(/href="([^"#?]+)[^"]*"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|sms:)/.test(href)) continue;
    if (href === '#') { problems.push(`${rel}: link to "#"`); continue; }
    if (!href.startsWith('/')) continue;
    const clean = href.split('#')[0];
    const candidates = [join(DIST, clean), join(DIST, clean, 'index.html'), join(DIST, clean.replace(/\/$/, '') + '.html')];
    if (!candidates.some((c) => existsSync(c))) problems.push(`${rel}: broken internal link ${href}`);
  }
  // tel links must use the right number
  for (const m of text.matchAll(/href="tel:([^"]+)"/g)) if (m[1] !== '+32478672582') problems.push(`${rel}: wrong tel link ${m[1]}`);
}

console.log(`Checked ${pages.length} pages.`);
if (warnings.length) { console.log('\nWarnings:'); warnings.forEach((w) => console.log('  - ' + w)); }
if (problems.length) { console.log('\nProblems:'); problems.forEach((w) => console.log('  - ' + w)); process.exit(1); }
console.log('\nNo blocking problems found.');
