const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

//create information
exports.saveSubCategory = async (req, res, next) => {
    const { category, subCategory } = req.body;
    const filter = { category: category };
    const newSubCategory = new SubCategory({ subCategory: subCategory });

    try {
        const savedSubCategory = await newSubCategory.save({
            subCategory: newSubCategory,
        });

        const subCatId = savedSubCategory._id.toString();
        try {
            await Category.findOneAndUpdate(
                filter,
                { $push: { subCategories: subCatId } },
                { new: true }
            );
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedSubCategory);
    } catch (error) {
        next(error);
    }
};

//update information
exports.updateSubCategory = async (req, res, next) => {
    const id = req.params.id;
    const { subCategory, category } = req.body;
    const filter = { category: category };

    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            id,
            { $set: { subCategory: subCategory } },
            { new: true }
        );
        try {
            await Category.findOneAndUpdate(
                filter,
                { $addToSet: { subCategories: id } },
                { new: true }
            );
        } catch (error) {
            next(error);
        }
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        next(error);
    }
};

//delete information
exports.deleteSubCategory = async (req, res, next) => {
    const id = req.params.id;
    const { category } = req.body;
    const filter = { category: category };

    try {
        await Category.findOneAndUpdate(
            filter,
            { $pull: { subCategories: id } },
            { new: true }
        );
        try {
            await SubCategory.findByIdAndDelete({ _id: id });

            res.status(200).json({
                msg: "Deleted Successfully",
            });
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

//get all information
exports.getAllSubCategory = async (req, res, next) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json(subCategories);
    } catch (error) {
        next(error);
    }
};

//get a information
exports.getASubCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        const subCategory = await SubCategory.findById(id);
        res.status(200).json(subCategory);
    } catch (error) {
        next(error);
    }
};
