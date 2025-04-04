import React, { useEffect, useState } from 'react';
import './transportistas.css'; 

function Transportistas() {
  const [transportistas, setTransportistas] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchTransportistas = async () => {
      try {
        const response = await fetch('http://localhost:4000/transportistas');
        const data = await response.json();
        setTransportistas(data);
      } catch (error) {
        console.error('Error consultando los transportistas:', error);
      }
    };

    fetchTransportistas();
  }, []);

  return (
    <div className="transportistas-container">
      <div className="transportistas-actions">
        <button onClick={() => alert('Add transportista')}>Add Transportista</button>
        <button
          disabled={!selectedId}
          onClick={() => alert(`Edit transportista ${selectedId}`)}
        >
          Edit Selected
        </button>
        <button
          disabled={!selectedId}
          onClick={() => alert(`Delete transportista ${selectedId}`)}
        >
          Delete Selected
        </button>
      </div>

      <table className="transportistas-table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {transportistas.map((t) => (
            <tr
              key={t.transportista_id}
              className={t.transportista_id === selectedId ? 'selected' : ''}
              onClick={() => setSelectedId(t.transportista_id)}
            >
              <td>
                <input
                  type="radio"
                  name="selectedTransportista"
                  checked={t.transportista_id === selectedId}
                  onChange={() => setSelectedId(t.transportista_id)}
                />
              </td>
              <td>{t.transportista_id}</td>
              <td>{t.nombre}</td>
              <td>{t.contacto}</td>
              <td>{t.telefono}</td>
              <td>{t.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transportistas;
