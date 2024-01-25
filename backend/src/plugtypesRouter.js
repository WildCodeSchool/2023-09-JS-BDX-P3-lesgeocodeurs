const express = require("express");

const router = express.Router();

const plugTypesControllers = require("./controllers/plugTypesControllers");

router.get("/plugtypes", plugTypesControllers.browse);
router.get("/plugtypes/:id", plugTypesControllers.read);

module.exports = router;
