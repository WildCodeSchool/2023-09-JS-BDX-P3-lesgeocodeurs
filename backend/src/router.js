const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/users", userControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);
router.get("/users/:id", userControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
router.post("/users", userControllers.add);

// Route to delete a specific user by id
router.delete("/users/:id", userControllers.destroy);

// Route to update a user by id
router.put("/users", userControllers.edit);

/* ************************************************************************* */

module.exports = router;
