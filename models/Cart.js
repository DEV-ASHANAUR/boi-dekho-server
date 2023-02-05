const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        books: {
            quantity: {
                type: Number,
                default: 1,
            },
            id: {
                type: ObjectId,
                ref: "Book",
                required: true,
            },
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
