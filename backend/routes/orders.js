const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /orders/:cliente_id
router.get('/:cliente_id', (req, res) => {
  const cliente_id = req.params.cliente_id;

  const query = `
    SELECT 
      p.pedido_id,
      p.fecha_pedido,
      p.total,
      e.estado_id,
      es.nombre AS estado_nombre
    FROM pedidos p
    JOIN envios e ON e.pedido_id = p.pedido_id
    JOIN estadosenvio es ON es.estado_id = e.estado_id
    WHERE p.cliente_id = ?
    ORDER BY p.fecha_pedido DESC
  `;

  db.query(query, [cliente_id], (err, results) => {
    if (err) {
      console.error('Fallo al recuperar los pedidos:', err);
      return res.status(500).json({ success: false });
    }
    res.json(results);
  });
});

// GET /orders/admin/:cliente_id
router.get('/admin/:cliente_id', (req, res) => {
    const cliente_id = req.params.cliente_id;
  
    const query = `
      SELECT 
        p.pedido_id,
        p.fecha_pedido,
        p.total,
        GROUP_CONCAT(CONCAT(pr.nombre, ' (x', dp.cantidad, ')') SEPARATOR ', ') AS productos
      FROM pedidos p
      JOIN detallepedido dp ON dp.pedido_id = p.pedido_id
      JOIN productos pr ON pr.producto_id = dp.producto_id
      WHERE p.cliente_id = ?
      GROUP BY p.pedido_id
      ORDER BY p.fecha_pedido DESC
    `;
  
    db.query(query, [cliente_id], (err, results) => {
      if (err) {
        console.error('Fallo al recuperar los pedidos:', err);
        return res.status(500).json({ error: 'Error recuperando ordenes' });
      }
      res.json(results);
    });
  });
  

module.exports = router;
