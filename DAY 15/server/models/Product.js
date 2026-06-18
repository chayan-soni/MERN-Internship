const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x300?text=Product'
    },
    category: {
      type: String,
      required: true
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
