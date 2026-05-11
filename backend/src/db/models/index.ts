import AnimalModel from "./AnimalModel";
import LocationModel from "./LocationModel";
import UserModel from "./UserModel";
import AnimalLocationModel from "./AnimalLocationModel";

// 🐠 Animal ↔ 🌊 Location (Many-to-Many)
AnimalModel.belongsToMany(LocationModel, {
  through: AnimalLocationModel,
});

LocationModel.belongsToMany(AnimalModel, {
  through: AnimalLocationModel,
});