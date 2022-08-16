module.exports = app => {
    const plants = require("../controllers/plants.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", plants.create);
    // Retrieve all Tutorials
    router.get("/", plants.findAll);
    // Retrieve all published Tutorials
    router.get("/PlantStatus", plants.findAllStatus);
    // Retrieve a single Tutorial with id
    router.get("/:id", plants.findOne);
    // Update a Tutorial with id
    router.put("/:id", plants.update);
    // Delete a Tutorial with id
    router.delete("/:id", plants.delete);
    // Create a new Tutorial
    router.delete("/", plants.deleteAll);
    app.use('/api/plants', router);
  };