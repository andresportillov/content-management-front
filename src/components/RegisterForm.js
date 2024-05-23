import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';


function RegisterForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register({ username, email, password, role });
      alert('Registro exitoso. Por favor, inicia sesión y disfruta de la interfaz.', response.status);
      navigate('/login'); // Redirige al usuario al login
    } catch (err) {
      setError('Register failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>username</label>
        <input
          type="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select
          className="form-control"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="lector">Lector</option>
          <option value="creador">Creador</option>
        </select>
      </div>
      {error && <p>{error}</p>}
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
}

export default RegisterForm;