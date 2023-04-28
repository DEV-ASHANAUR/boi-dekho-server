const Book = require("../models/Book");
const Review = require("../models/Review");
const mongoose = require("mongoose");
const Wishlist = require("../models/Wishlist");
const ObjectId = mongoose.Types.ObjectId;

//create information
exports.saveBook = async (req, res, next) => {
    const newBook = new Book(req.body);
    try {
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
    } catch (error) {
        next(error);
    }
};

//update information
exports.updateBook = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedBook);
    } catch (error) {
        next(error);
    }
};

//delete information
exports.deleteBook = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Wishlist.updateMany({ bookId: id }, { $pull: { bookId: id } });
        await Wishlist.deleteMany({ bookId: { $size: 0 } });

        await Book.findByIdAndDelete({ _id: id });

        res.status(200).json({ msg: "Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

//get a information
exports.getABook = async (req, res, next) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        try {
            const reviews = await Review.find({ bookId: id });
            let sum = 0;
            let count = 0;
            reviews.forEach((review) => {
                sum += parseFloat(review.rating);
                count++;
            });
            const averageRating = (sum / count).toFixed(1);

            res.status(200).json({ book, averageRating, count });
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

// Book fetch for Trending or best sell or featured
exports.getTrendingBook = async (req, res, next) => {
    const qalltrendingbooks = req.query.alltrendingbooks;
    try {
        let trendingBooks;
        if (qalltrendingbooks) {
            trendingBooks = await Book.find({
                featured: true,
            }).sort({ createdAt: -1 });
        } else {
            trendingBooks = await Book.find({
                featured: true,
            })
                .sort({ createdAt: -1 })
                .limit(6);
        }
        res.status(200).json(trendingBooks);
    } catch (error) {
        next(error);
    }
};

// Book fetch for new arrival
exports.newArrivalBook = async (req, res, next) => {
    const qallnewbooks = req.query.allnewbooks;
    try {
        let newBooks;
        if (qallnewbooks) {
            newBooks = await Book.find().sort({ createdAt: -1 });
        } else {
            newBooks = await Book.find().sort({ createdAt: -1 }).limit(6);
        }
        res.status(200).json(newBooks);
    } catch (error) {
        next(error);
    }
};

// Book fetch for Islamic category
exports.getIslamicBook = async (req, res, next) => {
    const qallislamicbooks = req.query.allislamicbooks;
    try {
        let islamicBooks;
        if (qallislamicbooks) {
            islamicBooks = await Book.find({
                categories: { $in: ["Islamic"] },
            }).sort({ createdAt: -1 });
        } else {
            islamicBooks = await Book.find({
                categories: { $in: ["Islamic"] },
            })
                .sort({ createdAt: -1 })
                .limit(6);
        }
        res.status(200).json(islamicBooks);
    } catch (error) {
        next(error);
    }
};

// Book fetch for fiction category
exports.getFictionBook = async (req, res, next) => {
    const qallfictionbooks = req.query.allfictionbooks;
    try {
        let fictionBooks;
        if (qallfictionbooks) {
            fictionBooks = await Book.find({
                categories: { $in: ["Fiction"] },
            }).sort({ createdAt: -1 });
        } else {
            fictionBooks = await Book.find({
                categories: { $in: ["Fiction"] },
            })
                .sort({ createdAt: -1 })
                .limit(6);
        }
        res.status(200).json(fictionBooks);
    } catch (error) {
        next(error);
    }
};
// Book fetch for non fiction category
exports.getNonFictionBook = async (req, res, next) => {
    const qallnonfictionbooks = req.query.allnonfictionbooks;
    try {
        let nonfictionBooks;
        if (qallnonfictionbooks) {
            nonfictionBooks = await Book.find({
                categories: { $in: ["Non-Fiction"] },
            }).sort({ createdAt: -1 });
        } else {
            nonfictionBooks = await Book.find({
                categories: { $in: ["Non-Fiction"] },
            })
                .sort({ createdAt: -1 })
                .limit(6);
        }
        res.status(200).json(nonfictionBooks);
    } catch (error) {
        next(error);
    }
};

// Book fetch for childish category
exports.getChildishBook = async (req, res, next) => {
    const qallchildishbooks = req.query.allchildishbooks;
    try {
        let childishBooks;
        if (qallchildishbooks) {
            childishBooks = await Book.find({
                categories: { $in: ["Childish"] },
            }).sort({ createdAt: -1 });
        } else {
            childishBooks = await Book.find({
                categories: { $in: ["Childish"] },
            })
                .sort({ createdAt: -1 })
                .limit(6);
        }
        res.status(200).json(childishBooks);
    } catch (error) {
        next(error);
    }
};

// Book fetch for best offered books
exports.getBestOfferBook = async (req, res, next) => {
    const qallofferbooks = req.query.allofferbooks;
    try {
        let offeredBooks;
        if (qallofferbooks) {
            offeredBooks = await Book.find().sort({ discount: -1 });
        } else {
            offeredBooks = await Book.find().sort({ discount: -1 }).limit(6);
        }
        res.status(200).json(offeredBooks);
    } catch (error) {
        next(error);
    }
};

// Book fetch for pre-order
exports.preOrderBook = async (req, res, next) => {
    try {
        const preOrderBooks = await Book.find({ preOrder: true }).sort({
            createdAt: -1,
        });
        res.status(200).json(preOrderBooks);
    } catch (error) {
        next(error);
    }
};

//get all information By publisher, shorting , pagenation
// http://localhost:5000/api/v1/boikini/book/?search=childish&categories=Fiction,Non-Fiktion&subcatagories=something,ting&limit=10
exports.getAllBook = async (req, res, next) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ["sort", "page", "limit", "search"];
        excludeFields.forEach((field) => delete filters[field]);
        const queries = {};
        let books;
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            queries.sortBy = sortBy;
        }
        let current = 1;
        if (req.query.page || req.query.limit) {
            const { page = 1, limit = 10 } = req.query;
            current = page;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        if (req.query.categories && req.query.subCategories) {
            const category = req.query.categories.split(",");
            const subcategory = req.query.subCategories.split(",");
            filters.categories = { $in: category };
            filters.subCategories = { $in: subcategory };
            // filters.categories = category;
        } else if (req.query.categories) {
            const category = req.query.categories.split(",");
            filters.categories = { $in: category };
        } else if (req.query.subCategories) {
            const subcategory = req.query.subCategories.split(",");
            filters.subCategories = { $in: subcategory };
        }

        if (req.query.authors) {
            const author = req.query.authors.split(",");
            filters.authors = { $in: author };
        }

        if (req.query.publisher) {
            const publisher = req.query.publisher.split(",");
            filters.publisher = { $in: publisher };
        }

        // console.log("query:",queries.sortBy)

        const { search } = req.query;

        books = await Book.find(filters)
            .find({
                $or: [
                    { bookTitle: { $regex: search || "", $options: "i" } },
                    { tag: { $regex: search || "", $options: "i" } },
                ],
            })
            .skip(queries.skip)
            .sort(queries.sortBy)
            .limit(queries.limit)
            .select("");

        const total = await Book.countDocuments(filters);
        const page = Math.ceil(total / queries.limit);
        res.status(200).json({
            total,
            page,
            current: parseInt(current),
            books,
        });
    } catch (error) {
        next(error);
    }
};

exports.getReletedBook = async (req, res, next) => {
    try {
        const categories = req.query.categories.split(","); // assuming the query parameter is named 'categories' and is a comma-separated list
        const idToExclude = req.query.id_ne; // assuming the query parameter is named 'id_ne'
        const idObjToExclude = new ObjectId(idToExclude);

        const books = await Book.find({
            _id: { $ne: idObjToExclude },
            categories: { $in: categories },
        }).limit(6);
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};
