const Wishlist = require('../models/Wishlist');

// Get all wishlist items for a user
exports.getUserWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const wishlistItems = await Wishlist.find({ userId }).sort({ addedAt: -1 });

    res.status(200).json({
      success: true,
      count: wishlistItems.length,
      data: wishlistItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching wishlist',
      error: error.message
    });
  }
};

// Add item to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { userId, productId, productName, productPrice, productImage, productCategory } = req.body;

    if (!userId || !productId || !productName || productPrice === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if item already exists in wishlist
    const existingItem = await Wishlist.findOne({ userId, productId });
    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'Item already exists in wishlist'
      });
    }

    const wishlistItem = new Wishlist({
      userId,
      productId,
      productName,
      productPrice,
      productImage: productImage || 'https://via.placeholder.com/300',
      productCategory: productCategory || 'Other'
    });

    await wishlistItem.save();

    res.status(201).json({
      success: true,
      message: 'Item added to wishlist successfully',
      data: wishlistItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding item to wishlist',
      error: error.message
    });
  }
};

// Remove item from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const wishlistItem = await Wishlist.findByIdAndDelete(id);

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item removed from wishlist successfully',
      data: wishlistItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing item from wishlist',
      error: error.message
    });
  }
};

// Check if item is in wishlist
exports.checkWishlistItem = async (req, res) => {
  try {
    const { userId, productId } = req.query;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and Product ID are required'
      });
    }

    const item = await Wishlist.findOne({ userId, productId });

    res.status(200).json({
      success: true,
      isInWishlist: !!item,
      itemId: item?._id || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking wishlist item',
      error: error.message
    });
  }
};

// Clear entire wishlist for a user
exports.clearWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const result = await Wishlist.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: 'Wishlist cleared successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing wishlist',
      error: error.message
    });
  }
};
