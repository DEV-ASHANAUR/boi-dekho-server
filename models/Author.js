const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: [true, "Please provide author name"],
            trim: true,
            unique: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Author", AuthorSchema);
