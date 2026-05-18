import AnimalModel from "./AnimalModel";
import LocationModel from "./LocationModel";
import UserModel from "./UserModel";
import AnimalLocationModel from "./AnimalLocationModel";

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
export {
  AnimalModel,
  LocationModel,
  AnimalLocationModel,
};