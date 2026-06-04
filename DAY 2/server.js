const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();

app.use(express.static("public"));
    
const PORT = 3000;

app.get("/users", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "data.json");

    const data = await fs.readFile(filePath, "utf-8");

    const users = JSON.parse(data);

    const activeUsers = users.filter(
      user => user.active === true
    );

    res.json({
      success: true,
      data: activeUsers
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error reading file"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});