const express = require("express");
const {
    getADemo,
    saveDemo,
    updateDemo,
    deleteDemo,
    getAllDemo,
    fileUpload,
} = require("../controllers/demo.controller");
const { verifyToken, verifyAdmin } = require("../Utilities/verifyToken");
const router = express.Router();

//=============FILE UPLOAD START=========================//
const uploader = require("../Utilities/uploder");

router.post("/file-upload", uploader.single("image"), fileUpload);

//=============FILE UPLOAD END=========================//

//CREATE
router.post("/", verifyToken, verifyAdmin, saveDemo);

//UPDATE
router.put("/:id", verifyToken, verifyAdmin, updateDemo);

//DELETE
router.delete("/:id", verifyToken, verifyAdmin, deleteDemo);

//GET One
router.get("/:id", getADemo);

//GET ALL
router.get("/", getAllDemo);

module.exports = router;
