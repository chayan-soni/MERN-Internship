import { useState } from 'react';
import { ProductProvider } from './context/ProductContext';
import { ProductForm } from './components/ProductForm';
import { SearchFilter } from './components/SearchFilter';
import { ProductList } from './components/ProductList';
import './styles/App.css';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <ProductProvider>
      <div className="app">
        <header className="app-header">
          <h1>Product Management System</h1>
          <button
            className="btn-toggle-form"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Hide Form' : 'Add New Product'}
          </button>
        </header>

        <main className="app-main">
          {showForm && (
            <div className="form-section">
              <ProductForm onSuccess={() => setShowForm(false)} />
            </div>
          )}

          <div className="filter-section">
            <SearchFilter />
          </div>

          <div className="list-section">
            <ProductList />
          </div>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 Product Management System. All rights reserved.</p>
        </footer>
      </div>
    </ProductProvider>
  );
}

export default App;
