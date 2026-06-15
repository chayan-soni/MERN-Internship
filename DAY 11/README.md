# JWT Authentication Module - MERN Stack

A complete professional-grade JWT Authentication system built with Node.js, Express.js, MongoDB, React, and Vite.

## Project Structure

```
DAY 11/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── client/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── .gitignore
    └── package.json
```

## Features

### Backend
- ✅ User registration with email validation
- ✅ User login with credential verification
- ✅ Password hashing using bcryptjs
- ✅ JWT token generation and verification
- ✅ Protected routes with middleware
- ✅ User profile endpoint
- ✅ Error handling and validation
- ✅ CORS enabled for frontend communication

### Frontend
- ✅ Registration page with form validation
- ✅ Login page with error handling
- ✅ Protected dashboard page
- ✅ JWT token storage in localStorage
- ✅ Session persistence on page refresh
- ✅ Logout functionality
- ✅ AuthContext for state management
- ✅ Responsive design (no Tailwind/Bootstrap)
- ✅ Professional UI styling

## Prerequisites

- Node.js (v16 or higher)
- MongoDB running locally on port 27017
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file (already included):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jwt-auth
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start MongoDB (make sure it's running):
```bash
# On Windows (if installed as service):
net start MongoDB

# Or run mongod directly:
mongod
```

5. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication Routes

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get User Profile (Protected)
```
GET /api/auth/profile
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Profile retrieved successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-06-15T10:30:00Z"
  }
}
```

## Usage Flow

1. **Register**: User fills registration form with name, email, password
2. **Login**: User logs in with email and password
3. **Token Storage**: JWT token is stored in localStorage
4. **Dashboard Access**: User can access protected dashboard
5. **Profile Fetch**: Dashboard fetches user profile from protected API
6. **Logout**: User clears token and session

## Authentication Flow

```
Client                          Server
  |                              |
  |-- Register Request --------> |
  |                              |-- Hash Password
  |                              |-- Create User
  |                              |-- Generate JWT
  |<----- Token + User ----------|
  |                              |
  |-- Store Token (localStorage) |
  |                              |
  |-- Add Bearer Token --------> |
  |-- API Request               |
  |                              |-- Verify Token
  |                              |-- Fetch Data
  |<----- Protected Data --------|
  |                              |
  |-- Logout Request ----------> |
  |-- Clear Token              |
```

## Security Features

- Password hashing with bcryptjs (salt rounds: 10)
- JWT token-based authentication
- Protected routes with middleware verification
- Email validation
- Password confirmation matching
- Token expiration (7 days)
- CORS enabled for specific origin

## Testing the Application

### Test Registration
1. Go to `http://localhost:5173`
2. Click "Register"
3. Fill in form with:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Confirm Password: test123
4. Click Register

### Test Login
1. Go to `http://localhost:5173/login`
2. Enter email and password
3. Click Login

### Test Protected Routes
1. After login, navigate to `/dashboard`
2. You should see your profile information

### Test Token Persistence
1. After login, refresh the page
2. You should still be logged in (token persisted)

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod`
- Check if it's on port 27017
- Verify MONGODB_URI in .env

### CORS Error
- Check if backend is running on port 5000
- Verify vite.config.js proxy settings
- Clear browser cache and localStorage

### Token Issues
- Clear localStorage: Open DevTools → Application → Storage → Clear
- Check JWT_SECRET in .env
- Ensure token is in localStorage

## Technologies Used

### Backend
- Express.js - Web framework
- Mongoose - MongoDB ODM
- JWT - Authentication
- bcryptjs - Password hashing
- CORS - Cross-origin requests
- dotenv - Environment variables

### Frontend
- React 18 - UI library
- Vite - Build tool
- React Router - Navigation
- Axios - HTTP client
- Context API - State management

## Production Checklist

Before deploying to production:
- [ ] Change JWT_SECRET to a strong random string
- [ ] Set NODE_ENV to 'production'
- [ ] Use environment-specific MongoDB URI
- [ ] Enable HTTPS only
- [ ] Set secure CORS policies
- [ ] Add rate limiting
- [ ] Implement refresh token rotation
- [ ] Add logging and monitoring
- [ ] Set strong password requirements
- [ ] Enable HTTPS cookies

## Author
MERN Stack Internship - Day 11

## License
MIT
