const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/day3db")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log("Server Running");
});

const userRoutes = require("./routes/userRoutes");

app.use("/users", userRoutes);

const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);