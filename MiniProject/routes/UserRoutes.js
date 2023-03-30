const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", verifyToken, userController.getProfile);
router.patch("/password", verifyToken, userController.changePassword);
module.exports = router;
