import React, { useState } from 'react';
import './dashboard.css'; 
import Products from './products';
import Clients from './clients';
import Transportistas from './transportistas';

function Dashboard({ onLogout }) {
    const [view, setView] = useState('home');

    const renderContent = () => {
        if (view === 'productos') return <Products />;
        if (view === 'clientes') return <Clients />;
        if (view === 'transportistas') return <Transportistas />;
        return <p>Selecciona una opción del menu lateral.</p>;
      };

  return (
    <div className="layout">
      <header className="header">
        <h1>TechLogistics S.A.</h1>
        <button className="logout" onClick={onLogout}>Cerrar sesión</button>
      </header>
      <div className="content">
        <aside className="sidebar">
          <ul>
          <li onClick={() => setView('productos')}>Productos</li>
          <li onClick={() => setView('clientes')}>Clientes</li>
          <li onClick={() => setView('transportistas')}>Transportistas</li>
          </ul>
        </aside>
        <main className="main">
            {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
