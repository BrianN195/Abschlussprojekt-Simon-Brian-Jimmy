import { Router, Request, Response } from "express";
import LocationModel from "../db/models/LocationModel";
import AnimalModel from "../db/models/AnimalModel";
import upload from "../middlewares/uploadMiddleware";

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
router.post(
  "/createLocation",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const imageUrl = req.file ? `/images/locations/${req.file.filename}` : "";

      const newLocation = await LocationModel.create({
        name: req.body.name,
        description: req.body.description,
        region: req.body.region,

        latitude: Number(req.body.latitude),

        longitude: Number(req.body.longitude),

        depth: Number(req.body.depth),

        type: req.body.type,

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
