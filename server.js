/* import express, body-parser and cors modules:
     * Express is for building the Rest apis
     * body-parser helps to parse the request and create the req.body object
     * cors provides Express middleware to enable CORS with various options. */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// The var app = express() statement creates a new express application for you. 
// The createApplication function from the lib/express.js file is the default export, which we see as the express() function call.
const app = express();

// The cors module allow us to allow/restrict requested resources on a web server depend on where the HTTP request was initiated.
// Here we are allowing the "http://localhost:8081" - which is the default url for local React applications
var corsOptions = {
    origin: "http://localhost:8081"
};

// The use functions enable us the cors we defined.
// coreOption allow us to further customize the configuration of the core module.
// You can use configuration to allow a single domain or subdomains access, configure HTTP methods that are allowed such as GET and POST depending on your requirements
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

// Creating a simple route - GET command for the homebase url (= localhost:8081/).
app.get("/", (req, res) => {
    res.json({ message: "Welcome to yarinago application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models"); // Using the db module that wa exported from index.js
db.mongoose
  .connect(db.url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) // Trying to create a connection the the url from db.config.js ("mongodb://localhost:27017/yarinago_db")
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });