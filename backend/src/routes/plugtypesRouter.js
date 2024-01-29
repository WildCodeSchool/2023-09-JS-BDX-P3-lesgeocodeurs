const express = require("express");
const plugTypesControllers = require("../controllers/plugTypesControllers");

const router = express.Router();

router.get("/", plugTypesControllers.browse);
router.get("/:id([0-9]+)", plugTypesControllers.read);

module.exports = router;
