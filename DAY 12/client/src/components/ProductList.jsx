import { useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import '../styles/ProductList.css';

export const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading && products.length === 0) {
    return <div className="loading">Loading products...</div>;
  }

  if (error && products.length === 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <div className="no-products">
          <p>No products found. Try adjusting your filters or add a new product.</p>
        </div>
      ) : (
        <>
          <h2>Products ({products.length})</h2>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
