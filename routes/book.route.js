const express = require("express");
const {
    saveBook,
    updateBook,
    deleteBook,
    getABook,
    getAllBook,
    preOrderBook,
    newArrivalBook,
    getBestOfferBook,
    getIslamicBook,
    getFictionBook,
    getNonFictionBook,
    getChildishBook,
    getTrendingBook,
} = require("../controllers/book.controller");
const { verifyToken, verifyAdmin } = require("../Utilities/verifyToken");
const router = express.Router();

// //SAVE
router.post("/", verifyToken, verifyAdmin, saveBook);

// //UPDATE
router.put("/:id", verifyToken, verifyAdmin, updateBook);

// //DELETE
router.delete("/:id", verifyToken, verifyAdmin, deleteBook);

// // Get new Arrival Book
router.get("/new-arrival", newArrivalBook);

// //TRENDING
router.get("/trending", getTrendingBook);
// // Get Islamic category Book
router.get("/islamic", getIslamicBook);

// // Get Fiction Book
router.get("/fiction", getFictionBook);

// // Get NONFiction Book
router.get("/non-fiction", getNonFictionBook);

// // Get NONFiction Book
router.get("/childish", getChildishBook);

// //Discount
router.get("/best-offer", getBestOfferBook);

// // Get pre Order Book
router.get("/pre-order", preOrderBook);

// //GET One
router.get("/:id", getABook);

// //GET ALL
router.get("/", getAllBook);

module.exports = router;
