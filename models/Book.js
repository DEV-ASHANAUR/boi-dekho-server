const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide book name"],
            trim: true,
            unique: [true, "title must be unique"],
        },
        tag: [
            {
                type: String,
            },
        ],
        description: {
            type: String,
            required: true,
        },

        coverImage: {
            type: String,
            required: [true, "Must have cover Imagee"],
            validate: [validator.isURL, "Please provide a valid url"],
        },
        preview: {
            type: String,
            required: [true, "Must have short pdf"],
            validate: [validator.isURL, "Please provide a valid url"],
        },
        price: {
            type: Number,
            required: [true, "Must have price"],
            min: [0, "price can't be negative"],
        },
        totalPageCount: {
            type: Number,
            required: [true, "Must have page count"],
            min: [0, "page can't be negative"],
        },
        coverType: {
            type: String,
            required: [true, "Must have a cover type"],
            enum: {
                values: ["Hard-cover", "Soft-cover"],
                message:
                    "coverType value can't be {VALUE}, must be Hard-cover/Soft-cover",
            },
        },
        discount: {
            type: Number,
        },
        preOrder: {
            type: Boolean,
        },
        language: {
            type: String,
            required: [true, "Must have a language"],
        },
        version: {
            type: String,
        },
        quantity: {
            type: Number,
            required: [true, "Must have quantity"],
            min: [0, "quantity can't be negative"],
        },
        publishDate: {
            type: Date,
            required: [true, "Provide publish date"],
            validate: [validator.isDate, "Please provide a valid date"],
        },

        featured: {
            type: Boolean,
            default: false,
        },
        categories: [
            {
                type: String,
                required: [true, "Provide category"],
            },
        ],
        authors: [
            {
                type: String,
                required: [true, "Provide author"],
            },
        ],
        publisher: {
            publisherName: {
                type: String,
                required: [true, "Provide publisher name"],
            },
            id: {
                type: ObjectId,
                ref: "Publisher",
                required: [true, "Provide publisher id"],
            },
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Book", BookSchema);
