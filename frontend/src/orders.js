// src/Orders.js
import { useEffect, useState } from 'react';
import './orders.css';

function Orders({ clientId, onBack }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/orders/${clientId}`)
      .then((res) => res.json())
      .then(setOrders)
      .catch((err) => console.error('Error consultando los pedidos:', err));
  }, [clientId]);

  return (
    <div className="orders-container">
      <h2>Tus pedidos</h2>
      <button onClick={onBack}>⬅ Volver a la tienda</button>
      {orders.length === 0 ? (
        <p>No se encontraron pedidos.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID del pedido</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado de envío</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.pedido_id}>
                <td>{o.pedido_id}</td>
                <td>{new Date(o.fecha_pedido).toLocaleString()}</td>
                <td>${Number(o.total).toFixed(2)}</td>
                <td>{o.estado_nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
