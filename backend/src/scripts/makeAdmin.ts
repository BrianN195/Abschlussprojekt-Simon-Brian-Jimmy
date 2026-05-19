import { UserModel } from "../db/models";


async function makeAdmin() {
  await UserModel.update(
    { role: "admin" },
    { where: { email: "deine@mail.de" } }
  );

  console.log("User ist jetzt Admin");
}

makeAdmin();