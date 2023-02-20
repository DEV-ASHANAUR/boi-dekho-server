const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
    {
        subCategory: {
            type: String,
            required: [true, "Please provide sub category name"],
            trim: true,
            unique: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("SubCategory", SubCategorySchema);
