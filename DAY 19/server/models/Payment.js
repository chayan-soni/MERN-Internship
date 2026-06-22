const mongoose = require('mongoose');

const paymentTimelineSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    gateway: {
      type: String,
      default: 'Razorpay Demo'
    },
    gatewayOrderId: {
      type: String,
      required: true,
      unique: true
    },
    gatewayPaymentId: String,
    signature: String,
    receipt: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    method: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['created', 'processing', 'paid', 'failed', 'cancelled'],
      default: 'created'
    },
    verifiedAt: Date,
    failureReason: String,
    timeline: {
      type: [paymentTimelineSchema],
      default: () => [
        {
          status: 'created',
          message: 'Payment order created and awaiting verification.'
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
