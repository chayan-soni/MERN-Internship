import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import '../styles/ProductCard.css';

export const ProductCard = ({ product }) => {
  const { deleteProduct } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(product);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditData(product);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product._id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="product-card editing">
        <input
          type="text"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          placeholder="Product Name"
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          placeholder="Description"
        ></textarea>
        <input
          type="number"
          value={editData.price}
          onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })}
          placeholder="Price"
        />
        <select
          value={editData.category}
          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
          <option value="Sports">Sports</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          value={editData.stock}
          onChange={(e) => setEditData({ ...editData, stock: parseInt(e.target.value) })}
          placeholder="Stock"
        />
        <div className="card-actions">
          <button onClick={handleCancel} className="btn-cancel">Cancel</button>
          <button onClick={handleCancel} className="btn-save">Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="product-meta">
          <span className="category">{product.category}</span>
          <span className="sku">SKU: {product.sku}</span>
        </div>
        <div className="product-footer">
          <div>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              Stock: {product.stock}
            </p>
          </div>
          <div className="card-actions">
            <button onClick={handleEdit} className="btn-edit">Edit</button>
            <button onClick={handleDelete} className="btn-delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
