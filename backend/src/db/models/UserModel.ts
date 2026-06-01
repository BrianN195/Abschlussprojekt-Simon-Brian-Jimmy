import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class UserModel extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare passwordHash: string;
  declare profileImage: string | null;
  declare bio: string | null;
  declare gender: "male" | "female" | "others";
  declare birthDate: string | null;
  declare role: "user" | "admin" | "moderator";
  declare isVerified: boolean;
  declare emailToken: string | null
}
// hier in die {} das damit ts weiß was wie exestiert
//
//
// hier das initialieren des Models für die Datenbank
UserModel.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      allowNull: true,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM("male", "female", "others"),
      allowNull: true,
      defaultValue: "others",
    },

    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    role: {
      type: DataTypes.ENUM("user", "admin", "moderator"),
      allowNull: false,
      defaultValue: "user",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailToken: {
      type: DataTypes.STRING
    }
  },

  {
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: true,
  },
);

export default UserModel;
