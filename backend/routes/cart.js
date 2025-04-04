const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /cart
// Body: { cliente_id, producto_id, cantidad }
router.post('/', (req, res) => {
  const { cliente_id, producto_id, cantidad } = req.body;

  const query = `
    INSERT INTO carrito (cliente_id, producto_id, cantidad)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE cantidad = cantidad + ?
  `;

  db.query(query, [cliente_id, producto_id, cantidad, cantidad], (err, result) => {
    if (err) {
      console.error('Error adding to cart:', err);
      return res.status(500).json({ success: false, message: 'Error updating cart' });
    }

    res.json({ success: true });
  });
});

// GET /cart/:cliente_id
router.get('/:cliente_id', (req, res) => {
    const cliente_id = req.params.cliente_id;
  
    const query = `
      SELECT p.producto_id, p.nombre, p.precio, c.cantidad
      FROM carrito c
      JOIN productos p ON c.producto_id = p.producto_id
      WHERE c.cliente_id = ?
    `;
  
    db.query(query, [cliente_id], (err, results) => {
      if (err) {
        console.error('Error fetching cart:', err);
        return res.status(500).json({ success: false });
      }
  
      res.json(results);
    });
  });
  
  // PUT /cart — update quantity
  router.put('/', (req, res) => {
    const { cliente_id, producto_id, cantidad } = req.body;
    console.log(cliente_id, producto_id, cantidad);
    if (cantidad <= 0) {
      // Delete if quantity is 0
      db.query(
        'DELETE FROM carrito WHERE cliente_id = ? AND producto_id = ?',
        [cliente_id, producto_id],
        (err) => {
          if (err) return res.status(500).json({ success: false });
          res.json({ success: true });
        }
      );
    } else {
      db.query(
        'UPDATE carrito SET cantidad = ? WHERE cliente_id = ? AND producto_id = ?',
        [cantidad, cliente_id, producto_id],
        (err) => {
          if (err) return res.status(500).json({ success: false });
          res.json({ success: true });
        }
      );
    }
  });
  
  // DELETE /cart/:cliente_id — clear entire cart
  router.delete('/:cliente_id', (req, res) => {
    db.query(
      'DELETE FROM carrito WHERE cliente_id = ?',
      [req.params.cliente_id],
      (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
      }
    );
  });
  

module.exports = router;
