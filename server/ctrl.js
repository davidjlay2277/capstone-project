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

let players = [];
let playerObj = {};
let botObj = {};
let game = [];
let playerHand = [];
let botHand = [];

module.exports = {
  getGame: (req, res) => {
    console.log("hit on get game");
  },

  getPlayers: (req, res) => {
    let { id } = req.body;
    let idBot = Math.floor(Math.random() * 2) + 1;
  sequelize
      .query(`SELECT * FROM characters WHERE idCharacter = ${id};
              SELECT * FROM characters WHERE idCharacter = ${idBot}`)
      .then((sqlResult) => {
      if (sqlResult[0][0].idcharacter > 0 && sqlResult[0][1].idcharacter > 0)
        {players.push(sqlResult[0][0]);
        players.push(sqlResult[0][1]);
        res.status(200).send(players);
        }
        else {console.log('please select a character first')}
      })
      .catch((err) => console.log("character not found", err));
  },

  getCharacters: (req, res) => {
    sequelize
      .query(`SELECT * FROM characters WHERE status = 'readyPlayer'`)
      .then((characters) => {
        res.status(200).send(characters[0]);
      })
      .catch((err) => console.log("characters not found", err));
  },

  postPlayer1: (req, res) => {
    let { id } = req.body;
    sequelize
      .query(`SELECT * FROM characters WHERE idCharacter = ${id}`)
      .then((sqlResult) => {
        playerObj = sqlResult[0][0];
        players.push(playerObj);
        res.status(200).send(players);
      })
      .catch((err) => console.log("character not found", err));
  },

  postGame: (req, res) => {
    if (playerObj.idcharacter > 0) {
      let idBot = Math.floor(Math.random() * 2) + 1;
      sequelize
        .query(`SELECT * FROM characters WHERE idCharacter = ${idBot}`)
        .then((sqlResult) => {
          botObj = sqlResult[0][0];
          res.status(200).send(botObj.name);
        })
        .catch((err) => console.log("character not found", err));
    } else {
      res.status(400).send("Select a player first");
    }
  },

  seedGame: (req, res) => {
    sequelize
      .query(
        `
        DROP TABLE IF EXISTS game;
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
          (1,2,'inProgress');
          `
      )
      .then(() => {
        console.log("game seeded");
        res.sendStatus(200);
      })
      .catch((err) => console.log("Error: game not seeded in DB", err));
  },
};
