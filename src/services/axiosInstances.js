// src/services/axiosInstance.js
import axios from 'axios';

// Crear una instancia de axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', // Reemplaza con tu URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
