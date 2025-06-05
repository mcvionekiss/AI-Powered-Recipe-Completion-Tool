const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', async (req, res) => {
  const { name, quantity, unit, description, userId } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO recipe_ingredient (name, quantity, unit, description, userId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [name, quantity, unit, description, userId]
    );
    res.json({ id: result.insertId, message: 'Ingredient added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM recipe_ingredient');
    console.log("Fetched ingredients:", rows);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { name, quantity, unit, description } = req.body;
  const { id } = req.params;
  try {
    await db.execute(
      'UPDATE recipe_ingredient SET name = ?, quantity = ?, unit = ?, description = ?, updatedAt = NOW() WHERE id = ?',
      [name, quantity, unit, description, id]
    );
    res.json({ message: 'Ingredient updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM recipe_ingredient WHERE id = ?', [req.params.id]);
    res.json({ message: 'Ingredient deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;