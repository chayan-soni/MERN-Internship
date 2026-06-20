const Product = require('../models/Product');
const Review = require('../models/Review');
const { updateProductRatingSummary } = require('../utils/reviewHelpers');

const validateReviewPayload = ({ title, comment, rating }) => {
  if (!title || !title.trim()) {
    throw new Error('Review title is required');
  }

  if (!comment || !comment.trim()) {
    throw new Error('Review comment is required');
  }

  const numericRating = Number(rating);
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    throw new Error('Rating must be an integer between 1 and 5');
  }

  return numericRating;
};

const getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.json({
      product: {
        _id: product._id,
        name: product.name,
        averageRating: product.averageRating,
        numReviews: product.numReviews
      },
      reviews
    });
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const existingReview = await Review.findOne({
      product: req.params.productId,
      user: req.user._id
    });

    if (existingReview) {
      res.status(400);
      throw new Error('You have already reviewed this product');
    }

    const numericRating = validateReviewPayload(req.body);

    const review = await Review.create({
      product: req.params.productId,
      user: req.user._id,
      userName: req.user.name,
      title: req.body.title.trim(),
      comment: req.body.comment.trim(),
      rating: numericRating
    });

    await updateProductRatingSummary(req.params.productId);

    res.status(201).json(review);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(400);
    }
    next(error);
  }
};

const editReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }

    if (review.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You can only edit your own review');
    }

    const numericRating = validateReviewPayload(req.body);

    review.title = req.body.title.trim();
    review.comment = req.body.comment.trim();
    review.rating = numericRating;
    await review.save();

    await updateProductRatingSummary(review.product);

    res.json(review);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(400);
    }
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }

    if (review.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You can only delete your own review');
    }

    const { product } = review;
    await review.deleteOne();
    await updateProductRatingSummary(product);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductReviews,
  addReview,
  editReview,
  deleteReview
};
