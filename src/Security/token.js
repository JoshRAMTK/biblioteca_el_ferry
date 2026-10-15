// src/Security/Oauth/token.js
import jwt from 'jsonwebtoken';

export const generarToken = (payload) => {
    // Genera un token JWT que expira en 24 horas usando el JWT_SECRET del .env
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret_fallback', {
        expiresIn: '24h'
    });
};

export const verificarToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret_fallback');
};