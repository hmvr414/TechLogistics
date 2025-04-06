const express = require('express');
const router = express.Router();
const db = require('../db'); 

// GET /products
router.get('/', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('Error recuperando productos:', err);
      res.status(500).json({ error: 'Error recuperando productos' });
      return;
    }

    res.json(results);
  });
});

// POST /products — insert a new product
router.post('/', (req, res) => {
  const { nombre, descripcion, precio, peso } = req.body;

  const query = `
    INSERT INTO productos (nombre, descripcion, precio, peso)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [nombre, descripcion, precio, peso], (err, result) => {
    if (err) {
      console.error('Error al insertar un producto:', err);
      return res.status(500).json({ success: false, message: 'Error saving product' });
    }

    res.status(201).json({ success: true, idProducto: result.insertId });
  });
});

// DELETE /products/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM productos WHERE producto_id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error eliminado el producto:', err);
      return res.status(500).json({ success: false, message: 'Error deleting product' });
    }

    res.json({ success: true });
  });
});

// PUT /products/:id — update a product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, peso } = req.body;

  const query = `
    UPDATE productos
    SET nombre = ?, descripcion = ?, precio = ?, peso = ?
    WHERE producto_id = ?
  `;

  db.query(query, [nombre, descripcion, precio, peso, id], (err, result) => {
    if (err) {
      console.error('Error error actualizando el producto:', err);
      return res.status(500).json({ success: false, message: 'Error updating product' });
    }

    res.json({ success: true });
  });
});


module.exports = router;
