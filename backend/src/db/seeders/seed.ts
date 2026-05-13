import AnimalModel from "../models/AnimalModel";
import LocationModel from "../models/LocationModel";
import UserModel from "../models/UserModel";


async function seed() {
    

const userX = await UserModel.create({
  username: "",
  email: "",
  passwordHash: "",
  profileImage: null,
  bio: null,
  gender: "others", // male | female | others
  birthDate: null,
});

const animalX = await AnimalModel.create({
  name: "",
  scientificName: "",
  description: "",
  category: "",
  dangerLevel: 0,
  imageUrl: "",

  size: null,
  weight: null,
  habitat: null,
  depthRange: null,
  diet: null,
  isSchooling: false,
});

const locationX = await LocationModel.create({
  name: "",
  description: null,
  lat: null,
  lng: null,
});
}