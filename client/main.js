const characterBtn = document.getElementById("character-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const logGameBtn = document.getElementById("log-game-btn");
const characterSelectContainer = document.getElementById("character-selector");
const characterSelection = document.getElementById("character-input");
const resolveDamageBtn = document.getElementById("resolve-damage-btn");
const gameBtnContainer = document.getElementById("start-game-btn");

const gameEndBtns = document.getElementById("game-end-btn")
const playerStatus = document.getElementById("player-status");
const playerImg = document.getElementById("player-img");
const botStatus = document.getElementById("bot-status");
const botImg = document.getElementById("bot-img");

const playerCards = document.getElementById("player-cards");
const botCards = document.getElementById("bot-cards");

const gameActions = document.getElementById("game-actions");

let lastDamageResolved = true;
let cardsPlayed;

const baseUrl = "http://localhost:4477";
const errFunction = (err) => {
  alert(err);
};

const updateGame = (res) => {
  let gameData = res.data;
  return gameData;
};

const getGame = () => {
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

const updateHealth = (num1, num2) => {
  console.log("hit on Resolve damage button");
  const newPlayerHealth = playerStatus.querySelector("p");
  newPlayerHealth.innerHTML = `<p> Health = ${num1}</p>`;
  const newBotHealth = botStatus.querySelector("p");
  newBotHealth.innerHTML = `<p> Health = ${num2}</p>`;
  lastDamageResolved = true;
};

const resetGameActions = () => {
  gameActions.innerHTML = `  <div class="results">
  <div>
    <div> Player action </div>
    <div id="player-active-card" class="card rebel-front">
    </div>
    <div>__ damage taken </div>
  </div>
  <div class=bot-action>
    <div class="right-justify"> Bot action </div>
    <div id="bot-active-card" class="card emperial-front"></div>
    <div> __ damage given </div>
  </div>
</div>`
gameBtnContainer.innerHTML = ``;
resolveDamageBtn.innerHTML = ``;
  }

const botWinner = (name) => {
  
}

resolveEndOfGame = () => {
  resetGameActions()
alert('GAME OVER. Log your resutls and play again')

getGame()

console.log(currentGame)

}

const updateActiveGame = (res) => {
  let {
    activePlayerCard,
    activeBotCard,
    damageToPlayer,
    damageToBot,
    playerHealth,
    botHealth,
  } = res.data;
  
  if ((cardsPlayed === 5)||(playerHealth === 0)|| (botHealth === 0)) {
    resolveEndOfGame();
  } else {
    gameActions.innerHTML = `<div class="results">
    <div>
      <div> You played </div>
      <div id="player-active-card" class="card rebel-front">
        <div class="value-container">
          <div class="label">Attack</div>
          <div class="attack-circle">
            <div class="value">${activePlayerCard.attack}</div>
          </div>
        </div>
        <div class="value-container">
          <div class="defend-circle">
            <div class="value">${activePlayerCard.defend}</div>
          </div>
          <div class="label">Defend</div>
        </div>
      </div>
      <div> ${damageToPlayer} damage taken </div>
    </div>

    <div class=bot-action>
      <div class="right-justify"> Bot played </div>
      <div id="bot-active-card" class="card emperial-front">
        <div class="value-container">
          <div class="label">Attack</div>
          <div class="attack-circle">
            <div class="value">${activeBotCard.attack}</div>
          </div>
        </div>
        <div class="value-container">
          <div class="defend-circle">
            <div class="value">${activeBotCard.defend}</div>
          </div>
          <div class="label">Defend</div>
        </div>
      </div>
      <div> ${damageToBot} damage given </div>
    </div>
  </div>`;

    lastDamageResolved = false;
    resolveDamageBtn.innerHTML = `<button class="button-standard" onclick="updateHealth(${playerHealth},${botHealth})">Resolve Damage</button>`;
  }
};

const updateCards = (res) => {
  playerCards.innerHTML = ``;
  botCards.innerHTML = ``;
  characterSelectContainer.innerHTML = ``;
  let { playerHand, botHand, playerHealth, botHealth } = res.data;
  createPlayerCards(playerHand);
  createBotCards(botHand);
  if (cardsPlayed > 0) {
    updateActiveGame(res);
  }else {
    resetGameActions()

   
  }
   
};

/////////// ENDPOINT REQUESTS //////////////
const getCharacters = () => {
  axios.get(`${baseUrl}/characters`).then(addCharacterNames).catch(errFunction);
};

getCharacters();

const postGame = () => {
  cardsPlayed = 0;
  // e.preventDefault();
  axios.post(`${baseUrl}/startGame`).then(updateCards).catch(errFunction);
};
const postCard = (num) => {
  if (lastDamageResolved) {
    cardsPlayed++;
    let cardObj = {
      idcard: num,
    };
    axios
      .post(`${baseUrl}/playCard`, cardObj)
      .then(updateCards)
      .catch(errFunction);
  } else alert("Resolve damage before playing another card");
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

characterBtn.addEventListener("click", postPlayers); // set up players
logGameBtn.addEventListener("click", putGame); // "log game data"
playAgainBtn.addEventListener("click", deleteGame); //"play again"

// startGameBtn.addEventListener("click", postGame); // user starts the game
// playCardBtn.addEventListener("click", postCard); // user plays a card
