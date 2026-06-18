# Day 15 - Order Management Module

This project implements the Day 15 MERN internship assignment:

- MongoDB schemas for `Order` and `Order Items`
- REST APIs to place orders, view logged-in user orders, and cancel orders
- Checkout page integrated with backend order APIs
- Order history UI for logged-in users
- Postman collection for API validation

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT-based user authentication

## Project Structure

```text
DAY 15/
├── client/
├── server/
├── postman/
├── README.md
├── SETUP.md
└── SUBMISSION.md
```

## Core Features

1. User registration and login
2. Seeded sample product catalog
3. Cart management on frontend
4. Checkout integration with backend
5. Order placement with stock validation
6. Logged-in user order history
7. Order cancellation with stock restoration

## Main API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/orders`
- `GET /api/orders/my-orders`
- `PATCH /api/orders/:id/cancel`

## Quick Start

Follow [SETUP.md](./SETUP.md) for installation, environment variables, product seeding, and running the project.
