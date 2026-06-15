# Quick Start Guide - Product Management System

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (running locally or cloud URI)

## Installation & Running

### 1. Backend Setup

```bash
cd DAY\ 12/server

# Install dependencies
npm install

# Create .env file (already created with defaults)
# Update MONGODB_URI if using cloud MongoDB

# Start the server
npm run dev
```

The server will start on `http://localhost:5000`

### 2. Frontend Setup

Open a new terminal and run:

```bash
cd DAY\ 12/client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:3000`

## Quick Test

1. **Create a Product**
   - Click "Add New Product"
   - Fill in the form with sample data:
     - Name: "Test Laptop"
     - Description: "High-performance laptop"
     - Price: 999.99
     - Category: Electronics
     - Stock: 5
     - SKU: TEST-001
   - Click "Add Product"

2. **Search/Filter**
   - Type in search box: "laptop"
   - Select category: "Electronics"
   - Set price range: $500 - $1500
   - Click "Apply Filters"

3. **Update Product**
   - Click "Edit" on any product card
   - Modify the fields
   - Click "Save"

4. **Delete Product**
   - Click "Delete" on any product card
   - Confirm deletion

## Stopping the Servers

- Press `Ctrl+C` in both terminal windows

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod`
- Or update MONGODB_URI in `.env` to use MongoDB Atlas

**Port Already in Use:**
- Change PORT in server `.env`
- Change port in client `vite.config.js`

**Dependencies Issues:**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

## API Testing with Curl

```bash
# Get all products
curl http://localhost:5000/api/products

# Search products
curl "http://localhost:5000/api/products?search=laptop&category=Electronics"

# Create product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "description": "Test product",
    "price": 99.99,
    "category": "Electronics",
    "sku": "TEST-001"
  }'

# Update product
curl -X PUT http://localhost:5000/api/products/{id} \
  -H "Content-Type: application/json" \
  -d '{"price": 89.99}'

# Delete product
curl -X DELETE http://localhost:5000/api/products/{id}
```

## Project Features

✅ CRUD Operations - Create, Read, Update, Delete products
✅ Search Functionality - Search by name, description, SKU
✅ Filter by Category - Filter products by category
✅ Price Range Filter - Filter by min and max price
✅ Sorting - Sort by newest, oldest, price, name
✅ Context API - Global state management
✅ Responsive Design - Mobile-friendly interface
✅ Error Handling - Proper error messages
✅ Loading States - User feedback during operations
✅ Validation - Form and database validation
