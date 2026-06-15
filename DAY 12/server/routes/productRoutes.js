const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
} = require('../controllers/productController');

const router = express.Router();

// Search and filter products
router.get('/', getAllProducts);

// Get products by category
router.get('/category/:category', getProductsByCategory);

// Get single product
router.get('/:id', getProductById);

// Create product
router.post('/', createProduct);

// Update product
router.put('/:id', updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

module.exports = router;
