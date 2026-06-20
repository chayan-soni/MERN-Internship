import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  comment: '',
  rating: 5
};

const ProductReviewPanel = ({
  product,
  reviews,
  loading,
  currentUser,
  onAddReview,
  onEditReview,
  onDeleteReview,
  submitting
}) => {
  const [formData, setFormData] = useState(emptyForm);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    setFormData(emptyForm);
    setEditingReviewId(null);
  }, [product?._id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: name === 'rating' ? Number(value) : value
    }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingReviewId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      title: formData.title.trim(),
      comment: formData.comment.trim(),
      rating: Number(formData.rating)
    };

    if (!payload.title || !payload.comment || payload.comment.length < 10) {
      return;
    }

    if (editingReviewId) {
      await onEditReview(editingReviewId, payload);
    } else {
      await onAddReview(payload);
    }

    resetForm();
  };

  const startEdit = (review) => {
    setEditingReviewId(review._id);
    setFormData({
      title: review.title,
      comment: review.comment,
      rating: review.rating
    });
  };

  if (!product) {
    return (
      <section className="panel review-panel">
        <div className="empty-state">Select a product to view and manage reviews.</div>
      </section>
    );
  }

  return (
    <section className="panel review-panel">
      <div className="review-layout">
        <div className="review-summary">
          <div className="panel-header">
            <p className="eyebrow">Ratings & Reviews</p>
            <h2>{product.name}</h2>
            <p>Customers can add, edit, delete, and view reviews for this product.</p>
          </div>

          <div className="rating-overview">
            <div>
              <strong>{Number(product.averageRating || 0).toFixed(1)}</strong>
              <span>average rating</span>
            </div>
            <div>
              <strong>{product.numReviews || 0}</strong>
              <span>total reviews</span>
            </div>
            <div>
              <strong>{product.category}</strong>
              <span>category</span>
            </div>
          </div>

          <form className="review-form" onSubmit={handleSubmit}>
            <label>
              Review title
              <input
                type="text"
                name="title"
                maxLength="80"
                value={formData.title}
                onChange={handleChange}
                placeholder="Summarize your experience"
                required
                disabled={!currentUser || submitting}
              />
            </label>

            <label>
              Rating
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                disabled={!currentUser || submitting}
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} star{rating > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Review comment
              <textarea
                name="comment"
                rows="5"
                maxLength="600"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Describe product quality, comfort, fit, or delivery experience"
                required
                disabled={!currentUser || submitting}
              />
            </label>

            <div className="review-form-actions">
              <button className="primary-button" type="submit" disabled={!currentUser || submitting}>
                {submitting ? 'Saving...' : editingReviewId ? 'Update review' : 'Add review'}
              </button>
              {editingReviewId && (
                <button className="ghost-button" type="button" onClick={resetForm}>
                  Cancel edit
                </button>
              )}
            </div>

            {!currentUser && (
              <p className="form-note">Log in to submit, edit, or delete reviews.</p>
            )}
            {currentUser && formData.comment.trim().length > 0 && formData.comment.trim().length < 10 && (
              <p className="form-note error-note">
                Review comment must be at least 10 characters long.
              </p>
            )}
          </form>
        </div>

        <div className="review-listing">
          {loading ? (
            <div className="empty-state">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="empty-state">No reviews yet. Be the first to review this product.</div>
          ) : (
            <div className="review-list">
              {reviews.map((review) => {
                const isOwnReview = currentUser && review.user === currentUser._id;

                return (
                  <article key={review._id} className="review-card">
                    <div className="review-card-header">
                      <div>
                        <h3>{review.title}</h3>
                        <p>
                          {review.userName} • {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="product-rating">{review.rating.toFixed(1)}</span>
                    </div>

                    <p className="review-comment">{review.comment}</p>

                    {isOwnReview && (
                      <div className="review-card-actions">
                        <button className="ghost-button" type="button" onClick={() => startEdit(review)}>
                          Edit
                        </button>
                        <button
                          className="ghost-button danger-button"
                          type="button"
                          onClick={() => onDeleteReview(review._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReviewPanel;
