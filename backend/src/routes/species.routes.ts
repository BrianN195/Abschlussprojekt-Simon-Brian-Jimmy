import { Router, Request, Response } from "express";

const router = Router();

interface Species {
  id: number;
  commonName: string;
  scientificName: string;
  dangerLevel: string;
  sizeCm: number;
  diet: string;
  predators: string;
  description: string;
  primaryImage: string;
}

// Placeholder: später mit echter DB
const species: Species[] = [
  {
    id: 1,
    commonName: "Clownfish",
    scientificName: "Amphiprion ocellaris",
    dangerLevel: "Low",
    sizeCm: 11,
    diet: "Omnivore",
    predators: "Groupers, Snappers",
    description: "Famous orange and white striped fish from Finding Nemo",
    primaryImage: "https://via.placeholder.com/400x300?text=Clownfish",
  },
  {
    id: 2,
    commonName: "Manta Ray",
    scientificName: "Manta birostris",
    dangerLevel: "Low",
    sizeCm: 550,
    diet: "Plankton",
    predators: "Sharks, Crocodiles",
    description: "Largest living rays, graceful and gentle",
    primaryImage: "https://via.placeholder.com/400x300?text=Manta+Ray",
  },
];

// GET /api/v1/species
router.get("/", (req: Request, res: Response<Species[] | { error: string }>) => {
  try {
    const search = (req.query.search as string)?.toLowerCase() || "";

    let results = species;

    if (search) {
      results = species.filter(
        (s) =>
          s.commonName.toLowerCase().includes(search) ||
          s.scientificName.toLowerCase().includes(search),
      );
    }

    res.json(results);
  } catch (error: unknown) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch species" });
  }
});

// GET /api/v1/species/:id
router.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const specy = species.find((s) => s.id === parseInt(id as string));

    if (!specy) {
      return res.status(404).json({ error: "Species not found" });
    }

    res.json(specy);
  } catch (error: unknown) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch species" });
  }
});

export default router;
