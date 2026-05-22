import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";


class UserFavoriteAnimalModel extends Model {}

UserFavoriteAnimalModel.init(
  {
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
    modelName: "UserFavoriteAnimal",
    tableName: "user_favorite_animal",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["userId", "animalId"],
      },
    ],
  }
);

export default UserFavoriteAnimalModel