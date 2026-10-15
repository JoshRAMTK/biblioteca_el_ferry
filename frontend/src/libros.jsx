import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../src/api/client';

export function Libros() {
  const [libros, setLibros] = useState([]);
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: '', autor: '', stock: 1 });

  const cargarLibros = async () => {
    try {
      const res = await apiFetch('/libros');
      const data = await res.json();
      setLibros(data);
    } catch (err) {
      console.error('Error cargando libros:', err);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify(nuevoLibro),
      });
      if (res.ok) {
        setNuevoLibro({ titulo: '', autor: '', stock: 1 });
        cargarLibros();
      }
    } catch (err) {
      console.error('Error creando libro:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Libros</h2>

      {/* Formulario de registro */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Título del Libro"
          value={nuevoLibro.titulo}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={nuevoLibro.autor}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, autor: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={nuevoLibro.stock}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, stock: e.target.value })}
          required
        />
        <button type="submit">Agregar Libro</button>
      </form>

      {/* Tabla de catálogo */}
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id_libro || libro.id}>
              <td>{libro.id_libro || libro.id}</td>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>{libro.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}