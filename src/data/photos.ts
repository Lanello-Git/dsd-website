import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.jpg', { eager: true });

/** Photo registry keyed by file name without extension. */
export const photos: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace(/\.jpg$/, ''), mod.default]),
);

export function photo(key: string): ImageMetadata {
  const p = photos[key];
  if (!p) throw new Error(`Unknown photo key "${key}". Available: ${Object.keys(photos).join(', ')}`);
  return p;
}

/** Descriptive alt text for the real job photos. Stock photos are marked as such. */
export const photoAlt: Record<string, string> = {
  'bestelwagen-dsd-dakwerken-voor-woning': 'Bestelwagen van DSD Dakwerken voor een woning met een nieuw pannendak in het Meetjesland',
  'nieuw-pannendak-woning-rode-pannen': 'Woning met nieuw hellend dak in rode kleidakpannen, geplaatst door DSD Dakwerken',
  'dakrenovatie-woning-rode-dakpannen': 'Gerenoveerd pannendak van een vrijstaande woning na dakrenovatie door DSD Dakwerken',
  'dakrenovatie-villa-luchtfoto': 'Luchtfoto van een volledige dakrenovatie van een villa met rode dakpannen en stelling',
  'uitbouw-houten-gevelbekleding-plat-dak': 'Uitbouw met houten gevelbekleding en plat dak met lichtkoepel, gerealiseerd door DSD Dakwerken',
  'luchtfoto-renovatie-plat-dak-houten-gevel': 'Luchtfoto van een renovatie met plat dak in EPDM en houten gevelbekleding',
  'hoeve-renovatie-nieuw-dak-luchtfoto': 'Luchtfoto van een gerenoveerde hoeve met nieuw pannendak in het Meetjesland',
  'werf-wienerberger-koramic-dakpannen': 'Werf van DSD Dakwerken met Wienerberger Koramic dakpannen klaar voor plaatsing',
  'werf-materialen-dakpannen-isolatie': 'Dakpannen en isolatiemateriaal geleverd op een werf van DSD Dakwerken',
  'woning-dakwerken-epdm-materiaal': 'Woning met pannendak waar DSD Dakwerken het platte dak vernieuwt met EPDM',
  'afgewerkt-pannendak-woning': 'Afgewerkt hellend dak met rode dakpannen op een halfopen woning',
  'dakrenovatie-stelling-woning': 'Woning met stelling tijdens een dakrenovatie door DSD Dakwerken',
  'onderdak-plaatsen-dakrenovatie': 'Nieuw onderdak en isolatie geplaatst tijdens een dakrenovatie, klaar voor de dakpannen',
  'houten-gevelbekleding-gevel-ramen': 'Gevel afgewerkt met verticale houten gevelbekleding en nieuwe ramen',
  'dakwerkers-op-dak-stelling-verreiker': 'Dakwerkers van DSD Dakwerken aan het werk op een hellend dak met stelling en verreiker',
  'renovatie-woning-bestelwagens-dsd': 'Twee bestelwagens van DSD Dakwerken voor een woning in renovatie',
  'gerenoveerde-gevel-luifel': 'Gerenoveerde voorgevel met nieuwe ramen en zwarte luifel',
  'velux-dakraam-binnenzijde': 'VELUX dakraam van binnenuit gezien, geplaatst door DSD Dakwerken',
  'stock-dakwerker-dakconstructie': 'Dakwerker op een houten dakconstructie',
  'stock-dakwerker-zonsondergang': 'Dakwerker plaatst dakbedekking bij zonsondergang',
  'stock-dakwerker-panlatten': 'Dakwerker plaatst panlatten op een nieuw hellend dak',
  'stock-dakpannen-leggen': 'Dakwerker legt dakpannen op een hellend dak',
};

export function alt(key: string): string {
  return photoAlt[key] ?? '';
}
