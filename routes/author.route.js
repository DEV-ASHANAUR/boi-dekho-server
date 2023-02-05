const express = require("express");
const {
    saveAuthor,
    updateAuthor,
    deleteAuthor,
    getAAuthor,
    getAllAuthor,
} = require("../controllers/author.controller");
const router = express.Router();

//SAVE
router.post("/", saveAuthor);

//UPDATE
router.put("/:id", updateAuthor);

//DELETE
router.delete("/:id", deleteAuthor);

//GET One
router.get("/:id", getAAuthor);

//GET ALL
router.get("/", getAllAuthor);

module.exports = router;
