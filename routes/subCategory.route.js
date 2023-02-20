const express = require("express");
const {
    saveSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getASubCategory,
    getAllSubCategory,
} = require("../controllers/subCategory.controller");

const router = express.Router();

//SAVE
router.post("/", saveSubCategory);

//UPDATE
router.put("/:id", updateSubCategory);

//DELETE
router.delete("/:id", deleteSubCategory);

//GET One
router.get("/:id", getASubCategory);

//GET ALL
router.get("/", getAllSubCategory);

module.exports = router;
