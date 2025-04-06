// src/AdminOrders.js
import { useEffect, useState } from 'react';
import './orders.css';
import ShippingDetails from './shippingdetails'; // ✅ Import the new component

function AdminOrders({ clientId, clientName, onBack }) {
  const [orders, setOrders] = useState([]);
  const [viewingShipping, setViewingShipping] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/orders/admin/${clientId}`)
      .then(res => res.json())
      .then(setOrders)
      .catch(err => console.error('Failed to fetch admin orders:', err));
  }, [clientId]);

  return viewingShipping ? (
    <ShippingDetails pedidoId={viewingShipping} onBack={() => setViewingShipping(null)} />
  ) : (
    <div className="orders-container">
      <h2>Pedidos para {clientName}</h2>
      <button onClick={onBack}>⬅ Volver a clientes</button>
      {orders.length === 0 ? (
        <p>No se encontraron pedidos.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
                <th>Pedido ID</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Detalles</th>
                <th>Envio</th> 
            </tr>
        </thead>
        <tbody>
            {orders.map(o => (
                <tr key={o.pedido_id}>
                <td>{o.pedido_id}</td>
                <td>{new Date(o.fecha_pedido).toLocaleString()}</td>
                <td>${Number(o.total).toFixed(2)}</td>
                <td>{o.productos}</td>
                <td>
                    <button onClick={() => setViewingShipping(o.pedido_id)}>
                        Detalles del envío
                    </button>
                </td>
                </tr>
            ))}
            </tbody>

        </table>
      )}
    </div>
  );
}

export default AdminOrders;
