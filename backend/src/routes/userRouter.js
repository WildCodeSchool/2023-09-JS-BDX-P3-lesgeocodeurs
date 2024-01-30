const express = require("express");
const userControllers = require("../controllers/userControllers");
const verifyToken = require("../services/verifyToken");

const router = express.Router();

router.get(
  "/",
  verifyToken.verifyToken,
  verifyToken.verifyAdminToken,
  userControllers.browse
);
router.get("/:id([0-9]+)", verifyToken.verifyToken, userControllers.read);
router.get("/count", userControllers.usersCount);
router.get(
  "/isadmin",
  verifyToken.verifyAdminToken,
  verifyToken.validateAdminToken
);
router.post("/register", userControllers.add);
router.post("/emailToCheck", userControllers.checkEmail);
router.post("/login", userControllers.login);
router.put("/:id([0-9]+)", verifyToken.verifyToken, userControllers.edit);
router.delete("/:id([0-9]+)", verifyToken.verifyToken, userControllers.destroy);

module.exports = router;
