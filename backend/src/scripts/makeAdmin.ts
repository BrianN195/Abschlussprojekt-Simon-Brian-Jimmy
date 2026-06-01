import UserModel from "../db/models/UserModel";


async function makeAdmin() {
  await UserModel.update(
    { role: "admin" },
    { where: { email: "brian@brian.de" } }
  );

  console.log("User ist jetzt Admin");
}

makeAdmin();