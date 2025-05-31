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
