const express = require("express");
const {
    saveOrder,
    updateOrder,
    deleteOrder,
    getAllOrder,
    getAUserOrder,
    getIncome,
} = require("../controllers/order.controller");
const {
    verifyToken,
    verifyAdmin,
    verifyUser,
} = require("../Utilities/verifyToken");
const router = express.Router();

// //GET Income
router.get("/income", verifyToken, verifyAdmin, getIncome);
// //SAVE
router.post("/", verifyToken, saveOrder);

// //UPDATE
router.put("/:id", verifyToken, verifyAdmin, updateOrder);

// //DELETE
router.delete("/:id", verifyToken, verifyAdmin, deleteOrder);

// //GET One
router.get("/:userId", verifyToken, verifyUser, getAUserOrder);

// //GET ALL
router.get("/", verifyToken, verifyAdmin, getAllOrder);

module.exports = router;
