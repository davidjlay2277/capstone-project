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

let gameStatus = false;
let players = [];
let gameCurrent = {};

//put these in game
let playerHand = [];
let botHand = [];

module.exports = {
  getGame: (req, res) => {
    if (gameStatus) {
      res.status(200).send(gameCurrent);
    } else {
      res.status(500).send("game not ready. retry");
    }
  },
  /// CREATE THE players ARRAY using the selected character and a random bot
  postPlayers: (req, res) => {
    let { id } = req.body;
    let idBot = Math.floor(Math.random() * 2) + 1;
    sequelize
      .query(
        `SELECT * FROM characters WHERE idCharacter = ${id};
              SELECT * FROM characters WHERE idCharacter = ${idBot}`
      )
      .then((sqlResult) => {
        if (
          sqlResult[0][0].idcharacter > 0 &&
          sqlResult[0][1].idcharacter > 0
        ) {
          players.push(sqlResult[0][0]);
          players.push(sqlResult[0][1]);
          res.status(200).send(players);
        } else {
          console.log("please select a character first");
        }
      })
      .catch((err) => console.log("character not found", err));
  },

  /// When player push "start Game" this will populate the game ARRAY using the character details

  postGame: (req, res) => {
    if (typeof players[1] === "object") {
      gameCurrent = {
        playerId: players[0].idcharacter,
        botId: players[1].idcharacter,
        playerName: players[0].name,
        botName: players[1].name,
        playerHealth: players[0].healthstarting,
        botHealth: players[1].healthstarting,
        playerHand: [],
        botHand: [],
      };
      gameStatus = true;
      res.status(200).send(gameCurrent);
    } else {
      console.log("charactes not ready");
      res.status(500).send("characters not ready");
    }

    // .then(() => {
    //   res.status(200).send(game);
    // });
  },

  getCharacters: (req, res) => {
    sequelize
      .query(`SELECT * FROM characters WHERE status = 'readyPlayer'`)
      .then((characters) => {
        res.status(200).send(characters[0]);
      })
      .catch((err) => console.log("characters not found", err));
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
