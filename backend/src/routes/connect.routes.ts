import { Router, Request, Response } from "express";
import AnimalModel from "../db/models/AnimalModel";
import LocationModel from "../db/models/LocationModel";
import upload from "../middlewares/uploadMiddleware";
import { animalSchema } from "../validation/animalSchema";
import { locationSchema } from "../validation/locationSchema";
import { AnimalLocationModel } from "../db/models";

const router = Router();

router.post("/connect", async (req: Request, res: Response) => {
  try {
    const { animalId, locationId, rarity } = req.body;

    const relation = await AnimalLocationModel.create({
      animalId,
      locationId,
      rarity,
    });

    return res.status(201).json(relation);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error connecting animal and location",
    });
  }
});

router.get("/search-animal/:name", async (req: Request, res: Response) => {
  try {
    const animal = await AnimalModel.findOne({
      where: {
        name: req.params.name,
      },
    });

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    return res.json(animal);

  } catch (error) {
    return res.status(500).json({
      message: "Search failed",
    });
  }
});

router.get("/search-location/:name", async (req: Request, res: Response) => {
  try {
    const location = await LocationModel.findOne({
      where: {
        name: req.params.name,
      },
    });

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    return res.json(location);

  } catch (error) {
    return res.status(500).json({
      message: "Search failed",
    });
  }
});

export default router