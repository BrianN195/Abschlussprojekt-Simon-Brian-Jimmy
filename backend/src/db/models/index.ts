import AnimalModel from "./AnimalModel";
import LocationModel from "./LocationModel";
import UserModel from "./UserModel";
import AnimalLocationModel from "./AnimalLocationModel";
import UserFavoriteAnimalModel from "./UserFavoritAnimalModel";
import AnimalCommentModel from "./AnimalCommentModel";
import AnimalTranslationModel from "./AnimalTranslationModel";
import LocationTranslationModel from "./LocationTranslationModel";



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

// Translations associations
AnimalModel.hasMany(AnimalTranslationModel, {
  foreignKey: "animalId",
  as: "translations",
});
AnimalTranslationModel.belongsTo(AnimalModel, {
  foreignKey: "animalId",
});

LocationModel.hasMany(LocationTranslationModel, {
  foreignKey: "locationId",
  as: "translations",
});
LocationTranslationModel.belongsTo(LocationModel, {
  foreignKey: "locationId",
});

export {
  AnimalModel,
  LocationModel,
  AnimalLocationModel,
  UserModel,
  UserFavoriteAnimalModel,
  AnimalCommentModel,
  AnimalTranslationModel,
  LocationTranslationModel
};