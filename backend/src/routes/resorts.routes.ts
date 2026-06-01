import { Router, Request, Response } from "express";
import LocationModel from "../db/models/LocationModel";
import AnimalModel from "../db/models/AnimalModel";
import AnimalTranslationModel from "../db/models/AnimalTranslationModel";
import LocationTranslationModel from "../db/models/LocationTranslationModel";
import upload from "../middlewares/uploadMiddleware";
import { locationSchema } from "../validation/locationSchema";

const router = Router();

function pickTranslation(translations: any[], locale: string) {
  return (
    translations.find((t) => t.locale === locale) ||
    translations.find((t) => t.locale === "en") ||
    translations[0]
  );
}

function mapTranslatedAnimal(animal: any, locale: string) {
  const translations = animal.translations || [];
  const tr = pickTranslation(translations, locale);

  return {
    id: animal.id,
    name: tr?.name ?? animal.name,
    scientificName: animal.scientificName,
    description: tr?.description ?? animal.description,
    habitat: tr?.habitat ?? animal.habitat,
    diet: tr?.diet ?? animal.diet,
    category: tr?.category ?? animal.category,
    dangerLevel: animal.dangerLevel,
    imageUrl: animal.imageUrl,
    size: animal.size,
    weight: animal.weight,
    depthRange: animal.depthRange,
    isSchooling: animal.isSchooling,
    translationUsedLocale: tr?.locale ?? null,
  };
}

// GET /api/v1/resorts
router.get("/", async (req: Request, res: Response) => {
  try {
    const locale = (req as any).locale || "en";

    const locations = await LocationModel.findAll({
      include: [
        {
          model: LocationTranslationModel,
          as: "translations",
          required: false,
        },
      ],
    });

    const result = locations.map((location) => {
      const data = location.toJSON() as any;
      const translations = data.translations || [];
      const tr = pickTranslation(translations, locale);

      return {
        id: data.id,
        name: tr?.name ?? data.name,
        description: tr?.description ?? data.description,
        region: tr?.region ?? data.region,
        latitude: data.latitude,
        longitude: data.longitude,
        depth: data.depth,
        type: data.type,
        imageUrl: data.imageUrl,
        localeRequested: (req as any).localeRequested || null,
        localeResolved: locale,
        translationUsedLocale: tr?.locale ?? null,
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resorts" });
  }
});

// GET /api/v1/resorts/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const locale = (req as any).locale || "en";
    const { id } = req.params;

    const location = await LocationModel.findByPk(Number(id), {
      include: [
        {
          model: LocationTranslationModel,
          as: "translations",
          required: false,
        },
      ],
    });

    if (!location) {
      return res.status(404).json({ error: "Resort not found" });
    }

    const data = location.toJSON() as any;
    const translations = data.translations || [];
    const tr = pickTranslation(translations, locale);

    return res.json({
      id: data.id,
      name: tr?.name ?? data.name,
      description: tr?.description ?? data.description,
      region: tr?.region ?? data.region,
      latitude: data.latitude,
      longitude: data.longitude,
      depth: data.depth,
      type: data.type,
      imageUrl: data.imageUrl,
      localeRequested: (req as any).localeRequested || null,
      localeResolved: locale,
      translationUsedLocale: tr?.locale ?? null,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resort" });
  }
});

router.get("/:id/animals", async (req: Request, res: Response) => {
  const locale = (req as any).locale || "en";
  const { id } = req.params;

  const location = await LocationModel.findByPk(Number(id), {
    include: [
      {
        model: AnimalModel,
        through: { attributes: [] },
        include: [
          {
            model: AnimalTranslationModel,
            as: "translations",
            required: false,
          },
        ],
      },
      {
        model: LocationTranslationModel,
        as: "translations",
        required: false,
      },
    ],
  });

  if (!location) {
    return res.status(404).json({ error: "Location not found" });
  }

  const data = location.toJSON() as any;
  const translations = data.translations || [];
  const tr = pickTranslation(translations, locale);
  const animals = (data.Animals || []).map((animal: any) => mapTranslatedAnimal(animal, locale));

  return res.json({
    id: data.id,
    name: tr?.name ?? data.name,
    description: tr?.description ?? data.description,
    region: tr?.region ?? data.region,
    latitude: data.latitude,
    longitude: data.longitude,
    depth: data.depth,
    type: data.type,
    imageUrl: data.imageUrl,
    animals,
    localeRequested: (req as any).localeRequested || null,
    localeResolved: locale,
    translationUsedLocale: tr?.locale ?? null,
  });
});

router.get("/:id/animal", async (req: Request, res: Response) => {
  const locale = (req as any).locale || "en";
  const { id } = req.params;

  const location = await LocationModel.findByPk(Number(id), {
    include: [
      {
        model: AnimalModel,
        through: { attributes: [] },
        include: [
          {
            model: AnimalTranslationModel,
            as: "translations",
            required: false,
          },
        ],
      },
      {
        model: LocationTranslationModel,
        as: "translations",
        required: false,
      },
    ],
  });

  if (!location) {
    return res.status(404).json({
      error: "Location not found",
    });
  }

  const data = location.toJSON() as any;
  const translations = data.translations || [];
  const tr = pickTranslation(translations, locale);
  const animals = (data.Animals || []).map((animal: any) => mapTranslatedAnimal(animal, locale));

  return res.json({
    id: data.id,
    name: tr?.name ?? data.name,
    description: tr?.description ?? data.description,
    region: tr?.region ?? data.region,
    latitude: data.latitude,
    longitude: data.longitude,
    depth: data.depth,
    type: data.type,
    imageUrl: data.imageUrl,
    animals,
    localeRequested: (req as any).localeRequested || null,
    localeResolved: locale,
    translationUsedLocale: tr?.locale ?? null,
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