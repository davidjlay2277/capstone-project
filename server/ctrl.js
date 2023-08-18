//pull from database files
require("dotenv").config();

const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgress",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  //add callbacks to this object that are used in requests on the server
  seed: (req, res) => {
   sequelize.query(
    `CREATE TABLE cards
      
    `
    )
    .then(() => {
      console.log("DE Seeded");
      res.sendStatus(200);
    })
    .catch((err) => console.log("Error: DB not seeded", err));
  },
};
