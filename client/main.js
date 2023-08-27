const characterBtn = document.getElementById("character-btn");
const startGameBtn = document.getElementById("start-game-btn");
const playCardBtn = document.getElementById("play-card-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const logGameBtn = document.getElementById("log-game-btn");

const characterSelector = document.getElementById("character-input");

const baseUrl = "http://localhost:4477";
const errFunction = (err) => {
  alert(err);
};

const addCharacterNames = (res) => {
  let charArr = res.data;
  for (let i = 0; i < charArr.length; i++) {
    let listData = charArr[i];
    let characterOption = document.createElement("option");
    // characterOption.innerHTML = `<option "id="${i+1}" value=${listData.idcharacter}>${listData.name }</option>`
    characterOption.id = i + 1;
    characterOption.value = listData.idcharacter;
    characterOption.innerHTML = `${listData.name}`;
    characterSelector.appendChild(characterOption);
  }
};

const addplayers = (res) => {
  console.log('add these players: ', res.body)
}

const getCharacters = () => {
  axios.get(`${baseUrl}/characters`).then(addCharacterNames).catch(errFunction);
};

const postCharacters = (e) => {
  e.preventDefault();
  console.log("hit on characterBtn");
  let idcharacter = document.getElementById("character-selector")
  console.log(idcharacter)
  axios
    .post(`${baseUrl}/players`, idcharacter)
    .then(addplayers)
    .catch(errFunction);
};

const postGame = () => {
  console.log("hit on startGameBtn");
};
const postCard = () => {
  console.log("hit on playCardBtn");
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
// getGame();

characterBtn.addEventListener("click", postCharacters); // user selects a character
startGameBtn.addEventListener("click", postGame); // user starts the game
playCardBtn.addEventListener("click", postCard); // user plays a card
playAgainBtn.addEventListener("click", deleteGame); // user logs the game
logGameBtn.addEventListener("click", putGame);
