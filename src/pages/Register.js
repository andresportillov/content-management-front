import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import authService from '../services/authService';

function Register() {
  const handleRegister = async ({ email, password, confirmPassword }) => {
    try {
      await authService.register(email, password, confirmPassword);
      // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
      window.location.href = '/login';
    } catch (error) {
      console.error('Error de registro:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <RegisterForm onSubmit={handleRegister} />
            </div>
            <div className="card-footer">
              <p className="text-center mb-0">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
