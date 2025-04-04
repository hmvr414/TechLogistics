// src/Store.js
import { useState, useEffect } from 'react';
import './store.css';
import Cart from './cart';
import Checkout from './checkout';
import Orders from './orders';

function Store({ clientId, nombre, onLogout }) {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('store');

  useEffect(() => {
    if (view === 'store') {
      fetch('http://localhost:4000/products')
        .then((res) => res.json())
        .then(setProducts)
        .catch(console.error);
    }
  }, [view]);

  return (
    <div className="store-container">
      <header className="store-header">
        <h1>TechLogistics S.A.</h1>
        <div className="store-header-actions">
          <button className="cart-btn" onClick={() => setView('cart')}>🛒 Carrito</button>
          <button onClick={() => setView('orders')}>📦 Pedidos</button>
          <button className="logout-btn" onClick={onLogout}>Cerrar sesión</button>
        </div>
      </header>

      <main className="store-main">
      {view === 'cart' && (
  <Cart
        clientId={clientId}
        onBack={() => setView('store')}
        onCheckout={() => setView('checkout')}
    />
    )}
  {view === 'checkout' && (
    <Checkout
      clientId={clientId}
      onBack={() => setView('cart')}
    />
  )}
  {view === 'orders' && (
  <Orders clientId={clientId} onBack={() => setView('store')} />
)}
  {view === 'store' && (
    <div className="store-products">
      {products.map((p) => (
        <div className="product-card" key={p.producto_id}>
          <div className="product-image">
            <img src="https://rakanonline.com/wp-content/uploads/2022/08/default-product-image.png" alt="Product" />
          </div>
          <h3>{p.nombre}</h3>
          <p>{(p.descripcion || '').slice(0, 50)}{p.descripcion?.length > 50 ? '…' : ''}</p>
          <strong>${Number(p.precio).toFixed(2)}</strong>
          <button
            className="add-btn"
            onClick={async () => {
              await fetch('http://localhost:4000/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  cliente_id: clientId,
                  producto_id: p.producto_id,
                  cantidad: 1,
                }),
              });
              alert(`${p.nombre} agregado al carrito!`);
            }}
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  )}
</main>
    </div>
  );
}

export default Store;
