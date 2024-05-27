import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  // Verificar si el usuario está autenticado
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        {/* Ruta protegida para el componente Home */}
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />

        {/* Redirigir a la página de inicio de sesión si la ruta no coincide */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
