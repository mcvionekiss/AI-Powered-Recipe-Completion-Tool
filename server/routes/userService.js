const db = require("../db"); // import the database connection
const express = require("express");
const cookieParser = require("cookie-parser");

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

router.get("/profile", async (req, res) => {
  const userId = req.cookies?.userId;
  if (!userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
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
      const user = rows[0];
      res.cookie("userId", user.id, {
        httpOnly: true,
        sameSite: "None",
        secure: true, // change to true in production with HTTPS
      });
      res.json({ success: true, user });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Failed to login user" });
  }
});

router.get("/ingredients", async (req, res) => {
  try {
    console.log("inside ingredients route");
    const [ingredients] = await db.query(
      "SELECT * FROM ingredient WHERE userid = ?",
      [4]
    );
    console.log("Fetched ingredients:", ingredients);
  } catch (error) {
    console.log("Error fetching ingredients:", error);
  }
});

// Get recipe food ratios for user
router.get("/ratios", async (req, res) => {
  console.log("Fetching food ratios");

  try {
    // Grab ratios for fooCategory
    const [food_category_rows] = await db.execute(
      "SELECT foodCategory, userId, COUNT(foodCategory) AS count FROM recipe WHERE foodCategory IS NOT NULL and userId = ? GROUP BY foodCategory, userId ORDER BY count DESC",
      [req.query.userId]
    );

    // Grab ratios for cuisine
    const [cuisine_rows] = await db.execute(
      "SELECT cuisine, userId, COUNT(cuisine) AS count FROM recipe WHERE cuisine IS NOT NULL and userId = ? GROUP BY cuisine, userId ORDER BY count DESC",
      [req.query.userId]
    );

    // Combine results into a single object
    const ratios = {
      foodCategory: food_category_rows,
      cuisine: cuisine_rows,
    };
    res.json(ratios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// grab total number of recipes for user
router.get("/totalRecipes", async (req, res) => {
  console.log("Fetching total number of recipes for user");

  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) AS total FROM recipe WHERE userId = ?",
      [req.query.userId]
    );
    res.json({ total: rows[0].total });
  } catch (error) {
    console.error("Error fetching total recipes:", error);
    res.status(500).json({ error: "Failed to fetch total recipes" });
  }
});

// grab t otal number of ingredients for user
router.get("/totalIngredients", async (req, res) => {
  console.log("Fetching total number of ingredients for user");

  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) AS total FROM ingredient WHERE userId = ?",
      [req.query.userId]
    );
    res.json({ total: rows[0].total });
  } catch (error) {
    console.error("Error fetching total ingredients:", error);
    res.status(500).json({ error: "Failed to fetch total ingredients" });
  }
});

// grabs most recent recipe for user
router.get("/recentRecipe", async (req, res) => {
  console.log("Fetching most recent recipe for user");
  try {
    const [rows] = await db.query(
      "SELECT * FROM recipe WHERE userId = ? ORDER BY createdAt DESC LIMIT 1",
      [req.query.userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "No recipes found for user" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching recent recipe:", error);
    res.status(500).json({ error: "Failed to fetch recent recipe" });
  }
});

// LOGOUT a user
router.post("/logout", (req, res) => {
  res.clearCookie("userId", {
    httpOnly: true,
    sameSite: "Lax",
    secure: true, // change to true in production with HTTPS
  });
  // domain: "localhost", // specify domain if needed});
  res.status(200).json({ message: "Logged out" });
});

// READ a specific user by ID
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [userId]);
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });
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
module.exports = router;
