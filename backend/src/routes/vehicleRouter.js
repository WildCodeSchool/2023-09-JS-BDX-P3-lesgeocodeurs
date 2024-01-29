const express = require("express");
const vehicleControllers = require("../controllers/vehicleControllers");

const router = express.Router();

router.get("/", vehicleControllers.browse);
router.get("/count", vehicleControllers.vehicleCount);
router.get("/:id([0-9]+)", vehicleControllers.read);
router.get("/users/:id([0-9]+)", vehicleControllers.getCarByUser);
router.post("/", vehicleControllers.add);
router.delete("/:id([0-9]+)", vehicleControllers.destroy);
router.put("/:id([0-9]+)", vehicleControllers.edit);

module.exports = router;
