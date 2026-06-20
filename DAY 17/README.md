# Day 16 - Product Review & Rating Module

This project extends the Day 15 store with the Day 16 review and rating assignment:

- MongoDB-backed review and rating support
- REST APIs to add, edit, delete, and fetch product reviews
- Dynamic average rating and review count updates per product
- React frontend integration for product reviews
- Postman collection for validating review APIs

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

1. Day 15 order management flow remains intact
2. Product review submission with 1-5 star ratings
3. Logged-in users can edit or delete only their own reviews
4. Product cards display live average rating and total review count
5. Product review panel is integrated directly into the storefront
6. Backend recalculates rating aggregates after every review mutation

## Main API Endpoints

- `GET /api/products`
- `GET /api/products/:productId/reviews`
- `POST /api/products/:productId/reviews`
- `PUT /api/reviews/:id`
- `DELETE /api/reviews/:id`

## Quick Start

Follow [SETUP.md](./SETUP.md) for installation, environment variables, product seeding, and running the project.

Detailed endpoint docs are available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).
