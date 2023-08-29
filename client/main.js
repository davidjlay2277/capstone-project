const characterBtn = document.getElementById("character-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const logGameBtn = document.getElementById("log-game-btn");
const characterSelectContainer = document.getElementById("character-selector");
const characterSelection = document.getElementById("character-input");
const resolveDamageBtn = document.getElementById("resolve-damage-btn");
const gameBtnContainer = document.getElementById("start-game-btn");

const gameStatusContainer = document.getElementById("game-status");
const gameEndBtns = document.getElementById("game-end-container");
const endCurrentGamebtn = document.getElementById("end-game-btn");

const playerStatus = document.getElementById("player-status");
const playerImg = document.getElementById("player-img");
const botStatus = document.getElementById("bot-status");
const botImg = document.getElementById("bot-img");

const playerCards = document.getElementById("player-cards");
const botCards = document.getElementById("bot-cards");

const gameActions = document.getElementById("game-actions");

let gameStatus;
let winner;
let lastDamageResolved = true;
let cardsPlayed;

const baseUrl = "http://localhost:4477";
const errFunction = (err) => {
  alert(err);
};

// const updateGame = (res) => {
//   let gameData = res.data;
// return gameData
//   console.log('logging from upDate Game', gameData)
// };

// const getGame = () => {
//   axios.get(`${baseUrl}/currentGame`).then(updateGame).catch(errFunction);
// };

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
  startGameBtn.innerHTML = `<button class="start-btn" onclick="postGame()">Start Duel</button>`;
  gameBtnContainer.appendChild(startGameBtn);
  alert(`${name} is ready to Duel! \n  Click "Start Duel" to begin`);
};

const createPlayerCards = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let { idcard, attackvalue, defensevalue, status } = arr[i];
    let newCard = document.createElement("div");
    if (status === "hand" || gameStatus === "ended") {
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

const resetPlayerCards = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let { idcard, attackvalue, defensevalue, status } = arr[i];
    let newCard = document.createElement("div");

    newCard.innerHTML = `<div class="card rebel-front" onclick="postCard(${idcard})">
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
</div>`;
  gameBtnContainer.innerHTML = ``;
  resolveDamageBtn.innerHTML = ``;
};

const botWinner = (name) => {
  winner = name;
  gameStatusContainer.innerHTML = `<div class="heading">
<div> <h1>${name} Wins</h1> </div>
</div>`;
  playerImg.innerHTML = ``;
};
const playerWinner = (name) => {
  winner = name;
  gameStatusContainer.innerHTML = `<div class="heading">
<div> <h1>${name} Wins!</h1> </div>
</div>`;
  botImg.innerHTML = ``;
};
const tieGame = () => {
  winner = "tie game";
  alert(
    "The possibility of successfully navigating this game without a winner is approximately 3,720 to 1"
  );
  gameStatusContainer.innerHTML = `<div class="heading">
  <div> Looks like we have a tie.
  </div>`;
};

resolveEndOfGame = (gameData) => {
  gameStatus = "ended";
  gameBtnContainer.innerHTML = ``;
  resolveDamageBtn.innerHTML = ``;
  endCurrentGamebtn.innerHTML = ``;
  playerCards.innerHTML = ``;
  gameEndBtns.innerHTML = ` <div class="game-end">  
  <button class="button-standard" id="log-game-btn" onclick="putGame(${winner})">Log Game</button>
  <button class="button-standard" id="play-again-btn" onclick="deleteGame()">Play Again </button>
</div>`;

  resetPlayerCards(gameData.playerHand);
  if (gameData.botHealth > gameData.playerHealth) {
    botWinner(gameData.botName);
  }   else if (gameData.botHealth < gameData.playerHealth) {
    playerWinner(gameData.playerName);
  }     else if (gameData.botHealth === gameData.playerHealth) {
          if (gameData.damageToBot > gameData.damageToPlayer) {
            playerWinner(gameData.playerName);
    }
  } else {
    tieGame();
  }
};

const updateActiveGame = (res) => {
  let {
    playerHand,
    activePlayerCard,
    activeBotCard,
    damageToPlayer,
    damageToBot,
    playerHealth,
    botHealth,
  } = res.data;

  const actionsResults = () => {
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
  };

  const outOfCards = () => {
    setTimeout(() => {
      alert(
        "You just played your last card! \n Once the final damage is resolved, the player with the most health wins."
      );

      setTimeout(() => {
        updateHealth(playerHealth, botHealth);
        resolveEndOfGame(res.data);
      }, 1000); // Delay before updateHealth
    }, 500); // Delay before alert
  };

  const playerDefeated = () => {
    setTimeout(() => {
      alert("Critical hit");

      setTimeout(() => {
        updateHealth(playerHealth, botHealth);
        resolveEndOfGame(res.data);
      }, 1500);
    }, 100);
  };

  if (cardsPlayed === playerHand.length) {
    actionsResults();
    outOfCards();
  } else if (playerHealth === 0 || botHealth === 0) {
    actionsResults();
    playerDefeated();
  } else {
    actionsResults();
    // lastDamageResolved = false;
    updateHealth(playerHealth, botHealth);
    // resolveDamageBtn.innerHTML = `<button class="resolve-damage" onclick="updateHealth(${playerHealth},${botHealth})">Resolve Damage</button>`;
  }
};

const updateCards = (res) => {
  playerCards.innerHTML = ``;
  botCards.innerHTML = ``;
  characterSelectContainer.innerHTML = ``;
  let { playerHand, botHand } = res.data;
  createPlayerCards(playerHand);
  createBotCards(botHand);
  if (cardsPlayed > 0) {
    updateActiveGame(res);
  } else {
    resetGameActions();
  }
};

const removeGameElements = () => {
  window.location.reload();
};

/////////// ENDPOINT REQUESTS //////////////
const getCharacters = () => {
  axios.get(`${baseUrl}/characters`).then(addCharacterNames).catch(errFunction);
};

getCharacters();

const postGame = () => {
  cardsPlayed = 0;
  endCurrentGamebtn.innerHTML = `<button  class ="end-game-btn" onclick="deleteGame()">End Current Game</button> `;
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
  console.log("hit on deleteGame");
  axios
    .delete(`${baseUrl}/resetGame`)
    .then()
    .catch(errFunction);
};
const putGame = (str) => {
  axios
    .put(`${baseUrl}/logGame`, str)
    .then(alert("Game logged successfully"))
    .catch(errFunction);

    removeGameElements()
};

characterBtn.addEventListener("click", postPlayers); // set up players
// logGameBtn.addEventListener("click", putGame); // "log game"
// playAgainBtn.addEventListener("click", deleteGame); //"play again"

// startGameBtn.addEventListener("click", postGame); // user starts the game
// playCardBtn.addEventListener("click", postCard); // user plays a card
