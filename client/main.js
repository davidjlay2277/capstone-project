const characterBtn = document.getElementById("character-btn");

//Changed to 'onCLick in HTML
// const playCardBtn = document.getElementById("play-card-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const logGameBtn = document.getElementById("log-game-btn");

const characterSelector = document.getElementById("character-input");
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

const startGamePrompt = (name) => {
  gameBtnContainer.innerHTML = ``;
  let startGameBtn = document.createElement("div");
  startGameBtn.innerHTML = `<button class="button-standard" onclick="postGame()">Start Game</button>`;
  gameBtnContainer.appendChild(startGameBtn);
  alert(`${name} is ready to Duel! \n  Click "Start Duel" to begin`);
};

const addCharacterNames = (res) => {
  let charArr = res.data;
  for (let i = 0; i < charArr.length; i++) {
    let listData = charArr[i];
    let characterOption = document.createElement("option");
    characterOption.id = i + 1;
    characterOption.value = listData.idcharacter;
    characterOption.innerHTML = `${listData.name}`;
    characterSelector.appendChild(characterOption);
  }
};

const addplayerNow = (str) => {
  playerStatus.appendChild(str);
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

constcreatePlayerCards = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let { idcard, attackvalue, defensevalue, status } = arr[i];
    console.log(attackvalue);
    let newCard = document.createElement("div");
    console.log(newCard);
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
      newCard.innerHTML = `<div class="card emperial-back" id=${idcard}>
         </div>`;
    }
    playerCards.appendChild(newCard);
  }
};

const createBotCards = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let { idcard, attackvalue, defensevalue, status } = arr[i];
    console.log(attackvalue);
    let newCard = document.createElement("div");
    console.log(newCard);
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
      newCard.innerHTML = `<div class="card emperial-back" id=${idcard}>
         </div>`;
    }
    playerCards.appendChild(newCard);
  }
};


updateCurrentGame = (res) => {
  playerCards.innerHTML = ``;
  botCards.innerHTML = ``;
  let { playerHand, botHand, playerHealth, botHealth } = res.data;
  createPlayerCards(playerHand);
  // createCards(botHand, "empire")
};

const postGame = () => {
  axios.post(`${baseUrl}/startGame`).then(updateCurrentGame).catch(errFunction);
};

// const startGame = () => {
//   console.log('hit on start game button');
//   axios.post(`${baseUrl}/startGame`).then(updateCurrentGame).catch(errFunction);

// };

const getCharacters = () => {
  axios.get(`${baseUrl}/characters`).then(addCharacterNames).catch(errFunction);
};

const postPlayers = (e) => {
  e.preventDefault();
  let idObj = {
    idcharacter: document.getElementById("character-input").value,
  };
  axios.post(`${baseUrl}/players`, idObj).then(addplayers).catch(errFunction);
};

const postCard = (num) => {
  console.log("card ", num, " was played");
};
const deleteGame = () => {
  console.log("hit on playAgainBtn");
};
const putGame = () => {
  console.log("hit on logGameBtn");
};

const getGame = () => {
  console.log("game envoked");
};

getCharacters();

characterBtn.addEventListener("click", postPlayers); // user selects a character
// startGameBtn.addEventListener("click", postGame); // user starts the game
// playCardBtn.addEventListener("click", postCard); // user plays a card
playAgainBtn.addEventListener("click", deleteGame); // user logs the game

logGameBtn.addEventListener("click", putGame);
