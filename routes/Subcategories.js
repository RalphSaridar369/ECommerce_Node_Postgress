const express = require('express');
const router = express.Router();
const {
    getAllSubcategories,
    getSubcategory,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getSubcategoriesByCategory
} = require('../controllers/Subcategories');

router.get('/',getAllSubcategories);
router.get('/:id',getSubcategory);
router.get('/category/:id',getSubcategoriesByCategory);
router.post('/',createSubcategory);
router.put('/:id',updateSubcategory);
router.delete("/:id",deleteSubcategory)

module.exports = router