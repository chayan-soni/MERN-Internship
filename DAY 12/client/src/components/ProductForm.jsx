import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import '../styles/ProductForm.css';

export const ProductForm = ({ onSuccess }) => {
  const { createProduct, loading } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    sku: '',
    image: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.sku) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await createProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0
      });
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        sku: '',
        image: ''
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating product');
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Product Name *</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows="4"
          required
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock Quantity</label>
          <input
            id="stock"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            min="0"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sku">SKU *</label>
          <input
            id="sku"
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="e.g., PROD-001"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? 'Creating...' : 'Add Product'}
      </button>
    </form>
  );
};
