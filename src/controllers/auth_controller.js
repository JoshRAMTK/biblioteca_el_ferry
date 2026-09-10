// controllers/authController.js
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import pool from '../db.js'; // Ajusta la ruta a tu conexión MySQL

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: 'El idToken es requerido.' });
  }

  try {
    // 1. Validar el token con Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // 2. Buscar si el usuario ya existe por su correo
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
    let user = rows[0];

    if (!user) {
      // Si no existe, creamos el nuevo registro con tus campos exactos
      const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, telefono, correo, google_id, avatar) VALUES (?, ?, ?, ?, ?)',
        [name, '', email, googleId, picture] // Se envía '' en telefono porque no es NULLABLE en la BD
      );

      user = {
        id_usuario: result.insertId,
        nombre: name,
        correo: email,
        avatar: picture
      };
    }

    // 3. Generar el JWT firmando con el id_usuario y correo
    const token = jwt.sign(
      { id: user.id_usuario, correo: user.correo },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Autenticación exitosa',
      token,
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
        avatar: user.avatar || picture
      }
    });

  } catch (error) {
    console.error('Error en autenticación OAuth2:', error);
    res.status(401).json({ message: 'Token de Google no válido o expirado.' });
  }
};