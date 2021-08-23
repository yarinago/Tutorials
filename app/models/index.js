/* Create a variable that uses the module.export which is define in "../config/db.config".
   (!) "../myfile.text" is one level above you and "/myfile.text" lives in your root directory (!) */
const dbConfig = require("../config/db.config"); 

// Define Mongoose model
const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // Not neccery in mongoose 5 version and beyond since the default value of Promise is of the global


const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db;