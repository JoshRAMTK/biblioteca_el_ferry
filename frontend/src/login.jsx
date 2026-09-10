import { GoogleLogin } from '@react-oauth/google';

export function Login() {
  const handleSuccess = async (credentialResponse) => {
    // credentialResponse.credential trae el idToken que nos dio Google
    const res = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: credentialResponse.credential }),
    });

    const data = await res.json();
    if (res.ok) {
      // Guardas tu propio JWT en localStorage para futuras peticiones
      localStorage.setItem('token', data.token);
      console.log('Usuario autenticado:', data.user);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <GoogleLogin 
        onSuccess={handleSuccess} 
        onError={() => console.log('Error en el login con Google')} 
      />
    </div>
  );
}