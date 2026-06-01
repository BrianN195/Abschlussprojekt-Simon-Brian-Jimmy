import { Router, Request, Response } from "express";
import LocationModel from "../db/models/LocationModel";
import AnimalModel from "../db/models/AnimalModel";
import AnimalTranslationModel from "../db/models/AnimalTranslationModel";
import LocationTranslationModel from "../db/models/LocationTranslationModel";
import { Op, col, where as sequelizeWhere } from "sequelize";

const router = Router();

function pickTranslation(translations: any[], locale: string) {
  return (
    translations.find((t) => t.locale === locale) ||
    translations.find((t) => t.locale === "en") ||
    translations[0]
  );
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const raw =
      typeof req.query.search === "string" ? req.query.search.trim() : "";
    const search = raw || "";
    const locale = (req as any).locale || "en";

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
              sequelizeWhere(col("translations.name"), {
                [Op.iLike]: `%${search}%`,
              }),
            ],
          }
        : {},
      subQuery: false,
      attributes: ["id", "name", "imageUrl"],
    });

    const locations = await LocationModel.findAll({
      include: [
        {
          model: LocationTranslationModel,
          as: "translations",
          required: false,
        },
      ],
      where: search
        ? {
            [Op.or]: [
              { name: { [Op.iLike]: `%${search}%` } },
              sequelizeWhere(col("translations.name"), {
                [Op.iLike]: `%${search}%`,
              }),
            ],
          }
        : {},
      subQuery: false,
      attributes: ["id", "name", "imageUrl", "region"],
    });

    const mappedAnimals = animals.map((a) => {
      const data = (a as any).toJSON();
      const translations = data.translations || [];
      const tr = pickTranslation(translations, locale);

      return {
        id: data.id,
        name: tr?.name ?? data.name,
        imageUrl: data.imageUrl,
        translationUsedLocale: tr?.locale ?? null,
      };
    });

    const mappedLocations = locations.map((l) => {
      const data = (l as any).toJSON();
      const translations = data.translations || [];
      const tr = pickTranslation(translations, locale);

      return {
        id: data.id,
        name: tr?.name ?? data.name,
        imageUrl: data.imageUrl,
        region: tr?.region ?? data.region,
        translationUsedLocale: tr?.locale ?? null,
      };
    });

    return res.json({
      animals: mappedAnimals,
      locations: mappedLocations,
      localeRequested: (req as any).localeRequested || null,
      localeResolved: locale,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
