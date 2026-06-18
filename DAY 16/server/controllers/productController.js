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

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById };
