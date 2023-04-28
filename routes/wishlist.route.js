const express = require("express");
const {
    saveWishlist,
    deleteWishlist,
} = require("../controllers/wishlist.controller");

const router = express.Router();

//SAVE
router.post("/", saveWishlist);

//DELETE
router.delete("/:id", deleteWishlist);

module.exports = router;
