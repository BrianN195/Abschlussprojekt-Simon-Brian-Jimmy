import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class AnimalModel extends Model {
  declare id: number;
  declare name: string
  declare scientificName: string
  declare description: string
  declare category: string
  declare dangerLevel: number
  declare imageUrl: string
}

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
      //vllt noch ein Mdel für kategorien?
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

// was noch dazu kommt
// größe, gewicht
// wie gefährlich bzw wie gefährdet
// wo es lebt
//