import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class AnimalLocationModel extends Model {}

AnimalLocationModel.init(
  {
    animalId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    locationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    rarity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AnimalLocation",
    tableName: "animal_location",
    timestamps: false,
  }
);

export default AnimalLocationModel;