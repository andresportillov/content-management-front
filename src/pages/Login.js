import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import authService from '../services/authService';

function Login() {
  const handleLogin = async ({ email, password }) => {
    try {
      await authService.login(email, password);
      // Redirigir al usuario a la página de inicio después del login exitoso
      window.location.href = '/home';
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <LoginForm onSubmit={handleLogin} />
            </div>
            <div className="card-footer">
              <p className="text-center mb-0">¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
