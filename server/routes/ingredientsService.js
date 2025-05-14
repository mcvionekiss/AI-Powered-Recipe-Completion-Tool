const express = require("express");
const axios = require("axios");

// create router
const router = express.Router();
// This is an example of a GET request handler
// Parameter 1 -> if retrieving all, then we use / | if retrieving a specific dataset, then we use /:id
// Parameter 2 -> an asynchronous function taking in the request and response objects
router.get("/search", async (req, res) => {
  const { search_query } = req.query;
  console.log("Search query:", search_query);
  try {
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search`,
      {
        params: {
          query: search_query,
          api_key: process.env.NUTRITION_API_KEY,
        },
      }
    );
    const results = response.data.foods;
    console.log("Fetched food items in backend:", results);
    res.json(results);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ error: "Failed to fetch food items" });
  }
});

module.exports = router;
