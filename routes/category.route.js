const express = require("express");
const {
    saveCategory,
    updateCategory,
    deleteCategory,
    getACategory,
    getAllCategory,
} = require("../controllers/category.controller");
const router = express.Router();

//SAVE
router.post("/", saveCategory);

//UPDATE
router.put("/:id", updateCategory);

//DELETE
router.delete("/:id", deleteCategory);

//GET One
router.get("/:id", getACategory);

//GET ALL
router.get("/", getAllCategory);

module.exports = router;
