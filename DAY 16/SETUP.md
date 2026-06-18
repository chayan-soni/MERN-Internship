# Setup Guide

## 1. Backend setup

```bash
cd server
copy .env.example .env
npm install
```

Update `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/day15_order_management
JWT_SECRET=replace_with_a_secure_secret
CLIENT_URL=http://localhost:5173
```

Seed products:

```bash
npm run seed
```

Run backend:

```bash
npm run dev
```

## 2. Frontend setup

```bash
cd client
copy .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## 3. Manual test flow

1. Register a new user from the frontend.
2. Add one or more products to cart.
3. Fill the checkout form and click `Place order`.
4. Verify the new order appears in `Order History`.
5. Click `Cancel order` and verify the status changes to `Cancelled`.
6. Select a product from the catalog and open its review panel.
7. Add a review with title, comment, and rating.
8. Edit the same review and confirm the average rating updates.
9. Delete the review and confirm the product summary changes again.

## 4. Postman testing

Import the collection from:

`postman/Day16_Product_Reviews.postman_collection.json`

Use the following variables in Postman:

- `baseUrl` = `http://localhost:5000/api`
- `token` = JWT returned by login/register
- `orderId` = Any order `_id` returned by `Place Order`
- `productId` = Any product `_id` returned by `Get Products`
- `reviewId` = Any review `_id` returned by `Add Review`
