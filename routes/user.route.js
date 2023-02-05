const express = require("express");
const {
    updateUser,
    deleteUser,
    getAllUser,
    getAUser,
    getUserByMonth,
} = require("../controllers/user.controller");
const {
    verifyToken,
    verifyUser,
    verifyAdmin,
} = require("../Utilities/verifyToken");
const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("You are logged in");
});

//verify user
router.get("/checkuser/:id", verifyToken, verifyUser, (req, res, next) => {
    res.send("You are logged in and you can delete your account");
});

//verify admin
router.get("/checkadmin/:id", verifyToken, verifyAdmin, (req, res, next) => {
    res.send("You are logged in and you can delete all account");
});

//UPDATE
router.put("/:id", verifyToken, verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyToken, verifyUser, deleteUser);

//GET One
router.get("/:id", verifyToken, verifyAdmin, getAUser);

//GET ALL
router.get("/", verifyToken, verifyAdmin, getAllUser);

//GET USER by MONTH
router.get("/stats", verifyToken, verifyAdmin, getUserByMonth);

module.exports = router;
