import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // Si no hay token, lo mandamos al login de una
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, carga las vistas hijas
  return <Outlet />;
};