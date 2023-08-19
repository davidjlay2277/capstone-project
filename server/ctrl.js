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
  seedGame: (req, res) => {
    sequelize
      .query(
        `DROP TABLE IF EXISTS game;
        CREATE TABLE game(
          idGame SERIAL PRIMARY KEY
          ,idUserCharacter INTEGER REFERENCES characters(idCharacter)
          ,idBotCharacter INTEGER REFERENCES characters(idCharacter)
          ,userHealth INTEGER
          ,botHealth INTEGER
          ,winner VARCHAR(100)
        );
          INSERT INTO game (idUserCharacter, idBotCharacter, winner) 
          VALUES
          (1,1,'inProgress');
          
    )`
      )
      .then(() => {
        console.log("DB Seeded");
        res.sendStatus(200);
      })
      .catch((err) => console.log("Error: DB not seeded", err));
  },
};
