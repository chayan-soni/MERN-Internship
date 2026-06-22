import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import ProductFormModal from '../../components/admin/ProductFormModal';
import './Admin.css';

const ProductManagement = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page,
        limit: 10,
        ...(search && { search }),
        ...(sort && { sort })
      }).toString();
      
      const data = await apiClient.get(`/products?${query}`);
      // Based on our new controller it returns { products, page, pages, total }
      if (data.products) {
        setProducts(data.products);
        setPages(data.pages);
      } else {
        // Fallback if the controller wasn't properly sending the object
        setProducts(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [page, search, sort, showToast]);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [user, navigate, fetchProducts]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiClient.delete(`/products/${id}`, user.token);
        showToast('Product deleted', 'success');
        fetchProducts();
      } catch (error) {
        showToast(error.message, 'error');
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset to first page on search
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = (wasSaved) => {
    setIsModalOpen(false);
    if (wasSaved) fetchProducts();
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Product Management</h1>
        <div style={{display: 'flex', gap: '1rem'}}>
          <button className="ghost-button" onClick={() => navigate('/admin')}>
            Back to Dashboard
          </button>
          <button className="primary-button" onClick={openAddModal}>
            + Add Product
          </button>
        </div>
      </header>

      <div className="product-controls">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={search}
          onChange={handleSearchChange}
          className="product-search"
        />
        <select value={sort} onChange={handleSortChange} className="product-sort">
          <option value="">Latest</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <div style={{padding: '2rem', textAlign: 'center'}}>Loading products...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id.substring(0, 8)}...</td>
                  <td>{product.name}</td>
                  <td>Rs. {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.countInStock}</td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => openEditModal(product)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center'}}>No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button 
          className="page-btn" 
          disabled={page === 1} 
          onClick={() => setPage(p => p - 1)}
        >
          Previous
        </button>
        <span>Page {page} of {pages}</span>
        <button 
          className="page-btn" 
          disabled={page >= pages} 
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <ProductFormModal 
          product={editingProduct} 
          onClose={handleModalClose} 
          token={user.token}
        />
      )}
    </div>
  );
};

export default ProductManagement;
