const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
const vehicleControllers = require("./controllers/vehicleControllers");
const stationControllers = require("./controllers/stationControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/users", userControllers.browse);
router.get("/vehicle", vehicleControllers.browse);
router.get("/station", stationControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);
router.get("/users/:id", userControllers.read);
router.get("/vehicle/:id", vehicleControllers.read);
router.get("/station/:id", stationControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
router.post("/users", userControllers.add);
router.post("/vehicle", vehicleControllers.add);
router.post("/station", stationControllers.add);

// Route to delete a specific user by id
router.delete("/users/:id", userControllers.destroy);
router.delete("/vehicle/:id", vehicleControllers.destroy);
router.delete("/station/:id", stationControllers.destroy);

// Route to update a user by id
router.put("/users/:id", userControllers.edit);
router.put("/vehicle/:id", vehicleControllers.edit);
router.put("/station/:id", stationControllers.edit);

/* ************************************************************************* */

module.exports = router;
