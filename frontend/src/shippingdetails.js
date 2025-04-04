// src/ShippingDetails.js
import { useEffect, useState } from 'react';
import './shippingdetails.css';

function ShippingDetails({ pedidoId, onBack }) {
  const [shipping, setShipping] = useState(null);
  const [estados, setEstados] = useState([]);
  const [estadoId, setEstadoId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:4000/shipping/${pedidoId}`);
      const data = await res.json();
  
      if (data) {
        setShipping(data);
        setEstadoId(data.estado_id);
      } else {
        setShipping(null);
      }
  
      const estadosRes = await fetch('http://localhost:4000/shipping/estado/all');
      const estadosData = await estadosRes.json();
      setEstados(estadosData);
    };
  
    fetchData();
  }, [pedidoId]);  

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:4000/shipping/${pedidoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado_id: estadoId }),
    });

    if (res.ok) {
      alert('Estado de envio actualizado!');
    } else {
      alert('Error actualizando el estado de envio.');
    }
  };

  if (shipping === null) {
    return (
      <div className="shipping-form">
        <h2>Envio para el pedido #{pedidoId}</h2>
        <button onClick={onBack}>⬅ Volver a los pedidos</button>
        <p>No se ha creado un envio para este pedido.</p>
      </div>
    );
  }
  
  if (!shipping) {
    return <p>Cargando la información de envio...</p>;
  }
  
  return (
    <div className="shipping-form">
      <h2>Envio para el pedido #{pedidoId}</h2>
      <button onClick={onBack}>⬅ Volver a pedidos</button>

      <div className="form-group"><strong>Dirección:</strong> {shipping.direccion}</div>
      <div className="form-group"><strong>Inicio:</strong> {new Date(shipping.fecha_inicio).toLocaleString()}</div>
      <div className="form-group"><strong>Estimada entrega:</strong> {shipping.fecha_estimada_entrega}</div>
      <div className="form-group"><strong>Real entrega:</strong> {shipping.fecha_real_entrega || '—'}</div>

      <div className="form-group">
        <label><strong>Estado actual:</strong></label>
        <select value={estadoId} onChange={e => setEstadoId(Number(e.target.value))}>
          {estados.map((e) => (
            <option key={e.estado_id} value={e.estado_id}>
              {e.nombre}
            </option>
          ))}
        </select>
      </div>

      <button className="update-btn" onClick={handleUpdate}>Actualizar Estado</button>
    </div>
  );
}

export default ShippingDetails;
