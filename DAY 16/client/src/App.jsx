import { useEffect, useMemo, useState } from 'react';
import { apiClient } from './api/apiClient';
import AuthPanel from './components/AuthPanel';
import CartPanel from './components/CartPanel';
import CheckoutPanel from './components/CheckoutPanel';
import OrderHistory from './components/OrderHistory';
import ProductCatalog from './components/ProductCatalog';
import ProductReviewPanel from './components/ProductReviewPanel';
import { useAuth } from './context/AuthContext';
import { useToast } from './context/ToastContext';

const CART_STORAGE_KEY = 'day16-cart';

const roundCurrency = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

const App = () => {
  const { user, register, login, logout } = useAuth();
  const { showToast } = useToast();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productReviews, setProductReviews] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiClient.get('/products');
        setProducts(data);
      } catch (error) {
        showToast(error.message, 'error');
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [showToast]);

  useEffect(() => {
    if (!selectedProductId && products.length > 0) {
      setSelectedProductId(products[0]._id);
    }
  }, [products, selectedProductId]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      setLoadingOrders(true);

      try {
        const data = await apiClient.get('/orders/my-orders', user.token);
        setOrders(data);
      } catch (error) {
        showToast(error.message, 'error');
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [showToast, user]);

  const totals = useMemo(() => {
    const itemsPrice = roundCurrency(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
    const shippingPrice = itemsPrice >= 1000 ? 0 : cartItems.length ? 99 : 0;
    const taxPrice = roundCurrency(itemsPrice * 0.18);
    const totalPrice = roundCurrency(itemsPrice + shippingPrice + taxPrice);

    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
  }, [cartItems]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((product) => product.category))];
    return ['All', ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  const selectedProduct = useMemo(
    () => products.find((product) => product._id === selectedProductId) || null,
    [products, selectedProductId]
  );

  const handleRegister = async (payload) => {
    setAuthLoading(true);
    try {
      await register(payload);
      showToast('Registration successful', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (payload) => {
    setAuthLoading(true);
    try {
      await login(payload);
      showToast('Login successful', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    setCartItems((currentCart) => {
      const existingItem = currentCart.find((cartItem) => cartItem.product === item.product);

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.product === item.product
            ? { ...cartItem, quantity: Math.min(item.quantity, cartItem.countInStock) }
            : cartItem
        );
      }

      return [...currentCart, item];
    });

    showToast(`${item.name} added to cart`, 'success');
  };

  const handleQuantityChange = (productId, quantity) => {
    setCartItems((currentCart) =>
      currentCart.map((item) =>
        item.product === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((currentCart) => currentCart.filter((item) => item.product !== productId));
    showToast('Item removed from cart', 'info');
  };

  const refreshProducts = async () => {
    const data = await apiClient.get('/products');
    setProducts(data);
  };

  const fetchReviewsForProduct = async (productId) => {
    if (!productId) {
      setProductReviews([]);
      return;
    }

    setLoadingReviews(true);
    try {
      const data = await apiClient.get(`/products/${productId}/reviews`);
      setProductReviews(data.reviews);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviewsForProduct(selectedProductId);
  }, [selectedProductId]);

  const handlePlaceOrder = async ({ shippingAddress, paymentMethod }) => {
    if (!user) {
      showToast('Please log in before placing an order', 'error');
      return;
    }

    setPlacingOrder(true);

    try {
      const order = await apiClient.post(
        '/orders',
        {
          orderItems: cartItems.map((item) => ({
            product: item.product,
            quantity: item.quantity
          })),
          shippingAddress,
          paymentMethod
        },
        user.token
      );

      setOrders((currentOrders) => [order, ...currentOrders]);
      setCartItems([]);
      await refreshProducts();
      showToast('Order placed successfully', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await apiClient.patch(`/orders/${orderId}/cancel`, {}, user.token);
      setOrders((currentOrders) =>
        currentOrders.map((order) => (order._id === orderId ? response.order : order))
      );
      await refreshProducts();
      showToast('Order cancelled successfully', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const syncReviewsAfterMutation = async (productId) => {
    await Promise.all([refreshProducts(), fetchReviewsForProduct(productId)]);
  };

  const validateReviewPayload = (payload) => {
    if (!payload.title || payload.title.trim().length < 3) {
      throw new Error('Review title must be at least 3 characters long');
    }

    if (!payload.comment || payload.comment.trim().length < 10) {
      throw new Error('Review comment must be at least 10 characters long');
    }

    const numericRating = Number(payload.rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
  };

  const handleAddReview = async (payload) => {
    if (!user || !selectedProductId) {
      showToast('Please log in and select a product to review', 'error');
      return;
    }

    try {
      validateReviewPayload(payload);
      setReviewSubmitting(true);
      await apiClient.post(`/products/${selectedProductId}/reviews`, payload, user.token);
      await syncReviewsAfterMutation(selectedProductId);
      showToast('Review added successfully', 'success');
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleEditReview = async (reviewId, payload) => {
    try {
      validateReviewPayload(payload);
      setReviewSubmitting(true);
      await apiClient.put(`/reviews/${reviewId}`, payload, user.token);
      await syncReviewsAfterMutation(selectedProductId);
      showToast('Review updated successfully', 'success');
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!user) {
      showToast('Please log in to delete reviews', 'error');
      return;
    }

    try {
      setReviewSubmitting(true);
      await apiClient.delete(`/reviews/${reviewId}`, user.token);
      await syncReviewsAfterMutation(selectedProductId);
      showToast('Review deleted successfully', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">MS</div>
          <div>
            <h1>MERN Store</h1>
            <p>Day 16 reviews and ratings storefront</p>
          </div>
        </div>

        <div className="topbar-center">
          <span className="topbar-pill">Women</span>
          <span className="topbar-pill">Men</span>
          <span className="topbar-pill">Accessories</span>
          <span className="topbar-pill">Home</span>
        </div>

        <div className="hero-actions">
          {user ? (
            <>
              <div className="user-chip">
                <span>Signed in as</span>
                <strong>{user.name}</strong>
              </div>
              <button className="ghost-button" type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <div className="user-chip">
              <span>Status</span>
              <strong>Guest</strong>
            </div>
          )}
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">MERN Stack Internship - Day 16</p>
          <h2>Order management plus ratings and reviews</h2>
          <p>
            Browse products, add to bag, place orders, and now collect customer reviews with
            live average rating updates.
          </p>
        </div>
        <div className="hero-highlight">
          <span>Cart Total</span>
          <strong>Rs. {totals.totalPrice.toLocaleString('en-IN')}</strong>
          <p>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items ready for checkout</p>
        </div>
      </section>

      <main className="layout-grid">
        {!user && (
          <AuthPanel
            onRegister={handleRegister}
            onLogin={handleLogin}
            loading={authLoading}
          />
        )}

        <ProductCatalog
          products={filteredProducts}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onSelectProduct={setSelectedProductId}
          loading={loadingProducts}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          selectedProductId={selectedProductId}
        />

        <ProductReviewPanel
          product={selectedProduct}
          reviews={productReviews}
          loading={loadingReviews}
          currentUser={user}
          onAddReview={handleAddReview}
          onEditReview={handleEditReview}
          onDeleteReview={handleDeleteReview}
          submitting={reviewSubmitting}
        />

        <aside className="sidebar-stack">
          <CartPanel
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
            totals={totals}
          />

          <CheckoutPanel
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
            placingOrder={placingOrder}
            isLoggedIn={Boolean(user)}
          />
        </aside>

        <OrderHistory
          orders={orders}
          loading={loadingOrders}
          onCancelOrder={handleCancelOrder}
        />
      </main>
    </div>
  );
};

export default App;
