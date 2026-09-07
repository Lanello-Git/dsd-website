import type { CityContent } from './types';

/** City pages. Order = order on the region hub. Home page owns Aalter and Knesselare. */
export const citySlugs = [
  'dakwerker-gent',
  'dakwerker-brugge',
  'dakwerker-eeklo',
  'dakwerker-deinze',
  'dakwerker-maldegem',
] as const;

export type CitySlug = (typeof citySlugs)[number];

const modules = import.meta.glob<{ default: CityContent }>('./pages/cities/*.ts', { eager: true });

export const cities: CityContent[] = citySlugs.map((slug) => {
  const mod = modules[`./pages/cities/${slug}.ts`];
  if (!mod) throw new Error(`Missing city content file for "${slug}" (src/data/pages/cities/${slug}.ts)`);
  if (mod.default.slug !== slug) throw new Error(`City file ${slug}.ts declares slug "${mod.default.slug}"`);
  return mod.default;
});

export function city(slug: string): CityContent {
  const c = cities.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown city slug "${slug}"`);
  return c;
}

export const cityHref = (slug: string) => `/werkgebied/${slug}/`;

/** Every town DSD serves, named on the region hub, in the footer and in the LocalBusiness schema. */
export const servedTowns: { name: string; province: 'Oost-Vlaanderen' | 'West-Vlaanderen'; page?: CitySlug }[] = [
  { name: 'Aalter', province: 'Oost-Vlaanderen' },
  { name: 'Knesselare', province: 'Oost-Vlaanderen' },
  { name: 'Bellem', province: 'Oost-Vlaanderen' },
  { name: 'Lotenhulle', province: 'Oost-Vlaanderen' },
  { name: 'Ursel', province: 'Oost-Vlaanderen' },
  { name: 'Sint-Maria-Aalter', province: 'Oost-Vlaanderen' },
  { name: 'Gent', province: 'Oost-Vlaanderen', page: 'dakwerker-gent' },
  { name: 'Drongen', province: 'Oost-Vlaanderen' },
  { name: 'Mariakerke', province: 'Oost-Vlaanderen' },
  { name: 'Sint-Martens-Latem', province: 'Oost-Vlaanderen' },
  { name: 'Deurle', province: 'Oost-Vlaanderen' },
  { name: 'De Pinte', province: 'Oost-Vlaanderen' },
  { name: 'Eeklo', province: 'Oost-Vlaanderen', page: 'dakwerker-eeklo' },
  { name: 'Lievegem', province: 'Oost-Vlaanderen' },
  { name: 'Zomergem', province: 'Oost-Vlaanderen' },
  { name: 'Waarschoot', province: 'Oost-Vlaanderen' },
  { name: 'Lovendegem', province: 'Oost-Vlaanderen' },
  { name: 'Evergem', province: 'Oost-Vlaanderen' },
  { name: 'Kaprijke', province: 'Oost-Vlaanderen' },
  { name: 'Sint-Laureins', province: 'Oost-Vlaanderen' },
  { name: 'Assenede', province: 'Oost-Vlaanderen' },
  { name: 'Deinze', province: 'Oost-Vlaanderen', page: 'dakwerker-deinze' },
  { name: 'Nevele', province: 'Oost-Vlaanderen' },
  { name: 'Hansbeke', province: 'Oost-Vlaanderen' },
  { name: 'Landegem', province: 'Oost-Vlaanderen' },
  { name: 'Zulte', province: 'Oost-Vlaanderen' },
  { name: 'Maldegem', province: 'Oost-Vlaanderen', page: 'dakwerker-maldegem' },
  { name: 'Adegem', province: 'Oost-Vlaanderen' },
  { name: 'Kleit', province: 'Oost-Vlaanderen' },
  { name: 'Brugge', province: 'West-Vlaanderen', page: 'dakwerker-brugge' },
  { name: 'Sint-Andries', province: 'West-Vlaanderen' },
  { name: 'Sint-Michiels', province: 'West-Vlaanderen' },
  { name: 'Assebroek', province: 'West-Vlaanderen' },
  { name: 'Sint-Kruis', province: 'West-Vlaanderen' },
  { name: 'Beernem', province: 'West-Vlaanderen' },
  { name: 'Oedelem', province: 'West-Vlaanderen' },
  { name: 'Oostkamp', province: 'West-Vlaanderen' },
  { name: 'Zedelgem', province: 'West-Vlaanderen' },
  { name: 'Wingene', province: 'West-Vlaanderen' },
  { name: 'Ruiselede', province: 'West-Vlaanderen' },
  { name: 'Tielt', province: 'West-Vlaanderen' },
  { name: 'Aarsele', province: 'West-Vlaanderen' },
  { name: 'Torhout', province: 'West-Vlaanderen' },
  { name: 'Knokke-Heist', province: 'West-Vlaanderen' },
];
