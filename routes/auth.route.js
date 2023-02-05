const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const router = express.Router();

//CREATE
router.post("/register", register);

//login
router.post("/login", login);

module.exports = router;
