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
    let id = 1;
    let idBot = 2;
    // let { id } = req.body;
    // let idBot = Math.floor(Math.random() * 2) + 1;
    sequelize
      .query(
        `SELECT * FROM characters WHERE idCharacter = ${id};
              SELECT * FROM characters WHERE idCharacter = ${idBot}`
      )
      .then((sqlResult) => {
        console.log(sqlResult[0][0]);
        console.log(sqlResult[0][1]);
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

  postGame: (req, res) => {
    if (typeof players[1] === "object") {
      sequelize
        .query(
          `SELECT * FROM cards AS t1 INNER JOIN characters AS t2 on t1.idcharacter = t2.idcharacter WHERE t2.idCharacter = 1;`
        )
        .then((sqlResult1) => {
          playerHand = sqlResult1[0];

          return sequelize.query(
            `SELECT * FROM cards AS t1 INNER JOIN characters AS t2 on t1.idcharacter = t2.idcharacter WHERE t2.idCharacter = 2;`
          );
        })
        .then((sqlResult2) => {
          botHand = sqlResult2[0];

          gameCurrent = {
            playerId: players[0].idcharacter,
            botId: players[1].idcharacter,
            playerName: players[0].name,
            botName: players[1].name,
            playerHealth: players[0].healthstarting,
            botHealth: players[1].healthstarting,
            playerHand: playerHand,
            botHand: botHand,
          };

          gameStatus = true;
          res.status(200).send(gameCurrent);
        })
        .catch((error) => {
          res.status(500).send("Error occurred: " + error.message);
        });
    } else {
      res.status(500).send("characters not ready");
    }
  },

  getCharacters: (req, res) => {
    sequelize
      .query(`SELECT * FROM characters WHERE status = 'readyPlayer'`)
      .then((characters) => {
        res.status(200).send(characters[0]);
      })
      .catch((err) => console.log("characters not found", err));
  },

  logGame: (req, res) => {
    let playerName = req.body.playerName;

    console.log(playerName);
    let winner = "test  working";

    if (gameCurrent.bothealth > 0) {
      winner = gameCurrent.playerId;
    }
    if (gameCurrent.playerHealth === 0) {
      winner = gameCurrent.botId;
    }
    sequelize
      .query(
        ` INSERT INTO gamestats (playerName, idUserCharacter, idBotCharacter, userHealth, botHealth, winner) 
          VALUES
          ('${playerName}', ${gameCurrent.playerId}, ${gameCurrent.botId}, ${gameCurrent.playerHealth}, ${gameCurrent.botHealth}, '${winner}');
          `
      )
      .then(() => {
        console.log("game logged in db");
        res.sendStatus(200);
      })
      .catch((err) => console.log("Error: game not seeded in DB", err));
  },
};
