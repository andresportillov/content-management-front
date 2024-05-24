import React, { useState } from "react";
import { Link } from "react-router-dom";
import Content from "../components/Content";
import { useGetContent } from "../hooks/useGetContent";
import { useSession } from "../hooks/useSession";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

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
          <button type="submit" className="btn btn-outline-success">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

function Home() {
  const { content, handleSearch, error } = useGetContent();
  const { isLoggedIn, handleLogout, user } = useSession();

  // Crear componente para mostrat el total de items por tematica +100 imagenes

  // Crear Endpoints para lectura de datos de usuarios, dentro del hook useSession se deberia obtener los datos del usuario minimamente si es lector o creador
  // Si es creador mostrat boton para acceder al formulario de crear contenido
  // Formulario de agregar un contenido siendo creador
  // Validar que el contenido creado tenga una categoria valida para la tematica correspondiente
  // Unit tests

  // Si es usuario es un creador no mostrar los documentos solo texto

  // La prueba tecnica es un culo explicando la diferencia entre tematica y categoria

  return (
    <>
      {isLoggedIn ? (
        <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex">
              <Link to="/" className="navbar-brand">
                Mi App
              </Link>
              <Search onSearch={handleSearch} />
              {user?.role !== "lector" && (
                <>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Launch demo modal
                  </button>

                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Modal title
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form>
                          <div class="modal-body">
                            <input />
                            <input />
                            <input />
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" class="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </nav>
          <div className="container">
            <h2 className="mt-4">Bienvenido a la Página de Inicio</h2>
            <div style={{ display: "flex", margin: " 20px 0" }}>
              <div
                style={{
                  background: "gray",
                  marginRight: "8px",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "white",
                }}
              >
                +100 imagenes
              </div>
              <div
                style={{
                  background: "gray",
                  marginRight: "8px",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "white",
                }}
              >
                +100 videos
              </div>
              <div
                style={{
                  background: "gray",
                  marginRight: "8px",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "white",
                }}
              >
                +100 documentos
              </div>
            </div>
            <p>Aquí puedes agregar el contenido de tu página de inicio.</p>
            <Content content={content} error={error} />{" "}
            {/* Pasa el estado content como prop al componente Content */}
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
