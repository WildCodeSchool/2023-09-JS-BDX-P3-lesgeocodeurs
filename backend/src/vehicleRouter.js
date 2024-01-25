const express = require("express");

const router = express.Router();

const vehicleControllers = require("./controllers/vehicleControllers");

router.get("/vehicle", vehicleControllers.browse);
router.get("/vehiclecount", vehicleControllers.vehicleCount);
router.get("/vehicle/:id", vehicleControllers.read);
router.get("/vehicle/users/:id", vehicleControllers.getCarByUser);

router.post("/vehicle", vehicleControllers.add);

router.delete("/vehicle/:id", vehicleControllers.destroy);

router.put("/vehicle/:id", vehicleControllers.edit);

module.exports = router;
