const Order = require('../models/Order');
const Product = require('../models/Product');

const roundCurrency = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

const placeOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      res.status(400);
      throw new Error('Order items are required');
    }

    if (!shippingAddress) {
      res.status(400);
      throw new Error('Shipping address is required');
    }

    if (!paymentMethod) {
      res.status(400);
      throw new Error('Payment method is required');
    }

    const productIds = orderItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(products.map((product) => [product._id.toString(), product]));

    const normalizedItems = orderItems.map((item) => {
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

    const itemsPrice = roundCurrency(
      normalizedItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
    const shippingPrice = itemsPrice >= 1000 ? 0 : 99;
    const taxPrice = roundCurrency(itemsPrice * 0.18);
    const totalPrice = roundCurrency(itemsPrice + shippingPrice + taxPrice);

    const order = await Order.create({
      user: req.user._id,
      orderItems: normalizedItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    await Promise.all(
      normalizedItems.map((item) =>
        Product.findByIdAndUpdate(item.product, {
          $inc: { countInStock: -item.quantity }
        })
      )
    );

    res.status(201).json(order);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(400);
    }
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    if (order.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You can only cancel your own orders');
    }

    if (order.status === 'Cancelled') {
      res.status(400);
      throw new Error('Order is already cancelled');
    }

    order.status = 'Cancelled';
    order.cancelledAt = new Date();
    await order.save();

    await Promise.all(
      order.orderItems.map((item) =>
        Product.findByIdAndUpdate(item.product, {
          $inc: { countInStock: item.quantity }
        })
      )
    );

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  cancelOrder
};
