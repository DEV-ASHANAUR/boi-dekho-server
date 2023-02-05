const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema(
    {
        publisher: {
            type: String,
            required: [true, "Please provide publisher name"],
            trim: true,
            unique: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Publisher", PublisherSchema);
