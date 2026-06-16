const express = require('express');
const {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlistItem,
  clearWishlist
} = require('../controllers/wishlistController');

const router = express.Router();

// Get user's wishlist
router.get('/user/:userId', getUserWishlist);

// Add item to wishlist
router.post('/', addToWishlist);

// Remove item from wishlist
router.delete('/:id', removeFromWishlist);

// Check if item is in wishlist
router.get('/check', checkWishlistItem);

// Clear entire wishlist
router.delete('/user/:userId/clear', clearWishlist);

module.exports = router;
