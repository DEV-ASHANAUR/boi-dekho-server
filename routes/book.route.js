const express = require("express");
const {
    saveBook,
    updateBook,
    deleteBook,
    getABook,
    getAllBook,
} = require("../controllers/book.controller");
const { verifyToken, verifyAdmin } = require("../Utilities/verifyToken");
const router = express.Router();

// //SAVE
router.post("/", verifyToken, verifyAdmin, saveBook);

// //UPDATE
router.put("/:id", verifyToken, verifyAdmin, updateBook);

// //DELETE
router.delete("/:id", verifyToken, verifyAdmin, deleteBook);

// //GET One
router.get("/:id", getABook);

// //GET ALL
router.get("/", getAllBook);

// //New ARRIVLE
// router.get("/booksLatest", getLatestBook);

// //TRENDING
// router.get("/booksTrending", getTrendingBook);

// //Discount
// router.get("/booksDiscount", getDiscountBook);

module.exports = router;
