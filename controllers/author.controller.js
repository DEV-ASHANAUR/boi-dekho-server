const Author = require("../models/Author");

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
        await Author.findByIdAndDelete({ _id: id });
        res.status(200).json({ msg: "Deleted Successfully" });
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
        const authors = await Author.findById(id);
        res.status(200).json(authors);
    } catch (error) {
        next(error);
    }
};
