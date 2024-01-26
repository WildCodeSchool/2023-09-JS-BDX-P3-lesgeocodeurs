const express = require("express");
const vehicleControllers = require("../controllers/vehicleControllers");

const router = express.Router();

router.get("/", vehicleControllers.browse);
router.get("/count", vehicleControllers.vehicleCount);
router.get("/:id", vehicleControllers.read);
router.get("/users/:id", vehicleControllers.getCarByUser);
router.post("/", vehicleControllers.add);
router.delete("/:id", vehicleControllers.destroy);
router.put("/:id", vehicleControllers.edit);

module.exports = router;
