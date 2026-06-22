import { useState, useEffect } from 'react';
import { apiClient } from '../../api/apiClient';
import { useToast } from '../../context/ToastContext';

const ProductFormModal = ({ product, onClose, token }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
    countInStock: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || 0,
        description: product.description || '',
        image: product.image || '',
        category: product.category || '',
        countInStock: product.countInStock || 0
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (product) {
        await apiClient.put(`/products/${product._id}`, formData, token);
        showToast('Product updated successfully', 'success');
      } else {
        await apiClient.post('/products', formData, token);
        showToast('Product created successfully', 'success');
      }
      onClose(true);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price (Rs.)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Count In Stock</label>
            <input type="number" name="countInStock" value={formData.countInStock} onChange={handleChange} required min="0" />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="3"></textarea>
          </div>
          <div className="modal-actions">
            <button type="button" className="ghost-button" onClick={() => onClose(false)} disabled={saving}>Cancel</button>
            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
