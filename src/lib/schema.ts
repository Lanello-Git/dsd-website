import { site } from '../config/site';
import type { FaqItem } from '../data/types';

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  const all = [{ name: 'Home', href: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.href, site.url).href,
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; areaServed: string[]; serviceType?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: new URL(opts.path, site.url).href,
    provider: { '@id': `${site.url}/#business` },
    areaServed: opts.areaServed.map((n) => ({ '@type': 'City', name: n })),
  };
}
