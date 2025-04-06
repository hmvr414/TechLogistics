const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /transportistas
router.get('/', (req, res) => {
  db.query('SELECT * FROM transportistas', (err, results) => {
    if (err) {
      console.error('Error recuperando los transportistas:', err);
      return res.status(500).json({ error: 'Fallo recuperando los transportistas' });
    }
    res.json(results);
  });
});

module.exports = router;
