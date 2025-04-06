const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /shipping/:pedido_id
router.get('/:pedido_id', (req, res) => {
  const pedido_id = req.params.pedido_id;

  const query = `
    SELECT e.*, es.nombre AS estado_nombre
    FROM envios e
    JOIN estadosenvio es ON es.estado_id = e.estado_id
    WHERE e.pedido_id = ?
  `;

  db.query(query, [pedido_id], (err, results) => {
    if (err) {
      console.error('Failed to get shipping info:', err);
      return res.status(500).json({ success: false });
    }
    res.json(results[0]);
  });
});

// GET /shipping/states
router.get('/estado/all', (req, res) => {
  db.query('SELECT * FROM estadosenvio', (err, results) => {
    if (err) {
      console.error('Failed to get estadosenvio:', err);
      return res.status(500).json({ success: false });
    }
    res.json(results);
  });
});

// PUT /shipping/:pedido_id
router.put('/:pedido_id', (req, res) => {
  const { estado_id } = req.body;
  const pedido_id = req.params.pedido_id;

  db.query(
    'UPDATE envios SET estado_id = ? WHERE pedido_id = ?',
    [estado_id, pedido_id],
    (err) => {
      if (err) {
        console.error('Fallo actualizando el estado de envío:', err);
        return res.status(500).json({ success: false });
      }
      res.json({ success: true });
    }
  );
});

module.exports = router;
