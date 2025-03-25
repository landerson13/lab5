import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const api = express();
const router = express.Router();

// Get Spoonacular API Key from .env file
const API_KEY = process.env.SPOONACULAR_API_KEY; // Add your Spoonacular API key in .env

// Endpoint to search for recipes
router.get("/recipes", async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&apiKey=${API_KEY}`
    );

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Get the data in JSON format
    const data = await response.json();

    // Respond with the data
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to get recipe details by ID
router.get("/recipes/:id/information", async (req, res) => {
  const recipeId = req.params.id;

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Get the data in JSON format
    const data = await response.json();

    // Respond with the recipe details
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Use this route for the API
api.use("/.netlify/functions/api", router);

// Export for serverless deployment
export const handler = serverless(api);
