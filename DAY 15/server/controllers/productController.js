const Product = require('../models/Product');
const seedProducts = require('../data/products');

const getProducts = async (req, res, next) => {
  try {
    let products = await Product.find({}).sort({ createdAt: -1 });

    if (products.length === 0) {
      await Product.insertMany(seedProducts);
      products = await Product.find({}).sort({ createdAt: -1 });
    }

    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts };
