const mongoose = require('mongoose');
const Product = require('../models/Product');
const Review = require('../models/Review');

const updateProductRatingSummary = async (productId) => {
  const stats = await Review.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productId.toString())
      }
    },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  const summary = stats[0] || { averageRating: 0, numReviews: 0 };

  await Product.findByIdAndUpdate(productId, {
    averageRating: Number(summary.averageRating ? summary.averageRating.toFixed(1) : 0),
    numReviews: summary.numReviews
  });
};

module.exports = { updateProductRatingSummary };
