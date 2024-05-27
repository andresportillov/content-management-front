import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Content from "../components/Content";
import { useGetContent } from "../hooks/useGetContent";
import { useSession } from "../hooks/useSession";
import AddContentForm from "../components/AddContentForm";
import userService from "../services/userService";

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
  const { content, handleSearch, error, count } = useGetContent();
  const { isLoggedIn, handleLogout, user } = useSession();
  const [getUser, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getUser();
        console.log("Fetched content:", response);
        setUser(response || {});
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoggedIn ? (
        <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex">
              <Link to="/" className="navbar-brand">
                Content App
              </Link>
              <Search onSearch={handleSearch} />
              {user?.role !== "lector" && <AddContentForm />}
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
            <h2 className="mt-4">{`Bienvenid@ ${getUser.username}`}</h2>
            <div style={{ display: "flex", margin: " 20px 0" }}>
              {count && count.length > 0 ? (
                count.map((total) => (
                  <div
                    key={total._id} // Asegúrate de tener una key única
                    style={{
                      background: "green",
                      marginRight: "8px",
                      borderRadius: "8px",
                      padding: "8px",
                      color: "white",
                    }}
                  >
                    {total.icon && (
                      <img
                        src={total.icon}
                        alt="Icon"
                        style={{ width: "20px", height: "20px" }}
                      />
                    )}
                    {`${total.total}+ ${total._id}`}
                  </div>
                ))
              ) : (
                <div
                  style={{
                    background: "gray",
                    marginRight: "8px",
                    borderRadius: "8px",
                    padding: "8px",
                    color: "white",
                  }}
                >
                  <p>No Data</p>
                </div> // Puedes mostrar un mensaje alternativo
              )}
            </div>
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
