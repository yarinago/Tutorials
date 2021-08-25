const db = require("../models"); // Importing the files in models folder into an object
const Tutorial = db.tutorials; // Taking the value in tutorials field (located in index.js)

// Create and Save a new Tutorial
// (!) See "What I Learned.word" to read about req.body (!)
exports.create = (req, res) => {
  // Validate request.
  // Error 400 - indicates that the server cannot or will not process the request due to something that is perceived to be a client error
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  /* Error 500 - indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
     This error response is a generic "catch-all" response. */
  tutorial.save(tutorial)
    .then(data => { 
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial." });
    });
};

// Retrieve all Tutorials from the database.
/* $regex -         Provides regular expression capabilities for pattern matching strings in queries.
   $RexExp -        Create an reqular expression object.
   $options: "i" -  Case insensitivity to match upper and lower cases. */
exports.findAll = (req, res) => {
    // TODO - CHECK IF VALIDATE NEEDED
    const title = req.query.title; // (!) See "What I Learned.word" to read about req.query (!)
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Tutorial.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials." });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    // TODO - CHECK IF VALIDATE NEEDED
    const id = req.params.id; // (!) See "What I Learned.docx" to read about req.params (!)

    Tutorial.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    // Validate request.
    if (!req.body) { // (!) See "What I Learned.word" to read about req.body (!)
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id
          });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
/*  TODO - CHECK IF VALIDATE NEEDED
    // Validate request.
    if (!req.body) { // (!) See "What I Learned.word" to read about req.body (!)
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      } */  
      
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    // TODO - CHECK IF VALIDATE NEEDED
    Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    // TODO - CHECK IF VALIDATE NEEDED
    Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};