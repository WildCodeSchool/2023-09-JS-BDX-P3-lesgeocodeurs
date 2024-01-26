const express = require("express");
const reservationControllers = require("../controllers/reservationControllers");

const router = express.Router();

router.get("/", reservationControllers.browse);
router.get("/users/:id([0-9]+)", reservationControllers.getReservationByUser);
router.post("/", reservationControllers.add);
router.put("/cancel/:id([0-9]+)", reservationControllers.cancel);

module.exports = router;
