const Review = require("../models/Review");
const { ObjectId } = require("mongodb");
//create information
exports.saveReview = async (req, res, next) => {
    const newReview = new Review(req.body);
    try {
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    } catch (error) {
        next(error);
    }
};

//update information
exports.updateReview = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedReview);
    } catch (error) {
        next(error);
    }
};

//delete information
exports.deleteReview = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Review.findByIdAndDelete({ _id: id });
        res.status(200).json({ msg: "Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

//get all information
exports.getAllReview = async (req, res, next) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
};

// get review by matching book id
exports.getReviewByBookId = async (req, res, next) => {
    const id = req.params.bookId;
    try {
        const reviews = await Review.find({ bookId: id }).populate("user.id", [
            "username",
            "email",
            "avater",
        ]);
        let sum = 0;
        let count = 0;
        reviews.forEach((review) => {
            sum += parseFloat(review.rating);
            count++;
        });
        const averageRating = (sum / count).toFixed(1);

        res.status(200).json({ reviews, averageRating,count });
    } catch (error) {
        next(error);
    }
};
