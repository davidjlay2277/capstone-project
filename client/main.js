const characterBtn = document.getElementById("character-btn");
const startGameBtn = document.getElementById("start-game-btn");
//Changed to 'onCLick in HTML
// const playCardBtn = document.getElementById("play-card-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const logGameBtn = document.getElementById("log-game-btn");

const characterSelector = document.getElementById("character-input");
const playerStatus = document.getElementById("player-status");
const playerImg = document.getElementById("player-img");
const botStatus = document.getElementById("bot-status");
const botImg = document.getElementById("bot-img");

const baseUrl = "http://localhost:4477";
const errFunction = (err) => {
  alert(err);
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
  playerStatus.appendChild(str)
}

const addplayers = (res) => {
  let playerObj = res.data[0];
  let botObj = res.data[1];
  playerStatus.innerHTML = `<h2>${playerObj.name}</h2>
<p> Health = ${playerObj.healthstarting}</p>`;
  botStatus.innerHTML = `<h2>${botObj.name}</h2>
<p> Health = ${botObj.healthstarting}</p>`;

playerImg.innerHTML = `<div class="background-container"
style="background-image: url('${playerObj.imgurl}');">
</div>`
botImg.innerHTML =  `<div class="background-container"
style="background-image: url('${botObj.imgurl}');">
</div>`

};

const startGame = (res) => {
  console.log(res.data);
};

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

const postGame = (e) => {
  e.preventDefault();
  axios.post(`${baseUrl}/startGame`).then(startGame).catch(errFunction);
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
startGameBtn.addEventListener("click", postGame); // user starts the game
// playCardBtn.addEventListener("click", postCard); // user plays a card
playAgainBtn.addEventListener("click", deleteGame); // user logs the game

logGameBtn.addEventListener("click", putGame);
