/**
 * Central business facts. Every page, the footer, and the schema read from here,
 * so the name, address and phone (NAP) stay identical everywhere.
 *
 * Source: ClickUp intake (task 86ak4ajq2), KBO (BE0782718536), old site dsddakwerken.be.
 * Items marked TODO must be confirmed with Peter before launch.
 */
export const site = {
  name: 'DSD Dakwerken',
  legalName: 'DSD Dakwerken BV',
  tagline: 'Dakwerken en renovaties in Aalter en het Meetjesland',
  url: 'https://dsddakwerken.be',
  owner: 'Peter De Smet',
  foundedYear: 2022,
  experienceYears: 30,
  projectsLast3Years: 150,
  phoneDisplay: '0460 23 15 34',
  phoneE164: '+32460231534',
  email: 'info@dsddakwerken.be',
  address: {
    street: 'Geuzestraat 18',
    postalCode: '9910',
    city: 'Aalter',
    subMunicipality: 'Knesselare',
    region: 'Oost-Vlaanderen',
    country: 'BE',
  },
  vat: 'BE 0782.718.536',
  // TODO confirm with Peter: opening hours shown on the site and in schema.
  hours: [
    { days: 'Maandag - vrijdag', open: '07:30', close: '18:00', schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    { days: 'Zaterdag', open: '08:00', close: '12:00', schemaDays: ['Saturday'] },
  ],
  geo: { lat: 51.1418, lng: 3.4166 },
  social: {
    facebook: 'https://www.facebook.com/p/DSD-Dakwerken-100067339645190/',
    instagram: '',
  },
  // Google review link. TODO: replace with the "Schrijf een review" link from the GBP dashboard.
  reviewsUrl: 'https://www.google.com/search?q=DSD+Dakwerken+Aalter+reviews',
  /**
   * Lead capture. Lanello routes leads through GoHighLevel (GHL).
   * - ghlFormEmbedUrl set: every form on the site renders the GHL iframe (with the GHL resize script).
   * - Otherwise the native form posts JSON to formEndpoint (a GHL inbound webhook).
   */
  ghlFormEmbedUrl: 'https://links.desmetenzoon.be/widget/form/AIDxCNUQKl5KhAKQLBfb',
  ghlFormId: 'AIDxCNUQKl5KhAKQLBfb',
  ghlFormName: 'Website form - With email',
  ghlFormHeight: 642,
  ghlEmbedScript: 'https://links.desmetenzoon.be/js/form_embed.js',
  formEndpoint: '',
  guarantee: '10 jaar garantie op waterdichtheid',
  usps: [
    'Meer dan 30 jaar ervaring',
    '10 jaar garantie op waterdichtheid',
    'Geen onderaannemers, eigen vakmensen',
    'Correcte prijzen, geen verrassingen',
  ],
  brands: ['Wienerberger (Koramic)', 'APOK', 'VELUX', 'Lecot', 'Steyro'],
  standards: 'Wij werken volgens de normen van Embuild (voorheen Confederatie Bouw).',
} as const;

export const nap = `${site.name}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
