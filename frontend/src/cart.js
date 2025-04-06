// src/Cart.js
import { useEffect, useState } from 'react';
import './cart.css';

function Cart({ clientId, onBack, onCheckout }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/cart/${clientId}`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error('Error cargando el carrito:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (producto_id, newQty) => {
    try {
      await fetch('http://localhost:4000/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente_id: clientId, producto_id, cantidad: newQty }),
      });
      fetchCart();
    } catch (err) {
      console.error('Error actualizando la cantidad:', err);
    }
  };

  const clearCart = async () => {
    if (!window.confirm('Eliminar todos los items del carrito?')) return;
    await fetch(`http://localhost:4000/cart/${clientId}`, { method: 'DELETE' });
    fetchCart();
  };

  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2);

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      <button onClick={onBack}>⬅ Volver a la tienda</button>
      {loading ? (
        <p>Cargando...</p>
      ) : cart.length === 0 ? (
        <p>Tu carrito esta vacío.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.producto_id}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>${Number(item.precio).toFixed(2)}</td>
                  <td>${(item.precio * item.cantidad).toFixed(2)}</td>
                  <td>
                    <button onClick={() => updateQuantity(item.producto_id, item.cantidad + 1)}>➕</button>
                    <button onClick={() => updateQuantity(item.producto_id, item.cantidad - 1)}>➖</button>
                    <button onClick={() => updateQuantity(item.producto_id, 0)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <strong>Total: ${total}</strong>
            <div className="cart-actions">
              <button onClick={clearCart}>🗑 Limpiar Carrito</button>
              <button onClick={onCheckout}>✅ Ir al checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
