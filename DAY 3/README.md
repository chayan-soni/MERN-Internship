# MERN Stack Internship - Day 3

## Overview

This project was completed as part of the MERN Stack Internship Day 3 assignment.

The application demonstrates:

* MongoDB integration using Mongoose
* Express.js server setup
* Schema creation and validation
* REST API development
* Centralized error handling middleware
* API testing using Postman

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Postman

---

## Project Structure

DAY 3
│
├── models
│   └── User.js
│
├── routes
│   └── userRoutes.js
│
├── middleware
│   └── errorHandler.js
│
├── server.js
├── package.json
└── package-lock.json


---

## Installation

1. Clone the repository

 clone <repository-url>

2. Navigate to project directory


cd DAY-3

3. Install dependencies


npm install


4. Start MongoDB

Make sure MongoDB is running locally.

5. Run the server


node server.js


---

## API Endpoints

### Create User

http
POST /users


Request Body:

json
{
  "name": "Chayan",
  "email": "chayan@gmail.com",
  "age": 19
}


---

### Get All Users

```http
GET /users
```

---

### Get User By ID

```http
GET /users/:id
```

---

## Error Handling

The application uses centralized error handling middleware to provide consistent JSON responses for:

* Validation Errors
* Invalid IDs
* Missing Resources
* Internal Server Errors

Example Response:

```json
{
  "success": false,
  "message": "User validation failed"
}
```

---

## Learning Outcomes

* Connected Express applications with MongoDB.
* Created Mongoose schemas and models.
* Implemented database CRUD operations.
* Built custom middleware.
* Handled application errors centrally.
* Tested APIs using Postman.

---

## Author

Chayan

MERN Stack Internship - Day 3
