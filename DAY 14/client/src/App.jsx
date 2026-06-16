import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastContainer } from './components/ToastContainer';
import { WishlistForm } from './components/WishlistForm';
import { WishlistList } from './components/WishlistList';
import './styles/App.css';
import { useState } from 'react';
import { useWishlist } from './context/WishlistContext';

function AppContent() {
  const [showForm, setShowForm] = useState(false);
  const { clearWishlist } = useWishlist();

  const handleClearWishlist = async () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        await clearWishlist();
      } catch (error) {
        console.error('Error clearing wishlist:', error);
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Wishlist Manager</h1>
        <div className="header-actions">
          <button
            className="btn-toggle-form"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Hide Form' : 'Add Item'}
          </button>
          <button
            className="btn-clear-all"
            onClick={handleClearWishlist}
          >
            Clear All
          </button>
        </div>
      </header>

      <main className="app-main">
        {showForm && (
          <div className="form-section">
            <WishlistForm onSuccess={() => setShowForm(false)} />
          </div>
        )}

        <div className="list-section">
          <WishlistList />
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Wishlist Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <AppContent />
        <ToastContainer />
      </WishlistProvider>
    </ToastProvider>
  );
}

export default App;
