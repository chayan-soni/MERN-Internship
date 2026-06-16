import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api/wishlist';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId] = useState('user-' + Math.random().toString(36).substr(2, 9));
  const toast = useToast();
  const userIdRef = useRef(userId);

  useEffect(() => {
    userIdRef.current = userId;
    fetchWishlist();
  }, [userId]);

  // Fetch all wishlist items for the user
  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userIdRef.current}`);
      setWishlist(response.data.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error fetching wishlist';
      setError(errorMsg);
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add item to wishlist
  const addToWishlist = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_BASE_URL, {
        userId: userIdRef.current,
        ...productData
      });
      setWishlist(prev => [response.data.data, ...prev]);
      toast.success(response.data.message);
      return response.data.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error adding item to wishlist';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Remove item from wishlist
  const removeFromWishlist = useCallback(async (itemId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${API_BASE_URL}/${itemId}`);
      setWishlist(prev => prev.filter(item => item._id !== itemId));
      toast.success(response.data.message);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error removing item from wishlist';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Check if item is in wishlist
  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.productId === productId);
  }, [wishlist]);

  // Get wishlist item ID by product ID
  const getWishlistItemId = useCallback((productId) => {
    const item = wishlist.find(item => item.productId === productId);
    return item?._id;
  }, [wishlist]);

  // Clear entire wishlist
  const clearWishlist = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/${userIdRef.current}/clear`);
      setWishlist([]);
      toast.success(response.data.message);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error clearing wishlist';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const value = {
    wishlist,
    loading,
    error,
    userId,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistItemId,
    clearWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
