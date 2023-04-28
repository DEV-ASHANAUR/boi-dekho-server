const express = require("express");
const {
    saveWishlist,
    deleteWishlist,
    getWishlistByUser,
} = require("../controllers/wishlist.controller");

const router = express.Router();

//SAVE
router.post("/", saveWishlist);

//Get wishlist by user
router.get("/:userId", getWishlistByUser);

//DELETE
router.delete("/:id/:userId", deleteWishlist);

module.exports = router;
