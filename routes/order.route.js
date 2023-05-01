const express = require("express");
const {
    saveOrder,
    updateOrder,
    deleteOrder,
    getAllOrder,
    getAUserOrder,
    getIncome,
    getOrderById,
} = require("../controllers/order.controller");
const {
    verifyToken,
    verifyAdmin,
    verifyUser,
} = require("../Utilities/verifyToken");
const router = express.Router();

// //GET monthly Income
router.get("/income", verifyToken, verifyAdmin, getIncome);
// //SAVE
router.post("/", saveOrder);


// //UPDATE
// router.put("/:id", verifyToken, verifyAdmin, updateOrder);

// //DELETE
// router.delete("/:id", verifyToken, verifyAdmin, deleteOrder);

// //GET order by user
router.get("/:userId", getAUserOrder);
//get order by order id
router.get("/single/:id",getOrderById);

// //GET ALL
router.get("/", verifyToken, verifyAdmin, getAllOrder);

module.exports = router;
