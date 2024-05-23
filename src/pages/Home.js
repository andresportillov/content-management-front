import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Eliminamos la importación de Route y LoginPage

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));

  // Función para desloguear al usuario
  const handleLogout = () => {
    // Limpiar el token del almacenamiento local
    localStorage.removeItem('token');
    // Actualizar el estado para indicar que el usuario ha cerrado sesión
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <div style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', padding: '20px' }}>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container">
              <Link to="/" className="navbar-brand">Home</Link>
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
            </div>
          </nav>
          <div className="container">
            <h2 className="mt-4">Bienvenido a la Página de Inicio</h2>
            <p>Aquí puedes agregar el contenido de tu página de inicio.</p>
          </div>
          <footer className="footer mt-auto py-3 bg-dark text-white">
            <div className="container">
              <span className="text-light">© 2024 Home</span>
            </div>
          </footer>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Home;
