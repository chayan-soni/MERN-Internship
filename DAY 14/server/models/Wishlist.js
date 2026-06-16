const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Please provide a user ID'],
    trim: true
  },
  productId: {
    type: String,
    required: [true, 'Please provide a product ID'],
    trim: true
  },
  productName: {
    type: String,
    required: [true, 'Please provide a product name']
  },
  productPrice: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative']
  },
  productImage: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  productCategory: {
    type: String,
    default: 'Other'
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Compound unique index to ensure one product per user
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
