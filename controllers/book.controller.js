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

//get all information
exports.getAllBook = async (req, res, next) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qAuthor = req.query.author;
    try {
        let books;

        if (qNew) {
            books = await Book.find().sort({ createdAt: -1 }).limit(2);
        } else if (qCategory) {
            books = await Book.find({ categories: { $in: [qCategory] } });
        } else if (qAuthor) {
            books = await Book.find({ authors: { $in: [qAuthor] } });
        } else {
            books = await Book.find();
        }
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};
