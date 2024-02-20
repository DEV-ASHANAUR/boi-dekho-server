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
  monthlySalesReport,
} = require("../controllers/order.controller");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
} = require("../Utilities/verifyToken");
const router = express.Router();


router.get("/month-wise-sale-report", monthlySalesReport);

// //GET monthly Income
router.get("/income", getIncome);
// //SAVE
router.post("/", saveOrder);

// //UPDATE
router.put("/:id", updateOrder);

// //all DELETE
router.delete("/", deleteAllOrder);

router.delete("/:id", deleteOrder);

// //GET order by user
router.get("/:userId",  getAUserOrder);
//get order by order id
router.get("/single/:id", getOrderById);
//get month wise salw report

// //GET ALL
router.get("/", getAllOrder);

module.exports = router;
