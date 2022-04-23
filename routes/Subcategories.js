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
const isAdmin = require('../middlewares/isAdmin');

router.get('/',getAllSubcategories);
router.get('/:id',getSubcategory);
router.get('/category/:id',getSubcategoriesByCategory);
router.post('/', isAdmin, createSubcategory);
router.put('/:id', isAdmin, updateSubcategory);
router.delete("/:id", isAdmin, deleteSubcategory)

module.exports = router