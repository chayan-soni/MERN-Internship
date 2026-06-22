# Day 16 Submission - Product Review & Rating Module

## Objective Completed

The project extends the Day 15 store with a complete Product Review and Rating Module.

### Backend deliverables

- Created MongoDB review persistence with product-level rating aggregates
- Built REST APIs for:
  - Add Review
  - Edit Review
  - Delete Review
  - Fetch Product Reviews
- Added review ownership validation so users can manage only their own reviews
- Implemented dynamic average rating and review count recalculation after review changes

### Frontend deliverables

- Added a product review panel into the React storefront
- Displayed average rating and total review count on product cards
- Integrated add, edit, and delete review actions into the frontend
- Added client-side validation for title, comment length, and rating value

### API testing deliverables

- Added Postman collection:
  - `postman/Day16_Product_Reviews.postman_collection.json`
- Included testing steps in `SETUP.md`

## Files of Interest

- Backend entry: `server/server.js`
- Review schema: `server/models/Review.js`
- Review controller: `server/controllers/reviewController.js`
- Rating aggregation helper: `server/utils/reviewHelpers.js`
- Frontend app: `client/src/App.jsx`
- Product review UI: `client/src/components/ProductReviewPanel.jsx`
- Product listing UI: `client/src/components/ProductCatalog.jsx`

## Notes

- Day 15 ordering flow remains available in this project.
- Each user can create only one review per product.
- Product cards update their average rating and review count after review mutations.

## Pending user-side deliverables

These require running the app locally:

1. Push the final `DAY 16` project to your GitHub repository.
2. Capture frontend screenshots showing the review UI.
3. Capture Postman screenshots after executing the included review endpoints.
