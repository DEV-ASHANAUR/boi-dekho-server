const { createError } = require("../Utilities/error");
const Wishlist = require("../models/Wishlist");

//create information
exports.saveWishlist = async (req, res, next) => {
    const { userId, bookId } = req.body;
    try {
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId, bookId: [] });
        }
        let bookindex = wishlist.bookId.findIndex((item)=>item == bookId);
        // console.log("bookindex",bookindex);
        //if bookid already in list
        if(bookindex >= 0){
            return next(createError(409,"product already exist!"));
        }
        //otherwise
        wishlist.bookId.push(bookId);
        const savedWishlist = await wishlist.save();

        res.status(200).json(savedWishlist);
    } catch (error) {
        next(error);
    }
};
//get information by userId
exports.getWishlistByUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const wishlists = await Wishlist.find({userId}).populate("bookId");
        res.status(200).json(wishlists);
    } catch (error) {
        next(error);
    }
};
//delete information
exports.deleteWishlist = async (req, res, next) => {
    const id = req.params.id;
    const  userId  = req.params.userId;
    const filter = { userId: userId };
    
    try {
        await Wishlist.findOneAndUpdate(
            filter,
            { $pull: { bookId: id } },
            { new: true }
        );
        res.status(200).json({ msg: "Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};
