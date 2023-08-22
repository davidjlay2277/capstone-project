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
let players = [];
let playerHand = [];
let botHand = [];
let gameStatus = false;
let botCardsPlayed = 0;

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
  postCard: (req, res) => {
    let playerCardId = 2;
    let botCardId = 7;
    let { playerHand, botHand, playerHealth, botHealth } = gameCurrent;
    
    
    let playerCard = findCard(playerHand, playerCardId);
    let botCard = findCard(botHand, botCardId);

    let playerDamage = damageCalc(
      playerHealth,
      damageCalc(botCard.attackValue, playerCard.defenseValue)
    );
    let botDamage = damageCalc(
      botHealth,
      damageCalc(playerCard.attackValue, botCard.defenseValue)
    );
    playerHand = discard(playerHand, playerCardId);
    botHand = discard(botHand, botCardId);

    Object.assign(gameCurrent, {
      playerHealth: playerDamage,
      botHealth: botDamage,
      playerHand: playerHand,
      botHand: botHand,
    });
    res.status(200).send(gameCurrent);
  },

 postCard2: (req, res) => {
  
  let playerCardId = 2;
  let botCardId = 7;
  let { playerHand, botHand, playerHealth, botHealth } = gameCurrent;

  const playerCardPromise = new Promise((resolve) => {
    let playerCard = findCard(playerHand, playerCardId);
    resolve(playerCard);
  });

  const botCardPromise = new Promise((resolve) => {
    let botCard = findCard(botHand, botCardId);
    resolve(botCard);
  });

  const playerHealthPromise = Promise.resolve(playerHealth);
  const botHealthPromise = Promise.resolve(botHealth);

  Promise.all([
    playerCardPromise,
    botCardPromise,
    playerHealthPromise,
    botHealthPromise
  ])
    .then(([playerCard, botCard, playerHealth, botHealth]) => {
      let playerDamage = damageCalc(
        playerHealth,
        damageCalc(botCard.attackValue, playerCard.defenseValue)
      );
      let botDamage = damageCalc(
        botHealth,
        damageCalc(playerCard.attackValue, botCard.defenseValue)
      );
      playerHand = discard(playerHand, playerCardId);
      botHand = discard(botHand, botCardId);

      Object.assign(gameCurrent, {
        playerHealth: playerDamage,
        botHealth: botDamage,
        playerHand: playerHand,
        botHand: botHand,
      });

      res.status(200).send(gameCurrent);
    })
    .catch((error) => {
      res.status(500).send("Error occurred: " + error.message);
    });
    },
  
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
  //////////////////// INITIAILIZE THE GAME //////////////////////////////
  postGame: (req, res) => {
    if (typeof players[1] === "object") {
      sequelize
        .query(
          `SELECT * FROM cards AS t1 INNER JOIN characters AS t2 on t1.idcharacter = t2.idcharacter WHERE t2.idCharacter = 1;`
        )
        .then((sqlResult1) => {
          playerHand = drawCards(sqlResult1[0]);

          return sequelize.query(
            `SELECT * FROM cards AS t1 INNER JOIN characters AS t2 on t1.idcharacter = t2.idcharacter WHERE t2.idCharacter = 2;`
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
  /////////////////// GET ALL PLAYER READY CHARACTERS ////////////////
  getCharacters: (req, res) => {
    sequelize
      .query(`SELECT * FROM characters WHERE status = 'readyPlayer'`)
      .then((characters) => {
        res.status(200).send(characters[0]);
      })
      .catch((err) => console.log("characters not found", err));
  },
  /////////////// LOG THE GAME STATS AT GAME END /////////////////
  logGame: (req, res) => {
    let playerName = req.body.playerName;
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
