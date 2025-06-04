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
  try {
    const [rows] = await db.execute('SELECT * FROM recipe');
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

module.exports = router;