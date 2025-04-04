const express = require('express');
const router = express.Router();
const db = require('../db'); 

// GET /clientes
router.get('/', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      console.error('Error fetching clientes:', err);
      return res.status(500).json({ error: 'Failed to fetch clientes' });
    }
    res.json(results);
  });
});

module.exports = router;
