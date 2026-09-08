/**
 * Text-overlap check between built pages of the same type (city pages, service pages).
 * Flags pairs above 20% shared 5-word shingles (the Lanello doorway-page threshold).
 * Run after build: node scripts/similarity.mjs
 */
import { readFileSync, existsSync } from 'node:fs';

const groups = {
  cities: ['dakwerker-gent', 'dakwerker-brugge', 'dakwerker-eeklo', 'dakwerker-deinze', 'dakwerker-maldegem'].map((s) => [s, `dist/werkgebied/${s}/index.html`]),
  services: ['dakrenovatie', 'hellende-daken', 'platte-daken', 'dakisolatie', 'dakherstelling', 'dakramen', 'dak-ontmossen', 'gevelbekleding', 'renovatiewerken'].map((s) => [s, `dist/${s}/index.html`]),
};

function mainText(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  let t = m ? m[1] : html;
  // drop shared components: trust bar, steps, contact form, nav-like lists
  t = t.replace(/<section class="trust[\s\S]*?<\/section>/g, '').replace(/<section class="section section--cream steps[\s\S]*?<\/section>/g, '').replace(/<div class="lead[\s\S]*?<\/form>\s*<\/div>/g, '').replace(/<ul class="towns">[\s\S]*?<\/ul>/g, '');
  t = t.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').toLowerCase().replace(/[^a-zà-ÿ0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  return t.split(' ');
}
function shingles(words, n = 5) { const s = new Set(); for (let i = 0; i + n <= words.length; i++) s.add(words.slice(i, i + n).join(' ')); return s; }

let bad = 0;
for (const [name, list] of Object.entries(groups)) {
  const data = list.filter(([, f]) => existsSync(f)).map(([slug, f]) => { const w = mainText(readFileSync(f, 'utf8')); return { slug, words: w.length, sh: shingles(w) }; });
  console.log(`\n${name}:`);
  for (let i = 0; i < data.length; i++) for (let j = i + 1; j < data.length; j++) {
    const a = data[i], b = data[j];
    let inter = 0; for (const s of a.sh) if (b.sh.has(s)) inter++;
    const pct = Math.round((100 * inter) / Math.min(a.sh.size, b.sh.size));
    const flag = pct > 20 ? '  <-- too similar' : '';
    if (pct > 20) bad++;
    console.log(`  ${a.slug} vs ${b.slug}: ${pct}% shared 5-word phrases${flag}`);
  }
  data.forEach((d) => console.log(`  ${d.slug}: ${d.words} words in main`));
}
if (bad) { console.log(`\n${bad} pair(s) above 20%.`); process.exit(1); }
console.log('\nAll pairs under 20%.');
