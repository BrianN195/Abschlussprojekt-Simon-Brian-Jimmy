import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class AnimalModel extends Model {
  declare id: number;
  declare name: string;
  declare scientificName: string;
  declare description: string;
  declare category: string;
  declare dangerLevel: number;
  declare imageUrl: string;
  declare size?: string;
  declare weight?: string;
  declare habitat?: string; 
  declare bestViewingTime: string[];
  declare depthRange?: string; 
  declare diet?: string; 
  declare isSchooling?: boolean; // true = schwarmtier, false = nicht schwarmtier 
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
    },

    dangerLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    size: {
      type: DataTypes.STRING,
      allowNull: true,
      // z.B. "2m", "30cm - 1.5m"
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: true,
      // z.B. "200kg"
    },

    habitat: {
      type: DataTypes.STRING,
      allowNull: true,
      // z.B. "Korallenriff", "Offener Ozean", "Tiefsee"
    },

    bestViewingTime: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },

    depthRange: {
      type: DataTypes.STRING,
      allowNull: true,
      // z.B. "0–1000m"
    },

    diet: {
      type: DataTypes.STRING,
      allowNull: true,
      // z.B. "Fische, Plankton"
    },

    isSchooling: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      // Schwarmtier
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
// nahrung
// schwarm tier
// wie gefährdet
// lebensräume (korallen,riffe)
// tiefe?