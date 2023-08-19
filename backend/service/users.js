var express = require("express");
var router = express.Router();
require("dotenv").config();

const UserController = require("../controllers/UserController");
// Get Product List

router.get("/list", UserController.usersList);

// Get Specific Product

router.post("/get/:id", UserController.specificUser);

// Add Product
router.post("/add", UserController.addUser);

// Update Product

router.post("/update/:id", UserController.updateUser);

// Delete Product

router.post("/delete/:id", UserController.deleteUser);

module.exports = router;
