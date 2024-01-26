const express = require("express");
const chargingpointControllers = require("../controllers/chargingpointControllers");

const router = express.Router();

router.get("/:id", chargingpointControllers.read);
router.get("/", chargingpointControllers.browse);
router.get("/count", chargingpointControllers.chargingpointCount);

module.exports = router;
