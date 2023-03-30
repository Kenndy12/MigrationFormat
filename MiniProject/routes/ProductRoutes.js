const express = require("express");
const router = express.Router();
const ProductController = require("../controller/ProductController");

router.get("/list", ProductController.listProduct);
router.post("/create", ProductController.createProduct);
module.exports = router;
