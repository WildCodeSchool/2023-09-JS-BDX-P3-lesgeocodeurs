const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
const vehicleControllers = require("./controllers/vehicleControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/users", userControllers.browse);
router.get("/vehicle", vehicleControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);
router.get("/users/:id", userControllers.read);
router.get("/vehicle/:id", vehicleControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
router.post("/users", userControllers.add);
router.post("/vehicle", vehicleControllers.add);

router.delete("/vehicle/:id", vehicleControllers.deleteVehicle);

/* ************************************************************************* */

module.exports = router;
