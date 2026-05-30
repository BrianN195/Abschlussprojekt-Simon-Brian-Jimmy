import { Router, Request, Response } from "express";
import AnimalModel from "../db/models/AnimalModel";
import { Op, col, where as sequelizeWhere } from "sequelize";
import AnimalTranslationModel from "../db/models/AnimalTranslationModel";
import LocationTranslationModel from "../db/models/LocationTranslationModel";
import LocationModel from "../db/models/LocationModel";
import upload from "../middlewares/uploadMiddleware";
import { animalSchema } from "../validation/animalSchema";

const router = Router();

function pickTranslation(translations: any[], locale: string) {
  return (
    translations.find((t) => t.locale === locale) ||
    translations.find((t) => t.locale === "en") ||
    translations[0]
  );
}

// GET /api/v1/species
//keine ahnung warum {error: string} deswegen nur auskommentiert nicht gelöscht
//router.get("/", (req: Request, res: Response<Species[] | { error: string }>) => {
router.get("/", async (req: Request, res: Response) => {
  try {
    const locale = (req as any).locale || "en";
    const search = (req.query.search as string)?.trim() || "";

    const animals = await AnimalModel.findAll({
  include: [
    {
      model: AnimalTranslationModel,
      as: "translations",
      required: false,
    },
  ],
  where: search
    ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          sequelizeWhere(col("translations.name"), { [Op.iLike]: `%${search}%` }),
        ],
      }
    : {},
  subQuery: false,
});

    const result = animals.map((a) => {
      const data = a.toJSON() as any;
      const translations = data.translations || [];

      const tr =
        translations.find((t: any) => t.locale === locale) ||
        translations.find((t: any) => t.locale === "en") ||
        translations[0];

      return {
        id: data.id,
        name: tr?.name ?? data.name,
        scientificName: data.scientificName,
        description: tr?.description ?? data.description,
        habitat: tr?.habitat ?? data.habitat,
        diet: tr?.diet ?? data.diet,
        category: tr?.category ?? data.category,
        imageUrl: data.imageUrl,
        localeRequested: (req as any).localeRequested || null,
        localeResolved: locale,
        translationUsedLocale: tr?.locale ?? null,
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch species" });
  }
});

// GET /api/v1/species/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const locale = (req as any).locale || "en";
    const { id } = req.params;

    const animal = await AnimalModel.findByPk(Number(id), {
      include: [
        {
          model: AnimalTranslationModel,
          as: "translations",
          required: false,
        },
      ],
    });

    if (!animal) {
      return res.status(404).json({ error: "Species not found" });
    }

    const data = animal.toJSON() as any;
    const translations = data.translations || [];
    const tr = pickTranslation(translations, locale);

    return res.json({
      id: data.id,
      name: tr?.name ?? data.name,
      scientificName: data.scientificName,
      description: tr?.description ?? data.description,
      habitat: tr?.habitat ?? data.habitat,
      diet: tr?.diet ?? data.diet,
      category: tr?.category ?? data.category,
      dangerLevel: data.dangerLevel,
      imageUrl: data.imageUrl,
      size: data.size,
      weight: data.weight,
      bestViewingTime: data.bestViewingTime,
      depthRange: data.depthRange,
      isSchooling: data.isSchooling,
      localeRequested: (req as any).localeRequested || null,
      localeResolved: locale,
      translationUsedLocale: tr?.locale ?? null,
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch species" });
  }
});
router.get("/:id/locations", async (req: Request, res: Response) => {
  try {
    const locale = (req as any).locale || "en";
    const { id } = req.params;

    const animal = await AnimalModel.findByPk(Number(id), {
      include: [
        {
          model: LocationModel,
          include: [
            {
              model: LocationTranslationModel,
              as: "translations",
              required: false,
            },
          ],
        },
      ],
    });

    if (!animal) {
      return res.status(404).json({ error: "Animal not found" });
    }

    const data = animal.toJSON() as any;
    const locations = data.Locations || [];

    const translatedLocations = locations.map((location: any) => {
      const translations = location.translations || [];
      const tr = pickTranslation(translations, locale);

      return {
        ...location,
        name: tr?.name ?? location.name,
        description: tr?.description ?? location.description,
        region: tr?.region ?? location.region,
        translationUsedLocale: tr?.locale ?? null,
      };
    });

    return res.json({
      ...data,
      locations: translatedLocations,
      localeRequested: (req as any).localeRequested || null,
      localeResolved: locale,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch animal locations" });
  }
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
    const bestViewingTime = data.bestViewingTime || [];

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

        bestViewingTime,

        depthRange: data.depthRange,
        diet: data.diet,

        isSchooling: data.isSchooling,
      });

      return res.status(201).json(newAnimal);
    } catch (error) {
      console.error("CREATE ANIMAL ERROR:");
      console.error(error);
      console.log("im backend error");
      return res.status(500).json({
        message: "Error creating animal",
        error,
      });
    }
  },
);
export default router;
