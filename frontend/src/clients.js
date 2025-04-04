import React, { useEffect, useState } from 'react';
import './clients.css'; 
import AdminOrders from './adminorders';

function Clients() {
  const [clients, setClients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [viewingOrdersFor, setViewingOrdersFor] = useState(null);
  const [viewingName, setViewingName] = useState('');
  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:4000/clientes');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }
    };

    fetchClients();
  }, []);

  return viewingOrdersFor ? (
    <AdminOrders
      clientId={viewingOrdersFor}
      clientName={viewingName}
      onBack={() => {
        setViewingOrdersFor(null);
        setViewingName('');
      }}
    />
  ) : (
    <div className="clients-container">
      <div className="clients-actions">
        <button onClick={() => alert('Add client')}>Agregar Cliente</button>
        <button
          disabled={!selectedId}
          onClick={() => alert(`Editar cliente ${selectedId}`)}
        >
          Edit Selected
        </button>
        <button
          disabled={!selectedId}
          onClick={() => alert(`Eliminar cliente ${selectedId}`)}
        >
          Delete Selected
        </button>
      </div>

      <table className="clients-table">
      <thead>
        <tr>
            <th></th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            {clients.map((c) => (
                <tr
                key={c.cliente_id}
                className={c.cliente_id === selectedId ? 'selected' : ''}
                onClick={() => setSelectedId(c.cliente_id)}
                >
                <td>
                    <input
                    type="radio"
                    name="selectedClient"
                    checked={c.cliente_id === selectedId}
                    onChange={() => setSelectedId(c.cliente_id)}
                    />
                </td>
                <td>{c.cliente_id}</td>
                <td>{c.nombre}</td>
                <td>{c.direccion}</td>
                <td>{c.telefono}</td>
                <td>{c.email}</td>
                <td>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setViewingOrdersFor(c.cliente_id);
                        setViewingName(c.nombre);
                    }}
                    >
                    Orders
                    </button>

                </td>
                </tr>
            ))}
            </tbody>
      </table>
    </div>
  );
}

export default Clients;
