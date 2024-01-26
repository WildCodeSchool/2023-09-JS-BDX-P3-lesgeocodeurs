const express = require("express");
const stationControllers = require("../controllers/stationControllers");

const router = express.Router();

router.get("/", stationControllers.browse);
router.get("/:id([0-9]+)", stationControllers.read);
router.post("/bounds", stationControllers.getByBounds);
router.post("/clusters", stationControllers.getClusters);

module.exports = router;
