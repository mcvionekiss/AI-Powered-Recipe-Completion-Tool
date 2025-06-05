const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', async (req, res) => {
  const { name, description, userId } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO recipe (name, description, userId, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
      [name, description, userId]
    );
    res.json({ id: result.insertId, message: 'Recipe added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  console.log("Fetching all recipes");
  try {
    const [rows] = await db.execute('SELECT * FROM recipe');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//READ USER INGREDIENTS
router.get("/ingredients", async (req, res) => {
  console.log("Fetching ingredients");
  try {
    const [rows] = await db.execute('SELECT * FROM ingredient WHERE userId=?', [req.query.userId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    await db.execute(
      'UPDATE recipe SET name = ?, description = ?, updatedAt = NOW() WHERE id = ?',
      [name, description, id]
    );
    res.json({ message: 'Recipe updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM recipe WHERE id = ?', [req.params.id]);
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//add recipe data to recipe table
router.post('/addRecipe', async (req, res) => {
  console.log("Adding recipe");
  const { name, description, instructions} = req.body;
  console.log("name:", name);
  console.log("description:", description);
  console.log("instructions:", instructions);
  try {
    await db.execute('INSERT INTO recipe (name, description, instructions, userId) VALUES (?, ?, ?, ?)', [name, description, instructions, 6]);
    console.log("Recipe added");
    res.json(`Recipe added`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;