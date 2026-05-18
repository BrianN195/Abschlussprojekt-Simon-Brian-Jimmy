import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class AnimalCommentModel extends Model {
  declare id: number;
  declare content: string;
  declare userId: number;
  declare animalId: number;
}

AnimalCommentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AnimalComment",
    tableName: "animal_comment",
    timestamps: true,
  },
);

export default AnimalCommentModel;
