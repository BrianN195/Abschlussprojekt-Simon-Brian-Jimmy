import AnimalTranslationModel from "../models/AnimalTranslationModel";
import LocationTranslationModel from "../models/LocationTranslationModel";
import AnimalLocationModel from "../models/AnimalLocationModel";
import AnimalModel from "../models/AnimalModel";
import LocationModel from "../models/LocationModel";

async function seed() {
  // Base animals
  const animalsData = [
    {
      name: "Mantarochen",
      scientificName: "Mobula alfredi",
      description:
        "Großer Rochen der häufig in den Malediven vorkommt. Bekannt für seine eleganten Bewegungen und seine Präsenz an Reinigungsstationen in den Atollen.",
      category: "ray",
      dangerLevel: 1,
      imageUrl: "/images/animals/mantarochen.jpg",
      size: "3-5 m",
      weight: "700-1400 kg",
      habitat: "Korallenriffe und Reinigungsstationen in Haa Dhaalu, South Ari und North Male Atoll",
      depthRange: "5-40 m",
      diet: "Plankton",
      isSchooling: false,
      scientificNameKey: "Mobula alfredi",
    },
    {
      name: "Leopardenhai",
      scientificName: "Stegostoma tigrinum",
      description:
        "Ruhiger bodenlebender Hai mit charakteristischem Fleckenmuster. Häufig in warmen Lagunen und Riffbereichen der Malediven anzutreffen.",
      category: "shark",
      dangerLevel: 2,
      imageUrl: "/images/animals/leopardenhai.jpg",
      size: "2-3.5 m",
      weight: "20-30 kg",
      habitat: "Lagunen und Korallenriffe im Haa Dhaalu Atoll",
      depthRange: "5-62 m",
      diet: "Krustentiere und kleine Fische",
      isSchooling: false,
      scientificNameKey: "Stegostoma tigrinum",
    },
    {
      name: "Adlerrochen",
      scientificName: "Aetobatus narinari",
      description:
        "Schneller Rochen mit markanten weißen Punkten. Oft in offenen Lagunen und Kanälen der südlichen Malediven zu sehen.",
      category: "ray",
      dangerLevel: 1,
      imageUrl: "/images/animals/adlerrochen.jpg",
      size: "2-3 m",
      weight: "150-230 kg",
      habitat: "Kanäle und Lagunen im Addu Atoll",
      depthRange: "1-80 m",
      diet: "Muscheln und Krebstiere",
      isSchooling: true,
      scientificNameKey: "Aetobatus narinari",
    },
    {
      name: "Meeresschildkröte",
      scientificName: "Chelonia mydas",
      description:
        "Grüne Meeresschildkröte die häufig an Korallenriffen der Malediven vorkommt. Bekannt für ihre ruhige Art und langen Wanderungen.",
      category: "turtle",
      dangerLevel: 1,
      imageUrl: "/images/animals/meeresschildkröte.jpg",
      size: "0.8-1.5 m",
      weight: "110-190 kg",
      habitat: "Korallenriffe und Seegrasgebiete im Addu und Faafu Atoll",
      depthRange: "0-50 m",
      diet: "Seegras und Algen",
      isSchooling: false,
      scientificNameKey: "Chelonia mydas",
    },
    {
      name: "Riffhai",
      scientificName: "Carcharhinus melanopterus",
      description:
        "Kleiner bis mittelgroßer Hai der oft nahe Korallenriffen schwimmt. Häufig in flachen Lagunen der Malediven anzutreffen.",
      category: "shark",
      dangerLevel: 3,
      imageUrl: "/images/animals/hai.jpg",
      size: "1.2-1.8 m",
      weight: "13-45 kg",
      habitat: "Korallenriffe im Faafu Atoll",
      depthRange: "1-30 m",
      diet: "Kleine Fische und Tintenfische",
      isSchooling: false,
      scientificNameKey: "Carcharhinus melanopterus",
    },
    {
      name: "Barrakuda",
      scientificName: "Sphyraena barracuda",
      description:
        "Raubfisch mit langem silbernen Körper und scharfen Zähnen. Oft in Gruppen an Riffkanten der Malediven anzutreffen.",
      category: "fish",
      dangerLevel: 3,
      imageUrl: "/images/animals/barrakuda.jpg",
      size: "0.6-1.8 m",
      weight: "5-25 kg",
      habitat: "Riffkanten im North Male Atoll",
      depthRange: "3-100 m",
      diet: "Fische",
      isSchooling: true,
      scientificNameKey: "Sphyraena barracuda",
    },
    {
      name: "Walhai",
      scientificName: "Rhincodon typus",
      description:
        "Größter Fisch der Welt und einer der bekanntesten Bewohner des South Ari Atolls. Trotz seiner Größe vollkommen ungefährlich für Menschen.",
      category: "shark",
      dangerLevel: 1,
      imageUrl: "/images/animals/walhai.jpg",
      size: "8-18 m",
      weight: "15000-34000 kg",
      habitat: "Offene Gewässer und Riffbereiche im South Ari Atoll",
      depthRange: "0-1000 m",
      diet: "Plankton",
      isSchooling: false,
      scientificNameKey: "Rhincodon typus",
    },
    {
      name: "Weißspitzen-Riffhai",
      scientificName: "Triaenodon obesus",
      description:
        "Nachtaktiver Riffhai, der tagsüber oft regungslos in Höhlen oder unter Korallen liegt. Sehr häufig in den Malediven.",
      category: "shark",
      dangerLevel: 2,
      imageUrl: "/images/animals/Weißspitzen-Riffhai.jpg",
      size: "1.2-1.6 m",
      weight: "18-20 kg",
      habitat: "Korallenriffe in North Male Atoll und Faafu Atoll",
      depthRange: "0-40 m",
      diet: "Fische, Tintenfische, Krebstiere",
      isSchooling: false,
      scientificNameKey: "Triaenodon obesus",
    },
    {
      name: "Grauer Riffhai",
      scientificName: "Carcharhinus amblyrhynchos",
      description:
        "Aktiver Riffhai, der oft an Riffkanten patrouilliert. Häufig in größeren Gruppen in den äußeren Atollbereichen.",
      category: "shark",
      dangerLevel: 3,
      imageUrl: "/images/animals/grauerRiffhai.jpg",
      size: "1.5-2.5 m",
      weight: "20-35 kg",
      habitat: "Außenriffe im Haa Dhaalu und South Ari Atoll",
      depthRange: "10-100 m",
      diet: "Fische, Kopffüßer",
      isSchooling: true,
      scientificNameKey: "Carcharhinus amblyrhynchos",
    },
    {
      name: "Clownfisch",
      scientificName: "Amphiprion ocellaris",
      description:
        "Kleiner, farbenfroher Riff-Fisch der in Symbiose mit Seeanemonen lebt. Sehr häufig in flachen Korallenriffen der Malediven.",
      category: "fish",
      dangerLevel: 1,
      imageUrl: "/images/animals/clownfish.jpg",
      size: "8-11 cm",
      weight: "20-30 g",
      habitat: "Flache Korallenriffe in Faafu Atoll und North Male Atoll",
      depthRange: "1-20 m",
      diet: "Plankton, kleine Krebstiere",
      isSchooling: true,
      scientificNameKey: "Amphiprion ocellaris",
    },
  ];

  // Base locations
  const locationsData = [
    {
      name: "Haa Dhaalu Atoll",
      description:
        "Abgelegenes Atoll im Norden der Malediven mit zahlreichen Korallenriffen, Wracks und artenreicher Unterwasserwelt. Bekannt für Mantas, Leopardenhaie sowie Weiß- und Schwarzspitzenriffhaie. Beliebtes Gebiet zum Tauchen und Schnorcheln.",
      region: "Nördliche Malediven",
      latitude: 6.5783,
      longitude: 72.9461,
      depth: 30,
      type: "reef",
      imageUrl: "/images/locations/Haa Dhaalu Atoll.jpg",
    },
    {
      name: "Addu Atoll",
      description:
        "Südlichstes Atoll der Malediven mit farbenreichen Korallenriffen, Steilwänden und berühmten Wracktauchplätzen. Bekannt für Mantarochen, Schildkröten, Adlerrochen und große Fischschwärme. Besonders beliebt ist das Wrack der British Loyalty.",
      region: "Südliche Malediven",
      latitude: -0.6292,
      longitude: 73.1586,
      depth: 40,
      type: "wreck",
      imageUrl: "/images/locations/Addu Atoll.jpg",
    },
    {
      name: "Faafu Atoll",
      description:
        "Ruhiges Atoll der zentralen Malediven mit unberührten Korallenriffen, Kanälen und vielfältiger Unterwasserwelt. Bekannt für Schildkröten, Riffhaie, Adlerrochen und farbenreiche Rifffische. Besonders beliebt bei Tauchern wegen der klaren Sicht und gesunden Korallenformationen.",
      region: "Zentrale Malediven",
      latitude: 3.1078,
      longitude: 72.9656,
      depth: 28,
      type: "reef",
      imageUrl: "/images/locations/Faafu Atoll.jpg",
    },
    {
      name: "North Male Atoll",
      description:
        "Eines der bekanntesten Atolle der Malediven mit zahlreichen Tauchspots, Steilwänden und Höhlen. Berühmt für starke Strömungstauchgänge, große Fischschwärme, Riffhaie, Mantas und farbenreiche Korallenriffe.",
      region: "Zentrale Malediven",
      latitude: 4.3239,
      longitude: 73.4597,
      depth: 35,
      type: "wall",
      imageUrl: "/images/locations/North Male Atoll.jpg",
    },
    {
      name: "South Ari Atoll",
      description:
        "Weltbekanntes Tauchgebiet im Westen der Malediven mit hoher Chance auf Walhaie und Mantarochen. Das Atoll bietet große Korallenriffe, Kanäle und beeindruckende Begegnungen mit Großfischen.",
      region: "Westliche Malediven",
      latitude: 3.65,
      longitude: 72.9,
      depth: 40,
      type: "reef",
      imageUrl: "/images/locations/South Ari Atoll.jpg",
    },
  ];

  // Create or find base animals
  const animalsMap = new Map<string, any>();
  for (const a of animalsData) {
    const [animal] = await AnimalModel.findOrCreate({
      where: { scientificName: a.scientificNameKey },
      defaults: {
        name: a.name,
        scientificName: a.scientificName,
        description: a.description,
        category: a.category,
        dangerLevel: a.dangerLevel,
        imageUrl: a.imageUrl,
        size: a.size,
        weight: a.weight,
        habitat: a.habitat,
        depthRange: a.depthRange,
        diet: a.diet,
        isSchooling: a.isSchooling,
      },
    });
    animalsMap.set(a.scientificNameKey, animal);
  }

  // Create or find base locations
  const locationsMap = new Map<string, any>();
  for (const l of locationsData) {
    const [location] = await LocationModel.findOrCreate({
      where: { name: l.name },
      defaults: l,
    });
    locationsMap.set(l.name, location);
  }

  // --- Copy base entries into translation tables (idempotent) ---
  const locale = "de";
  const englishLocale = "en";

  const animalTranslations = [
    {
      scientificKey: "Mobula alfredi",
      locale,
      name: "Mantarochen",
      description:
        "Großer Rochen der häufig in den Malediven vorkommt. Bekannt für seine eleganten Bewegungen und seine Präsenz an Reinigungsstationen in den Atollen.",
      habitat: "Korallenriffe und Reinigungsstationen in Haa Dhaalu, South Ari und North Male Atoll",
      diet: "Plankton",
      category: "ray",
    },
    {
      scientificKey: "Stegostoma tigrinum",
      locale,
      name: "Leopardenhai",
      description:
        "Ruhiger bodenlebender Hai mit charakteristischem Fleckenmuster. Häufig in warmen Lagunen und Riffbereichen der Malediven anzutreffen.",
      habitat: "Lagunen und Korallenriffe im Haa Dhaalu Atoll",
      diet: "Krustentiere und kleine Fische",
      category: "shark",
    },
    {
      scientificKey: "Aetobatus narinari",
      locale,
      name: "Adlerrochen",
      description:
        "Schneller Rochen mit markanten weißen Punkten. Oft in offenen Lagunen und Kanälen der südlichen Malediven zu sehen.",
      habitat: "Kanäle und Lagunen im Addu Atoll",
      diet: "Muscheln und Krebstiere",
      category: "ray",
    },
    {
      scientificKey: "Chelonia mydas",
      locale,
      name: "Meeresschildkröte",
      description:
        "Grüne Meeresschildkröte die häufig an Korallenriffen der Malediven vorkommt. Bekannt für ihre ruhige Art und langen Wanderungen.",
      habitat: "Korallenriffe und Seegrasgebiete im Addu und Faafu Atoll",
      diet: "Seegras und Algen",
      category: "turtle",
    },
    {
      scientificKey: "Carcharhinus melanopterus",
      locale,
      name: "Riffhai",
      description:
        "Kleiner bis mittelgroßer Hai der oft nahe Korallenriffen schwimmt. Häufig in flachen Lagunen der Malediven anzutreffen.",
      habitat: "Korallenriffe im Faafu Atoll",
      diet: "Kleine Fische und Tintenfische",
      category: "shark",
    },
    {
      scientificKey: "Sphyraena barracuda",
      locale,
      name: "Barrakuda",
      description:
        "Raubfisch mit langem silbernen Körper und scharfen Zähnen. Oft in Gruppen an Riffkanten der Malediven anzutreffen.",
      habitat: "Riffkanten im North Male Atoll",
      diet: "Fische",
      category: "fish",
    },
    {
      scientificKey: "Rhincodon typus",
      locale,
      name: "Walhai",
      description:
        "Größter Fisch der Welt und einer der bekanntesten Bewohner des South Ari Atolls. Trotz seiner Größe vollkommen ungefährlich für Menschen.",
      habitat: "Offene Gewässer und Riffbereiche im South Ari Atoll",
      diet: "Plankton",
      category: "shark",
    },
    {
      scientificKey: "Triaenodon obesus",
      locale,
      name: "Weißspitzen-Riffhai",
      description:
        "Nachtaktiver Riffhai, der tagsüber oft regungslos in Höhlen oder unter Korallen liegt. Sehr häufig in den Malediven.",
      habitat: "Korallenriffe in North Male Atoll und Faafu Atoll",
      diet: "Fische, Tintenfische, Krebstiere",
      category: "shark",
    },
    {
      scientificKey: "Carcharhinus amblyrhynchos",
      locale,
      name: "Grauer Riffhai",
      description:
        "Aktiver Riffhai, der oft an Riffkanten patrouilliert. Häufig in größeren Gruppen in den äußeren Atollbereichen.",
      habitat: "Außenriffe im Haa Dhaalu und South Ari Atoll",
      diet: "Fische, Kopffüßer",
      category: "shark",
    },
    {
      scientificKey: "Amphiprion ocellaris",
      locale,
      name: "Clownfisch",
      description:
        "Kleiner, farbenfroher Riff-Fisch der in Symbiose mit Seeanemonen lebt. Sehr häufig in flachen Korallenriffen der Malediven.",
      habitat: "Flache Korallenriffe in Faafu Atoll und North Male Atoll",
      diet: "Plankton, kleine Krebstiere",
      category: "fish",
    },
  ];

  const locationTranslations = [
    {
      locationName: "Haa Dhaalu Atoll",
      locale,
      name: "Haa Dhaalu Atoll",
      description:
        "Abgelegenes Atoll im Norden der Malediven mit zahlreichen Korallenriffen, Wracks und artenreicher Unterwasserwelt. Bekannt für Mantas, Leopardenhaie sowie Weiß- und Schwarzspitzenriffhaie. Beliebtes Gebiet zum Tauchen und Schnorcheln.",
      region: "Nördliche Malediven",
    },
    {
      locationName: "Addu Atoll",
      locale,
      name: "Addu Atoll",
      description:
        "Südlichstes Atoll der Malediven mit farbenreichen Korallenriffen, Steilwänden und berühmten Wracktauchplätzen. Bekannt für Mantarochen, Schildkröten, Adlerrochen und große Fischschwärme. Besonders beliebt ist das Wrack der British Loyalty.",
      region: "Südliche Malediven",
    },
    {
      locationName: "Faafu Atoll",
      locale,
      name: "Faafu Atoll",
      description:
        "Ruhiges Atoll der zentralen Malediven mit unberührten Korallenriffen, Kanälen und vielfältiger Unterwasserwelt. Bekannt für Schildkröten, Riffhaie, Adlerrochen und farbenreiche Rifffische. Besonders beliebt bei Tauchern wegen der klaren Sicht und gesunden Korallenformationen.",
      region: "Zentrale Malediven",
    },
    {
      locationName: "North Male Atoll",
      locale,
      name: "North Male Atoll",
      description:
        "Eines der bekanntesten Atolle der Malediven mit zahlreichen Tauchspots, Steilwänden und Höhlen. Berühmt für starke Strömungstauchgänge, große Fischschwärme, Riffhaie, Mantas und farbenreiche Korallenriffe.",
      region: "Zentrale Malediven",
    },
    {
      locationName: "South Ari Atoll",
      locale,
      name: "South Ari Atoll",
      description:
        "Weltbekanntes Tauchgebiet im Westen der Malediven mit hoher Chance auf Walhaie und Mantarochen. Das Atoll bietet große Korallenriffe, Kanäle und beeindruckende Begegnungen mit Großfischen.",
      region: "Westliche Malediven",
    },
  ];

  const animalTranslationsEn = [
    {
      scientificKey: "Mobula alfredi",
      locale: englishLocale,
      name: "Manta Ray",
      description:
        "Large ray commonly found in the Maldives. Known for its graceful movements and presence at cleaning stations throughout the atolls.",
      habitat: "Coral reefs and cleaning stations in Haa Dhaalu, South Ari and North Male Atoll",
      diet: "Plankton",
      category: "ray",
    },
    {
      scientificKey: "Stegostoma tigrinum",
      locale: englishLocale,
      name: "Leopard Shark",
      description:
        "Calm bottom-dwelling shark with a distinctive spotted pattern. Often seen in warm lagoons and reef areas of the Maldives.",
      habitat: "Lagoons and coral reefs in Haa Dhaalu Atoll",
      diet: "Crustaceans and small fish",
      category: "shark",
    },
    {
      scientificKey: "Aetobatus narinari",
      locale: englishLocale,
      name: "Eagle Ray",
      description:
        "Fast-moving ray with striking white spots. Often spotted in open lagoons and channels in the southern Maldives.",
      habitat: "Channels and lagoons in Addu Atoll",
      diet: "Mollusks and crustaceans",
      category: "ray",
    },
    {
      scientificKey: "Chelonia mydas",
      locale: englishLocale,
      name: "Sea Turtle",
      description:
        "Green sea turtle commonly found on coral reefs in the Maldives. Known for its calm nature and long migrations.",
      habitat: "Coral reefs and seagrass areas in Addu and Faafu Atoll",
      diet: "Seagrass and algae",
      category: "turtle",
    },
    {
      scientificKey: "Carcharhinus melanopterus",
      locale: englishLocale,
      name: "Reef Shark",
      description:
        "Small to medium-sized shark that often swims close to coral reefs. Frequently seen in shallow lagoons in the Maldives.",
      habitat: "Coral reefs in Faafu Atoll",
      diet: "Small fish and squid",
      category: "shark",
    },
    {
      scientificKey: "Sphyraena barracuda",
      locale: englishLocale,
      name: "Barracuda",
      description:
        "Predatory fish with a long silver body and sharp teeth. Often seen in schools along reef edges in the Maldives.",
      habitat: "Reef edges in North Male Atoll",
      diet: "Fish",
      category: "fish",
    },
    {
      scientificKey: "Rhincodon typus",
      locale: englishLocale,
      name: "Whale Shark",
      description:
        "Largest fish in the world and one of the most famous inhabitants of South Ari Atoll. Despite its size, completely harmless to humans.",
      habitat: "Open waters and reef areas in South Ari Atoll",
      diet: "Plankton",
      category: "shark",
    },
    {
      scientificKey: "Triaenodon obesus",
      locale: englishLocale,
      name: "Whitetip Reef Shark",
      description:
        "Nocturnal reef shark that often rests motionless in caves or under corals during the day. Very common in the Maldives.",
      habitat: "Coral reefs in North Male Atoll and Faafu Atoll",
      diet: "Fish, squid, crustaceans",
      category: "shark",
    },
    {
      scientificKey: "Carcharhinus amblyrhynchos",
      locale: englishLocale,
      name: "Grey Reef Shark",
      description:
        "Active reef shark that often patrols reef edges. Common in larger groups in the outer atoll areas.",
      habitat: "Outer reefs in Haa Dhaalu and South Ari Atoll",
      diet: "Fish, cephalopods",
      category: "shark",
    },
    {
      scientificKey: "Amphiprion ocellaris",
      locale: englishLocale,
      name: "Clownfish",
      description:
        "Small, colorful reef fish that lives in symbiosis with sea anemones. Very common on shallow coral reefs in the Maldives.",
      habitat: "Shallow coral reefs in Faafu Atoll and North Male Atoll",
      diet: "Plankton, small crustaceans",
      category: "fish",
    },
  ];

  const locationTranslationsEn = [
    {
      locationName: "Haa Dhaalu Atoll",
      locale: englishLocale,
      name: "Haa Dhaalu Atoll",
      description:
        "Remote atoll in the north of the Maldives with numerous coral reefs, wrecks and rich underwater life. Known for manta rays, leopard sharks and whitetip and blacktip reef sharks. A popular area for diving and snorkeling.",
      region: "Northern Maldives",
    },
    {
      locationName: "Addu Atoll",
      locale: englishLocale,
      name: "Addu Atoll",
      description:
        "Southernmost atoll of the Maldives with colorful coral reefs, steep walls and famous wreck dives. Known for manta rays, turtles, eagle rays and large schools of fish. The British Loyalty wreck is especially popular.",
      region: "Southern Maldives",
    },
    {
      locationName: "Faafu Atoll",
      locale: englishLocale,
      name: "Faafu Atoll",
      description:
        "Quiet central Maldivian atoll with pristine coral reefs, channels and diverse marine life. Known for turtles, reef sharks, eagle rays and colorful reef fish. Popular with divers for clear visibility and healthy coral formations.",
      region: "Central Maldives",
    },
    {
      locationName: "North Male Atoll",
      locale: englishLocale,
      name: "North Male Atoll",
      description:
        "One of the best-known atolls in the Maldives with numerous dive sites, steep walls and caves. Famous for strong current dives, large fish schools, reef sharks, mantas and colorful coral reefs.",
      region: "Central Maldives",
    },
    {
      locationName: "South Ari Atoll",
      locale: englishLocale,
      name: "South Ari Atoll",
      description:
        "World-famous dive area in the west of the Maldives with a high chance of seeing whale sharks and manta rays. The atoll offers large coral reefs, channels and impressive encounters with big fish.",
      region: "Western Maldives",
    },
  ];

  const animalTranslationsFr = [
    { scientificKey: "Mobula alfredi", locale: "fr", name: "Raie Manta", description: "Grande raie commune aux Maldives, connue pour ses mouvements élégants et sa présence aux stations de nettoyage.", habitat: "Récifs coralliens et stations de nettoyage à Haa Dhaalu, South Ari et North Male Atoll", diet: "Plancton", category: "ray" },
    { scientificKey: "Stegostoma tigrinum", locale: "fr", name: "Requin léopard", description: "Requin au comportement calme avec un motif tacheté distinctif, fréquent dans les lagons chauds.", habitat: "Lagon et récifs coralliens du Haa Dhaalu Atoll", diet: "Crustacés et petits poissons", category: "shark" },
    { scientificKey: "Aetobatus narinari", locale: "fr", name: "Raie aigle", description: "Raie rapide avec des taches blanches marquantes, souvent observée en lagons ouverts.", habitat: "Canaux et lagons de l'Addu Atoll", diet: "Mollusques et crustacés", category: "ray" },
    { scientificKey: "Chelonia mydas", locale: "fr", name: "Tortue marine", description: "Tortue verte fréquente sur les récifs coralliens, connue pour sa nature tranquille et ses longues migrations.", habitat: "Récifs coralliens et herbiers marins à Addu et Faafu Atoll", diet: "Herbier marin et algues", category: "turtle" },
    { scientificKey: "Carcharhinus melanopterus", locale: "fr", name: "Requin de récif", description: "Petit à moyen requin fréquentant les récifs coralliens, souvent aperçu en lagons peu profonds.", habitat: "Récifs coralliens du Faafu Atoll", diet: "Petits poissons et calmars", category: "shark" },
    { scientificKey: "Sphyraena barracuda", locale: "fr", name: "Barracuda", description: "Poisson prédateur au corps argenté et dents acérées, souvent en bancs le long des bords de récifs.", habitat: "Bords de récifs du North Male Atoll", diet: "Poissons", category: "fish" },
    { scientificKey: "Rhincodon typus", locale: "fr", name: "Requin-baleine", description: "Plus grand poisson du monde, célèbre résident du South Ari Atoll; inoffensif pour l'homme.", habitat: "Eaux ouvertes et zones de récif du South Ari Atoll", diet: "Plancton", category: "shark" },
    { scientificKey: "Triaenodon obesus", locale: "fr", name: "Requin pointe blanche", description: "Requin de récif nocturne qui se repose souvent immobile sous les coraux pendant la journée.", habitat: "Récifs coralliens du North Male Atoll et Faafu Atoll", diet: "Poissons, calmars, crustacés", category: "shark" },
    { scientificKey: "Carcharhinus amblyrhynchos", locale: "fr", name: "Requin gris", description: "Requin actif souvent en patrouille sur les bords de récifs, fréquent en groupes.", habitat: "Récifs extérieurs à Haa Dhaalu et South Ari Atoll", diet: "Poissons, céphalopodes", category: "shark" },
    { scientificKey: "Amphiprion ocellaris", locale: "fr", name: "Poisson-clown", description: "Petit poisson coloré vivant en symbiose avec des anémones de mer, très commun sur les récifs peu profonds.", habitat: "Récifs peu profonds à Faafu et North Male Atoll", diet: "Plancton, petits crustacés", category: "fish" },
  ];

  const locationTranslationsFr = [
    { locationName: "Haa Dhaalu Atoll", locale: "fr", name: "Haa Dhaalu Atoll", description: "Atoll isolé au nord des Maldives avec de nombreux récifs, épaves et une vie sous-marine riche.", region: "Maldives du Nord" },
    { locationName: "Addu Atoll", locale: "fr", name: "Addu Atoll", description: "Atoll le plus au sud offrant récifs colorés, murs escarpés et plongées sur épaves célèbres.", region: "Maldives du Sud" },
    { locationName: "Faafu Atoll", locale: "fr", name: "Faafu Atoll", description: "Atoll central calme avec récifs vierges, canaux et faune diversifiée, apprécié pour sa bonne visibilité.", region: "Maldives centrales" },
    { locationName: "North Male Atoll", locale: "fr", name: "North Male Atoll", description: "Atoll bien connu avec de nombreux sites de plongée, murs et grottes impressionnants.", region: "Maldives centrales" },
    { locationName: "South Ari Atoll", locale: "fr", name: "South Ari Atoll", description: "Zone de plongée mondialement reconnue avec grande probabilité d'observer des requins-baleines et des raies manta.", region: "Maldives occidentales" },
  ];

  const animalTranslationsEs = [
    { scientificKey: "Mobula alfredi", locale: "es", name: "Manta", description: "Gran raya común en Maldivas, conocida por sus movimientos gráciles y su presencia en estaciones de limpieza.", habitat: "Arrecifes de coral y estaciones de limpieza en Haa Dhaalu, South Ari y North Male Atoll", diet: "Plancton", category: "ray" },
    { scientificKey: "Stegostoma tigrinum", locale: "es", name: "Tiburón leopardo", description: "Tiburón de fondo tranquilo con un patrón moteado distintivo, frecuente en lagunas cálidas.", habitat: "Lagunas y arrecifes coralinos en Haa Dhaalu Atoll", diet: "Crustáceos y peces pequeños", category: "shark" },
    { scientificKey: "Aetobatus narinari", locale: "es", name: "Raya águila", description: "Raya rápida con manchas blancas llamativas, a menudo vista en lagunas abiertas.", habitat: "Canales y lagunas en Addu Atoll", diet: "Moluscos y crustáceos", category: "ray" },
    { scientificKey: "Chelonia mydas", locale: "es", name: "Tortuga marina", description: "Tortuga verde común en los arrecifes, conocida por su naturaleza tranquila y migraciones largas.", habitat: "Arrecifes y praderas marinas en Addu y Faafu Atoll", diet: "Pastos marinos y algas", category: "turtle" },
    { scientificKey: "Carcharhinus melanopterus", locale: "es", name: "Tiburón de arrecife", description: "Tiburón pequeño a mediano que nada cerca de los arrecifes coralinos, frecuente en lagunas poco profundas.", habitat: "Arrecifes en Faafu Atoll", diet: "Peces pequeños y calamares", category: "shark" },
    { scientificKey: "Sphyraena barracuda", locale: "es", name: "Barracuda", description: "Pez depredador de cuerpo plateado y dientes afilados, a menudo en bancos en los bordes de arrecifes.", habitat: "Bordes de arrecifes en North Male Atoll", diet: "Peces", category: "fish" },
    { scientificKey: "Rhincodon typus", locale: "es", name: "Tiburón ballena", description: "El pez más grande del mundo y residente conocido del South Ari Atoll; inofensivo para los humanos.", habitat: "Aguas abiertas y zonas de arrecife en South Ari Atoll", diet: "Plancton", category: "shark" },
    { scientificKey: "Triaenodon obesus", locale: "es", name: "Tiburón de punta blanca", description: "Tiburón de arrecife nocturno que a menudo descansa inmóvil en cuevas durante el día.", habitat: "Arrecifes en North Male Atoll y Faafu Atoll", diet: "Peces, calamares, crustáceos", category: "shark" },
    { scientificKey: "Carcharhinus amblyrhynchos", locale: "es", name: "Tiburón gris", description: "Tiburón activo que patrulla bordes de arrecifes, común en grupos en áreas externas.", habitat: "Arrecifes exteriores en Haa Dhaalu y South Ari Atoll", diet: "Peces, cefalópodos", category: "shark" },
    { scientificKey: "Amphiprion ocellaris", locale: "es", name: "Pez payaso", description: "Pequeño pez colorido en simbiosis con anémonas, muy común en arrecifes poco profundos.", habitat: "Arrecifes poco profundos en Faafu y North Male Atoll", diet: "Plancton y pequeños crustáceos", category: "fish" },
  ];

  const locationTranslationsEs = [
    { locationName: "Haa Dhaalu Atoll", locale: "es", name: "Haa Dhaalu Atoll", description: "Atolón remoto en el norte de Maldivas con numerosos arrecifes, pecios y rica vida submarina.", region: "Maldivas del Norte" },
    { locationName: "Addu Atoll", locale: "es", name: "Addu Atoll", description: "Atolón más al sur con arrecifes coloridos, paredes y buceos en pecios famosos.", region: "Maldivas del Sur" },
    { locationName: "Faafu Atoll", locale: "es", name: "Faafu Atoll", description: "Atolón central tranquilo con arrecifes prístinos, canales y diversa fauna marina.", region: "Maldivas centrales" },
    { locationName: "North Male Atoll", locale: "es", name: "North Male Atoll", description: "Uno de los atolones más conocidos con numerosos sitios de buceo y impresionantes paredes.", region: "Maldivas centrales" },
    { locationName: "South Ari Atoll", locale: "es", name: "South Ari Atoll", description: "Zona de buceo de fama mundial con alta probabilidad de ver tiburones ballena y mantas.", region: "Maldivas occidentales" },
  ];

  const animalTranslationsAr = [
    { scientificKey: "Mobula alfredi", locale: "ar", name: "مانتا (شيطان البحر)", description: "راية كبيرة شائعة في جزر المالديف، معروفة بحركاتها الرشيقة ووجودها في محطات التنظيف.", habitat: "الشعاب المرجانية ومحطات التنظيف في Haa Dhaalu وSouth Ari وNorth Male Atoll", diet: "العوالق", category: "ray" },
    { scientificKey: "Stegostoma tigrinum", locale: "ar", name: "قرش النمر", description: "قرش قاع هادئ بنمط مرقط مميز، يُرى غالبًا في البحيرات الضحلة الدافئة.", habitat: "الخلجان والشعاب المرجانية في Haa Dhaalu Atoll", diet: "القشريات والأسماك الصغيرة", category: "shark" },
    { scientificKey: "Aetobatus narinari", locale: "ar", name: "راي النسر", description: "راي سريع مع نقاط بيضاء بارزة، يُشاهد في كثير من الأحيان في البحيرات المفتوحة.", habitat: "القنوات والبحيرات في Addu Atoll", diet: "الرخويات والقشريات", category: "ray" },
    { scientificKey: "Chelonia mydas", locale: "ar", name: "سلحفاة بحرية", description: "سلحفاة خضراء شائعة على الشعاب المرجانية، معروفة بهدوئها وهجراتها الطويلة.", habitat: "الشعاب المرجانية ومناطق الأعشاب البحرية في Addu وFaafu Atoll", diet: "أعشاب البحر والطحالب", category: "turtle" },
    { scientificKey: "Carcharhinus melanopterus", locale: "ar", name: "قرش الشعب", description: "قرش صغير إلى متوسط الحجم يسبح بالقرب من الشعاب المرجانية، يُرى في الخلجان الضحلة.", habitat: "الشعاب المرجانية في Faafu Atoll", diet: "أسماك صغيرة والحبار", category: "shark" },
    { scientificKey: "Sphyraena barracuda", locale: "ar", name: "باراكودا", description: "سمك مفترس بجسم فضي طويل وأسنان حادة، غالبًا ما يُرى في جماعات على حواف الشعاب.", habitat: "حواف الشعاب في North Male Atoll", diet: "أسماك", category: "fish" },
    { scientificKey: "Rhincodon typus", locale: "ar", name: "قرش الحوت", description: "أكبر سمكة في العالم وواحد من أشهر سكان South Ari Atoll؛ غير ضار للبشر.", habitat: "المياه المفتوحة ومناطق الشعاب في South Ari Atoll", diet: "العوالق", category: "shark" },
    { scientificKey: "Triaenodon obesus", locale: "ar", name: "قرش ذي الأطراف البيضاء", description: "قرش مرجاني ليلي يستريح غالبًا بلا حراك في الكهوف أو تحت الشعاب نهارًا.", habitat: "الشعاب المرجانية في North Male Atoll وFaafu Atoll", diet: "أسماك، حبار، قشريات", category: "shark" },
    { scientificKey: "Carcharhinus amblyrhynchos", locale: "ar", name: "القرش الرمادي", description: "قرش نشط يغادر عادة على حواف الشعاب، شائع في مجموعات كبيرة.", habitat: "الشعاب الخارجية في Haa Dhaalu وSouth Ari Atoll", diet: "أسماك، رخويات", category: "shark" },
    { scientificKey: "Amphiprion ocellaris", locale: "ar", name: "سمك المهرج", description: "سمك صغير وملون يعيش في علاقة تكافلية مع شقائق البحر، شائع على الشعاب الضحلة.", habitat: "الشعاب الضحلة في Faafu وNorth Male Atoll", diet: "العوالق والقشريات الصغيرة", category: "fish" },
  ];

  const locationTranslationsAr = [
    { locationName: "Haa Dhaalu Atoll", locale: "ar", name: "Haa Dhaalu Atoll", description: "أطلس نائي شمال جزر المالديف مع العديد من الشعاب المرجانية والحطام وحياة بحرية غنية.", region: "شمال المالديف" },
    { locationName: "Addu Atoll", locale: "ar", name: "Addu Atoll", description: "أقصى الأطلس جنوبًا مع شعاب ملونة وجدران حادة وغوص على حطام مشهور.", region: "جنوب المالديف" },
    { locationName: "Faafu Atoll", locale: "ar", name: "Faafu Atoll", description: "أطلس مركزي هادئ مع شعاب بكر وقنوات وحياة بحرية متنوعة، مشهور برؤية السلاحف.", region: "وسط المالديف" },
    { locationName: "North Male Atoll", locale: "ar", name: "North Male Atoll", description: "أحد الأطلس المشهورة مع مواقع غوص عديدة وجدران وكهوف مدهشة.", region: "وسط المالديف" },
    { locationName: "South Ari Atoll", locale: "ar", name: "South Ari Atoll", description: "منطقة غوص مشهورة عالميًا مع فرص عالية لرؤية قرش الحوت ومانتا.", region: "المالديف الغربية" },
  ];

  const animalTranslationsZh = [
    { scientificKey: "Mobula alfredi", locale: "zh", name: "蝠鲼", description: "马尔代夫常见的大型魟鱼，以优雅的动作和在清洁站的出现而闻名。", habitat: "Haa Dhaalu、South Ari 和 North Male Atoll 的珊瑚礁与清洁站", diet: "浮游生物", category: "ray" },
    { scientificKey: "Stegostoma tigrinum", locale: "zh", name: "豹鲨", description: "性情温和的底栖鲨，具有独特的斑点图案，常见于温暖的泻湖和珊瑚礁。", habitat: "Haa Dhaalu Atoll 的泻湖和珊瑚礁", diet: "甲壳类和小型鱼类", category: "shark" },
    { scientificKey: "Aetobatus narinari", locale: "zh", name: "鹰魟", description: "行动迅速的魟鱼，具有醒目的白色斑点，常见于开放泻湖。", habitat: "Addu Atoll 的通道和泻湖", diet: "软体动物和甲壳类", category: "ray" },
    { scientificKey: "Chelonia mydas", locale: "zh", name: "海龟", description: "绿色海龟常见于珊瑚礁，以其平静的特性和长距离迁徙闻名。", habitat: "Addu 和 Faafu Atoll 的珊瑚礁与海草区", diet: "海草与藻类", category: "turtle" },
    { scientificKey: "Carcharhinus melanopterus", locale: "zh", name: "礁鲨", description: "常在珊瑚礁附近游动的小到中型鲨鱼，常见于浅泻湖。", habitat: "Faafu Atoll 的珊瑚礁", diet: "小型鱼类与乌贼", category: "shark" },
    { scientificKey: "Sphyraena barracuda", locale: "zh", name: "梭子鱼", description: "具有长银色体和尖锐牙齿的掠食鱼，常成群出现在珊瑚边缘。", habitat: "North Male Atoll 的礁边", diet: "鱼类", category: "fish" },
    { scientificKey: "Rhincodon typus", locale: "zh", name: "鲸鲨", description: "世界上最大的鱼，South Ari Atoll 的著名居民；对人类无害。", habitat: "South Ari Atoll 的开阔水域与礁区", diet: "浮游生物", category: "shark" },
    { scientificKey: "Triaenodon obesus", locale: "zh", name: "白鳍礁鲨", description: "夜行性礁鲨，白天常静止于洞穴或珊瑚下。", habitat: "North Male Atoll 与 Faafu Atoll 的珊瑚礁", diet: "鱼类、乌贼、甲壳类", category: "shark" },
    { scientificKey: "Carcharhinus amblyrhynchos", locale: "zh", name: "灰礁鲨", description: "活跃的礁鲨，常在礁边巡逻，常见于外环礁区域。", habitat: "Haa Dhaalu 与 South Ari Atoll 的外环礁", diet: "鱼类、头足类", category: "shark" },
    { scientificKey: "Amphiprion ocellaris", locale: "zh", name: "小丑鱼", description: "小型多彩的珊瑚鱼，与海葵共生，常见于浅珊瑚礁。", habitat: "Faafu 与 North Male Atoll 的浅珊瑚礁", diet: "浮游生物与小型甲壳类", category: "fish" },
  ];

  const locationTranslationsZh = [
    { locationName: "Haa Dhaalu Atoll", locale: "zh", name: "Haa Dhaalu Atoll", description: "马尔代夫北部的偏远环礁，拥有众多珊瑚礁、沉船和丰富的海底生物。", region: "马尔代夫北部" },
    { locationName: "Addu Atoll", locale: "zh", name: "Addu Atoll", description: "马尔代夫最南端的环礁，拥有五彩珊瑚礁、陡峭海墙和著名的沉船潜点。", region: "马尔代夫南部" },
    { locationName: "Faafu Atoll", locale: "zh", name: "Faafu Atoll", description: "中部安静的环礁，拥有原始珊瑚礁、河道和多样的海洋生物，潜水能见度佳。", region: "马尔代夫中部" },
    { locationName: "North Male Atoll", locale: "zh", name: "North Male Atoll", description: "马尔代夫著名环礁之一，拥有众多潜点、陡壁和洞穴。", region: "马尔代夫中部" },
    { locationName: "South Ari Atoll", locale: "zh", name: "South Ari Atoll", description: "世界知名的潜区，高概率遇到鲸鲨与魔鬼鱼。", region: "马尔代夫西部" },
  ];

  // Insert animal translations idempotently
  await Promise.all(
    animalTranslations.map(async (t) => {
      const animal = animalsMap.get(t.scientificKey);
      if (!animal) return;
      await AnimalTranslationModel.findOrCreate({
        where: { animalId: animal.id, locale: t.locale },
        defaults: {
          animalId: animal.id,
          locale: t.locale,
          name: t.name,
          description: t.description,
          habitat: t.habitat,
          diet: t.diet,
          category: t.category,
        },
      });
    }),
  );

  // Insert location translations idempotently
  await Promise.all(
    locationTranslations.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.findOrCreate({
        where: { locationId: location.id, locale: l.locale },
        defaults: {
          locationId: location.id,
          locale: l.locale,
          name: l.name,
          description: l.description,
          region: l.region,
        },
      });
    }),
  );

  // Ensure existing translations get updated for region (in case defaults existed before)
  await Promise.all(
    locationTranslations.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.update(
        { region: l.region },
        { where: { locationId: location.id, locale: l.locale } },
      );
    }),
  );

  await Promise.all(
    animalTranslationsEn.map(async (t) => {
      const animal = animalsMap.get(t.scientificKey);
      if (!animal) return;
      await AnimalTranslationModel.findOrCreate({
        where: { animalId: animal.id, locale: t.locale },
        defaults: {
          animalId: animal.id,
          locale: t.locale,
          name: t.name,
          description: t.description,
          habitat: t.habitat,
          diet: t.diet,
          category: t.category,
        },
      });
    }),
  );

  await Promise.all(
    locationTranslationsEn.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.findOrCreate({
        where: { locationId: location.id, locale: l.locale },
        defaults: {
          locationId: location.id,
          locale: l.locale,
          name: l.name,
          description: l.description,
          region: l.region,
        },
      });
    }),
  );

  await Promise.all(
    locationTranslationsEn.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.update(
        { region: l.region },
        { where: { locationId: location.id, locale: l.locale } },
      );
    }),
  );

  // Insert French translations
  await Promise.all(
    animalTranslationsFr.map(async (t) => {
      const animal = animalsMap.get(t.scientificKey);
      if (!animal) return;
      await AnimalTranslationModel.findOrCreate({
        where: { animalId: animal.id, locale: t.locale },
        defaults: { animalId: animal.id, locale: t.locale, name: t.name, description: t.description, habitat: t.habitat, diet: t.diet, category: t.category },
      });
    }),
  );

  await Promise.all(
    locationTranslationsFr.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.findOrCreate({
        where: { locationId: location.id, locale: l.locale },
        defaults: { locationId: location.id, locale: l.locale, name: l.name, description: l.description, region: l.region },
      });
    }),
  );

  await Promise.all(
    locationTranslationsFr.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.update(
        { region: l.region },
        { where: { locationId: location.id, locale: l.locale } },
      );
    }),
  );

  // Insert Spanish translations
  await Promise.all(
    animalTranslationsEs.map(async (t) => {
      const animal = animalsMap.get(t.scientificKey);
      if (!animal) return;
      await AnimalTranslationModel.findOrCreate({
        where: { animalId: animal.id, locale: t.locale },
        defaults: { animalId: animal.id, locale: t.locale, name: t.name, description: t.description, habitat: t.habitat, diet: t.diet, category: t.category },
      });
    }),
  );

  await Promise.all(
    locationTranslationsEs.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.findOrCreate({
        where: { locationId: location.id, locale: l.locale },
        defaults: { locationId: location.id, locale: l.locale, name: l.name, description: l.description, region: l.region },
      });
    }),
  );

  await Promise.all(
    locationTranslationsEs.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.update(
        { region: l.region },
        { where: { locationId: location.id, locale: l.locale } },
      );
    }),
  );

  // Insert Arabic translations
  await Promise.all(
    animalTranslationsAr.map(async (t) => {
      const animal = animalsMap.get(t.scientificKey);
      if (!animal) return;
      await AnimalTranslationModel.findOrCreate({
        where: { animalId: animal.id, locale: t.locale },
        defaults: { animalId: animal.id, locale: t.locale, name: t.name, description: t.description, habitat: t.habitat, diet: t.diet, category: t.category },
      });
    }),
  );

  await Promise.all(
    locationTranslationsAr.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.findOrCreate({
        where: { locationId: location.id, locale: l.locale },
        defaults: { locationId: location.id, locale: l.locale, name: l.name, description: l.description, region: l.region },
      });
    }),
  );

  await Promise.all(
    locationTranslationsAr.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.update(
        { region: l.region },
        { where: { locationId: location.id, locale: l.locale } },
      );
    }),
  );

  // Insert Chinese translations
  await Promise.all(
    animalTranslationsZh.map(async (t) => {
      const animal = animalsMap.get(t.scientificKey);
      if (!animal) return;
      await AnimalTranslationModel.findOrCreate({
        where: { animalId: animal.id, locale: t.locale },
        defaults: { animalId: animal.id, locale: t.locale, name: t.name, description: t.description, habitat: t.habitat, diet: t.diet, category: t.category },
      });
    }),
  );

  await Promise.all(
    locationTranslationsZh.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.findOrCreate({
        where: { locationId: location.id, locale: l.locale },
        defaults: { locationId: location.id, locale: l.locale, name: l.name, description: l.description, region: l.region },
      });
    }),
  );

  await Promise.all(
    locationTranslationsZh.map(async (l) => {
      const location = locationsMap.get(l.locationName);
      if (!location) return;
      await LocationTranslationModel.update(
        { region: l.region },
        { where: { locationId: location.id, locale: l.locale } },
      );
    }),
  );

  // AnimalLocation relations (idempotent)
  const relations = [
    { animalKey: "Mobula alfredi", locationName: "Haa Dhaalu Atoll", rarity: "common" },
    { animalKey: "Mobula alfredi", locationName: "Addu Atoll", rarity: "common" },
    { animalKey: "Mobula alfredi", locationName: "South Ari Atoll", rarity: "rare" },

    { animalKey: "Stegostoma tigrinum", locationName: "Haa Dhaalu Atoll", rarity: "common" },
    { animalKey: "Stegostoma tigrinum", locationName: "Faafu Atoll", rarity: "common" },

    { animalKey: "Aetobatus narinari", locationName: "Addu Atoll", rarity: "common" },
    { animalKey: "Aetobatus narinari", locationName: "Faafu Atoll", rarity: "rare" },

    { animalKey: "Chelonia mydas", locationName: "Faafu Atoll", rarity: "common" },
    { animalKey: "Chelonia mydas", locationName: "South Ari Atoll", rarity: "rare" },

    { animalKey: "Carcharhinus melanopterus", locationName: "North Male Atoll", rarity: "common" },

    { animalKey: "Sphyraena barracuda", locationName: "North Male Atoll", rarity: "common" },

    { animalKey: "Rhincodon typus", locationName: "South Ari Atoll", rarity: "rare" },

    { animalKey: "Triaenodon obesus", locationName: "North Male Atoll", rarity: "common" },

    { animalKey: "Carcharhinus amblyrhynchos", locationName: "Haa Dhaalu Atoll", rarity: "rare" },
    { animalKey: "Carcharhinus amblyrhynchos", locationName: "South Ari Atoll", rarity: "rare" },

    { animalKey: "Amphiprion ocellaris", locationName: "North Male Atoll", rarity: "common" },
    { animalKey: "Amphiprion ocellaris", locationName: "Faafu Atoll", rarity: "common" },
  ];

  for (const r of relations) {
    const animal = animalsMap.get(r.animalKey);
    const location = locationsMap.get(r.locationName);
    if (!animal || !location) continue;
    await AnimalLocationModel.findOrCreate({
      where: { animalId: animal.id, locationId: location.id },
      defaults: { animalId: animal.id, locationId: location.id, rarity: r.rarity },
    });
  }

  console.log("🌱 Seed erfolgreich ausgeführt (idempotent)");
}

export { seed };

// Auto-run when called directly (npm run seed)
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Seed Fehler:", err);
      process.exit(1);
    });
}