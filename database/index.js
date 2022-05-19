const Sequelize = require("sequelize");
const config = require("../config/database");

async function connect() {
  const sequelize = new Sequelize(config);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const connection = connect();

module.exports = connection;
