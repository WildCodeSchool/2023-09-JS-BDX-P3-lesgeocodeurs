const express = require("express");

const router = express.Router();

// Import itemControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const verifyToken = require("./services/verifyToken");

router.get(
  "/users",
  verifyToken.verifyToken,
  verifyToken.verifyAdminToken,
  userControllers.browse
);
router.get("/users/:id", verifyToken.verifyToken, userControllers.read);
router.get("/userscount", userControllers.usersCount);
router.get("/modifprofil/users/:id", userControllers.edit);

router.post("/users", userControllers.add);
router.post("/users/emailToCheck", userControllers.checkEmail);
router.post("/users/login", userControllers.login);

router.put("/users/:id", verifyToken.verifyToken, userControllers.edit);

router.delete("/users/:id", verifyToken.verifyToken, userControllers.destroy);

module.exports = router;
