const express = require("express");

const router = express.Router();

const stationControllers = require("./controllers/stationControllers");

router.get("/station", stationControllers.browse);
router.get("/station/:id", stationControllers.read);

router.post("/station", stationControllers.add);

router.delete("/station/:id", stationControllers.destroy);

router.put("/station/:id", stationControllers.edit);

module.exports = router;
