/*//////////////////INITIALIZE SERVER ////////////////////
install nodemon (nmp install -g nodemon)
run the following commands:
    npm init -y
        package.json installed
    npm i express
        package-lock.json installed
    npm i cors

    npm install dotenv
        Create a file in the root called.env
            Create a SERVER_PORT variable
            Create a CONNECTION_STRING variable (currently using supabase)

At the top of controller.js, require in the dotenv package and call its config method (you can ignore the other code in there until later steps)

Optional: destructure CONNECTION_STRING from process.env in controller.js

    nodemon 
        run index js, spin up server

    then create git repository (see .gitignore for node_modules)
*///////////////////////////////////////////////////////

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5001;
    //DEFINE PORT//
app.listen(PORT, () => console.log(`server running on ${PORT}`));