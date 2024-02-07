const Category = require("../models/Category");

//create information
exports.saveCategory = async (req, res, next) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

//update information
exports.updateCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

//delete information
exports.deleteCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Category.findByIdAndDelete({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//get all information
exports.getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

//get a information
exports.getACategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
