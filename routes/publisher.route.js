const express = require("express");
const {
    savePublisher,
    updatePublisher,
    deletePublisher,
    getAPublisher,
    getAllPublisher,
} = require("../controllers/publisher.controller");
const router = express.Router();

//SAVE
router.post("/", savePublisher);

//UPDATE
router.put("/:id", updatePublisher);

//DELETE
router.delete("/:id", deletePublisher);

//GET One
router.get("/:id", getAPublisher);

//GET ALL
router.get("/", getAllPublisher);

module.exports = router;
