const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const vehicleControllers = require("./controllers/vehicleControllers");
const stationControllers = require("./controllers/stationControllers");
const chargingpointControllers = require("./controllers/chargingpointControllers");
const reservationControllers = require("./controllers/reservationControllers");
const plugTypesControllers = require("./controllers/plugTypesControllers");
const verifyToken = require("./services/verifyToken");

// Route to get a list of items
router.get(
  "/users",
  verifyToken.verifyToken,
  verifyToken.verifyAdminToken,
  userControllers.browse
);
router.get("/vehicle", vehicleControllers.browse);
router.get("/station", stationControllers.browse);
router.get("/chargingpoint", chargingpointControllers.browse);
router.get("/reservation", reservationControllers.browse);
router.get("/plugtypes", plugTypesControllers.browse);
router.get("/userscount", userControllers.usersCount);
router.get("/vehiclecount", vehicleControllers.vehicleCount);
router.get("/chargingpointcount", chargingpointControllers.chargingpointCount);

// Route to get a specific item by ID
router.get("/users/:id", verifyToken.verifyToken, userControllers.read);
router.get("/vehicle/:id", vehicleControllers.read);
router.get("/station/:id", stationControllers.read);
router.get("/chargingpoint/:id", chargingpointControllers.read);
router.get("/reservation/:id", reservationControllers.read);
router.get("/vehicle/users/:id", vehicleControllers.getCarByUser);
router.get("/plugtypes/:id", plugTypesControllers.read);
// Route to add a new item
router.post("/users", userControllers.add);
router.post("/vehicle", vehicleControllers.add);
router.post("/station", stationControllers.add);
router.post("/chargingpoint", chargingpointControllers.add);
router.post("/reservation", reservationControllers.add);
router.post("/users/emailToCheck", userControllers.checkEmail);

// Route to delete a specific user by id
router.delete("/users/:id", userControllers.destroy);
router.delete("/vehicle/:id", vehicleControllers.destroy);
router.delete("/station/:id", stationControllers.destroy);
router.delete("/chargingpoint/:id", chargingpointControllers.destroy);
router.delete("/reservation/:id", reservationControllers.destroy);

// Route to update a user by id
router.put("/users/:id", verifyToken.verifyToken, userControllers.edit);
router.put("/vehicle/:id", vehicleControllers.edit);
router.put("/station/:id", stationControllers.edit);
router.put("/chargingpoint/:id", chargingpointControllers.edit);
router.put("/reservation/:id", reservationControllers.edit);

// Login route
router.post("/users/login", userControllers.login);

router.get("/modifprofil/users/:id", userControllers.edit);

/* ************************************************************************* */

module.exports = router;
