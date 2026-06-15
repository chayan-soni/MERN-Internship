const fs = require("fs");

const errorHandler = (err, req, res, next) => {

  const logMessage =
    `[${new Date().toISOString()}] ${err.message}\n`;

  fs.appendFileSync(
    "./logs/error.log",
    logMessage
  );

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

module.exports = errorHandler;