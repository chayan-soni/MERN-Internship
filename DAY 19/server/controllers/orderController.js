const Order = require('../models/Order');
const {
  normalizeOrderItems,
  calculateOrderTotals,
  decrementStock,
  incrementStock
} = require('../utils/orderHelpers');

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

    const normalizedItems = await normalizeOrderItems(orderItems);
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculateOrderTotals(normalizedItems);

    const order = await Order.create({
      user: req.user._id,
      orderItems: normalizedItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      status: 'Placed',
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      paymentResult: {
        gateway: paymentMethod === 'Cash on Delivery' ? 'Offline' : paymentMethod,
        status: paymentMethod === 'Cash on Delivery' ? 'created' : 'paid',
        message:
          paymentMethod === 'Cash on Delivery'
            ? 'Payment will be collected on delivery.'
            : 'Order was created from the direct order API.'
      },
      paidAt: paymentMethod === 'Cash on Delivery' ? undefined : new Date()
    });

    await decrementStock(normalizedItems);

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

    if (order.status !== 'Placed') {
      res.status(400);
      throw new Error('Only successfully placed orders can be cancelled');
    }

    order.status = 'Cancelled';
    order.paymentResult = {
      ...order.paymentResult,
      status: 'cancelled',
      message: 'Order cancelled by user.'
    };
    order.cancelledAt = new Date();
    await order.save();

    await incrementStock(order.orderItems);

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
