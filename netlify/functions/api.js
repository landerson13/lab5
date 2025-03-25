// netlify/functions/api.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config(); // Loads environment variables from the .env file

const api = express();
const router = express.Router();

// Get your Spoonacular API Key from the environment
const API_KEY = process.env.SPOONACULAR_API_KEY;

// Recipe search endpoint
router.get("/recipes", async (req, res) => {
  const query = req.query.query;
  const dietaryRestrictions = req.query.dietaryRestrictions;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&diet=${dietaryRestrictions}&apiKey=${API_KEY}`
    );

    // Check for successful response
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Get the data in JSON format
    const data = await response.json();

    // Respond with recipe search results
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Use the router for handling routes
api.use("/api/", router);

// Export the handler for serverless deployment
export const handler = serverless(api);

