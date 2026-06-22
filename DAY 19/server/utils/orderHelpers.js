const Product = require('../models/Product');

const roundCurrency = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

const mapProductsById = (products) =>
  new Map(products.map((product) => [product._id.toString(), product]));

const normalizeOrderItems = async (orderItems) => {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error('Order items are required');
  }

  const productIds = orderItems.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds } });
  const productMap = mapProductsById(products);

  return orderItems.map((item) => {
    const matchedProduct = productMap.get(item.product);

    if (!matchedProduct) {
      throw new Error(`Product not found: ${item.product}`);
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      throw new Error(`Invalid quantity for product: ${matchedProduct.name}`);
    }

    if (item.quantity > matchedProduct.countInStock) {
      throw new Error(`Insufficient stock for product: ${matchedProduct.name}`);
    }

    return {
      product: matchedProduct._id,
      name: matchedProduct.name,
      image: matchedProduct.image,
      price: matchedProduct.price,
      quantity: item.quantity
    };
  });
};

const calculateOrderTotals = (normalizedItems) => {
  const itemsPrice = roundCurrency(
    normalizedItems.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  const shippingPrice = itemsPrice >= 1000 ? 0 : 99;
  const taxPrice = roundCurrency(itemsPrice * 0.18);
  const totalPrice = roundCurrency(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  };
};

const decrementStock = async (orderItems) =>
  Promise.all(
    orderItems.map((item) =>
      Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: -item.quantity }
      })
    )
  );

const incrementStock = async (orderItems) =>
  Promise.all(
    orderItems.map((item) =>
      Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: item.quantity }
      })
    )
  );

module.exports = {
  roundCurrency,
  normalizeOrderItems,
  calculateOrderTotals,
  decrementStock,
  incrementStock
};
