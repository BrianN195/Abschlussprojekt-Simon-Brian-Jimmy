import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class UserModel extends Model {}

UserModel.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true
    },

    bio : {
        type: DataTypes.TEXT,
        allowNull: true
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: true
  }
);

export default UserModel;