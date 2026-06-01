import UserModel from "./UserModel";
import { sequelize } from "../config/database";
import { Model, DataTypes } from "sequelize";


class EmailVerificationToken extends Model {
    
  declare id: number;
  declare token: string;
  declare expiresAt: Date;
  declare UserId: number;

}

EmailVerificationToken.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "EmailVerificationToken",
    tableName: "email_verification_token",
    timestamps: true,
  }
);



UserModel.hasMany(EmailVerificationToken);
EmailVerificationToken.belongsTo(UserModel);

export default EmailVerificationToken;