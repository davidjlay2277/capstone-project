require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const { SERVER_PORT } = process.env;
const { logGame, getCharacters, getGame, postPlayers, postGame } = require("./ctrl.js");

//BASE URL  'http://localhost:4477'

//NOTE USED YET
app.put("/logGame", logGame);

app.get("/characters", getCharacters)
app.get("/currentGame", getGame )

app.post("/players", postPlayers);
app.post("/startGame", postGame)


app.listen(SERVER_PORT, () => console.log(`server running on ${SERVER_PORT}`));
