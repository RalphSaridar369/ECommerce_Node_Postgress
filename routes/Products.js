const express = require('express');
const router = express.Router();
const {
     createProduct,
     updateProduct,
     getAllProducts,
     getProduct,
     deleteProduct
} = require('../controllers/Products');

router.get("/",getAllProducts);
router.get("/:id",getProduct);
router.post("/",createProduct);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);

module.exports = router