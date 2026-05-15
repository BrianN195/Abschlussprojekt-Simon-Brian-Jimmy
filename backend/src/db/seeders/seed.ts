import AnimalLocationModel from "../models/AnimalLocationModel";
import AnimalModel from "../models/AnimalModel";
import LocationModel from "../models/LocationModel";
import UserModel from "../models/UserModel";


async function seed() {
    
const animal1 = await AnimalModel.create({
  name: "Mantarochen",
  scientificName: "Mobula alfredi",
  description:
    "Großer Rochen der häufig in den Malediven vorkommt. Bekannt für seine eleganten Bewegungen und seine Präsenz an Reinigungsstationen in den Atollen.",
  category: "ray",
  dangerLevel: 1,
  imageUrl: "https://www.mantatrust.org/wp-content/uploads/2019/06/manta-ray.jpg",

  size: "3-5 m",
  weight: "700-1400 kg",
  habitat: "Korallenriffe und Reinigungsstationen in Haa Dhaalu, South Ari und North Male Atoll",
  depthRange: "5-40 m",
  diet: "Plankton",
  isSchooling: false,
});

const animal2 = await AnimalModel.create({
  name: "Leopardenhai",
  scientificName: "Stegostoma tigrinum",
  description:
    "Ruhiger bodenlebender Hai mit charakteristischem Fleckenmuster. Häufig in warmen Lagunen und Riffbereichen der Malediven anzutreffen.",
  category: "shark",
  dangerLevel: 2,
  imageUrl: "https://www.maldives.com/wp-content/uploads/leopard-shark-maldives.jpg",

  size: "2-3.5 m",
  weight: "20-30 kg",
  habitat: "Lagunen und Korallenriffe im Haa Dhaalu Atoll",
  depthRange: "5-62 m",
  diet: "Krustentiere und kleine Fische",
  isSchooling: false,
});

const animal3 = await AnimalModel.create({
  name: "Adlerrochen",
  scientificName: "Aetobatus narinari",
  description:
    "Schneller Rochen mit markanten weißen Punkten. Oft in offenen Lagunen und Kanälen der südlichen Malediven zu sehen.",
  category: "ray",
  dangerLevel: 1,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Aetobatus_narinari2.jpg",

  size: "2-3 m",
  weight: "150-230 kg",
  habitat: "Kanäle und Lagunen im Addu Atoll",
  depthRange: "1-80 m",
  diet: "Muscheln und Krebstiere",
  isSchooling: true,
});

const animal4 = await AnimalModel.create({
  name: "Meeresschildkröte",
  scientificName: "Chelonia mydas",
  description:
    "Grüne Meeresschildkröte die häufig an Korallenriffen der Malediven vorkommt. Bekannt für ihre ruhige Art und langen Wanderungen.",
  category: "turtle",
  dangerLevel: 1,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Green_turtle_swimming_over_coral_reefs_in_Kona.jpg",

  size: "0.8-1.5 m",
  weight: "110-190 kg",
  habitat: "Korallenriffe und Seegrasgebiete im Addu und Faafu Atoll",
  depthRange: "0-50 m",
  diet: "Seegras und Algen",
  isSchooling: false,
});

const animal5 = await AnimalModel.create({
  name: "Riffhai",
  scientificName: "Carcharhinus melanopterus",
  description:
    "Kleiner bis mittelgroßer Hai der oft nahe Korallenriffen schwimmt. Häufig in flachen Lagunen der Malediven anzutreffen.",
  category: "shark",
  dangerLevel: 3,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Blacktip_reef_shark.jpg",

  size: "1.2-1.8 m",
  weight: "13-45 kg",
  habitat: "Korallenriffe im Faafu Atoll",
  depthRange: "1-30 m",
  diet: "Kleine Fische und Tintenfische",
  isSchooling: false,
});

const animal6 = await AnimalModel.create({
  name: "Barrakuda",
  scientificName: "Sphyraena barracuda",
  description:
    "Raubfisch mit langem silbernen Körper und scharfen Zähnen. Oft in Gruppen an Riffkanten der Malediven anzutreffen.",
  category: "fish",
  dangerLevel: 3,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Great_Barracuda.jpg",

  size: "0.6-1.8 m",
  weight: "5-25 kg",
  habitat: "Riffkanten im North Male Atoll",
  depthRange: "3-100 m",
  diet: "Fische",
  isSchooling: true,
});

const animal7 = await AnimalModel.create({
  name: "Walhai",
  scientificName: "Rhincodon typus",
  description:
    "Größter Fisch der Welt und einer der bekanntesten Bewohner des South Ari Atolls. Trotz seiner Größe vollkommen ungefährlich für Menschen.",
  category: "shark",
  dangerLevel: 1,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/56/Whale_shark_Georgia_aquarium.jpg",

  size: "8-18 m",
  weight: "15000-34000 kg",
  habitat: "Offene Gewässer und Riffbereiche im South Ari Atoll",
  depthRange: "0-1000 m",
  diet: "Plankton",
  isSchooling: false,
});

const animal8 = await AnimalModel.create({
  name: "Weißspitzen-Riffhai",
  scientificName: "Triaenodon obesus",
  description:
    "Nachtaktiver Riffhai, der tagsüber oft regungslos in Höhlen oder unter Korallen liegt. Sehr häufig in den Malediven.",
  category: "shark",
  dangerLevel: 2,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Whitetip_reef_shark.jpg",

  size: "1.2-1.6 m",
  weight: "18-20 kg",
  habitat: "Korallenriffe in North Male Atoll und Faafu Atoll",
  depthRange: "0-40 m",
  diet: "Fische, Tintenfische, Krebstiere",
  isSchooling: false,
});

const animal9 = await AnimalModel.create({
  name: "Grauer Riffhai",
  scientificName: "Carcharhinus amblyrhynchos",
  description:
    "Aktiver Riffhai, der oft an Riffkanten patrouilliert. Häufig in größeren Gruppen in den äußeren Atollbereichen.",
  category: "shark",
  dangerLevel: 3,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Grey_reef_shark.jpg",

  size: "1.5-2.5 m",
  weight: "20-35 kg",
  habitat: "Außenriffe im Haa Dhaalu und South Ari Atoll",
  depthRange: "10-100 m",
  diet: "Fische, Kopffüßer",
  isSchooling: true,
});

const animal10 = await AnimalModel.create({
  name: "Clownfisch",
  scientificName: "Amphiprion ocellaris",
  description:
    "Kleiner, farbenfroher Riff-Fisch der in Symbiose mit Seeanemonen lebt. Sehr häufig in flachen Korallenriffen der Malediven.",
  category: "fish",
  dangerLevel: 1,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Clownfish_anemone.jpg",

  size: "8-11 cm",
  weight: "20-30 g",
  habitat: "Flache Korallenriffe in Faafu Atoll und North Male Atoll",
  depthRange: "1-20 m",
  diet: "Plankton, kleine Krebstiere",
  isSchooling: true,
});

// const animalX = await AnimalModel.create({
//   name: "",
//   scientificName: "",
//   description: "",
//   category: "",
//   dangerLevel: 0,
//   imageUrl: "",

//   size: null,
//   weight: null,
//   habitat: null,
//   depthRange: null,
//   diet: null,
//   isSchooling: false,
// });

// const locationX = await LocationModel.create({
  
//   name: ,
//   description: ,
//   region: ,
//   latitude: ,
//   longitude: ,
//   depth: ,
//   type: "reef" | "wreck" | "cave" | "wall" | "sandbank",
//   imageUrl: 
// });

const location1 = await LocationModel.create({
  name: "Haa Dhaalu Atoll",
  description:
    "Abgelegenes Atoll im Norden der Malediven mit zahlreichen Korallenriffen, Wracks und artenreicher Unterwasserwelt. Bekannt für Mantas, Leopardenhaie sowie Weiß- und Schwarzspitzenriffhaie. Beliebtes Gebiet zum Tauchen und Schnorcheln.",
  region: "Northern Maldives",
  latitude: 6.5783,
  longitude: 72.9461,
  depth: 30,
  type: "reef",
  imageUrl: "https://malediven.reise/_next/image?url=%2Fimages%2Fatolle%2Fhaa-dhaalu-atoll.jpg&w=1920&q=75"
});

const location2 = await LocationModel.create({
  name: "Addu Atoll",
  description:
    "Südlichstes Atoll der Malediven mit farbenreichen Korallenriffen, Steilwänden und berühmten Wracktauchplätzen. Bekannt für Mantarochen, Schildkröten, Adlerrochen und große Fischschwärme. Besonders beliebt ist das Wrack der British Loyalty.",
  region: "Southern Maldives",
  latitude: -0.6292,
  longitude: 73.1586,
  depth: 40,
  type: "wreck",
  imageUrl: "https://malediven.reise/_next/image?url=%2Fimages%2Fatolle%2Faddu-atoll.jpg&w=1920&q=75"
});

const location3 = await LocationModel.create({
  name: "Faafu Atoll",
  description:
    "Ruhiges Atoll der zentralen Malediven mit unberührten Korallenriffen, Kanälen und vielfältiger Unterwasserwelt. Bekannt für Schildkröten, Riffhaie, Adlerrochen und farbenreiche Rifffische. Besonders beliebt bei Tauchern wegen der klaren Sicht und gesunden Korallenformationen.",
  region: "Central Maldives",
  latitude: 3.1078,
  longitude: 72.9656,
  depth: 28,
  type: "reef",
  imageUrl: "https://malediven.reise/_next/image?url=%2Fimages%2Fatolle%2Ffaafu-atoll.jpg&w=1920&q=75"
});

const location4 = await LocationModel.create({
  name: "North Male Atoll",
  description:
    "Eines der bekanntesten Atolle der Malediven mit zahlreichen Tauchspots, Steilwänden und Höhlen. Berühmt für starke Strömungstauchgänge, große Fischschwärme, Riffhaie, Mantas und farbenreiche Korallenriffe.",
  region: "Central Maldives",
  latitude: 4.3239,
  longitude: 73.4597,
  depth: 35,
  type: "wall",
  imageUrl: "https://malediven.reise/_next/image?url=%2Fimages%2Fatolle%2Fnord-male-atoll.jpg&w=1920&q=75"
});

const location5 = await LocationModel.create({
  name: "South Ari Atoll",
  description:
    "Weltbekanntes Tauchgebiet im Westen der Malediven mit hoher Chance auf Walhaie und Mantarochen. Das Atoll bietet große Korallenriffe, Kanäle und beeindruckende Begegnungen mit Großfischen.",
  region: "Western Maldives",
  latitude: 3.6500,
  longitude: 72.9000,
  depth: 40,
  type: "reef",
  imageUrl: "https://malediven.reise/_next/image?url=%2Fimages%2Fatolle%2Fsued-ari-atoll.jpg&w=1920&q=75"
});

await AnimalLocationModel.create({
  animalId: animal1.id,
  locationId: location1.id,
  rarity: "common",
});

await AnimalLocationModel.create({
  animalId: animal1.id,
  locationId: location2.id,
  rarity: "common",
});

await AnimalLocationModel.create({
  animalId: animal1.id,
  locationId: location5.id,
  rarity: "rare",
});

// Leopardenhai
await AnimalLocationModel.create({
  animalId: animal2.id,
  locationId: location1.id,
  rarity: "common",
});

await AnimalLocationModel.create({
  animalId: animal2.id,
  locationId: location3.id,
  rarity: "common",
});

// Adlerrochen
await AnimalLocationModel.create({
  animalId: animal3.id,
  locationId: location2.id,
  rarity: "common",
});

await AnimalLocationModel.create({
  animalId: animal3.id,
  locationId: location3.id,
  rarity: "rare",
});

// Meeresschildkröte
await AnimalLocationModel.create({
  animalId: animal4.id,
  locationId: location3.id,
  rarity: "common",
});

await AnimalLocationModel.create({
  animalId: animal4.id,
  locationId: location5.id,
  rarity: "rare",
});

// Riffhai
await AnimalLocationModel.create({
  animalId: animal5.id,
  locationId: location4.id,
  rarity: "common",
});

// Barrakuda
await AnimalLocationModel.create({
  animalId: animal6.id,
  locationId: location4.id,
  rarity: "common",
});

// Walhai
await AnimalLocationModel.create({
  animalId: animal7.id,
  locationId: location5.id,
  rarity: "rare",
});

// Weißspitzen-Riffhai
await AnimalLocationModel.create({
  animalId: animal8.id,
  locationId: location4.id,
  rarity: "common",
});

// Grauer Riffhai
await AnimalLocationModel.create({
  animalId: animal9.id,
  locationId: location1.id,
  rarity: "rare",
});

await AnimalLocationModel.create({
  animalId: animal9.id,
  locationId: location5.id,
  rarity: "rare",
});

// Clownfisch
await AnimalLocationModel.create({
  animalId: animal10.id,
  locationId: location4.id,
  rarity: "common",
});

await AnimalLocationModel.create({
  animalId: animal10.id,
  locationId: location3.id,
  rarity: "common",
});
}
seed()
  .then(() => {
    console.log("🌱 Seed erfolgreich ausgeführt");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seed Fehler:", err);
    process.exit(1);
  });