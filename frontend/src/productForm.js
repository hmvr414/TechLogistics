import React, { useState, useEffect } from 'react';

function ProductForm({ onCancel, onSubmit, product }) {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    peso: ''
  });

  useEffect(() => {
    if (product) {
      setForm({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio || '',
        peso: product.peso || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = product ? 'PUT' : 'POST';
    const url = product
      ? `http://localhost:4000/products/${product.producto_id}`
      : 'http://localhost:4000/products';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Producto ${product ? 'actualizado' : 'agregado'} con éxito!`);
        onSubmit(data);
      } else {
        const error = await response.json();
        alert('Error: ' + error.message);
      }
    } catch (err) {
      console.error('Fallo en registro:', err);
      alert('Algo salió mal!');
    }
  };

  return (
    <div className="form-wrapper">
      <h2>{product ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        <input name="precio" type="number" step="0.01" placeholder="Precio" value={form.precio} onChange={handleChange} required />
        <input name="peso" type="number" placeholder="Peso" value={form.peso} onChange={handleChange} required />
        <div className="form-actions">
          <button type="submit">{product ? 'Actualizar' : 'Guardar'}</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
