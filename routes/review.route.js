const express = require("express");
const {
    saveReview,
    updateReview,
    deleteReview,
    getAReview,
    getAllReview,
} = require("../controllers/review.controller");
const router = express.Router();

//SAVE
router.post("/", saveReview);

//UPDATE
router.put("/:id", updateReview);

//DELETE
router.delete("/:id", deleteReview);

//GET One
// router.get("/:id", getReviewByBookId);

//GET ALL
router.get("/", getAllReview);

module.exports = router;
