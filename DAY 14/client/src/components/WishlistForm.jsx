import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import '../styles/WishlistForm.css';

export const WishlistForm = ({ onSuccess }) => {
  const { addToWishlist } = useWishlist();
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    productPrice: '',
    productImage: '',
    productCategory: 'Other'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addToWishlist({
        productId: formData.productId,
        productName: formData.productName,
        productPrice: parseFloat(formData.productPrice),
        productImage: formData.productImage,
        productCategory: formData.productCategory
      });

      setFormData({
        productId: '',
        productName: '',
        productPrice: '',
        productImage: '',
        productCategory: 'Other'
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="wishlist-form" onSubmit={handleSubmit}>
      <h2>Add Item to Wishlist</h2>

      <div className="form-group">
        <label htmlFor="productId">Product ID *</label>
        <input
          type="text"
          id="productId"
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          placeholder="Enter product ID"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="productName">Product Name *</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="productPrice">Price *</label>
        <input
          type="number"
          id="productPrice"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
          placeholder="Enter price"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="productImage">Image URL</label>
        <input
          type="url"
          id="productImage"
          name="productImage"
          value={formData.productImage}
          onChange={handleChange}
          placeholder="Enter image URL"
        />
      </div>

      <div className="form-group">
        <label htmlFor="productCategory">Category</label>
        <select
          id="productCategory"
          name="productCategory"
          value={formData.productCategory}
          onChange={handleChange}
        >
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
          <option value="Sports">Sports</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add to Wishlist'}
      </button>
    </form>
  );
};
