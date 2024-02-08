const Author = require("../models/Author");
const { createError } = require("../Utilities/error");

//create information
exports.saveAuthor = async (req, res, next) => {
    const newAuthor = new Author(req.body);
    try {
        const savedAuthor = await newAuthor.save();
        res.status(200).json(savedAuthor);
    } catch (error) {
        next(error);
    }
};

//update information
exports.updateAuthor = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedAuthor);
    } catch (error) {
        next(error);
    }
};

//delete information
exports.deleteAuthor = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Author.findByIdAndDelete({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

//get all information
exports.getAllAuthor = async (req, res, next) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        next(error);
    }
};

//get a information
exports.getAAuthor = async (req, res, next) => {
    const id = req.params.id;
    try {
        const author = await Author.findById(id);
        if (!author) {
            return next(createError(404, "Author does not exist"));
        }
        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
};
