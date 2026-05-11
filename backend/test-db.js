const SequelizeLib = require("sequelize");

const sequelize = new SequelizeLib.Sequelize(
  "myapp",
  "userd03",
  "1234",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

async function test() {
  try {
    await sequelize.authenticate();
    console.log("DB connection OK");
  } catch (err) {
    console.error("DB ERROR:", err);
  }
}

test();