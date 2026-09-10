import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../src/api/client.js'; // Ajusta la ruta a client.js si es necesario

export default function Detalles() {
  const [detalles, setDetalles] = useState([]);

  const cargarDetalles = async () => {
    try {
      const res = await apiFetch('/detalles');
      const data = await res.json();
      if (Array.isArray(data)) {
        setDetalles(data);
      }
    } catch (err) {
      console.error('Error cargando detalles:', err);
    }
  };

  useEffect(() => {
    cargarDetalles();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Detalles de Préstamos</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID Detalle</th>
            <th>ID Usuario</th>
            <th>ID Libro</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((d) => (
            <tr key={d.id_detalle}>
              <td>{d.id_detalle}</td>
              <td>{d.id_usuario}</td>
              <td>{d.id_libro}</td>
              <td>{d.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}