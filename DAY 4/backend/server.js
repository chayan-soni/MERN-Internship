const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const students = [
  {
    id: 1,
    name: "Chayan",
    course: "Computer Science",
  },
  {
    id: 2,
    name: "Rahul",
    course: "Mechanical Engineering",
  },
  {
    id: 3,
    name: "Priya",
    course: "Information Technology",
  },
  {
    id: 4,
    name: "Ananya",
    course: "Electronics",
  },
];

app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});