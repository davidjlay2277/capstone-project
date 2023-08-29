const characterBtn = document.getElementById("character-btn");
//Changed to 'onCLick in HTML
// const playCardBtn = document.getElementById("play-card-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const logGameBtn = document.getElementById("log-game-btn");

const characterSelectContainer = document.getElementById("character-selector");
const characterSelection = document.getElementById("character-input");
const playerStatus = document.getElementById("player-status");
const playerImg = document.getElementById("player-img");
const botStatus = document.getElementById("bot-status");
const botImg = document.getElementById("bot-img");
const gameBtnContainer = document.getElementById("start-game-btn");

const playerCards = document.getElementById("player-cards");
const botCards = document.getElementById("bot-cards");

//NOT USED ...yet
// const gameActions = document.getElementbyId("game-actions")

const baseUrl = "http://localhost:4477";
const errFunction = (err) => {
  alert(err);
};

const updateGame = (res) => {
  let gameData = res.data
  return gameData
};

const getGame = () => {
  console.log("getGame envoked");
  axios.get(`${baseUrl}/currentGame`).then(updateGame).catch(errFunction);
};

const addCharacterNames = (res) => {
  let charArr = res.data;
  for (let i = 0; i < charArr.length; i++) {
    let listData = charArr[i];
    let characterOption = document.createElement("option");
    characterOption.id = i + 1;
    characterOption.value = listData.idcharacter;
    characterOption.innerHTML = `${listData.name}`;
    characterSelection.appendChild(characterOption);
  }
};

const addplayers = (res) => {
  let playerObj = res.data[0];
  let botObj = res.data[1];
  playerStatus.innerHTML = `<h2>${playerObj.name}</h2>
<p> Health = ${playerObj.healthstarting}</p>`;
  botStatus.innerHTML = `<h2>${botObj.name}</h2>
<p> Health = ${botObj.healthstarting}</p>`;

  playerImg.innerHTML = `<div class="background-container"
style="background-image: url('${playerObj.imgurl}');">
</div>`;
  botImg.innerHTML = `<div class="background-container"
style="background-image: url('${botObj.imgurl}');">
</div>`;
  startGamePrompt(botObj.name);
};

const startGamePrompt = (name) => {
  gameBtnContainer.innerHTML = ``;
  let startGameBtn = document.createElement("div");
  startGameBtn.innerHTML = `<button class="button-standard" onclick="postGame()">Start Game</button>`;
  gameBtnContainer.appendChild(startGameBtn);
  alert(`${name} is ready to Duel! \n  Click "Start Duel" to begin`);
};

const createPlayerCards = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let { idcard, attackvalue, defensevalue, status } = arr[i];
    let newCard = document.createElement("div");
    if (status === "hand") {
      newCard.innerHTML = `<button class="card rebel-front" onclick="postCard(${idcard})">
    <div class="value-container">
      <div class="label">Attack</div>
      <div class="attack-circle">
        <div class="value">${attackvalue}</div>
      </div>
    </div>
    <div class="value-container">
      <div class="defend-circle">
        <div class="value">${defensevalue}</div>
      </div>
      <div class="label">Defend</div>
    </div>
  </button>`;
    } else {
      newCard.innerHTML = `<div class="card rebel-back" id="${idcard}">
         </div>`;
    }
    playerCards.appendChild(newCard);
  }
};

const createBotCards = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let { idcard, attackvalue, defensevalue, status } = arr[i];
    let newCard = document.createElement("div");
    console.log(status)
    if (status === "discard") {
      newCard.innerHTML = `<div class="card emperial-front" id="${idcard}" >
    <div class="value-container">
      <div class="label">Attack</div>
      <div class="attack-circle">
        <div class="value">${attackvalue}</div>
      </div>
    </div>
    <div class="value-container">
      <div class="defend-circle">
        <div class="value">${defensevalue}</div>
      </div>
      <div class="label">Defend</div>
    </div>
  </div>`;
    } else {
      newCard.innerHTML = `<div class="card emperial-back" id="${idcard}">
         </div>`;
    }
    botCards.appendChild(newCard);
  }
};



const updateCurrentGame = (res) => {
  console.log("hit on updateCurrent Game and ...: ", res.data);
  playerCards.innerHTML = ``;
  botCards.innerHTML = ``;
  characterSelectContainer.innerHTML = ``;
  let { playerHand, botHand, playerHealth, botHealth } = res.data;
  createPlayerCards(playerHand);
  createBotCards(botHand);
};


/////////// ENDPOINT REQUESTS //////////////
const getCharacters = () => {
  axios.get(`${baseUrl}/characters`).then(addCharacterNames).catch(errFunction);
};
const postGame = () => {
  // e.preventDefault();
  axios.post(`${baseUrl}/startGame`).then(updateCurrentGame).catch(errFunction);
};
const postCard = (num) => {
  let cardObj = {
    idcard: num,
  };
  axios
    .post(`${baseUrl}/playCard`, cardObj)
    .then(updateCurrentGame)
    .catch(errFunction);
};
const postPlayers = (e) => {
  e.preventDefault();
  let idObj = {
    idcharacter: document.getElementById("character-input").value,
  };
  axios.post(`${baseUrl}/players`, idObj).then(addplayers).catch(errFunction);
};

////////// IN PROGRESS ///////////////
const deleteGame = () => {
  console.log("hit on playAgainBtn");
};
const putGame = () => {
  console.log("hit on logGameBtn");
};

getCharacters();

characterBtn.addEventListener("click", postPlayers); // set up players
logGameBtn.addEventListener("click", putGame); // "log game data"
playAgainBtn.addEventListener("click", deleteGame); //"play again"

// startGameBtn.addEventListener("click", postGame); // user starts the game
// playCardBtn.addEventListener("click", postCard); // user plays a card


