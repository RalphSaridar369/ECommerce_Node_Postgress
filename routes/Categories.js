const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/Categories')

router.get("/",getAllCategories);
router.get("/:id",getCategory)
router.post("/",createCategory);
router.put("/:id",updateCategory);
router.delete("/:id",deleteCategory);

module.exports = router