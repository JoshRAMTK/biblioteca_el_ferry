import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../src/api/client';

export function Prestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    id_usuario: '',
    id_libro: '', // <-- Agregado
    fecha_prestamo: '',
    fecha_devolucion: '',
  });

  const cargarPrestamos = async () => {
    try {
      const res = await apiFetch('/prestamos');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPrestamos(data);
      } else {
        console.error('Respuesta inesperada:', data);
      }
    } catch (err) {
      console.error('Error cargando préstamos:', err);
    }
  };

  useEffect(() => {
    cargarPrestamos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/prestamos', {
        method: 'POST',
        body: JSON.stringify(nuevoPrestamo),
      });
      if (res.ok) {
        setNuevoPrestamo({ id_usuario: '', id_libro: '', fecha_prestamo: '', fecha_devolucion: '' });
        cargarPrestamos();
      }
    } catch (err) {
      console.error('Error al registrar préstamo:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Préstamos Registrados</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="number"
          placeholder="ID Usuario"
          value={nuevoPrestamo.id_usuario}
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, id_usuario: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="ID Libro"
          value={nuevoPrestamo.id_libro}
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, id_libro: e.target.value })}
          required
        />
        <input
          type="date"
          value={nuevoPrestamo.fecha_prestamo}
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, fecha_prestamo: e.target.value })}
          required
        />
        <input
          type="date"
          value={nuevoPrestamo.fecha_devolucion}
          onChange={(e) => setNuevoPrestamo({ ...nuevoPrestamo, fecha_devolucion: e.target.value })}
          required
        />
        <button type="submit">Crear Préstamo</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID Préstamo</th>
            <th>ID Usuario</th>
            <th>ID Libro</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((p) => (
            <tr key={p.id_prestamo}>
              <td>{p.id_prestamo}</td>
              <td>{p.id_usuario}</td>
              <td>{p.id_libro}</td>
              <td>{p.fecha_prestamo}</td>
              <td>{p.fecha_devolucion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}