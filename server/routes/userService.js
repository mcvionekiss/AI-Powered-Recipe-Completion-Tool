const db = require("../db"); // import the database connection
const express = require("express");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM user");
    console.log("Fetched users:", users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// CREATE a new user
router.post("/", async (req, res) => {
  const { firstName, lastName, email, password, dietaryPreferences } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO user (firstName, lastName, email, password, dietaryPreferences, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())",
      [firstName, lastName, email, password, dietaryPreferences]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// READ a specific user by ID
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [userId]);
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// UPDATE a user
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, dietaryPreferences } = req.body;
  try {
    await db.query(
      "UPDATE user SET firstName = ?, lastName = ?, email = ?, dietaryPreferences = ?, updatedAt = CURRENT_TIMESTAMP() WHERE id = ?",
      [firstName, lastName, email, dietaryPreferences, userId]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await db.query("DELETE FROM user WHERE id = ?", [userId]);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// LOGIN a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, password]
    );
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Failed to login user" });
  }
});

router.get("/ingredients", async (req, res) => {
  try{
    console.log("inside ingredients route");
    const [ingredients] = await db.query("SELECT * FROM ingredient WHERE userid = ?", [4]);
    console.log("Fetched ingredients:", ingredients);
  }catch(error){
    console.log("Error fetching ingredients:", error);
  }


});


module.exports = router;