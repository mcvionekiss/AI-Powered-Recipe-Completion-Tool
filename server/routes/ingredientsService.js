const db = require("../db");
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

// CREATE an ingredient
router.post("/", async (req, res) => {
  const { name, quantity, unit, description, userId } = req.body;
  try {
    const [result] = await db.execute(
      `INSERT INTO ingredient (name, quantity, unit, description, userId, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [name, quantity, unit, description, userId]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error("Create ingredient error:", err);
    res.status(500).json({ error: err.message });
  }
});

// READ all ingredients by userId
router.get("/", async (req, res) => {
  const { userId } = req.query;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM ingredient WHERE userId = ?",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Get ingredients error:", err);
    res.status(500).json({ error: err.message });
  }
});

// READ one ingredient by ID and userId
router.get("/:id", async (req, res) => {
  const { userId } = req.query;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM ingredient WHERE id = ? AND userId = ?",
      [req.params.id, userId]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Ingredient not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Get single ingredient error:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE an ingredient by ID and userId
router.put("/:id", async (req, res) => {
  const { name, quantity, unit, description, userId } = req.body;
  try {
    const [result] = await db.execute(
      `UPDATE ingredient SET name = ?, quantity = ?, unit = ?, description = ?, updatedAt = CURRENT_TIMESTAMP
       WHERE id = ? AND userId = ?`,
      [name, quantity, unit, description, req.params.id, userId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Ingredient not found or not authorized" });
    res.json({ message: "Ingredient updated" });
  } catch (err) {
    console.error("Update ingredient error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE an ingredient by ID and userId
router.delete("/:id", async (req, res) => {
  const { userId } = req.query;
  try {
    const [result] = await db.execute(
      "DELETE FROM ingredient WHERE id = ? AND userId = ?",
      [req.params.id, userId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Ingredient not found or not authorized" });
    res.json({ message: "Ingredient deleted" });
  } catch (err) {
    console.error("Delete ingredient error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;