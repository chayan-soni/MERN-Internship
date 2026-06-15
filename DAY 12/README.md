# Product Management System - Day 12

A full-stack MERN application featuring a complete Product Management Module with CRUD operations, search, and filter functionality.

## Features

✨ **Product Management CRUD**
- Create new products with validation
- Read/Retrieve all products
- Update existing products
- Delete products

🔍 **Search & Filter**
- Search by product name, description, or SKU
- Filter by category
- Filter by price range (min and max)
- Sort by various criteria (newest, price, name)

⚙️ **State Management**
- Context API for global state management
- Centralized product data
- Filter state management
- Loading and error states

🎨 **Responsive UI**
- Modern, clean interface
- Mobile-friendly design
- Real-time updates
- Smooth transitions and animations

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
DAY 12/
├── server/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── productController.js # Business logic
│   ├── models/
│   │   └── Product.js         # Product schema
│   ├── routes/
│   │   └── productRoutes.js   # API routes
│   ├── .env                   # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js              # Express app
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── ProductCard.jsx      # Product display card
    │   │   ├── ProductForm.jsx      # Create product form
    │   │   ├── ProductList.jsx      # Products list view
    │   │   └── SearchFilter.jsx     # Search & filter form
    │   ├── context/
    │   │   └── ProductContext.jsx   # Context API setup
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── ProductCard.css
    │   │   ├── ProductForm.css
    │   │   ├── ProductList.css
    │   │   └── SearchFilter.css
    │   ├── App.jsx            # Main App component
    │   └── main.jsx           # Entry point
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .gitignore
```

## Installation

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product-management
NODE_ENV=development
```

Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install
```

Start the development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### Products

- `GET /api/products` - Get all products with search/filter
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Query Parameters

For `GET /api/products`:
- `search` - Search term (name, description, SKU)
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - Sort field (e.g., `createdAt:desc`, `price:asc`)

## Product Categories

- Electronics
- Clothing
- Books
- Home
- Sports
- Other

## Product Model

```javascript
{
  _id: ObjectId,
  name: String (required, max 100 chars),
  description: String (required, max 500 chars),
  price: Number (required, min 0),
  category: String (required, enum),
  stock: Number (default 0, min 0),
  sku: String (required, unique),
  image: String (default placeholder),
  createdAt: Date,
  updatedAt: Date
}
```

## Context API Usage

The `ProductContext` provides:

```javascript
const {
  products,           // Array of products
  loading,           // Loading state
  error,             // Error message
  filters,           // Current filters
  fetchProducts,     // Fetch with filters
  createProduct,     // Create new product
  updateProduct,     // Update product
  deleteProduct,     // Delete product
  updateFilters,     // Update filter state
  clearFilters       // Reset all filters
} = useProducts();
```

## Features Implementation

### 1. CRUD Operations
All CRUD operations are implemented in the backend controller with proper validation and error handling.

### 2. Search & Filter
- Real-time search across product fields
- Multiple filter options (category, price range)
- Flexible sorting options
- Combined filtering capability

### 3. Context API State Management
- Global product state
- Filter state management
- Loading and error states
- Optimized API calls

### 4. Frontend-Backend Integration
- Axios for HTTP requests
- Proxy configuration in Vite for API calls
- Error handling and user feedback
- Success notifications

## Usage Examples

### Creating a Product

```javascript
const { createProduct } = useProducts();

await createProduct({
  name: "Laptop",
  description: "High-performance laptop",
  price: 999.99,
  category: "Electronics",
  stock: 10,
  sku: "ELEC-001",
  image: "https://..."
});
```

### Searching and Filtering

```javascript
const { updateFilters, fetchProducts } = useProducts();

// Update filters
updateFilters({
  search: "laptop",
  category: "Electronics",
  minPrice: 500,
  maxPrice: 1500,
  sort: "price:asc"
});

// Fetch filtered products
await fetchProducts();
```

## Testing the Application

1. **Create Products**: Click "Add New Product" and fill the form
2. **Search**: Type in the search box to find products
3. **Filter**: Use category, price range, and sort options
4. **Update**: Click "Edit" on a product card
5. **Delete**: Click "Delete" to remove a product

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User authentication
- Product reviews and ratings
- Wishlist functionality
- Shopping cart
- Payment integration
- Admin dashboard
- Inventory management

## Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running locally
- Check MONGODB_URI in .env file

**CORS Error**
- Verify server is running on port 5000
- Check proxy configuration in vite.config.js

**API Calls Failing**
- Ensure both server and client are running
- Check browser console for error messages
- Verify .env file configuration

## Author

Created for Day 12 MERN Internship Assignment

## License

MIT
