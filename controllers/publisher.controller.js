const Publisher = require("../models/Publisher");

//create information
exports.savePublisher = async (req, res, next) => {
    const newPublisher = new Publisher(req.body);
    try {
        const savedPublisher = await newPublisher.save();
        res.status(200).json(savedPublisher);
    } catch (error) {
        next(error);
    }
};

//update information
exports.updatePublisher = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedPublisher = await Publisher.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedPublisher);
    } catch (error) {
        next(error);
    }
};

//delete information
exports.deletePublisher = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Publisher.findByIdAndDelete({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

//get all information
exports.getAllPublisher = async (req, res, next) => {
    try {
        const publishers = await Publisher.find();
        res.status(200).json(publishers);
    } catch (error) {
        next(error);
    }
};

//get a information
exports.getAPublisher = async (req, res, next) => {
    const id = req.params.id;
    try {
        const publishers = await Publisher.findById(id);
        res.status(200).json(publishers);
    } catch (error) {
        next(error);
    }
};
