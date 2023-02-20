const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: [true, "Please provide category name"],
            trim: true,
            unique: true,
        },
        subCategories: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true }
);
module.exports = mongoose.model("Category", CategorySchema);
