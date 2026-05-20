import { Router, Request, Response } from "express";
import AnimalModel from "../db/models/AnimalModel";
import LocationModel from "../db/models/LocationModel";
import upload from "../middlewares/uploadMiddleware";
import { animalSchema } from "../validation/animalSchema";

const router = Router();

// GET /api/v1/species
//keine ahnung warum {error: string} deswegen nur auskommentiert nicht gelöscht
//router.get("/", (req: Request, res: Response<Species[] | { error: string }>) => {
router.get("/", async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string)?.toLowerCase() || "";

    const animals = await AnimalModel.findAll();

    res.json(animals);
  } catch (error: unknown) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch species" });
  }
});

// GET /api/v1/species/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const animal = await AnimalModel.findByPk(Number(id));

    if (!animal) {
      return res.status(404).json({ error: "Species not found" });
    }

    res.json(animal);
  } catch (error: unknown) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch species" });
  }
});
router.get("/:id/locations", async (req: Request, res: Response) => {
  const { id } = req.params;
  const animal = await AnimalModel.findByPk(Number(id), {
    include: LocationModel,
  });

  if (!animal) {
    return res.status(404).json({ error: "Animal not found" });
  }
  const data = animal.toJSON();

  return res.json({
    ...data,
    locations: data.Locations, // umbenennen
  });
});

router.post(
  "/createAnimal",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const parsed = animalSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsed.error.flatten(),
      });
    }

    const data = parsed.data;
    try {
      const imageUrl = req.file ? `/images/animals/${req.file.filename}` : "";

      const newAnimal = await AnimalModel.create({
        name: data.name,
        scientificName: data.scientificName,
        description: data.description,
        category: data.category,
        dangerLevel: data.dangerLevel,
        imageUrl,
        size: data.size,
        weight: data.weight,
        habitat: data.habitat,
        bestViewingTime: data.bestViewingTime
          ? [data.bestViewingTime]
          : [],
        depthRange: data.depthRange,
        diet: data.diet,
        isSchooling: data.isSchooling,
      });

      return res.status(201).json(newAnimal);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Error creating animal",
      });
    }
  },
);
export default router;
