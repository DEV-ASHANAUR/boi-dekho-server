const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const WishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        bookId: [
            {
                type: ObjectId,
                ref: "Book",
            },
        ],
    },
    { timestamps: true }
);
module.exports = mongoose.model("Wishlist", WishlistSchema);
