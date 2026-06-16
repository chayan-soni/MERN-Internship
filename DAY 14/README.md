# Wishlist Management System - Day 14

A full-stack MERN application for managing wishlists with CRUD operations, real-time notifications, and a responsive UI.

## Features

✨ **Core Features:**
- ✅ Add items to wishlist with product details
- ✅ View all wishlist items
- ✅ Remove items from wishlist
- ✅ Clear entire wishlist
- ✅ Toast notifications for all actions
- ✅ Responsive design

🎨 **Technical Features:**
- Context API for state management
- RESTful API with Express.js
- MongoDB for data persistence
- Axios for HTTP requests
- Vite for fast development
- React Hooks (useState, useContext, useCallback, useEffect)

## Project Structure

```
DAY 14/
├── server/
│   ├── models/
│   │   └── Wishlist.js
│   ├── controllers/
│   │   └── wishlistController.js
│   ├── routes/
│   │   └── wishlistRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── client/
    ├── src/
    │   ├── context/
    │   │   ├── ToastContext.jsx
    │   │   └── WishlistContext.jsx
    │   ├── components/
    │   │   ├── ToastContainer.jsx
    │   │   ├── WishlistForm.jsx
    │   │   ├── WishlistList.jsx
    │   │   └── WishlistCard.jsx
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── WishlistForm.css
    │   │   ├── WishlistList.css
    │   │   ├── WishlistCard.css
    │   │   └── Toast.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## API Endpoints

### Wishlist API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wishlist/user/:userId` | Get all wishlist items for a user |
| POST | `/api/wishlist` | Add item to wishlist |
| DELETE | `/api/wishlist/:id` | Remove item from wishlist |
| GET | `/api/wishlist/check` | Check if item is in wishlist |
| DELETE | `/api/wishlist/user/:userId/clear` | Clear entire wishlist |
| GET | `/api/health` | Health check endpoint |

### Request/Response Examples

#### Add to Wishlist
```json
POST /api/wishlist
{
  "userId": "user-123",
  "productId": "prod-456",
  "productName": "Wireless Headphones",
  "productPrice": 79.99,
  "productImage": "https://...",
  "productCategory": "Electronics"
}
```

#### Success Response
```json
{
  "success": true,
  "message": "Item added to wishlist successfully",
  "data": {
    "_id": "wish-789",
    "userId": "user-123",
    "productId": "prod-456",
    "productName": "Wireless Headphones",
    "productPrice": 79.99,
    "addedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Setup Instructions

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd "DAY 14/server"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file (already provided):**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/wishlist-management
   NODE_ENV=development
   ```

4. **Ensure MongoDB is running:**
   ```bash
   # On Windows (if MongoDB is installed)
   mongod
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to client directory:**
   ```bash
   cd "DAY 14/client"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will open on `http://localhost:3000`

## Usage

1. **Add Item to Wishlist:**
   - Click "Add Item" button
   - Fill in product details (ID, Name, Price)
   - Click "Add to Wishlist"
   - Success notification appears

2. **View Wishlist:**
   - All items display in a responsive grid
   - See price, category, and date added

3. **Remove Item:**
   - Click "Remove" button on any card
   - Confirm deletion
   - Item removed with notification

4. **Clear Wishlist:**
   - Click "Clear All" button
   - Confirm action
   - All items removed

## Notifications

The app includes three types of notifications:

- ✅ **Success** (Green): Item added/removed successfully
- ❌ **Error** (Red): Operation failed
- ℹ️ **Info** (Blue): General information

Notifications auto-dismiss after 3 seconds or can be manually closed.

## Database Schema

### Wishlist Collection

```javascript
{
  userId: String (required),
  productId: String (required),
  productName: String (required),
  productPrice: Number (required),
  productImage: String,
  productCategory: String,
  addedAt: Date (default: now),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}

// Unique Index: userId + productId
```

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Dotenv
  - CORS

- **Frontend:**
  - React 18
  - Vite
  - Axios
  - React Context API
  - CSS3

## Key Concepts Implemented

1. **Context API:** Two contexts - ToastContext for notifications, WishlistContext for data
2. **CRUD Operations:** Create, Read, Update (implicit), Delete operations
3. **RESTful API:** Proper HTTP methods and status codes
4. **State Management:** useCallback for optimized functions, useRef for persistent values
5. **Error Handling:** Try-catch blocks and user-friendly error messages
6. **Responsive Design:** Mobile-first CSS Grid and Flexbox layouts
7. **Toast Notifications:** Custom notification system with auto-dismiss

## Testing the Application

### Add Multiple Items
1. Add item 1: ID: "P001", Name: "Laptop", Price: 999.99
2. Add item 2: ID: "P002", Name: "Mouse", Price: 49.99
3. Add item 3: ID: "P003", Name: "Keyboard", Price: 79.99

### Error Cases
- Try adding duplicate item (same productId) → Error notification
- Try adding without required fields → Error notification

### Responsive Testing
- Test on desktop (1200px+)
- Test on tablet (768px)
- Test on mobile (320px)

## Troubleshooting

**Issue:** MongoDB connection error
- **Solution:** Ensure MongoDB is running (`mongod` command)

**Issue:** Port 5000 already in use
- **Solution:** Change PORT in .env file or kill process using port 5000

**Issue:** CORS errors
- **Solution:** Ensure backend is running on port 5000 and frontend API URL is correct

**Issue:** Notifications not appearing
- **Solution:** Check browser console for errors, ensure ToastProvider wraps the app

## Future Enhancements

- User authentication
- Wishlist sharing functionality
- Price tracking and alerts
- Product recommendations
- Wishlist sorting and filtering
- Export wishlist as PDF
- Integration with real product database

## Submission

This project completes Day 14 requirements:
✅ Wishlist functionality implemented
✅ CRUD APIs created
✅ React frontend integrated
✅ Toast notifications implemented
✅ Code pushed to GitHub
