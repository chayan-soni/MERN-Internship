const Product = require('../models/Product');
const seedProducts = require('../data/products');

const getProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const keyword = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: 'i'
          }
        }
      : {};

    const sortOption = {};
    if (req.query.sort) {
      if (req.query.sort === 'priceAsc') sortOption.price = 1;
      else if (req.query.sort === 'priceDesc') sortOption.price = -1;
      else if (req.query.sort === 'rating') sortOption.averageRating = -1;
      else sortOption.createdAt = -1;
    } else {
      sortOption.createdAt = -1;
    }

    const count = await Product.countDocuments({ ...keyword });
    let products = await Product.find({ ...keyword })
      .sort(sortOption)
      .limit(limit)
      .skip(skip);

    if (products.length === 0 && !req.query.search && page === 1) {
      await Product.insertMany(seedProducts);
      products = await Product.find({}).sort({ createdAt: -1 }).limit(limit).skip(skip);
    }

    res.json({ products, page, pages: Math.ceil(count / limit) || 1, total: count });
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

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, category, countInStock } = req.body;
    const product = new Product({
      name, price, description, image, category, countInStock
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.category = category || product.category;
      product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
      
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
