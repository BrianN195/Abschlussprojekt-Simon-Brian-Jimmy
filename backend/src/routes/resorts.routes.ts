import { Router, Request, Response } from "express";
import LocationModel from "../db/models/LocationModel";
import AnimalModel from "../db/models/AnimalModel";
import upload from "../middlewares/uploadMiddleware";
import { locationSchema } from "../validation/locationSchema";
const router = Router();

// GET /api/v1/resorts
router.get("/", async (req: Request, res: Response) => {
  try {
    const locations = await LocationModel.findAll();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resorts" });
  }
});

// GET /api/v1/resorts/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await LocationModel.findByPk(Number(id));

    if (!location) {
      return res.status(404).json({ error: "Resort not found" });
    }

    res.json(location);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resort" });
  }
});
router.get("/:id/animals", async (req: Request, res: Response) => {
  const { id } = req.params;
  const location = await LocationModel.findByPk(Number(id), {
    include: AnimalModel,
  });

  if (!location) {
    return res.status(404).json({ error: "Location not found" });
  }
  res.json(location);
});

router.get("/:id/animal", async (req: Request, res: Response) => {
  const { id } = req.params;

  const location = await LocationModel.findByPk(Number(id), {
    include: AnimalModel,
  });

  if (!location) {
    return res.status(404).json({
      error: "Location not found",
    });
  }

  const data = location.toJSON();

  return res.json({
    ...data,
    animals: data.Animals,
  });
});

router.post(
  "/createLocation",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const parsed = locationSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Invalid input",
          errors: parsed.error.flatten(),
        });
      }

      const data = parsed.data;
      const imageUrl = req.file ? `/images/locations/${req.file.filename}` : "";

      const newLocation = await LocationModel.create({
        name: data.name,
        description: data.description,
        region: data.region,

        latitude: Number(data.latitude),

        longitude: Number(data.longitude),

        depth: Number(data.depth),

        type: data.type,

        imageUrl,
      });

      return res.status(201).json(newLocation);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Error creating location",
      });
    }
  },
);
export default router;
