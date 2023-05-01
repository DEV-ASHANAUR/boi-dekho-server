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

//GET USER by MONTH
router.get("/stats", verifyToken, verifyAdmin, getUserByMonth);

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", verifyToken, verifyUser, deleteUser);

//GET One
router.get("/:id", getAUser);

//GET ALL
router.get("/", verifyToken, verifyAdmin, getAllUser);

module.exports = router;
