import type { CityContent } from '../../types';

const content: CityContent = {
  slug: 'dakwerker-deinze',
  city: 'Deinze',
  province: 'Oost-Vlaanderen',
  postalCodes: ['9800', '9850'],
  distanceKm: 13,
  image: 'dakrenovatie-woning-rode-dakpannen',
  imageAlt: 'Woning met een pas vernieuwd dak in rode kleidakpannen, zoals DSD Dakwerken die plaatst in de regio Deinze en de Leiestreek',
  seo: {
    title: 'Dakwerker Deinze en Nevele, dakrenovatie | DSD Dakwerken',
    description: 'Dakwerker voor Deinze en Nevele: dakrenovatie, isolatie en herstellingen door DSD Dakwerken uit Aalter, 10 jaar garantie. Vraag een gratis offerte aan.',
    keyword: 'dakwerker Deinze',
    secondary: ['dakwerken Deinze', 'dakrenovatie Deinze', 'dakwerker Nevele'],
  },
  hero: {
    h1: 'Dakwerker in Deinze, van de Leie tot Nevele en Hansbeke',
    intro: 'Een villa aan de Leie in Astene, een rijwoning in het centrum van Deinze of een hoeve in Vinkt: elk dak in de fusiestad heeft zijn eigen verhaal. DSD Dakwerken is de dakwerker in Deinze die met elk van die daken vertrouwd is. Vanuit Knesselare (Aalter) staan wij op 13 km van uw voordeur, en Hansbeke en Landegem liggen zelfs op een korte rit van ons bedrijf. Peter De Smet komt gratis kijken, u ontvangt een duidelijke offerte en na de werken 10 jaar garantie op waterdichtheid.',
  },
  about: {
    heading: 'Waarom kiezen inwoners van Deinze voor een dakwerker uit Aalter?',
    paragraphs: [
      'Sinds de fusie met Nevele strekt Deinze zich uit van de Leie tot aan de grens met Aalter. Een hele reeks deelgemeenten, twee postcodes (9800 en 9850) en een gebied waarin wij geregeld aan het werk zijn. Vanuit Knesselare rijden wij in een korte rit naar het centrum van Deinze. Hansbeke, Landegem en Merendree liggen letterlijk naast de deur. Voor ons is Deinze dus geen uithoek van het werkgebied, maar een plaats waar wij graag en vaak komen.',
      'Wie in Deinze woont, weet hoe verschillend de woningen hier zijn. Langs de Leie, in Astene, Bachte-Maria-Leerne en Sint-Martens-Leerne, staan de villa\'s van de Leiestreek op ruime, beboste percelen. Dat betekent grote dakvlakken, dikwijls met kleidakpannen of leien, en door de bomen veel schaduw en mos aan de noordkant. In het centrum, rond de Markt en de Tolpoortstraat, en aan de overkant van de Leie in Petegem-aan-de-Leie, vindt u rijwoningen en appartementsgebouwen. Die hebben meestal een hellend dak vooraan en een plat dak op de achterbouw. In Nevele, Hansbeke, Vinkt, Meigem en de kleinere dorpen liggen fermettes en hoeves met een groot pannendak dat vol in de wind van de open velden staat.',
      'Bijna al die woningen zijn ouder dan 10 jaar, waardoor u op de meeste dakwerken 6% btw betaalt in plaats van 21%. Laat u het dak isoleren, dan kan de Vlaamse Mijn VerbouwPremie een deel van de kost dekken en helpen wij u aan het aannemersattest. Een dakrenovatie die de vorm van het dak niet verandert, is meestal vrijgesteld van een omgevingsvergunning. Voor de oudere villa\'s langs de Leie en voor beschermde panden kijken wij dat toch altijd vooraf na bij de stad. Het begint telkens met een gratis plaatsbezoek van Peter De Smet, zonder enige verplichting.',
    ],
  },
  neighbourhoods: {
    heading: 'Waar in Deinze en Nevele komen wij?',
    intro: 'Overal binnen de fusiestad: van Deinze centrum (postcode 9800) tot de vroegere gemeente Nevele met haar deelgemeenten (postcode 9850). Woont u net over de gemeentegrens in Sint-Martens-Latem, Deurle, De Pinte, Lievegem of Zomergem, dan bent u ook aan het juiste adres. Voor Gent en Eeklo hebben wij een eigen pagina.',
    items: ['Deinze centrum', 'Petegem-aan-de-Leie', 'Astene', 'Bachte-Maria-Leerne', 'Sint-Martens-Leerne', 'Grammene', 'Gottem', 'Vinkt', 'Wontergem', 'Zeveren', 'Meigem', 'Nevele', 'Hansbeke', 'Landegem', 'Merendree', 'Poesele', 'Vosselare'],
  },
  services: {
    heading: 'Welke dakwerken doet DSD Dakwerken in Deinze?',
    intro: 'Per dienst leest u hieronder hoe wij ze in Deinze aanpakken. Het verschil zit in het type woning: een villa aan de Leie vraagt iets anders dan een rijwoning in de Tolpoortstraat of een hoeve in Hansbeke.',
    items: [
      { slug: 'dakrenovatie', text: 'De oudere villa\'s in Astene en Bachte-Maria-Leerne dragen dikwijls nog hun eerste dak, met poreuze pannen en zonder degelijk onderdak. Wij vernieuwen het volledig, met isolatie en kleidakpannen of leien die passen bij de stijl van de Leiestreek. De stelling of verreiker zetten wij op het perceel zelf, zodat de straat vrij blijft.' },
      { slug: 'hellende-daken', text: 'Een hoeve in Vinkt of Nevele heeft een lang dakvlak zonder beschutting tegen de wind uit het westen. Pannen of leien verankeren wij er extra aan de nok en de dakranden, en het versleten zink- en loodwerk rond de schouwen vervangen wij in dezelfde beweging.' },
      { slug: 'platte-daken', text: 'Rijwoningen in het centrum en in Petegem-aan-de-Leie hebben bijna allemaal een platte achterbouw of garage, vaak nog met een roofing die het water niet meer kwijtraakt. Daar leggen wij EPDM over drukvaste PIR-isolatie in de plaats, ook bij een appartementsgebouw waar wij de offerte afstemmen met de syndicus.' },
      { slug: 'dakisolatie', text: 'Veel villa\'s langs de Leie werden gebouwd toen niemand aan isolatie dacht, en dat voelt u aan de stookkost. Isoleren kan tussen de kepers of als sarking bovenop de kepers. Wij kiezen een dikte met een Rd-waarde die volstaat voor Mijn VerbouwPremie, waarmee u ook in orde bent met de Vlaamse dakisolatienorm.' },
      { slug: 'dakherstelling', text: 'Hansbeke, Landegem en Merendree liggen op enkele kilometers van ons bedrijf en de rest van Deinze op 13 km. Daardoor zijn wij snel bij u als er een pan verschoven is of de goot overloopt. Wij sporen het lek op, maken het dak dicht en herstellen daarna definitief.' },
      { slug: 'dakramen', text: 'In een rijwoning in Deinze centrum of een fermette in Meigem is de zolder vaak de enige plaats om uit te breiden. Een VELUX dakraam zetten wij in een pannendak of leiendak, meestal zonder omgevingsvergunning, met een aansluiting op het onderdak die waterdicht blijft.' },
      { slug: 'dak-ontmossen', text: 'De beboste percelen langs de Leie in Astene, Bachte-Maria-Leerne en Sint-Martens-Leerne zijn prachtig, maar op de schaduwkant van het dak kruipt het mos tussen de pannen. Wij reinigen het dak en beschermen de pannen met een coating, zodat het water opnieuw afvoert en de pannen langer meegaan.' },
      { slug: 'gevelbekleding', text: 'Bij een aanbouw achter een rijwoning of een tuinkamer bij een villa in Astene sluit houten gevelbekleding mooi aan bij het groen van de Leiestreek. Wij plaatsen het hout op een geventileerde structuur en werken het samen met het platte dak af, zodat elke aansluiting droog blijft.' },
      { slug: 'renovatiewerken', text: 'Wilt u na de dakisolatie de zolder van uw rijwoning afwerken met Gyproc, of hebt u bij de hoeve in Hansbeke een nieuwe tuinmuur of een terras nodig? Ook die karweien in Deinze neemt onze eigen ploeg op zich, zonder onderaannemers.' },
    ],
  },
  localProof: {
    heading: 'Ons werk om de hoek: Deurle, aan dezelfde Leie',
    paragraphs: [
      'Wilt u zien wat wij afleveren, dan hoeft u niet ver te kijken. In Deurle, deelgemeente van Sint-Martens-Latem en op enkele kilometers van Astene en Bachte-Maria-Leerne, kreeg een woning van ons een volledig nieuw dak. De versleten Koramic Vlaamse pannen maakten plaats voor Terreal Prieuré pannen, geleverd door APOK, en er kwam nieuwe isolatie bij. Zo\'n keramische pan sluit aan bij de bouwstijl langs de Leie, en de bewoners hebben nu een dak dat dicht is en de warmte binnenhoudt. Meer voorbeelden van ons werk vindt u bij onze realisaties.',
      'Deinze en de deelgemeenten horen bij de plaatsen waar wij geregeld werken, en dat is niet onlogisch: Hansbeke en Landegem liggen op een paar kilometer van Knesselare. Meer dan 150 projecten in de laatste 3 jaar, in een straal van 30 km rond Aalter, en een zaakvoerder die al meer dan 30 jaar op daken staat. Peter De Smet doet het werk samen met zijn zoon en een vaste ploeg van eigen mensen. Hij werkt met Koramic dakpannen van Wienerberger, VELUX dakramen en materialen van APOK en Lecot, en houdt zich aan de normen van Embuild.',
    ],
  },
  faq: [
    { q: 'Hoe ver ligt Deinze van Aalter en hoe snel kunt u er zijn?', a: 'Het centrum van Deinze ligt op 13 km van Knesselare (Aalter), waar ons bedrijf zit, en Hansbeke, Landegem en Merendree liggen nog een stuk dichter. Een plaatsbezoek staat daardoor snel in onze agenda, wanneer het u uitkomt. Bij een lek of stormschade komt een dringende herstelling vooraan in de planning, zodat het eerst droog is voor wij de definitieve oplossing uitwerken.' },
    { q: 'Betaal ik iets voor het plaatsbezoek als u naar Deinze komt?', a: 'Nee, het plaatsbezoek en de offerte kosten u niets, ook niet in de verste deelgemeenten zoals Gottem of Wontergem. Peter De Smet neemt het dak van buiten en vanaf de zolder in ogenschouw, meet alles op en legt de mogelijkheden uit. Daarna ontvangt u een offerte waarin elke prijs vastligt en beslist u zelf of u ermee doorgaat. Laat u ons nadien een kleine herstelling doen, dan vermelden wij de verplaatsing vooraf als één vast bedrag, zodat de factuur geen verrassing bevat.' },
    { q: 'Heb ik in Deinze een omgevingsvergunning nodig voor een nieuw dak?', a: 'Meestal niet: houdt het dak dezelfde vorm en hetzelfde volume, dan is een dakrenovatie in Vlaanderen doorgaans vrijgesteld, en een standaard dakraam meestal ook. Anders wordt het bij een dakkapel, een andere dakvorm of een beschermd gebouw. Denk in Deinze aan oudere villa\'s in de Leiestreek die als erfgoed geïnventariseerd zijn, of aan panden bij het kasteel van Ooidonk in Bachte-Maria-Leerne; daar kan advies van Onroerend Erfgoed nodig zijn. Voor u begint, kijken wij bij de dienst omgeving van Deinze na wat er voor uw adres geldt.' },
    { q: 'Mijn dak in Nevele of Vinkt heeft stormschade, wat doe ik nu?', a: 'Bel ons zo snel mogelijk op 0460 23 15 34, zodat wij het dak voorlopig kunnen afdekken en de losse pannen terugleggen. Rond Nevele, Vinkt en Hansbeke liggen de hoeves en fermettes in open veld, en daar zijn het bij een westerstorm vooral nokpannen, dakranden en schouwafwerkingen die het begeven. U krijgt van ons foto\'s van de schade en een offerte die u aan uw verzekeraar kunt voorleggen, waarna wij definitief herstellen.' },
    { q: 'Krijg ik in Deinze een premie voor dakisolatie?', a: 'Mogelijk wel, via Mijn VerbouwPremie van Vlaanderen, al bepaalt uw inkomenscategorie het bedrag en veranderen de regels vaak. U komt in aanmerking als een aannemer de isolatie plaatst, als de isolatie een Rd-waarde van minstens 4,5 m²K/W haalt en als uw woning minstens 15 jaar oud is. Dat laatste klopt voor de meeste huizen in Deinze, maar let wel: voor de eigen woning is de premie sinds 1 maart 2026 weggevallen voor de lagere inkomenscategorieën. Kijk de actuele regels na op vlaanderen.be; het aannemersattest en de factuurgegevens krijgt u van ons.' },
    { q: 'Is het 6% of 21% btw op mijn dakwerken in Deinze?', a: 'Voor een privéwoning die minstens 10 jaar oud is betaalt u 6% btw, en dat is in Deinze bij vrijwel elke rijwoning, villa en hoeve het geval. Dat tarief geldt alleen als wij zelf de materialen leveren en plaatsen en het geheel op één factuur zetten; de verklaring die daarbij hoort, regelen wij. Voor een nieuwbouwwoning in een recente verkaveling geldt 21%. Bij een appartementsgebouw in het centrum bekijken wij de factuur samen met de syndicus.' },
    { q: 'Welke woningen in Deinze en Nevele neemt DSD Dakwerken aan?', a: 'Wij nemen alle types aan die u in de fusiestad tegenkomt. Denk aan de villa\'s van de Leiestreek in Astene, Bachte-Maria-Leerne en Sint-Martens-Leerne, en aan de rijwoningen en appartementsgebouwen in het centrum en in Petegem-aan-de-Leie. Ook de fermettes en hoeves in Nevele, Hansbeke, Vinkt, Meigem en de andere dorpen horen erbij, net als een plat dak op een garage, uitbouw of magazijn. Bij een groot hoevedak brengt onze verreiker de pannen en de isolatie rechtstreeks tot op het dak.' },
    { q: 'Werkt u ook in Hansbeke, Landegem en Merendree, of alleen in Deinze zelf?', a: 'Zeker, die dorpen liggen van alle deelgemeenten van Deinze het dichtst bij ons bedrijf: Hansbeke grenst aan Aalter en Landegem en Merendree liggen daar vlak achter. Sinds de fusie horen zij bij Deinze, maar voor ons waren het altijd al buurdorpen waar wij regelmatig op het dak staan. U krijgt er precies hetzelfde als in Deinze centrum: een gratis plaatsbezoek, vaste prijzen op de offerte en 10 jaar garantie op de waterdichtheid.' },
  ],
  nearby: ['dakwerker-gent', 'dakwerker-eeklo'],
  cta: {
    heading: 'Laat uw dak in Deinze gratis nakijken',
    text: 'Een telefoontje naar 0460 23 15 34, een sms of een mail naar info@dsddakwerken.be volstaat. Peter De Smet komt naar Deinze, Nevele of een van de andere deelgemeenten wanneer het u uitkomt. Hij neemt het dak en de zolder onder de loep en stuurt u een offerte waarin elke prijs vastligt. Het plaatsbezoek kost u niets en verbindt u tot niets.',
  },
};

export default content;
