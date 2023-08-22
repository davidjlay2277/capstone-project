console.log('testing')
// gameCurrent = {
//   playerId: players[0].idcharacter,
//   botId: players[1].idcharacter,
//   playerName: players[0].name,
//   botName: players[1].name,
//   playerHealth: players[0].healthstarting,
//   botHealth: players[1].healthstarting,
//   playerHand: playerHand,
//   botHand: botHand,
// };
let arr1 = [
  {
    idcard: 1,
    idcharacter: 1,
    status: "readyPlayer",
  },
  {
    idcard: 2,
    idcharacter: 1,
    status: "readyPlayer",
  },
  {
    idcard: 3,
    idcharacter: 1,
    status: "readyPlayer",
  },
];
const drawCards = (arr) => {
    return arr.map((card) => {
      return Object.assign({}, card, { status: "hand" });
    });
  };
let arr2 = drawCards(arr1)
  console.log(arr2)

