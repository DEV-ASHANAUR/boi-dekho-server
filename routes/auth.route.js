const express = require("express");
const { register, login, googleProvider, changePassword } = require("../controllers/auth.controller");
const { verifyToken } = require("../Utilities/verifyToken");
const router = express.Router();

//CREATE
router.post("/register", register);


//CREATE
router.post("/change-password/:id", changePassword);

//login
router.post("/login", login);

//login with google
router.post("/google", googleProvider);

module.exports = router;
