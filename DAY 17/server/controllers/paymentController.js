const crypto = require('crypto');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const {
  normalizeOrderItems,
  calculateOrderTotals,
  decrementStock
} = require('../utils/orderHelpers');

const demoKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_demo_key';
const demoKeySecret = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_demo_secret';

const createId = (prefix) => `${prefix}_${crypto.randomBytes(6).toString('hex')}`;

const appendTimeline = (payment, status, message) => {
  payment.timeline.push({ status, message, createdAt: new Date() });
};

const createSignature = (gatewayOrderId, gatewayPaymentId) =>
  crypto
    .createHmac('sha256', demoKeySecret)
    .update(`${gatewayOrderId}|${gatewayPaymentId}`)
    .digest('hex');

const createPaymentOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod = 'Razorpay Demo' } = req.body;

    if (!shippingAddress) {
      res.status(400);
      throw new Error('Shipping address is required');
    }

    const normalizedItems = await normalizeOrderItems(orderItems);
    const totals = calculateOrderTotals(normalizedItems);
    const gatewayOrderId = createId('order');
    const receipt = createId('rcpt');

    const order = await Order.create({
      user: req.user._id,
      orderItems: normalizedItems,
      shippingAddress,
      paymentMethod,
      ...totals,
      status: 'Pending Payment',
      paymentStatus: 'Pending',
      paymentResult: {
        gateway: 'Razorpay Demo',
        gatewayOrderId,
        status: 'created',
        message: 'Payment order created. Awaiting verification.'
      }
    });

    const payment = await Payment.create({
      user: req.user._id,
      order: order._id,
      gateway: 'Razorpay Demo',
      gatewayOrderId,
      receipt,
      amount: totals.totalPrice,
      currency: 'INR',
      method: paymentMethod
    });

    res.status(201).json({
      message: 'Demo Razorpay order created successfully',
      payment: {
        _id: payment._id,
        order: order._id,
        gateway: payment.gateway,
        gatewayOrderId,
        amount: payment.amount,
        amountInPaise: Math.round(payment.amount * 100),
        currency: payment.currency,
        receipt: payment.receipt,
        status: payment.status,
        keyId: demoKeyId,
        timeline: payment.timeline
      },
      order
    });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(400);
    }
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const { paymentId, outcome, failureReason } = req.body;

    if (!paymentId) {
      res.status(400);
      throw new Error('Payment ID is required');
    }

    if (!['success', 'failed'].includes(outcome)) {
      res.status(400);
      throw new Error('Outcome must be either success or failed');
    }

    const payment = await Payment.findById(paymentId).populate('order');

    if (!payment) {
      res.status(404);
      throw new Error('Payment not found');
    }

    if (payment.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You can only verify your own payment');
    }

    if (['paid', 'failed'].includes(payment.status)) {
      res.status(400);
      throw new Error(`Payment is already marked as ${payment.status}`);
    }

    payment.status = 'processing';
    appendTimeline(payment, 'processing', 'Payment verification started.');

    const order = payment.order;

    if (outcome === 'success') {
      const gatewayPaymentId = createId('pay');
      const signature = createSignature(payment.gatewayOrderId, gatewayPaymentId);

      await normalizeOrderItems(
        order.orderItems.map((item) => ({
          product: item.product.toString(),
          quantity: item.quantity
        }))
      );
      await decrementStock(order.orderItems);

      payment.status = 'paid';
      payment.gatewayPaymentId = gatewayPaymentId;
      payment.signature = signature;
      payment.verifiedAt = new Date();
      appendTimeline(payment, 'paid', 'Payment verified successfully.');
      await payment.save();

      order.status = 'Placed';
      order.paymentStatus = 'Paid';
      order.paymentResult = {
        gateway: payment.gateway,
        gatewayOrderId: payment.gatewayOrderId,
        gatewayPaymentId,
        signature,
        status: 'paid',
        message: 'Payment captured successfully in demo mode.'
      };
      order.paidAt = new Date();
      await order.save();

      res.json({
        message: 'Payment verified successfully',
        payment,
        order
      });
      return;
    }

    payment.status = 'failed';
    payment.failureReason = failureReason || 'Payment was declined in demo mode.';
    appendTimeline(payment, 'failed', payment.failureReason);
    await payment.save();

    order.status = 'Payment Failed';
    order.paymentStatus = 'Failed';
    order.failedAt = new Date();
    order.paymentResult = {
      gateway: payment.gateway,
      gatewayOrderId: payment.gatewayOrderId,
      status: 'failed',
      message: payment.failureReason
    };
    await order.save();

    res.json({
      message: 'Payment marked as failed',
      payment,
      order
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentHistory = async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate({
        path: 'order',
        select: 'status paymentStatus totalPrice createdAt shippingAddress paymentResult'
      })
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory
};
