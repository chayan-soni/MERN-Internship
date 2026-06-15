const express = require("express");

const errorHandler =
  require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());


// Success Route

app.get("/success", (req, res) => {

  res.status(200).json({
    success: true,
    message: "API is working successfully"
  });

});


// Error Route

app.get("/error", (req, res, next) => {

  const error =
    new Error("This is a custom API error");

  error.statusCode = 400;

  next(error);

});


// Invalid Route Handling

app.use((req, res, next) => {

  const error =
    new Error("Route Not Found");

  error.statusCode = 404;

  next(error);

});


// Centralized Error Middleware

app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});