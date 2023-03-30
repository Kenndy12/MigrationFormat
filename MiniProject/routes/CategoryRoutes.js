const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/CategoryController");
const verifyToken = require("../middleware/verifyToken");

router.get("/list", verifyToken, CategoryController.listCategory);
router.post("/create", verifyToken, CategoryController.createCategory);
module.exports = router;
