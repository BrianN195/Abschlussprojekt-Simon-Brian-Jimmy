import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class AnimalLocationModel extends Model {}

AnimalLocationModel.init(
  {
    rarity: {
      type: DataTypes.STRING,
      allowNull: true,
      // z.B. "common", "rare"
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