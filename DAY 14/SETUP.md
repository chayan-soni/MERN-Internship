# Setup Guide

## Prerequisites

- Node.js (v14+) and npm installed
- MongoDB running locally or connection string available
- Git configured

## Quick Start

### 1. Backend Setup

```bash
cd "DAY 14/server"
npm install
npm run dev
```

Server runs on: `http://localhost:5000`

### 2. Frontend Setup (New Terminal)

```bash
cd "DAY 14/client"
npm install
npm run dev
```

App opens on: `http://localhost:3000`

## Environment Configuration

### Backend (.env)
Already configured with:
- PORT=5000
- MONGODB_URI=mongodb://localhost:27017/wishlist-management

### Frontend
API URL hardcoded in WishlistContext.jsx:
- API_BASE_URL = 'http://localhost:5000/api/wishlist'

## MongoDB Setup

### Windows with MongoDB installed:
```bash
mongod
```

### Using MongoDB Atlas (Cloud):
Update .env:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wishlist-management
```

## Verification

1. Open `http://localhost:5000/api/health` - Should see: `{"success": true, "message": "Server is running"}`
2. Open `http://localhost:3000` - Should see Wishlist Manager UI
3. Try adding an item - Should see success notification

## Port Conflicts

If ports are already in use:

**Backend:**
```bash
# Update DAY 14/server/.env
PORT=5001  # Use different port
```

**Frontend (vite.config.js):**
```javascript
server: {
  port: 3001,  // Use different port
}
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB Connection Error | Ensure `mongod` is running |
| CORS Error | Check backend is running on correct port |
| Module not found | Run `npm install` in both directories |
| Port already in use | Change port numbers as shown above |

## Development Commands

**Backend:**
- `npm run start` - Production mode
- `npm run dev` - Development with nodemon

**Frontend:**
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
