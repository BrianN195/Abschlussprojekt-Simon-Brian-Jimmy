import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import AnimalModel from "./AnimalModel";

class AnimalTranslationModel extends Model {
  declare id: number;
  declare animalId: number;
  declare locale: string;
  declare name?: string;
  declare description?: string;
  declare habitat?: string;
  declare diet?: string;
  declare category?: string;
}

AnimalTranslationModel.init(
  {
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    habitat: { type: DataTypes.STRING, allowNull: true },
    diet: { type: DataTypes.STRING, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "AnimalTranslation",
    tableName: "animal_translation",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["animalId", "locale"] },
      { fields: ["locale"] },
    ],
  }
);

export default AnimalTranslationModel;