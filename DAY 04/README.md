# MERN Stack Internship – Day 4

## 📌 Objective

The objective of Day 4 was to learn the fundamentals of React.js, understand component-based architecture, manage state using React Hooks, and establish communication between a React frontend and an Express backend using CORS and the Fetch API.

---

## 📚 Topics Covered

### React.js Fundamentals

* Component-Based Architecture
* JSX (JavaScript XML)
* Virtual DOM
* Functional Components

### React Hooks

* useState
* useEffect

### Backend Integration

* Express.js API
* CORS Middleware
* Fetch API

---

## 🏗️ Project Structure


DAY 4
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── node_modules
│
└── frontend
    ├── src
    │   ├── components
    │   │   ├── StudentForm.jsx
    │   │   └── StudentList.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── public
    ├── package.json
    └── node_modules


---

## ⚙️ Backend Setup

### Install Dependencies


npm install express cors


### Start Backend Server

```bash
node server.js
```

Server runs on:

```text
http://localhost:5000
```

API Endpoint:

```text
GET /students
```

---

## ⚙️ Frontend Setup

### Install Dependencies

```bash
npm install
```

### Run React Application

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🚀 Features Implemented

* Reusable React Components
* State Management using useState
* Data Fetching using useEffect
* Backend API Integration
* CORS Configuration
* Dynamic Student Data Rendering
* Modular Project Structure

---

## 🔄 Application Workflow

1. React application loads in the browser.
2. StudentList component mounts.
3. useEffect executes automatically.
4. Fetch API sends a request to the Express backend.
5. Backend returns student data in JSON format.
6. React updates the state.
7. Student information is displayed dynamically on the screen.

---

## 🧠 Key Concepts Learned

### useState

Used to manage dynamic data inside React components.

### useEffect

Used to perform side effects such as API calls when a component loads.

### CORS

Allows communication between frontend and backend running on different ports.

### Fetch API

Used to request data from backend services.

---

## 📸 Output

The application successfully:

* Displays a student form.
* Captures user input using useState.
* Retrieves student records from the backend.
* Renders data dynamically in React components.

---

## ✅ Assignment Status

Completed Successfully

### Technologies Used

* React.js
* Vite
* JavaScript (ES6+)
* Node.js
* Express.js
* CORS
* HTML5
* CSS3
* Fetch API
* Git & GitHub
