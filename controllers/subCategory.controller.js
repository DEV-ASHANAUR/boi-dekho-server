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
        try {
            const updatedCategory = await Category.findOneAndUpdate(
                filter,
                { $push: { subCategories: subCategory } },
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
    const { subCategory } = req.body;
    // const filter = { category: category };
    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            id,
            { $set: { subCategory: subCategory } },
            { new: true }
        );
        // try {
        //     const updatedCategory = await Category.findOneAndUpdate(
        //         filter,
        //         { $set: { "subCategories.$": subCategory } },
        //         { new: true }
        //     );
        //     console.log(updatedCategory);
        // } catch (error) {
        //     next(error);
        // }
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        next(error);
    }
};

//delete information
exports.deleteSubCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        await SubCategory.findByIdAndDelete({ _id: id });

        res.status(200).json({
            msg: "Deleted Successfully",
        });
    } catch (error) {
        next(error);
    }
};

//get all information
exports.getAllSubCategory = async (req, res, next) => {
    try {
        const categories = await SubCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

//get a information
exports.getASubCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        const category = await SubCategory.findById(id);
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};
