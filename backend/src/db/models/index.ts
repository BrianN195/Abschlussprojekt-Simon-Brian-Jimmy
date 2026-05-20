import AnimalModel from "./AnimalModel";
import LocationModel from "./LocationModel";
import UserModel from "./UserModel";
import AnimalLocationModel from "./AnimalLocationModel";
import UserFavoriteAnimalModel from "./UserFavoritAnimalModel";
import AnimalCommentModel from "./AnimalCommentModel";


// 🐠 Animal ↔ 🌊 Location (Many-to-Many)
AnimalModel.belongsToMany(LocationModel, {
  through: AnimalLocationModel,
  foreignKey: "animalId",
  otherKey: "locationId",
});

LocationModel.belongsToMany(AnimalModel, {
  through: AnimalLocationModel,
  foreignKey: "locationId",
  otherKey: "animalId",
});

UserModel.belongsToMany(AnimalModel, {
  through: UserFavoriteAnimalModel,
  as: "favorites",
  foreignKey: "userId",
  otherKey: "animalId",
});

AnimalModel.belongsToMany(UserModel, {
  through: UserFavoriteAnimalModel,
  as: "fans",
  foreignKey: "animalId",
  otherKey: "userId",
});

UserModel.hasMany(AnimalCommentModel, {
  foreignKey: "userId",
});

AnimalCommentModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

AnimalModel.hasMany(AnimalCommentModel, {
  foreignKey: "animalId",
});

AnimalCommentModel.belongsTo(AnimalModel, {
  foreignKey: "animalId",
});

export {
  AnimalModel,
  LocationModel,
  AnimalLocationModel,
  UserModel,
  UserFavoriteAnimalModel,
  AnimalCommentModel
};