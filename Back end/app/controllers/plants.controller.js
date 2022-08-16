const db = require("../models");
const Plant = db.plant;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.PlantName) {
    res.status(400).send({ message: "Plant Name can not be empty!" });
    return;
  }
  // Create a Plants
  const plant = new Plant({
    PlantName: req.body.PlantName,
    PlantImage: req.body.PlantImage,
    PlantPrice: req.body.PlantPrice,
    Quantity: req.body.Quantity,
    ImportDate: req.body.ImportDate,
    Description: req.body.Description,
    CategoryID: req.body.CategoryID,
    PlantStatus: req.body.PlantStatus ? req.body.PlantStatus : false
  });
  // Save Plant in the database
  plant
    .save(plant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Plant."
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const PlantName = req.query.PlantName;
  var condition = PlantName ? { PlantName: { $regex: new RegExp(PlantName), $options: "i" } } : {};
  Plant.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving plant."
      });
    });
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Plant.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Plant with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Plant with id=" + id });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Plant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update plant with id=${id}. Maybe plant was not found!`
        });
      } else res.send({ message: "Plant was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Plant.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Plant with id=${id}. Maybe Plant was not found!`
        });
      } else {
        res.send({
          message: "Plant was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete plant with id=" + id
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Plant.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Plant were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Plants."
      });
    });
};
// Find all published Tutorials
exports.findAllStatus = (req, res) => {
  Plant.find({ PlantStatus: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving plant."
      });
    });
};