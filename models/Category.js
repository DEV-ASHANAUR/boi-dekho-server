const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
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
                type: ObjectId,
                ref: "SubCategory",
            },
        ],
    },
    { timestamps: true }
);
module.exports = mongoose.model("Category", CategorySchema);
