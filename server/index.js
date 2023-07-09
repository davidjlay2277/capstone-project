/*//////////////////INITIALIZE SERVER ////////////////////
install nodemon (nmp install -g nodemon)
run the following commands:
    npm init -y
        package.json installed
    npm i express
        package-lock.json installed
    npm i cors
    nodemon server
        
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