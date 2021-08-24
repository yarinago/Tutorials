const db = require("../models"); // Importing the files in models folder into an object
const Tutorial = db.tutorials; // Taking the value in tutorials field (located in index.js)

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // TODO - implement function
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  // TODO - implement function
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  // TODO - implement function
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  // TODO - implement function
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  // TODO - implement function
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  // TODO - implement function
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  // TODO - implement function
};