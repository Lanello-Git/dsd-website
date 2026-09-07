/** Shared content model. Page content files must satisfy these types; the build fails otherwise. */

export interface FaqItem {
  q: string;
  a: string;
}

export interface PriceRow {
  item: string;
  price: string;
  note?: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface Feature {
  title: string;
  text: string;
}

export interface Seo {
  /** Browser tab and Google title. Keyword + place + brand. Max ~60 characters. */
  title: string;
  /** Meta description with benefit and call to action. 140 to 160 characters. */
  description: string;
  /** Primary keyword this page targets. */
  keyword: string;
  /** Two or three secondary terms. */
  secondary: string[];
}

export interface ServiceContent {
  slug: string;
  name: string;
  navLabel: string;
  icon: string;
  image: string;
  imageAlt: string;
  /** One or two sentences for cards on the home and hub pages. */
  summary: string;
  seo: Seo;
  hero: { h1: string; intro: string };
  problem: { heading: string; paragraphs: string[] };
  included: { heading: string; items: string[] };
  process?: { heading: string; steps: Step[] };
  pricing: { heading: string; intro: string; rows: PriceRow[]; note: string };
  local: { heading: string; paragraphs: string[] };
  why: { heading: string; items: Feature[] };
  faq: FaqItem[];
  /** Slugs of two or three related services. */
  related: string[];
  gallery?: { image: string; alt: string; caption?: string }[];
  cta: { heading: string; text: string };
}

export interface CityContent {
  slug: string;
  city: string;
  province: 'Oost-Vlaanderen' | 'West-Vlaanderen';
  postalCodes: string[];
  distanceKm: number;
  image: string;
  imageAlt: string;
  seo: Seo;
  hero: { h1: string; intro: string };
  about: { heading: string; paragraphs: string[] };
  neighbourhoods: { heading: string; intro: string; items: string[] };
  services: { heading: string; intro: string; items: { slug: string; text: string }[] };
  localProof: { heading: string; paragraphs: string[] };
  faq: FaqItem[];
  /** Slugs of two or three nearby city pages. */
  nearby: string[];
  cta: { heading: string; text: string };
}
