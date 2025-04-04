const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /transportistas
router.get('/', (req, res) => {
  db.query('SELECT * FROM transportistas', (err, results) => {
    if (err) {
      console.error('Error fetching transportistas:', err);
      return res.status(500).json({ error: 'Failed to fetch transportistas' });
    }
    res.json(results);
  });
});

module.exports = router;
