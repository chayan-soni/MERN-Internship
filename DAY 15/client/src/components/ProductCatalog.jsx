const ProductCatalog = ({
  products,
  cartItems,
  onAddToCart,
  loading,
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange
}) => (
  <section className="storefront">
    <div className="hero-banner">
      <div>
        <p className="eyebrow">Style-first shopping</p>
        <h2>Everyday picks, arranged like a real storefront</h2>
        <p>
          Browse the catalog, filter by category, build your bag, and place orders from one
          flow.
        </p>
      </div>
      <div className="hero-metrics">
        <div>
          <strong>{products.length}</strong>
          <span>products visible</span>
        </div>
        <div>
          <strong>{categories.length - 1}</strong>
          <span>categories</span>
        </div>
        <div>
          <strong>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</strong>
          <span>items in bag</span>
        </div>
      </div>
    </div>

    <div className="catalog-toolbar">
      <label className="search-box">
        <span>Search</span>
        <input
          type="text"
          placeholder="Search by name or category"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="category-pills">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>

    {loading ? (
      <div className="empty-state">Loading products...</div>
    ) : products.length === 0 ? (
      <div className="empty-state">
        No products matched your current filter. Try clearing the search or category.
      </div>
    ) : (
      <div className="product-grid">
        {products.map((product) => {
          const cartItem = cartItems.find((item) => item.product === product._id);
          const isOutOfStock = product.countInStock === 0;

          return (
            <article key={product._id} className="product-card">
              <div className="product-image-wrap">
                <img src={product.image} alt={product.name} />
                <span className={`stock-pill ${isOutOfStock ? 'sold-out' : ''}`}>
                  {isOutOfStock ? 'Sold out' : `${product.countInStock} left`}
                </span>
              </div>
              <div className="product-content">
                <span className="tag">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-meta">
                  <div>
                    <strong>Rs. {product.price.toLocaleString('en-IN')}</strong>
                    <span className="subtle-text">Free delivery above Rs. 1000</span>
                  </div>
                  <span className="product-rating">4.4</span>
                </div>
              </div>
              <button
                className="primary-button"
                type="button"
                disabled={isOutOfStock}
                onClick={() =>
                  onAddToCart({
                    product: product._id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity:
                      cartItem && cartItem.quantity < product.countInStock
                        ? cartItem.quantity + 1
                        : 1,
                    countInStock: product.countInStock
                  })
                }
              >
                {isOutOfStock ? 'Out of stock' : cartItem ? 'Add another' : 'Add to bag'}
              </button>
            </article>
          );
        })}
      </div>
    )}
  </section>
);

export default ProductCatalog;
