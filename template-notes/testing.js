console.log("testing");
// require("./ctrlTEST.js");

// const drawCards = (arr) => {
//   return arr.map((card) => {
//     return Object.assign({}, card, { status: "hand" });
//   });
// };

// let arr1
// let arr2 = drawCards(arr1);
// const cardPlayed = arr1.find((e) => e.idcard === id);

let gameCurrent = {
  playerId: 1,
  botId: 2,
  playerName: "luke",
  botName: "darth",
  playerHealth: 16,
  botHealth: 22,
  playerHand: [
    {
      idcard: 1,
      idcharacter: 1,
      attackValue: 5,
      defenseValue: 1,
      status: "hand",
    },
    {
      idcard: 2,
      idcharacter: 1,
      attackValue: 3,
      defenseValue: 2,
      status: "hand",
    },
    {
      idcard: 3,
      idcharacter: 1,
      attackValue: 1,
      defenseValue: 4,
      status: "hand",
    },
  ],
  botHand: [
    {
      idcard: 1,
      idcharacter: 2,
      attackValue: 5,
      defenseValue: 1,
      status: "hand",
    },
    {
      idcard: 2,
      idcharacter: 2,
      attackValue: 3,
      defenseValue: 2,
      status: "hand",
    },
    {
      idcard: 3,
      idcharacter: 2,
      attackValue: 1,
      defenseValue: 4,
      status: "hand",
    },
  ],
};

const damageCalc = (num1, num2) => {
  if (num1 - num2 < 0) {
    return 0;
  } else {
    return num1 - num2;
  }
};
const findCard = (arr, id) => {
  return arr.find((e) => e.idcard === id);
};

const discard = (arr, id) => {
  const card = findCard(arr, id);
  card.status = "discard";
  return arr;
};
let playerCardId = 1;
let botCardId = 1;
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
  playerhand: playerHand,
  botHand: botHand,
});

console.log('player card: ', playerCardId,'\n');
console.log('bot: card: ', botCardId,'\n');

console.log('resulting GAME ', gameCurrent);
// let playerCard = playerHand.find((e) => e.idcard === cardId);
// let botCard = botHand.find((e) => e.idcard === botCardId);
// let playerDamage = damageCalc(botCard.attackValue, playerCard.defenseValue)
// let botDamage = damageCalc(playerCard.attackValue, botCard.defenseValue)
// console.log("player card: ", playerCard);
// console.log("bot card: ", botCard);
// console.log("player damage", playerDamage);
// console.log("bot damage", botDamage);
