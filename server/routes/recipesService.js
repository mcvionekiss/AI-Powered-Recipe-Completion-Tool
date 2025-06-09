const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE
router.post("/", async (req, res) => {
  const { name, description, userId, foodCategory, cuisine } = req.body;
  console.log(
    "Adding recipe:",
    name,
    description,
    userId,
    foodCategory,
    cuisine
  );
  try {
    const [result] = await db.execute(
      "INSERT INTO recipe (name, description, userId, foodCategory, cuisine, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [name, description, userId, foodCategory, cuisine]
    );
    res.json({ id: result.insertId, message: "Recipe added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  console.log("Fetching all recipes");
  try {
    const [rows] = await db.execute("SELECT * FROM recipe");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//READ SPECIFIC USERS RECIPES
router.get("/user", async (req, res) => {
  try {
    const [data] = await db.execute("SELECT * FROM recipe WHERE userId=?", [
      req.query.userId,
    ]);
    res.json(data);
  } catch (error) {
    console.log("Error fetching user recipes", error);
  }
});

//READ USER INGREDIENTS
router.get("/ingredients", async (req, res) => {
  console.log("Fetching ingredients");
  try {
    const [rows] = await db.execute("SELECT * FROM ingredient WHERE userId=?", [
      req.query.userId,
    ]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    await db.execute(
      "UPDATE recipe SET name = ?, description = ?, updatedAt = NOW() WHERE id = ?",
      [name, description, id]
    );
    res.json({ message: "Recipe updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/data", async (req, res) => {
  try {
    console.log("inside function");
    console.log("req.query.name:", req.query.name);
    console.log("req.query.userId:", req.query.userId);
    const data = await db.execute(
      "SELECT * FROM recipe WHERE name=? AND userId=?",
      [req.query.name, req.query.userId]
    );

    await db.execute("DELETE FROM recipe WHERE id=? and userID=?", [
      data[0][0].id,
      data[0][0].userId,
    ]);
    res.json({ message: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE THIS IS WHERE THE ERROR IS HAPPENING
router.delete("/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM recipe WHERE id = ?", [req.params.id]);
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//add recipe data to recipe table
router.post("/addRecipe", async (req, res) => {
  console.log("Adding recipe");
  const { name, description, instructions, userId, foodCategory, cuisine } =
    req.body;
  console.log("userId:", userId);
  console.log("name:", name);
  console.log("description:", description);
  console.log("instructions:", instructions);
  console.log("foodCategory:", foodCategory);
  console.log("cuisine:", cuisine);
  try {
    await db.execute(
      "INSERT INTO recipe (name, description, instructions, userId, foodCategory, cuisine) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, instructions, userId, foodCategory, cuisine]
    );
    console.log("Recipe added");
    res.json(`Recipe added`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
