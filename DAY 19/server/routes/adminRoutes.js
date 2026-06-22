const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    
    // Order model uses paymentStatus: 'Paid' based on previous inspection
    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'Paid' } }, 
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
    ]);
    
    // If we want to consider all orders for demo purposes, we can drop the match or use it. Let's use it but fallback to 0.
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
