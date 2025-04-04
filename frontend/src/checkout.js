// src/Checkout.js
import { useEffect, useState } from 'react';
import './checkout.css';

function Checkout({ clientId, onBack }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [pedidoId, setPedidoId] = useState(null);
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/cart/${clientId}`);
      const data = await res.json();
      setCart(data);
      setLoading(false);
    };

    fetchCart();
  }, [clientId]);

  const handleCheckout = async () => {
    const res = await fetch('http://localhost:4000/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente_id: clientId, direccion }),
      });      

    const data = await res.json();
    if (res.ok && data.success) {
      setPedidoId(data.pedido_id);
      setDone(true);
    } else {
      alert(data.message || 'Checkout failed');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <button onClick={onBack}>⬅ Volver al carrito</button>

      {loading ? (
        <p>Loading...</p>
      ) : done ? (
        <div className="success-message">
          <h3>✅ Pedido realizado con exito!</h3>
          <p>Your order ID is <strong>{pedidoId}</strong>.</p>
        </div>
      ) : (
        <>
        <div className="checkout-address">
        <label htmlFor="direccion"><strong>Dirección de entrega:</strong></label>
        <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Calle 123, Ciudad, País"
            required
        />
        </div>

          <table className="checkout-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.idProducto}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>${Number(item.precio).toFixed(2)}</td>
                  <td>${(item.precio * item.cantidad).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="checkout-summary">
            <strong>Total: ${total}</strong>
            <button className="checkout-btn" onClick={handleCheckout}>
              ✅ Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
