import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';

const ProductContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api/products';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt:desc'
  });
  const filtersRef = useRef(filters);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // Fetch all products with filters
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filtersRef.current.search) params.append('search', filtersRef.current.search);
      if (filtersRef.current.category) params.append('category', filtersRef.current.category);
      if (filtersRef.current.minPrice) params.append('minPrice', filtersRef.current.minPrice);
      if (filtersRef.current.maxPrice) params.append('maxPrice', filtersRef.current.maxPrice);
      if (filtersRef.current.sort) params.append('sort', filtersRef.current.sort);

      const response = await axios.get(`${API_BASE_URL}?${params}`);
      setProducts(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create product
  const createProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_BASE_URL, productData);
      setProducts(prev => [response.data.data, ...prev]);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update product
  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, productData);
      setProducts(prev => prev.map(p => p._id === id ? response.data.data : p));
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete product
  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: 'createdAt:desc'
    });
  }, []);

  const value = {
    products,
    loading,
    error,
    filters,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    updateFilters,
    clearFilters
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
