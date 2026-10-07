import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CONSENT_KEY, createTrackingController } from '../src/lib/analytics-consent.ts';

const NOW = Date.UTC(2026, 9, 7, 23);
const config = { ga4MeasurementId: 'G-TEST123456', clarityProjectId: 'test123456', allowedHosts: ['desmetenzoon.be'], phoneHref: 'tel:+32460231534', emailHref: 'mailto:info@dsddakwerken.be' };

function browser({ stored = null, host = 'desmetenzoon.be', storageFails = false } = {}) {
  const docEvents = new Map();
  const winEvents = new Map();
  const scripts = [];
  const storage = new Map(stored ? [[CONSENT_KEY, stored]] : []);
  const session = new Map();
  let reloads = 0;
  const cookiesCleared = [];
  const doc = {
    referrer: 'https://search.example/result/?email=private@example.com#private',
    getElementById(id) { return scripts.find(script => script.id === id); },
    createElement(tag) { return { tag }; },
    head: { appendChild(script) { scripts.push({ ...script, queuedAtLoad: (win.dataLayer ?? []).map(row => Array.from(row)) }); } },
    addEventListener(name, handler) { docEvents.set(name, [...(docEvents.get(name) ?? []), handler]); },
    get cookie() { return '_ga=abc; _ga_TEST123456=def; _clck=ghi; necessary=keep'; },
    set cookie(value) { cookiesCleared.push(value); },
  };
  const win = {
    document: doc,
    location: { hostname: host, href: `https://${host}/contact/?email=private@example.com#private`, reload() { reloads++; } },
    localStorage: {
      getItem(key) { if (storageFails) throw new Error('storage blocked'); return storage.get(key) ?? null; },
      setItem(key, value) { if (storageFails) throw new Error('storage blocked'); storage.set(key, value); },
    },
    sessionStorage: {
      getItem(key) { return session.get(key) ?? null; },
      setItem(key, value) { session.set(key, value); },
      removeItem(key) { session.delete(key); },
    },
    addEventListener(name, handler) { winEvents.set(name, [...(winEvents.get(name) ?? []), handler]); },
  };
  return {
    win, scripts, storage, session, cookiesCleared,
    reloads: () => reloads,
    commands: () => (win.dataLayer ?? []).map(row => Array.from(row)),
    click(href, button = 0) {
      let prevented = false;
      const anchor = { getAttribute(name) { return name === 'href' ? href : null; } };
      for (const handler of docEvents.get('click') ?? []) handler({ button, target: { closest() { return anchor; } }, preventDefault() { prevented = true; } });
      return prevented;
    },
    storageEvent(value) { for (const handler of winEvents.get('storage') ?? []) handler({ key: CONSENT_KEY, newValue: value }); },
  };
}
function saved(choice, changes = {}) { return JSON.stringify({ choice, resources: 'G-TEST123456|test123456', savedAt: NOW - 1000, ...changes }); }
function init(b, c = config) { return createTrackingController(c, b.win, () => NOW); }

test('an undecided visit and refusal load no trackers, queue no events and leave contact navigation intact', () => {
  const b = browser(); const c = init(b);
  assert.equal(c.initialChoice, null);
  assert.equal(b.click(config.phoneHref), false);
  c.choose('denied');
  assert.equal(b.click(config.emailHref), false);
  assert.deepEqual(b.scripts, []);
  assert.deepEqual(b.commands(), []);
  assert.equal(JSON.parse(b.storage.get(CONSENT_KEY)).choice, 'denied');
});

test('acceptance queues analytics-only consent before exactly one loader and pageview per document', () => {
  const b = browser(); const c = init(b);
  c.choose('granted'); c.choose('granted'); init(b).choose('granted');
  assert.equal(b.scripts.length, 2);
  assert.equal(b.scripts.filter(x => x.src.includes('googletagmanager')).length, 1);
  assert.equal(b.commands().filter(x => x[0] === 'event' && x[1] === 'page_view').length, 1);
  const queued = b.scripts[0].queuedAtLoad;
  assert.equal(queued[0][2].analytics_storage, 'denied');
  assert.equal(queued[1][2].analytics_storage, 'granted');
  for (const field of ['ad_storage', 'ad_user_data', 'ad_personalization']) assert.equal(queued[1][2][field], 'denied');
  assert.deepEqual(b.win.clarity.q[0], ['consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' }]);
});

