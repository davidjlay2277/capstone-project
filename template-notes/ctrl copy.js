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
  }}









  module.exports = {
    postCard: (req, res) => {
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
    }
  };
  