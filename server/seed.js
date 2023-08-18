//pull from database files
require("dotenv").config();

module.exports = {
  //add callbacks to this object that are used in requests on the server
  function1: (req, res) => {
    console.log("hit on function in seed");
  },
};