test('only configured public contact links produce intent events, without destination or PII', () => {
  const b = browser(); init(b).choose('granted');
  assert.equal(b.click(config.phoneHref), false);
  b.click(config.emailHref);
  b.click('mailto:private@example.com'); b.click('tel:+19999999999'); b.click('/bedankt/'); b.click(config.phoneHref, 1);
  const events = b.commands().filter(x => x[0] === 'event');
  assert.deepEqual(events.map(x => x[1]), ['page_view', 'click_to_call', 'click_to_email']);
  assert.deepEqual(events[1][2], { contact_method: 'phone', send_to: config.ga4MeasurementId });
  assert.deepEqual(events[2][2], { contact_method: 'email', send_to: config.ga4MeasurementId });
  const serialized = JSON.stringify(b.commands());
  for (const value of ['private@example.com', '32460231534', 'info@dsddakwerken.be', 'generate_lead', '#private']) assert.ok(!serialized.includes(value));
  const settings = b.commands().find(x => x[0] === 'config')[2];
  assert.equal(settings.page_location, 'https://desmetenzoon.be/contact/');
  assert.equal(settings.page_referrer, 'https://search.example/result/');
});

test('withdrawal stops subsequent click events, disables GA4, clears analytics cookies only and reloads without loading trackers again', () => {
  const b = browser(); const c = init(b); c.choose('granted'); c.choose('denied');
  const eventCount = b.commands().filter(x => x[0] === 'event').length;
  b.click(config.phoneHref);
  assert.equal(b.commands().filter(x => x[0] === 'event').length, eventCount);
  assert.equal(b.win[`ga-disable-${config.ga4MeasurementId}`], true);
  assert.equal(b.reloads(), 1);
  assert.ok(b.cookiesCleared.some(x => x.startsWith('_ga=')));
  assert.ok(!b.cookiesCleared.some(x => x.startsWith('necessary=')));
  const next = browser({ stored: b.storage.get(CONSENT_KEY) });
  assert.equal(init(next).initialChoice, 'denied');
  assert.equal(next.scripts.length, 0);
});

test('refusal in another tab stops this tab immediately', () => {
  const b = browser({ stored: saved('granted') }); init(b);
  b.storageEvent(saved('denied'));
  const count = b.commands().length;
  b.click(config.emailHref);
  assert.equal(b.commands().length, count);
  assert.equal(b.reloads(), 1);
});

test('withdrawal stays denied for this tab if persistent storage becomes read-only', () => {
  const b = browser({ stored: saved('granted') }); const c = init(b);
  b.win.localStorage.setItem = () => { throw new Error('persistent storage read-only'); };
  c.choose('denied');
  assert.equal(b.session.get(CONSENT_KEY), 'denied');
  const next = browser({ stored: saved('granted') });
  next.session.set(CONSENT_KEY, 'denied');
  assert.equal(init(next).initialChoice, 'denied');
  assert.equal(next.scripts.length, 0);
});

test('valid persisted acceptance works; changed resources, expiry, future dates, malformed data and blocked storage fail closed', () => {
  const accepted = browser({ stored: saved('granted') }); init(accepted); assert.equal(accepted.scripts.length, 2);
  for (const stored of [saved('granted', { resources: 'G-OTHER|other' }), saved('granted', { savedAt: NOW - 181 * 86400000 }), saved('granted', { savedAt: NOW + 1 }), '{broken', saved('yes')]) {
    const b = browser({ stored }); assert.equal(init(b).initialChoice, null); assert.equal(b.scripts.length, 0);
  }
  const blocked = browser({ storageFails: true }); init(blocked); assert.equal(blocked.scripts.length, 0);
});

test('blank IDs, invalid IDs and preview host cannot activate production tracking', () => {
  for (const [options, settings] of [
    [{}, { ...config, ga4MeasurementId: '', clarityProjectId: '' }],
    [{}, { ...config, ga4MeasurementId: 'javascript:bad', clarityProjectId: 'bad/project' }],
    [{ host: 'localhost' }, config],
  ]) {
    const b = browser(options); const c = init(b, settings); c.choose('granted');
    assert.equal(c.enabled, false); assert.equal(b.scripts.length, 0); assert.deepEqual(b.commands(), []);
  }
});

test('Clarity is optional and no form submit or message listener is installed', () => {
  const b = browser(); init(b, { ...config, clarityProjectId: '' }).choose('granted');
  assert.equal(b.scripts.length, 1); assert.equal(b.win.clarity, undefined);
  // The controller has no form/iframe success bridge; only an approved contact anchor is an event.
  assert.deepEqual(b.commands().filter(x => x[0] === 'event').map(x => x[1]), ['page_view']);
});
