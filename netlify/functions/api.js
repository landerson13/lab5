const express = require("express");
const serverless = require("serverless-http");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const router = express.Router();

const API_KEY = process.env.SPOONACULAR_API_KEY;

if (!API_KEY) {
  console.error("API key is missing. Please set your SPOONACULAR_API_KEY in .env file.");
}

// Middleware to parse JSON
app.use(express.json());

// Endpoint to search for recipes
router.get("/recipes", async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get recipe details
router.get("/recipes/:id/information", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Using the router
app.use("/.netlify/functions/api", router);  // Base path to the API

// Export handler for serverless
module.exports.handler = serverless(app);
