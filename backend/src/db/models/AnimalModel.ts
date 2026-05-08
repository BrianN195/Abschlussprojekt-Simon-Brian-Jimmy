import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class AnimalModel extends Model {}

AnimalModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    scientificName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: true,
      // z.B.: "Fisch", "Hai", "Koralle", "Schildkröte"
    },

    dangerLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // z.B. 1–5 Skala
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  },
  {
    sequelize,
    modelName: "Animal",
    tableName: "animal",
    timestamps: true,
  },
);

export default AnimalModel;
