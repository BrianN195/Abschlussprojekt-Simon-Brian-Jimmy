import { Router, Response } from "express";
import AnimalModel from "../db/models/AnimalModel";
import AnimalTranslationModel from "../db/models/AnimalTranslationModel";
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

function pickTranslation(translations: any[], locale: string) {
  return (
    translations.find((t) => t.locale === locale) ||
    translations.find((t) => t.locale === "en") ||
    translations[0]
  );
}

function mapTranslatedFavorite(animal: any, locale: string) {
  const translations = animal.translations || [];
  const tr = pickTranslation(translations, locale);

  return {
    id: animal.id,
    name: tr?.name ?? animal.name,
    scientificName: animal.scientificName,
    imageUrl: animal.imageUrl,
    category: tr?.category ?? animal.category,
    translationUsedLocale: tr?.locale ?? null,
  };
}

router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user as any;
    const locale = (req as any).locale || "en";
    const favorites = await user.getFavorites({
      include: [
        {
          model: AnimalTranslationModel,
          as: "translations",
          required: false,
        },
      ],
    });

    return res.json(serializeFavorites(favorites).map((favorite) => mapTranslatedFavorite(favorite, locale)));
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

    const locale = (req as any).locale || "en";
    const translatedFavorites = await user.getFavorites({
      include: [
        {
          model: AnimalTranslationModel,
          as: "translations",
          required: false,
        },
      ],
    });

    return res.status(200).json(
      serializeFavorites(translatedFavorites).map((favorite) => mapTranslatedFavorite(favorite, locale)),
    );
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

    const locale = (req as any).locale || "en";
    const favorites = await user.getFavorites({
      include: [
        {
          model: AnimalTranslationModel,
          as: "translations",
          required: false,
        },
      ],
    });

    return res.status(200).json(
      serializeFavorites(favorites).map((favorite) => mapTranslatedFavorite(favorite, locale)),
    );
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    return res.status(500).json({ error: "Failed to remove favorite" });
  }
});

export default router;