import { Router, Request, Response } from "express";
import AnimalModel from "../db/models/AnimalModel";
import LocationModel from "../db/models/LocationModel";

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
export default router;
