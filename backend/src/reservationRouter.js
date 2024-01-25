const express = require("express");

const router = express.Router();

const reservationControllers = require("./controllers/reservationControllers");

router.get("/reservation", reservationControllers.browse);
router.get(
  "/reservation/users/:id",
  reservationControllers.getReservationByUser
);

router.post("/reservation", reservationControllers.add);

router.put("/reservation/cancel/:id", reservationControllers.cancel);

module.exports = router;
