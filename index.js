// Import the required packages
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static("public"));

// Endpoint to fetch generated text
app.get("/generate", async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required in the URL as a query parameter." });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003", // Choose the model you want to use
        prompt: `Write an engaging landing page text based on the keyword: ${keyword}.`,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const generatedText = response.data.choices[0].text.trim();
    res.json({ keyword, text: generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate text." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
