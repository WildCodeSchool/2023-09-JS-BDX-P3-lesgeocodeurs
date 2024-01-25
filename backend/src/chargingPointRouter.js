const express = require("express");

const router = express.Router();

const chargingpointControllers = require("./controllers/chargingpointControllers");

router.get("/chargingpoint/:id", chargingpointControllers.read);
router.get("/chargingpoint", chargingpointControllers.browse);
router.get("/chargingpointcount", chargingpointControllers.chargingpointCount);

router.post("/chargingpoint", chargingpointControllers.add);

router.put("/chargingpoint/:id", chargingpointControllers.edit);

router.delete("/chargingpoint/:id", chargingpointControllers.destroy);

module.exports = router;
