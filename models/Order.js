const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "User",
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
        amount: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
