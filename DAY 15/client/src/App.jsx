import { useEffect, useMemo, useState } from 'react';
import { apiClient } from './api/apiClient';
import AuthPanel from './components/AuthPanel';
import CartPanel from './components/CartPanel';
import CheckoutPanel from './components/CheckoutPanel';
import OrderHistory from './components/OrderHistory';
import ProductCatalog from './components/ProductCatalog';
import { useAuth } from './context/AuthContext';
import { useToast } from './context/ToastContext';

const CART_STORAGE_KEY = 'day15-cart';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">MS</div>
          <div>
            <h1>MERN Store</h1>
            <p>Day 15 order management storefront</p>
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
          <p className="eyebrow">MERN Stack Internship - Day 15</p>
          <h2>Order management, but usable like a shopping app</h2>
          <p>
            Browse products, add to bag, place orders, and view your purchase timeline without
            fighting the interface.
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
          loading={loadingProducts}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
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
