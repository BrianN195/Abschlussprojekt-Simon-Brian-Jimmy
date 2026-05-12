import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class LocationModel extends Model {
  declare id: number
  declare name: string
  declare description: string
  declare region: string
  declare latitude: number
  declare longtitude: number
  declare depth: number
}

LocationModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // z.B. "Maaya Thila"
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    region: {
      type: DataTypes.STRING,
      allowNull: false,
      // z.B. "North Ari Atoll"
    },

    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    depth: {
      type: DataTypes.FLOAT,
      allowNull: true,
      // typische Tauchtiefe in Metern
    },
  },
  {
    sequelize,
    modelName: "Location",
    tableName: "location",
    timestamps: true,
  }
);

export default LocationModel;