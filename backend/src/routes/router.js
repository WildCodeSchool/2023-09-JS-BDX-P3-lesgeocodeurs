const express = require("express");
const userRouter = require("./userRouter");
const vehicleRouter = require("./vehicleRouter");
const stationRouter = require("./stationRouter");
const chargingpointRouter = require("./chargingPointRouter");
const plugtypesRouter = require("./plugtypesRouter");
const reservationRouter = require("./reservationRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/vehicle", vehicleRouter);
router.use("/station", stationRouter);
router.use("/chargingpoint", chargingpointRouter);
router.use("/plugtypes", plugtypesRouter);
router.use("/reservation", reservationRouter);

module.exports = router;
