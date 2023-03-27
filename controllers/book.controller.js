const Book = require("../models/Book");

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
        res.status(200).json(book);
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
exports.getAllBook = async (req, res, next) => {
    // const category = Array.isArray(req.query.categories) ? req.query.categories : [req.query.categories];
    // const subcategory = Array.isArray(req.query.subCategories) ? req.query.subCategories : [req.query.subCategories];

    // console.log("catagories",categories);
    // console.log("sub catagories",subcategories);
    try {
        let filters = { ...req.query };
        const excludeFields = ["sort", "page", "limit","search"];
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
            const category = req.query.categories.split(',');
            const subcategory = req.query.subCategories.split(',');
            filters.categories = { $in: category };
            filters.subCategories = { $in: subcategory };
            // filters.categories = category;
        } else if (req.query.categories) {
            const category = req.query.categories.split(',');
            filters.categories = { $in: category };
        } else if (req.query.subCategories) {
            const subcategory = req.query.subCategories.split(',');
            filters.subCategories = { $in: subcategory };
        }

        // console.log("first",req.query.search)
        const {search}=req.query;

        // console.log("filter", search);
        // categories
        // subCategories
        // subcategory: { $in: ["laptops", "tablets"] }
        books = await Book.find(filters).find({"$or": [
            { bookTitle: { '$regex': search || "", '$options': 'i' } },
            { tag: { '$regex': search || "", '$options': 'i' } }
        ]})
            .skip(queries.skip)
            .sort(queries.sortBy)
            .limit(queries.limit)
            .select("");

        const total = await Book.countDocuments(filters)
        const page = Math.ceil(total / queries.limit)
        // return { total, page, books };

        res.status(200).json({ total, page,current:parseInt(current),books });
    } catch (error) {
        next(error);
    }
};
