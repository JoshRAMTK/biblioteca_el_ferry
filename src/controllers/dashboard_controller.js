import pool from '../db.js';

export const getDashboardStats = async (req, res) => {
  try {
    // 1. Métricas generales (Conteo rápido)
    const [[{ total_libros }]] = await pool.query('SELECT COUNT(*) AS total_libros FROM libros');
    const [[{ total_usuarios }]] = await pool.query('SELECT COUNT(*) AS total_usuarios FROM usuarios');
    const [[{ total_prestamos }]] = await pool.query('SELECT COUNT(*) AS total_prestamos FROM prestamos');
    
    // 2. Libros con stock bajo (Alertas de inventario)
    const [librosBajoStock] = await pool.query(
      'SELECT id_libro, titulo, stock FROM libros WHERE stock <= 2 ORDER BY stock ASC LIMIT 5'
    );

    // 3. Últimos 5 préstamos realizados con información del usuario (JOIN legal a tu DB)
    const [prestamosRecientes] = await pool.query(`
      SELECT 
        p.id_prestamo,
        u.nombre AS usuario,
        u.correo,
        p.fecha_prestamo,
        p.fecha_devolucion
      FROM prestamos p
      INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
      ORDER BY p.id_prestamo DESC
      LIMIT 5
    `);

    res.json({
      resumen: {
        totalLibros: total_libros || 0,
        totalUsuarios: total_usuarios || 0,
        totalPrestamos: total_prestamos || 0,
      },
      librosBajoStock,
      prestamosRecientes,
    });

  } catch (error) {
    console.error('Error al obtener datos del dashboard:', error);
    res.status(500).json({ message: 'Error interno al cargar el dashboard' });
  }
};