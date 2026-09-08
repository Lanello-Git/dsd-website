import type { CityContent } from '../../types';

const content: CityContent = {
  slug: 'dakwerker-brugge',
  city: 'Brugge',
  province: 'West-Vlaanderen',
  postalCodes: ['8000', '8200', '8310', '8380'],
  distanceKm: 30,
  image: 'nieuw-pannendak-woning-rode-pannen',
  imageAlt: 'Nieuw pannendak met rode dakpannen op een woning, het type dak dat DSD Dakwerken ook in de regio Brugge plaatst',
  seo: {
    title: 'Dakwerker Brugge, dakwerken en dakrenovatie | DSD Dakwerken',
    description: 'Dakwerker in Brugge en deelgemeenten: dakrenovatie, leien en pannen, platte daken, isolatie en stormschade. 10 jaar garantie. Vraag een gratis offerte aan.',
    keyword: 'dakwerker Brugge',
    secondary: ['dakwerken Brugge', 'dakrenovatie Brugge', 'dakwerker Sint-Andries'],
  },
  hero: {
    h1: 'Dakwerker in Brugge, van de binnenstad tot Sint-Andries en Sint-Kruis',
    intro: 'Een leiendak binnen de vesten waarvoor de stad toelating moet geven, een pannendak in Sint-Andries dat bij de laatste storm pannen verloor, een villa in Sint-Kruis zonder isolatie. Als dakwerker in Brugge kent DSD Dakwerken uit Knesselare (Aalter) die daken. Peter De Smet, al meer dan 30 jaar dakwerker, komt zelf kijken en bezorgt u na het gratis plaatsbezoek een offerte met vaste prijzen. Op elk dak dat wij vernieuwen geven wij 10 jaar garantie op waterdichtheid.',
  },
  about: {
    heading: 'Wat maakt dakwerken in Brugge anders?',
    paragraphs: [
      'Onze thuisbasis ligt in Knesselare (Aalter), op 30 km van de Brugse Markt. Via de E40 staan wij in Sint-Michiels en Sint-Andries, via Oedelem rijden wij Sint-Kruis en Assebroek binnen en zo verder naar de binnenstad. Beernem, Oedelem, Oostkamp en Zedelgem liggen op die route of net onder de stad, en ook daar werken wij. Brugge hoort bij ons vaste werkgebied en wij zijn er geregeld aan de slag, in de deelgemeenten evengoed als binnen de vesten. Woont u meer richting het Meetjesland, dan hebben wij ook een pagina voor Maldegem en een voor Eeklo.',
      'Brugge ligt op korte afstand van de kust en dat voelt uw dak. De wind komt hier harder binnen dan in het Meetjesland en de lucht is vochtiger. Na elke stevige westerstorm liggen er pannen in de voortuin en komen nokpannen los. Zinken goten en loodslabben krijgen het hard te verduren en aan de noordkant houdt het mos de pannen maandenlang vochtig. Wie in Brugge een dak laat vernieuwen, kiest daarom beter voor pannen die goed vasthaken en extra klemmen aan de dakranden en de nok. Daaronder hoort een dampopen onderdak dat het water afvoert als er toch eens een pan verschuift.',
      'In de binnenstad gelden bovendien andere regels dan in de rand. Het historische centrum is UNESCO-werelderfgoed en telt veel beschermde gebouwen. Wilt u daar natuurleien vervangen of oude Vlaamse pannen herleggen, dan kan een toelating van de stad nodig zijn en geeft Onroerend Erfgoed advies over materiaal, kleur en formaat. Wij kennen die procedure en werken met leien en pannen die aansluiten bij wat er lag. Buiten de vesten, in Sint-Andries, Sint-Michiels, Assebroek of Sint-Kruis, is een dakrenovatie met dezelfde vorm en hetzelfde volume meestal vrijgesteld van een omgevingsvergunning. Wij kijken het vooraf voor u na bij de stad.',
    ],
  },
  neighbourhoods: {
    heading: 'Waar in Brugge kunt u op ons rekenen?',
    intro: 'Van postcode 8000 tot 8380: wij werken in de binnenstad en in alle deelgemeenten van Brugge. Elke wijk heeft zijn eigen soort dak. Binnen de vesten zijn dat steile leiendaken, in Sint-Andries lage pannendaken uit de jaren 70 en in Sint-Kruis en Assebroek villa\'s met grote dakvlakken.',
    items: ['Brugge binnenstad', 'Sint-Andries', 'Sint-Michiels', 'Assebroek', 'Sint-Kruis', 'Koolkerke', 'Sint-Pieters', 'Sint-Jozef', 'Christus-Koning'],
  },
  services: {
    heading: 'Wat kunnen wij voor uw dak in Brugge doen?',
    intro: 'Kustwind, vochtige zeelucht, erfgoedregels en een woningpark dat van de middeleeuwen tot de jaren 80 loopt: daar houden wij in Brugge bij elke dienst rekening mee.',
    items: [
      { slug: 'dakrenovatie', text: 'De woningen uit de jaren 60 tot 80 in Sint-Andries en Sint-Michiels liggen vaak nog onder hun eerste pannendak, met een dun of geen onderdak. Bij een dakrenovatie vernieuwen wij onderdak, isolatie en pannen in één keer, met pannen die de kustwind aankunnen. Is de woning minstens 10 jaar oud, dan valt het werk onder 6% btw.' },
      { slug: 'hellende-daken', text: 'Binnen de vesten liggen natuurleien en oude Vlaamse pannen op steile daken met veel kilgoten en schouwen. Wij leggen ze opnieuw in hetzelfde materiaal en formaat, zoals de stad en Onroerend Erfgoed het vragen, met zink- en loodwerk dat de zeelucht verdraagt.' },
      { slug: 'platte-daken', text: 'Op de uitbouwen en garages in Assebroek en Sint-Kruis ligt dikwijls een oude roofing die na jaren wind en regen loskomt aan de randen. Wij vervangen die door EPDM op drukvaste PIR-isolatie, met een randafwerking waar de wind niet onder kan.' },
      { slug: 'dakisolatie', text: 'Veel villa\'s in Sint-Kruis en Assebroek werden gebouwd voor er isolatienormen bestonden en verliezen hun warmte langs boven. Wij isoleren tussen de kepers of als sarking langs buiten, met een Rd-waarde van minstens 4,5 m²K/W zodat u in aanmerking komt voor Mijn VerbouwPremie. Zo voldoet u meteen aan de dakisolatienorm, en kocht u een woning met EPC-label E of F, dan is dit een eerste stap in de renovatieverplichting.' },
      { slug: 'dakherstelling', text: 'Na een storm uit het westen gaat het in Brugge bijna altijd om hetzelfde: verschoven pannen, een losse nok of een goot die het begaf. Wij komen het dak eerst dichtmaken en herstellen daarna definitief, met foto\'s en een offerte voor uw verzekering.' },
      { slug: 'dakramen', text: 'Voor een VELUX dakraam op een zolder in Sint-Pieters of Koolkerke is meestal geen omgevingsvergunning nodig. In de binnenstad kijken wij eerst met u na of het dakvlak vanaf de straat zichtbaar is en of de stad een toelating vraagt.' },
      { slug: 'dak-ontmossen', text: 'Door de vochtige zeelucht groeit mos in Brugge snel, vooral op dakvlakken op het noorden in Sint-Jozef en Christus-Koning waar de zon weinig komt. Wij reinigen de pannen, zetten loszittende pannen vast en brengen een coating aan die het mos lang tegenhoudt.' },
      { slug: 'gevelbekleding', text: 'Een aanbouw of tuinkamer achter een rijwoning in Sint-Andries krijgt met houten gevelbekleding een warme uitstraling. Wij kiezen een houtsoort en afwerking die tegen de wind en regen van de kust kunnen. De bekleding en het platte dak zetten wij in één beweging, met een dakrand die het regenwater van het hout wegleidt.' },
      { slug: 'renovatiewerken', text: 'Een zolder afwerken met Gyproc na de isolatie, een tuinmuur herstellen achter een Brugse rijwoning of een terras aanleggen bij een villa in Sint-Kruis: onze eigen ploeg doet ook de karweien rond het dak, zonder onderaannemers.' },
    ],
  },
  localProof: {
    heading: 'Geregeld aan het werk in Brugge en omgeving',
    paragraphs: [
      'Wij staan geregeld op daken in Brugge, van de binnenstad tot Sint-Kruis, en evengoed in de gemeenten errond. Meer dan 150 projecten rondden wij de laatste 3 jaar af binnen de 30 km rond Aalter, van een handvol vervangen pannen tot een volledig nieuw dak. Wie bij u komt opmeten, komt ook zelf het dak leggen: Peter De Smet, zijn zoon en de vaste vakmensen van ons eigen team.',
      'Onze dakpannen komen van Wienerberger Koramic, onze materialen van APOK en Lecot en onze dakramen van VELUX, en de normen van Embuild zijn onze leidraad. Elk dak dat wij vernieuwen krijgt 10 jaar garantie op waterdichtheid, ook als de westerwind er vol op staat. Op de pagina realisaties ziet u wat onze ploeg aflevert. Twijfelt u of een dakherstelling nog volstaat of uw dak beter volledig vernieuwd wordt, dan zegt Peter u dat eerlijk tijdens het gratis plaatsbezoek.',
    ],
  },
  faq: [
    { q: 'Hoe ver is Brugge van Aalter en komt u ook voor een dringend lek?', a: 'Van Knesselare (Aalter) tot in Brugge is het 30 km, en ja, bij een lek of stormschade komen wij zo snel mogelijk. Via de E40 of via Oedelem staan wij op korte tijd in de stad, dus een plaatsbezoek plannen wij vlot in op een dag die u schikt. Bij dringende schade maken wij het dak eerst voorlopig dicht zodat het binnen droog blijft, en de definitieve herstelling volgt met een offerte.' },
    { q: 'Rekent u een verplaatsingskost aan voor een plaatsbezoek in Brugge?', a: 'Nee. Het plaatsbezoek en de offerte zijn gratis en vrijblijvend, ook in Brugge, de deelgemeenten en de gemeenten errond. Peter komt ter plaatse, meet op en bespreekt met u wat het dak nodig heeft, en daarna ontvangt u een offerte met vaste prijzen. Voor een kleine herstelling staat de verplaatsing vooraf als een vaste post op die offerte, zodat de factuur geen verrassingen bevat.' },
    { q: 'Mag ik zomaar het dak van mijn woning in de Brugse binnenstad vernieuwen?', a: 'Niet altijd: in de binnenstad kan een toelating van de stad nodig zijn. Het centrum is UNESCO-werelderfgoed en veel woningen zijn beschermd of liggen in een beschermd stadsgezicht, dus voor natuurleien of oude Vlaamse pannen geeft Onroerend Erfgoed advies over materiaal en kleur. Buiten de vesten blijft een dakrenovatie waarbij de dakvorm niet verandert meestal vergunningsvrij. Wij kijken vooraf met u na wat voor uw adres geldt en helpen bij de aanvraag.' },
    { q: 'Wat doet u bij stormschade aan mijn dak in Brugge?', a: 'Wij komen eerst het dak afdekken zodat het binnen droog blijft, bel daarvoor 0478 67 25 82. Door de ligging vlak bij de kust krijgt Brugge veel westerwind te verwerken: verschoven pannen, losse nokpannen en afgewaaide dakranden zijn de meest voorkomende schade. Wij leggen alles vast op foto, u krijgt een offerte voor uw verzekeraar en daarna herstellen wij definitief en zetten wij de pannen met extra klemmen vast.' },
    { q: 'Is er een premie voor dakisolatie in Brugge?', a: 'Mogelijk wel: de Vlaamse overheid heeft met Mijn VerbouwPremie een tegemoetkoming voor dakisolatie, en het bedrag verschilt per inkomenscategorie. De voorwaarden: de isolatie wordt geplaatst door een aannemer, haalt een Rd-waarde van minstens 4,5 m²K/W en uw woning is minstens 15 jaar oud, wat in Brugge zelden een probleem is. Let op: wie in een lagere inkomenscategorie zit en de woning zelf bewoont, krijgt sinds 1 maart 2026 geen premie meer voor dakisolatie, kijk de actuele voorwaarden dus na op vlaanderen.be. Het attest van de aannemer en de factuurdetails die de aanvraag vraagt, zorgen wij voor.' },
    { q: 'Geldt 6% of 21% btw voor dakwerken in Brugge?', a: 'Is uw woning minstens 10 jaar oud en wordt ze hoofdzakelijk als privéwoning gebruikt, dan betaalt u 6% btw. Dat geldt voor de meeste huizen in Brugge, van een interbellumwoning in Sint-Michiels tot een pand in de binnenstad. Wel moeten wij als aannemer de materialen zelf leveren en plaatsen en dat samen factureren; de verklaring daarover zetten wij op de factuur. Voor een woning jonger dan 10 jaar geldt 21%.' },
    { q: 'Welke woningen in Brugge neemt DSD Dakwerken aan?', a: 'Alle types: een beschermd pand met natuurleien in de binnenstad, een rijwoning uit het interbellum in Sint-Andries, een bungalow uit de jaren 70 in Sint-Michiels. Ook een villa met een groot dak in Sint-Kruis of Assebroek en de platte daken van garages, uitbouwen en kleinere appartementsgebouwen horen erbij. Wat het ook is, wij bekijken eerst de dakconstructie, het onderdak en de isolatie en pas dan doen wij een voorstel.' },
    { q: 'Werkt u ook in Oostkamp, Zedelgem, Beernem en Oedelem?', a: 'Ja, Oostkamp, Zedelgem, Beernem en Oedelem liggen allemaal binnen de 30 km rond Aalter waarin wij werken. Beernem en Oedelem passeren wij op weg naar Brugge, Oostkamp en Zedelgem liggen aan de zuidkant van de stad. Een plaatsbezoek daar combineren wij vaak met een werf in de buurt. U krijgt er dezelfde aanpak als in Brugge: Peter komt gratis kijken, de offerte bevat vaste prijzen en op het nieuwe dak geldt 10 jaar garantie op waterdichtheid.' },
  ],
  nearby: ['dakwerker-maldegem', 'dakwerker-eeklo'],
  cta: {
    heading: 'Plan uw gratis plaatsbezoek in Brugge',
    text: 'Bel, sms of mail ons. Peter komt naar Brugge op een dag die u past, bekijkt het dak en de zolder en, in de binnenstad, wat de stad toelaat. Daarna ontvangt u een offerte met vaste prijzen, zonder verplaatsingskost en zonder verplichting.',
  },
};

export default content;
