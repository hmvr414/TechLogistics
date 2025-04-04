import React, { useState, useEffect } from 'react';
import ProductForm from './productForm';
import './products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error consultando los productos:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleAddSubmit = (formData) => {
    console.log('Enviado nuevo producto:', formData); 
    alert('Producto enviado (not saved yet)');
    setShowAddForm(false);
  };

  if (showAddForm || editingProduct) {
    return (
      <ProductForm
        onCancel={() => {
          setShowAddForm(false);
          setEditingProduct(null);
        }}
        onSubmit={async () => {
          setShowAddForm(false);
          setEditingProduct(null);
  
          try {
            const response = await fetch('http://localhost:4000/products');
            const data = await response.json();
            setProducts(data);
          } catch (err) {
            console.error('Fallo actualizando el listado de productos:', err);
          }
        }}
        product={editingProduct}
      />
    );
  }
  

  return (
    <div className="products-container">
      <div className="products-actions">
        <button onClick={() => setShowAddForm(true)}>Agregar Producto</button>
        <button
  disabled={!selectedId}
  onClick={() => {
    const product = products.find(p => p.producto_id === selectedId);
    setEditingProduct(product);
  }}
>
  Editar Seleccionado
</button>

        <button
  disabled={!selectedId}
  onClick={async () => {
    const confirm = window.confirm('Esta seguro que desea eliminar el producto?');
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:4000/products/${selectedId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Fallo al eliminar el producto');
      }

      // Remove from local state
      setProducts((prev) => prev.filter((p) => p.producto_id !== selectedId));
      setSelectedId(null);
    } catch (err) {
      console.error(err);
      alert('Error eliminando el producto');
    }
  }}
>
  Eliminar Seleccionado
</button>

      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.producto_id}
              className={p.producto_id === selectedId ? 'selected' : ''}
              onClick={() => setSelectedId(p.producto_id)}
            >
              <td>
                <input
                  type="radio"
                  name="selectedProduct"
                  checked={p.producto_id === selectedId}
                  onChange={() => setSelectedId(p.producto_id)}
                />
              </td>
              <td>{p.producto_id}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{Number(p.precio).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
