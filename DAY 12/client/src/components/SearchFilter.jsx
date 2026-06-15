import { useProducts } from '../context/ProductContext';
import '../styles/SearchFilter.css';

export const SearchFilter = () => {
  const { filters, updateFilters, clearFilters, fetchProducts } = useProducts();

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };

  const handleCategoryChange = (e) => {
    updateFilters({ category: e.target.value });
  };

  const handlePriceChange = (type, value) => {
    updateFilters({ [type]: value });
  };

  const handleSortChange = (e) => {
    updateFilters({ sort: e.target.value });
  };

  const handleApplyFilters = () => {
    fetchProducts();
  };

  return (
    <div className="search-filter">
      <h2>Search & Filter Products</h2>

      <div className="filter-group">
        <div className="filter-item">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name, description, or SKU..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={filters.category}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="price-range">
          <div className="filter-item">
            <label htmlFor="minPrice">Min Price:</label>
            <input
              id="minPrice"
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
            />
          </div>
          <div className="filter-item">
            <label htmlFor="maxPrice">Max Price:</label>
            <input
              id="maxPrice"
              type="number"
              placeholder="1000"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        <div className="filter-item">
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            value={filters.sort}
            onChange={handleSortChange}
          >
            <option value="createdAt:desc">Newest First</option>
            <option value="createdAt:asc">Oldest First</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="name:asc">Name: A to Z</option>
            <option value="name:desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <div className="filter-buttons">
        <button onClick={handleApplyFilters} className="btn-apply">Apply Filters</button>
        <button onClick={clearFilters} className="btn-clear">Clear Filters</button>
      </div>
    </div>
  );
};
