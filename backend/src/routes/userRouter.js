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
router.get("/:id", verifyToken.verifyToken, userControllers.read);
router.get("/count", userControllers.usersCount);
router.get(
  "/isadmin",
  verifyToken.verifyAdminToken,
  verifyToken.validateAdminToken
);
router.post("/", userControllers.add);
router.post("/emailToCheck", userControllers.checkEmail);
router.post("/login", userControllers.login);
router.put("/:id", verifyToken.verifyToken, userControllers.edit);
router.delete("/:id", verifyToken.verifyToken, userControllers.destroy);

module.exports = router;
