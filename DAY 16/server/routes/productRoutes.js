const express = require('express');
const { getProducts, getProductById } = require('../controllers/productController');
const { getProductReviews, addReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/:productId/reviews', getProductReviews);
router.post('/:productId/reviews', protect, addReview);

module.exports = router;
