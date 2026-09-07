import type { ServiceContent } from './types';

/**
 * Service registry. Long-form page content lives in ./pages/<slug>.ts and is loaded here.
 * Order matters: it is the order on the home page, the services hub and the nav.
 */
export const serviceSlugs = [
  'dakrenovatie',
  'hellende-daken',
  'platte-daken',
  'dakisolatie',
  'dakherstelling',
  'dakramen',
  'dak-ontmossen',
  'gevelbekleding',
  'renovatiewerken',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

const modules = import.meta.glob<{ default: ServiceContent }>('./pages/services/*.ts', { eager: true });

export const services: ServiceContent[] = serviceSlugs.map((slug) => {
  const mod = modules[`./pages/services/${slug}.ts`];
  if (!mod) throw new Error(`Missing service content file for "${slug}" (src/data/pages/services/${slug}.ts)`);
  if (mod.default.slug !== slug) throw new Error(`Service file ${slug}.ts declares slug "${mod.default.slug}"`);
  return mod.default;
});

for (const key of ['navLabel', 'name'] as const) {
  const seen = new Set(services.map((s) => s[key]));
  if (seen.size !== services.length) throw new Error(`Duplicate service ${key} detected; every service page needs its own ${key}`);
}
for (const key of ['title', 'description'] as const) {
  const seen = new Set(services.map((s) => s.seo[key]));
  if (seen.size !== services.length) throw new Error(`Duplicate service seo.${key} detected`);
}
if (new Set(services.map((s) => s.hero.h1)).size !== services.length) throw new Error('Duplicate service H1 detected');

export function service(slug: string): ServiceContent {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service slug "${slug}"`);
  return s;
}

export const serviceHref = (slug: string) => `/${slug}/`;
