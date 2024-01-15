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
const chargingpointControllers = require("./controllers/chargingpointControllers");
const reservationControllers = require("./controllers/reservationControllers");
const plugTypesControllers = require("./controllers/plugTypesControllers");
const verifyToken = require("./services/verifyToken");

// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/users", userControllers.browse);
router.get("/vehicle", vehicleControllers.browse);
router.get("/station", stationControllers.browse);
router.get("/chargingpoint", chargingpointControllers.browse);
router.get("/reservation", reservationControllers.browse);
router.get("/plugtypes", plugTypesControllers.browse);
router.get("/userscount", userControllers.usersCount);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);
router.get("/users/:id", userControllers.read);
router.get("/vehicle/:id", vehicleControllers.read);
router.get("/station/:id", stationControllers.read);
router.get("/chargingpoint/:id", chargingpointControllers.read);
router.get("/reservation/:id", reservationControllers.read);
router.get("/vehicle/users/:id", vehicleControllers.getCarByUser);
router.get("/plugtypes/:id", plugTypesControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
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
router.put("/users/:id", userControllers.edit);
router.put("/vehicle/:id", vehicleControllers.edit);
router.put("/station/:id", stationControllers.edit);
router.put("/chargingpoint/:id", chargingpointControllers.edit);
router.put("/reservation/:id", reservationControllers.edit);

// Login route
router.post("/users/login", userControllers.login);

// Route de vérification du token
router.get("/check-auth", verifyToken.verifyToken, (req, res) => {
  // L'utilisateur est authentifié, req.user contient les données du token décodé
  res.status(200).json({ message: "Authentification réussie", user: req.user });
});

/* ************************************************************************* */

module.exports = router;
