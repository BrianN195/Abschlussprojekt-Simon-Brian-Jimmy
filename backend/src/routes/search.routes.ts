import { Router, Request, Response } from 'express';
import LocationModel from '../db/models/LocationModel';
import AnimalModel from '../db/models/AnimalModel';
import { Op } from 'sequelize';

const router = Router();

router.get("/search", async (req: Request, res: Response) => {
  const search =
    typeof req.query.search === "string"
      ? req.query.search
      : "";

  try {
    const [animals, locations] = await Promise.all([
      AnimalModel.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },attributes: ["id", "name"],
      }),

      LocationModel.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },attributes: ["id", "name"],
      }),
    ]);

    return res.json({
      animals,
      locations,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;