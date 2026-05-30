import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import LocationModel from "./LocationModel";

class LocationTranslationModel extends Model {
  declare id: number;
  declare locationId: number;
  declare locale: string;
  declare name?: string;
  declare description?: string;
  declare region?: string;
}

LocationTranslationModel.init(
  {
    locationId: { type: DataTypes.INTEGER, allowNull: false },
    locale: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    region: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "LocationTranslation",
    tableName: "location_translation",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["locationId", "locale"] },
      { fields: ["locale"] },
    ],
  }
);

export default LocationTranslationModel;