const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/Categories')
const verifyToken = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.get("/",getAllCategories);
router.get("/:id",getCategory)
router.post("/", verifyToken, isAdmin,createCategory);
router.put("/:id", verifyToken, isAdmin,updateCategory);
router.delete("/:id", verifyToken, isAdmin,deleteCategory);

module.exports = router