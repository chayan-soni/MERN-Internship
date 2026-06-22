const express = require('express');
const { editReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/:id', protect, editReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
