import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class LocationModel extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare region: string;
  declare latitude: number;
  declare longitude: number;
  declare depth: number;
  declare type: "reef" | "wreck" | "cave" | "wall" | "sandbank";
  declare imageUrl: string;
}

LocationModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    region: {
      type: DataTypes.STRING,
      allowNull: false,
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
    },

    // 🆕 Location-Typ
    type: {
      type: DataTypes.ENUM("reef", "wreck", "cave", "wall", "sandbank"),
      allowNull: false,
      defaultValue: "reef",
    },

    // 🆕 Bild
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
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