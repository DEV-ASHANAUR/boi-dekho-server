const Wishlist = require("../models/Wishlist");

//create information
exports.saveWishlist = async (req, res, next) => {
    const { userId, bookId } = req.body;
    try {
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId, bookId: [] });
        }

        wishlist.bookId.push(bookId);

        const savedWishlist = await wishlist.save();

        res.status(200).json(savedWishlist);
    } catch (error) {
        next(error);
    }
};

//delete information
exports.deleteWishlist = async (req, res, next) => {
    const id = req.params.id;
    const { userId } = req.body;
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
