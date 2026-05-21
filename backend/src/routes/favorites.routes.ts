import { Router, Response } from "express";
import AnimalModel from "../db/models/AnimalModel";
import UserFavoriteAnimalModel from "../db/models/UserFavoritAnimalModel";
import authMiddleware, { AuthRequest } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

function serializeFavorites(favorites: any[]) {
  const uniqueFavorites = new Map<number, any>();

  for (const animal of favorites) {
    uniqueFavorites.set(animal.id, animal.toJSON());
  }

  return Array.from(uniqueFavorites.values());
}

router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user as any;
    const favorites = await user.getFavorites();

    return res.json(serializeFavorites(favorites));
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

router.post("/:animalId", async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user as any;
    const animalId = Number(req.params.animalId);
    const animal = await AnimalModel.findByPk(animalId);

    if (!animal) {
      return res.status(404).json({ error: "Animal not found" });
    }

    await UserFavoriteAnimalModel.findOrCreate({
      where: {
        userId: user.id,
        animalId: animal.id,
      },
    });

    const favorites = await user.getFavorites();
    return res.status(200).json(serializeFavorites(favorites));
  } catch (error) {
    console.error("Failed to add favorite:", error);
    return res.status(500).json({ error: "Failed to add favorite" });
  }
});

router.delete("/:animalId", async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user as any;
    const animalId = Number(req.params.animalId);
    const animal = await AnimalModel.findByPk(animalId);

    if (!animal) {
      return res.status(404).json({ error: "Animal not found" });
    }

    await UserFavoriteAnimalModel.destroy({
      where: {
        userId: user.id,
        animalId: animal.id,
      },
    });

    const favorites = await user.getFavorites();
    return res.status(200).json(serializeFavorites(favorites));
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    return res.status(500).json({ error: "Failed to remove favorite" });
  }
});

export default router;