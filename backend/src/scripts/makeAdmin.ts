import { UserModel } from "../db/models";


async function makeAdmin() {
  await UserModel.update(
    { role: "admin" },
    { where: { email: "simon.woebke@gmx.de" } }
  );

  console.log("User ist jetzt Admin");
}

makeAdmin();