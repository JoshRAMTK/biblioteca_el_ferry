import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Libros } from './pages/Libros';
import { Prestamos } from './pages/Prestamos';
import { DetallesPrestamo } from './pages/DetallesPrestamo';
import { ProtectedRoute } from './components/ProtectedRoute';


ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />

        {/* Rutas Protegidas (Solo accesibles con JWT) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/libros" element={<Libros />} />
          <Route path="/prestamos" element={<Prestamos />} />
          <Route path="/detalles" element={<DetallesPrestamo />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/libros" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
