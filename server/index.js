require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const { SERVER_PORT } = process.env;
const {
  getCharacters,
  postPlayers,
  postGame,
  getGame,
  postCard,
  logGame,
  deleteGame
} = require("./ctrl.js");

//BASE URL 'http://localhost:4477'
app.get("/characters", getCharacters);
app.post("/players", postPlayers);
app.post("/startGame", postGame);

app.get("/currentGame", getGame);
app.post("/playCard", postCard);

app.put("/logGame", logGame);

app.delete("/resetGame", deleteGame)

app.listen(SERVER_PORT, () => console.log(`server running on ${SERVER_PORT}`));
