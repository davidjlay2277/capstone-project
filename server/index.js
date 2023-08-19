require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const {seedGame} = require("./ctrl.js")

//BASE URL should be 'http://localhost:4477'
app.post("/seed",seedGame)

const PORT = 4477;
app.listen(PORT, () => console.log(`server running on ${PORT}`));