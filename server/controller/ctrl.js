//pull from database files
const something = require("./db.json");
const somethingelse = require("./db.sql");

module.exports = {
  //add callbacks to this object that are use in requests on the server
  function1: (req, res) => {
    console.log("hit on function 1 in the constoler");
  },
};
