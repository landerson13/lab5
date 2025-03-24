import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const api = express();
const router = express.Router();

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

// Endpoint to search for recipes
router.get("/recipes", async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    
    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?query=${encodeURIComponent(query)}&apiKey=${API_KEY}`
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
      `${BASE_URL}/recipes/${recipeId}/information?apiKey=${API_KEY}`
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

api.use("/.netlify/functions/api", router);

export default api;
export const handler = serverless(api);
