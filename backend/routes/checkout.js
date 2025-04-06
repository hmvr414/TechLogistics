const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /checkout
// Body: { cliente_id }
router.post('/', (req, res) => {
    const { cliente_id, direccion } = req.body;

  const getCartQuery = `
    SELECT c.producto_id, c.cantidad, p.precio
    FROM carrito c
    JOIN productos p ON c.producto_id = p.producto_id
    WHERE c.cliente_id = ?
  `;
console.log('Recuperando carrito para cliente cliente_id:', cliente_id);
  db.query(getCartQuery, [cliente_id], (err, cartItems) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to get cart' });
    if (cartItems.length === 0) return res.status(400).json({ success: false, message: 'Cart is empty' });

    const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    const insertPedidoQuery = `
      INSERT INTO pedidos (cliente_id, total, fecha_entrega_estimada)
      VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))
    `;

    db.query(insertPedidoQuery, [cliente_id, total], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Failed to create order' });

      const pedido_id = result.insertId;

      const detalleValues = cartItems.map(item => [pedido_id, item.producto_id, item.cantidad, item.precio]);

      const insertDetalleQuery = `
        INSERT INTO detallepedido (pedido_id, producto_id, cantidad, precio_unitario)
        VALUES ?
      `;

      db.query(insertDetalleQuery, [detalleValues], (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Failed to create order details' });

        db.query('DELETE FROM carrito WHERE cliente_id = ?', [cliente_id], (err) => {
          if (err) console.warn('Pedido creado pero fallo al limpiar el carrito');

          const insertEnvioQuery = `
        INSERT INTO envios (
            pedido_id,
            transportista_id,
            ruta_id,
            estado_id,
            fecha_estimada_entrega,
            direccion
        )
        VALUES (?, 1, 1, 1, DATE_ADD(NOW(), INTERVAL 7 DAY), ?)
        `;

        db.query(insertEnvioQuery, [pedido_id, direccion], (err) => {
        if (err) {
            console.error('Error creando el envio:', err);
            return res.status(500).json({ success: false, message: 'Failed to save shipping info' });
        }

        db.query('DELETE FROM carrito WHERE cliente_id = ?', [cliente_id], (err) => {
            if (err) console.warn('Orden creada pero fallo al limpiar el carrito');
            res.json({ success: true, pedido_id });
        });
        });
        });
      });
    });
  });
});

module.exports = router;
