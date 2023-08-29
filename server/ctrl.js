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

let gameCurrent = {};
let totalBots;
let players = [];
let playerHand = [];
let botHand = [];
let botHandArr = [];
let botCardsPlayed = 0;
let gameStatus = false;

const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

const drawCards = (arr) => {
  return arr.map((card) => {
    return Object.assign({}, card, { status: "hand" });
  });
};
const findCard = (arr, id) => {
  return arr.find((e) => e.idcard === id);
};
const damageCalc = (num1, num2) => {
  if (num1 - num2 < 0) {
    return 0;
  } else {
    return num1 - num2;
  }
};
const discard = (arr, id) => {
  const card = findCard(arr, id);
  card.status = "discard";
  return arr;
};

module.exports = {
  getGame: (req, res) => {
    if (gameStatus) {
      res.status(200).send(gameCurrent);
    } else {
      res.status(500).send("game not ready. Please re-select a character");
    }
  },

  postCard: (req, res) => {
    let { idcard } = req.body;
    let idCardBot = botHandArr[botCardsPlayed].idcard;
    let { playerHand, botHand, playerHealth, botHealth } = gameCurrent;
    let playerCard = findCard(playerHand, idcard);
    let botCard = findCard(botHand, idCardBot);
    let playerDamage = damageCalc(
      playerHealth,
      damageCalc(botCard.attackvalue, playerCard.defensevalue)
    );
    let botDamage = damageCalc(
      botHealth,
      damageCalc(playerCard.attackvalue, botCard.defensevalue)
    );
    playerHand = discard(playerHand, idcard);
    botHand = discard(botHand, idCardBot);
    let activePlayerCard = {
      attack: playerCard.attackvalue,
      defend: playerCard.defensevalue,
    };
    let activeBotCard = {
      attack: botCard.attackvalue,
      defend: botCard.defensevalue,
    };
    let damageToPlayer = playerHealth - playerDamage;
    let damageToBot = botHealth - botDamage;
    Object.assign(gameCurrent, {
      playerHealth: playerDamage,
      botHealth: botDamage,
      playerHand: playerHand,
      botHand: botHand,
      activePlayerCard: activePlayerCard,
      activeBotCard: activeBotCard,
      damageToPlayer: damageToPlayer,
      damageToBot: damageToBot,
    });
    botCardsPlayed++;
    res.status(200).send(gameCurrent);
  },

  /// CREATE THE players ARRAY using the selected character and a random bot
  postPlayers: (req, res) => {
    let { idcharacter } = req.body;
    let idBot = Math.floor(Math.random() * totalBots);
    sequelize
      .query(
        `SELECT * FROM characters WHERE idCharacter = ${idcharacter};
        SELECT * FROM characters WHERE status LIKE 'readyBot' ORDER BY idCharacter LIMIT 1 OFFSET ${idBot};`
      )
      .then((sqlResult) => {
        if (
          sqlResult[0][0].idcharacter > 0 &&
          sqlResult[0][1].idcharacter > 0
        ) {
          players = [];
          players.push(sqlResult[0][0]);
          players.push(sqlResult[0][1]);
          res.status(200).send(players);
          gameStatus = true;
        } else {
          // res.status(500).send(err)
        }
      })
      .catch((err) => console.log("character not found", err));
  },
  //////////////////// INITIAILIZE THE GAME //////////////////////////////
  postGame: (req, res) => {
    botCardsPlayed = 0
    let playerId = players[0].idcharacter;
    let botId = players[1].idcharacter;
    if (typeof players[1] === "object") {
      sequelize
        .query(
          `SELECT * FROM cards AS t1 INNER JOIN characters AS t2 on t1.idcharacter = t2.idcharacter WHERE t2.idCharacter = ${playerId}`
        )
        .then((sqlResult1) => {
          playerHand = drawCards(sqlResult1[0]);
          return sequelize.query(
            `SELECT * FROM cards AS t1 INNER JOIN characters AS t2 on t1.idcharacter = t2.idcharacter WHERE t2.idCharacter = ${botId};`
          );
        })
        .then((sqlResult2) => {
          botHand = drawCards(sqlResult2[0]);
          gameCurrent = {
            playerId: players[0].idcharacter,
            botId: players[1].idcharacter,
            playerName: players[0].name,
            botName: players[1].name,
            playerHealth: players[0].healthstarting,
            botHealth: players[1].healthstarting,
            playerHand: playerHand,
            botHand: botHand,
            activePlayerCard: 0,
            activeBotCard: 0,
            damageToPlayer: 0,
            damageToBot: 0,
          };
          botHandArr = botHand;
          shuffle(botHandArr);
          gameStatus = true;
          res.status(200).send(gameCurrent);
        })
        .catch((error) => {
          res.status(400).send("Error occurred: " + error.message);
        });
    } else {
      res.status(500).send("characters not ready");
    }
  },
  /////////////////// GET ALL PLAYER READY CHARACTERS ////////////////
  getCharacters: (req, res) => {
    sequelize
      .query(
        `SELECT * FROM characters WHERE status = 'readyPlayer';
              SELECT COUNT(idCharacter) FROM characters WHERE status LIKE 'readyBot'`
      )
      .then((characters) => {
        let arr1 = characters[0];
        totalBots = arr1[arr1.length - 1].count;
        arr1.pop();
        res.status(200).send(arr1);
      })
      .catch((err) => console.log("characters not found", err));
  },
  /////////////// LOG THE GAME STATS AT GAME END /////////////////
  logGame: (req, res) => {
    let winner
    if (gameCurrent.botHealth < gameCurrent.playerHealth) {
      winner = gameCurrent.playerName;
    }
    else if (gameCurrent.botHealth > gameCurrent.playerHealth) {
      winner = gameCurrent.botName;

    }else {winner = "tie game"}
    console.log(winner)
    sequelize
      .query(
        ` INSERT INTO gamestats (idUserCharacter, idBotCharacter, userHealth, botHealth, winner) 
          VALUES
          (${gameCurrent.playerId}, ${gameCurrent.botId}, ${gameCurrent.playerHealth}, ${gameCurrent.botHealth}, '${winner}');
          `
      )
      .then(() => {
        console.log("game logged in db");
        res.sendStatus(200);
      })
      .catch((err) => console.log("Error: game not logged in DB", err));
  },

  deleteGame: (req, res) => {
    gameCurrent = {};
    res
      .sendStatus(200)
      .catch((error) => {
        res.status(400).send("Error occurred: " + error.message);
  })
}}
