# MERN Stack Internship – Day 2 Assignment

## Overview

This project was completed as part of the MERN Stack Internship Day 2 assignment.

The assignment focuses on:

* Asynchronous programming using Async/Await
* Error handling using Try/Catch
* Working with Node.js core modules (`fs` and `path`)
* Creating API routes using Express.js
* Fetching data from a backend using the Fetch API

---

## Technologies Used

* Node.js
* Express.js
* File System (fs) Module
* Path Module
* HTML
* JavaScript (ES6)
* Fetch API

---

## Project Structure

```
Day2-Assignment/
│
├── public/
│   └── index.html
│
├── data.json
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## Features

### Backend

* Express server setup
* GET API route (`/users`)
* Asynchronous file reading using `fs.promises`
* Data filtering
* JSON response generation
* Error handling with Try/Catch

### Frontend

* Fetch API implementation
* Asynchronous data retrieval
* Console output of API response

---

## API Endpoint

### GET `/users`

Returns filtered user data from the local JSON file.

Example Response:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John",
      "active": true
    },
    {
      "id": 3,
      "name": "Bob",
      "active": true
    }
  ]
}
```

---

## How to Run the Project

### Install Dependencies

```bash
npm install
```

### Start the Server

```bash
node server.js
```

### Open in Browser

Visit:

```
http://localhost:3000
```

Open Developer Tools (F12) and check the Console to view the fetched API response.

---

## Learning Outcomes

Through this assignment, I learned:

* How asynchronous operations work in Node.js
* Using Async/Await for cleaner code
* Implementing Try/Catch for error handling
* Reading local files using the File System module
* Creating Express.js routes
* Sending JSON responses from a backend server
* Consuming APIs using the Fetch API

---

## Author

Chayan

MERN Stack Internship – Day 2

