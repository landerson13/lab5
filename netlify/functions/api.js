import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const api = express();
const router = express.Router();

// API key for spoonacular 
const API_KEY = process.env.SPOONACULAR_API_KEY;

// The recipe search endpoint
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

    // Throws error if response is not valid
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Gets the response data
    const data = await response.json();

    // Respond with recipe search results
    res.json(data);
  } 
  
  catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


api.use("/api/", router);
export const handler = serverless(api);

