# Day 16 API Documentation

Base URL: `http://localhost:5000/api`

Authentication for protected routes uses:

```http
Authorization: Bearer <jwt_token>
```

## 1. Get Products

**Endpoint**

```http
GET /products
```

**Purpose**

Returns all products along with `averageRating` and `numReviews`.

**Success Response**

```json
[
  {
    "_id": "6852f5c6f0b7a5f290ef1001",
    "name": "Noise Cancelling Headphones",
    "description": "Wireless over-ear headphones with active noise cancellation and 30-hour battery life.",
    "price": 4999,
    "category": "Electronics",
    "countInStock": 12,
    "averageRating": 4.5,
    "numReviews": 2
  }
]
```

## 2. Fetch Product Reviews

**Endpoint**

```http
GET /products/:productId/reviews
```

**Purpose**

Fetches all reviews for a product and includes the product rating summary.

**Success Response**

```json
{
  "product": {
    "_id": "6852f5c6f0b7a5f290ef1001",
    "name": "Noise Cancelling Headphones",
    "averageRating": 4.5,
    "numReviews": 2
  },
  "reviews": [
    {
      "_id": "6852f8dbf0b7a5f290ef2001",
      "product": "6852f5c6f0b7a5f290ef1001",
      "user": "6852f76cf0b7a5f290ef1801",
      "userName": "Demo Reviewer",
      "title": "Worth the price",
      "comment": "Very comfortable and the overall quality feels premium for daily use.",
      "rating": 5,
      "createdAt": "2026-06-19T08:32:00.000Z",
      "updatedAt": "2026-06-19T08:32:00.000Z"
    }
  ]
}
```

**Errors**

- `404 Product not found`

## 3. Add Review

**Endpoint**

```http
POST /products/:productId/reviews
```

**Auth Required**

Yes

**Request Body**

```json
{
  "title": "Worth the price",
  "comment": "Very comfortable and the overall quality feels premium for daily use.",
  "rating": 5
}
```

**Validation Rules**

- `title` is required
- `comment` is required
- `rating` must be an integer between `1` and `5`
- One user can submit only one review per product

**Success Response**

```json
{
  "_id": "6852f8dbf0b7a5f290ef2001",
  "product": "6852f5c6f0b7a5f290ef1001",
  "user": "6852f76cf0b7a5f290ef1801",
  "userName": "Demo Reviewer",
  "title": "Worth the price",
  "comment": "Very comfortable and the overall quality feels premium for daily use.",
  "rating": 5
}
```

**Errors**

- `400 You have already reviewed this product`
- `400 Rating must be an integer between 1 and 5`
- `404 Product not found`
- `401 Not authorized, token missing/invalid`

## 4. Edit Review

**Endpoint**

```http
PUT /reviews/:id
```

**Auth Required**

Yes

**Request Body**

```json
{
  "title": "Still worth the price",
  "comment": "Used it for several days and it remains reliable, comfortable, and easy to recommend.",
  "rating": 4
}
```

**Validation Rules**

- `title` is required
- `comment` is required
- `rating` must be an integer between `1` and `5`
- User can edit only their own review

**Success Response**

```json
{
  "_id": "6852f8dbf0b7a5f290ef2001",
  "product": "6852f5c6f0b7a5f290ef1001",
  "user": "6852f76cf0b7a5f290ef1801",
  "userName": "Demo Reviewer",
  "title": "Still worth the price",
  "comment": "Used it for several days and it remains reliable, comfortable, and easy to recommend.",
  "rating": 4
}
```

**Errors**

- `403 You can only edit your own review`
- `404 Review not found`
- `400 Rating must be an integer between 1 and 5`

## 5. Delete Review

**Endpoint**

```http
DELETE /reviews/:id
```

**Auth Required**

Yes

**Purpose**

Deletes the selected review and recalculates the product’s rating summary.

**Success Response**

```json
{
  "message": "Review deleted successfully"
}
```

**Errors**

- `403 You can only delete your own review`
- `404 Review not found`

## Rating Calculation Logic

After every add, edit, or delete review action, the backend recalculates:

- `averageRating`
- `numReviews`

These values are stored on the product document and returned by product APIs so the frontend can display them directly on the product cards.
