const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderItems: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: 'Order must contain at least one item'
      }
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['Cash on Delivery', 'UPI', 'Card', 'Razorpay Demo']
    },
    itemsPrice: {
      type: Number,
      required: true
    },
    taxPrice: {
      type: Number,
      required: true
    },
    shippingPrice: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending Payment', 'Placed', 'Payment Failed', 'Cancelled'],
      default: 'Pending Payment'
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending'
    },
    paymentResult: {
      gateway: {
        type: String,
        default: 'Razorpay Demo'
      },
      gatewayOrderId: String,
      gatewayPaymentId: String,
      signature: String,
      status: {
        type: String,
        enum: ['created', 'paid', 'failed', 'cancelled'],
        default: 'created'
      },
      message: String
    },
    paidAt: Date,
    failedAt: Date,
    cancelledAt: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
