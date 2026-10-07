/** Basic consent: no analytics script or event before an affirmative choice. */
export const CONSENT_KEY = 'dsd.analytics-consent.v1';
const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
type Choice = 'granted' | 'denied';
type QueueFunction = ((...args: unknown[]) => void) & { q?: unknown[][] };
interface TrackingController { enabled: boolean; initialChoice: Choice | null; choose: (choice: Choice) => void }
type TrackingWindow = Window & {
  dataLayer?: unknown[];
  gtag?: QueueFunction;
  clarity?: QueueFunction;
  __dsdAnalytics?: TrackingController;
};
export interface TrackingConfig {
  ga4MeasurementId: string;
  clarityProjectId: string;
  allowedHosts: readonly string[];
  phoneHref: string;
  emailHref: string;
}

function safeUrl(value: string): string {
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol) ? `${url.origin}${url.pathname}` : '';
  } catch { return ''; }
}

export function createTrackingController(config: TrackingConfig, win: TrackingWindow, now = Date.now): TrackingController {
  if (win.__dsdAnalytics) return win.__dsdAnalytics;
  const doc = win.document;
  const ga4 = /^G-[A-Z0-9]+$/.test(config.ga4MeasurementId) ? config.ga4MeasurementId : '';
  const clarity = /^[a-z0-9]+$/.test(config.clarityProjectId) ? config.clarityProjectId : '';
  const enabled = config.allowedHosts.includes(win.location.hostname) && Boolean(ga4 || clarity);
  const fingerprint = `${ga4}|${clarity}`;
  let allowed = false;
  let started = false;

  function storedChoice(raw?: string | null): Choice | null {
    try {
      // A withdrawal remains effective in this tab if persistent storage
      // becomes unavailable after an earlier accepted visit.
      if (raw === undefined && win.sessionStorage.getItem(CONSENT_KEY) === 'denied') return 'denied';
      const saved = JSON.parse(raw === undefined ? win.localStorage.getItem(CONSENT_KEY) ?? 'null' : raw ?? 'null');
      const age = now() - saved?.savedAt;
      return saved?.resources === fingerprint && Number.isFinite(age) && age >= 0 && age < MAX_AGE_MS
        && (saved.choice === 'granted' || saved.choice === 'denied') ? saved.choice : null;
    } catch { return null; }
  }

  function appendScript(id: string, src: string) {
    if (doc.getElementById(id)) return;
    const script = doc.createElement('script');
    script.id = id;
    script.async = true;
    script.src = src;
    doc.head.appendChild(script);
  }

  function start() {
    if (!enabled || started) return;
    started = true;
    if (ga4) {
      win.dataLayer = win.dataLayer || [];
      win.gtag = win.gtag || function (..._args: unknown[]) { win.dataLayer!.push(arguments); };
      win.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      win.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      win.gtag('js', new Date(now()));
      win.gtag('config', ga4, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: safeUrl(win.location.href),
        page_referrer: safeUrl(doc.referrer),
      });
      win.gtag('event', 'page_view', { send_to: ga4 });
      appendScript('dsd-ga4', `https://www.googletagmanager.com/gtag/js?id=${ga4}`);
    }
    if (clarity) {
      const queue: QueueFunction = function (...args: unknown[]) { (queue.q = queue.q || []).push(args); };
      win.clarity = win.clarity || queue;
      win.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' });
      appendScript('dsd-clarity', `https://www.clarity.ms/tag/${clarity}`);
    }
  }

  function clearFirstPartyAnalyticsCookies() {
    const names = doc.cookie.split(';').map(part => part.trim().split('=')[0])
      .filter(name => name === '_ga' || name.startsWith('_ga_') || name === '_clck' || name === '_clsk');
    const host = win.location.hostname;
    const domains = ['', host, `.${host}`, ...config.allowedHosts.flatMap(h => [h, `.${h}`])];
    for (const name of names) for (const domain of new Set(domains)) {
      doc.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ''}`;
    }
  }

  function stop() {
    allowed = false;
    if (!started) return;
    if (ga4) {
      (win as unknown as Record<string, unknown>)[`ga-disable-${ga4}`] = true;
      win.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    }
    if (clarity) win.clarity?.('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
    clearFirstPartyAnalyticsCookies();
    // Unload already-running third-party code. The saved refusal prevents reload.
    win.location.reload();
  }

  function choose(choice: Choice) {
    if (!enabled) return;
    try {
      if (choice === 'denied') win.sessionStorage.setItem(CONSENT_KEY, 'denied');
      else win.sessionStorage.removeItem(CONSENT_KEY);
    } catch { /* Persistent choice below remains the primary store. */ }
    try { win.localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, savedAt: now(), resources: fingerprint })); } catch { /* Current-page choice still applies; next visit asks again. */ }
    allowed = choice === 'granted';
    if (allowed) start(); else stop();
  }

  const onClick = (event: MouseEvent) => {
    if (!allowed || !ga4 || event.button !== 0) return;
    const anchor = (event.target as Element | null)?.closest?.('a[href]');
    const href = anchor?.getAttribute('href')?.trim().toLowerCase();
    const method = href === config.phoneHref.toLowerCase() ? 'phone' : href === config.emailHref.toLowerCase() ? 'email' : null;
    if (!method) return;
    // No destination, link text, form input, contact identifiers or arbitrary parameters.
    win.gtag?.('event', method === 'phone' ? 'click_to_call' : 'click_to_email', { contact_method: method, send_to: ga4 });
  };
  if (enabled) doc.addEventListener('click', onClick);
  win.addEventListener('storage', event => {
    if (enabled && event.key === CONSENT_KEY && storedChoice(event.newValue) !== 'granted') stop();
  });
  const initial = enabled ? storedChoice() : null;
  allowed = initial === 'granted';
  if (allowed) start();
  const controller = { enabled, initialChoice: initial, choose };
  win.__dsdAnalytics = controller;
  return controller;
}
