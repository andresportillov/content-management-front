import { useEffect, useState } from "react";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const useSession = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("token"));

  // Función para desloguear al usuario
  const handleLogout = () => {
    // Limpiar el token del almacenamiento local
    localStorage.removeItem("token");
    // Actualizar el estado para indicar que el usuario ha cerrado sesión
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      setUser(parseJwt(token)?.user);
    }
  }, [token]);

  return {
    isLoggedIn: !!token,
    user,
    handleLogout,
  };
};
