const express = require('express');
const router = express.Router();
const {
    getAllSubcategories,
    getSubcategory,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory
} = require('../controllers/Subcategories');

router.get('/',getAllSubcategories);
router.get('/:id',getSubcategory);
router.post('/',createSubcategory);
router.put('/:id',updateSubcategory);
router.delete("/:id",deleteSubcategory)

module.exports = router