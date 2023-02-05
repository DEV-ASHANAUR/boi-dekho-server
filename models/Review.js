const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ReviewSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        bookId: {
            type: ObjectId,
            ref: "Book",
        },
        reviewText: {
            type: String,
            required: [true, "Please give your feedback"],
            trim: true,
        },
        rating: {
            type: String,
            required: [true, "Please rate this books"],
            trim: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Review", ReviewSchema);
