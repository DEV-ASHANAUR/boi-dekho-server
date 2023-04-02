const express = require("express");
const { register, login, googleProvider } = require("../controllers/auth.controller");
const router = express.Router();

//CREATE
router.post("/register", register);

//login
router.post("/login", login);

//login with google
router.post("/google", googleProvider);

module.exports = router;
