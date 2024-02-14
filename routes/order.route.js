const express = require("express");
const {
  saveOrder,
  updateOrder,
  deleteAllOrder,
  getAllOrder,
  getAUserOrder,
  getIncome,
  getOrderById,
  deleteOrder,
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
router.put("/:id",verifyToken, updateOrder);

// //all DELETE
router.delete("/",verifyToken, deleteAllOrder);

router.delete("/:id",verifyToken, deleteOrder);

// //GET order by user
router.get("/:userId", verifyToken, getAUserOrder);
//get order by order id
router.get("/single/:id", getOrderById);

// //GET ALL
router.get("/", verifyToken, verifyAdmin, getAllOrder);

module.exports = router;
