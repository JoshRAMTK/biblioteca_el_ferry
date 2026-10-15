import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importaciones de componentes
import { Login } from './src/login.jsx';
import { Libros } from './src/libros.jsx';
import { Prestamos } from './src/prestamos.jsx';
import detalles from './src/detalles.jsx';
import { ProtectedRoute } from './src/components/protectedRoute.jsx';

// Carga de variable de entorno
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ""}>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<Login />} />

          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/libros" element={React.createElement(Libros)} />
            <Route path="/prestamos" element={<Prestamos />} />
            <Route path="/detalles" element={React.createElement(detalles)} />
          </Route>

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/libros" replace />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;