import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Content from '../components/Content';
import contentService from '../services/contentService';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control mr-4"
          placeholder="Search by topic or content name"
          value={query}
          onChange={handleChange}
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-outline-success">Search</button>
        </div>
      </div>
    </form>
  );
}

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
  const [content, setContent] = useState([]);

  // Función para desloguear al usuario
  const handleLogout = () => {
    // Limpiar el token del almacenamiento local
    localStorage.removeItem('token');
    // Actualizar el estado para indicar que el usuario ha cerrado sesión
    setIsLoggedIn(false);
  };

  const handleSearch = async (query) => {
    try {
      const response = await contentService.searchByTopicOrName(query);
      setContent(response); // Actualiza el estado del contenido con la respuesta del servicio
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', padding: '20px' }}>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex">
              <Link to="/" className="navbar-brand">Mi App</Link>
              <Search onSearch={handleSearch} />
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
            </div>
          </nav>
          <div className="container">
            <h2 className="mt-4">Bienvenido a la Página de Inicio</h2>
            <p>Aquí puedes agregar el contenido de tu página de inicio.</p>
            <Content content={content} /> {/* Pasa el estado content como prop al componente Content */}
          </div>
          <footer className="footer mt-auto py-3 bg-dark text-white">
            <div className="container">
              <span className="text-muted">© 2024 Mi App</span>
            </div>
          </footer>
        </div>
      ) : (
        <div>
          <h2>No estás autenticado. Por favor, inicia sesión.</h2>
          <Link to="/login">Login</Link>
        </div>
      )}
    </>
  );
}

export default Home;
