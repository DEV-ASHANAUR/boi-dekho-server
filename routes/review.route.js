const express = require("express");
const {
    saveReview,
    updateReview,
    deleteReview,
    getAllReview,
    getReviewByBookId,
} = require("../controllers/review.controller");
const { verifyToken, verifyAdmin } = require("../Utilities/verifyToken");
const router = express.Router();

//SAVE
router.post("/", saveReview);

//UPDATE
router.put("/:id", updateReview);

//DELETE
router.delete("/:id", deleteReview);

//GET One
router.get("/:bookId", getReviewByBookId);

//GET ALL
router.get("/", getAllReview);

module.exports = router;
