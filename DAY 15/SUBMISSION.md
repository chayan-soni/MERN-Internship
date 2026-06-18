# Day 15 Submission - Order Management Module

## Objective Completed

The project includes a full Order Management Module built with the MERN stack.

### Backend deliverables

- Created MongoDB schemas for:
  - `Order`
  - Embedded `orderItems`
- Built REST APIs for:
  - Place Order
  - View Orders for logged-in user
  - Cancel Order
- Added JWT authentication for logged-in order history and cancellation security
- Added seeded sample products for end-to-end testing

### Frontend deliverables

- Built a product catalog page with cart support
- Integrated checkout form with backend `Place Order` API
- Displayed order history for logged-in users
- Added cancel order action from the UI

### API testing deliverables

- Added Postman collection:
  - `postman/Day15_Order_Management.postman_collection.json`
- Included testing steps in `SETUP.md`

## Files of Interest

- Backend entry: `server/server.js`
- Order schema: `server/models/Order.js`
- Order controller: `server/controllers/orderController.js`
- Frontend app: `client/src/App.jsx`
- Checkout UI: `client/src/components/CheckoutPanel.jsx`
- Order history UI: `client/src/components/OrderHistory.jsx`

## Notes

- Product data is seeded from `server/data/products.js`.
- Cart state is stored on the frontend with `localStorage`.
- Cancelling an order restores product stock in MongoDB.

## Pending user-side deliverables

These require running the app locally:

1. Push the final `DAY 15` project to your GitHub repository.
2. Capture Postman screenshots after executing the included collection.
