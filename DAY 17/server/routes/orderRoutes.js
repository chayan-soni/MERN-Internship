const express = require('express');
const { placeOrder, getMyOrders, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/my-orders', protect, getMyOrders);
router.patch('/:id/cancel', protect, cancelOrder);

module.exports = router;
