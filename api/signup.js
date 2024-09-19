const express = require("express");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch"); // Import fetch to make external requests

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Serve static files (the front-end)
app.use(express.static(path.join(__dirname, "public")));

// API to handle form submission
app.post("/api/signup", async (req, res) => {
  const { name, email } = req.body;

  try {
    // Simulate Zapier webhook integration
    const zapierWebhookUrl =
      "https://hooks.zapier.com/hooks/catch/19298202/2dojfeq/";
    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      res.json({
        message: "User successfully signed up and added to the workflow!",
      });
    } else {
      res.status(500).json({ message: "Failed to add user to the workflow." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while adding user to Zapier." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
