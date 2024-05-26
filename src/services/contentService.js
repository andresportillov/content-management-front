import axiosInstance from "./axiosInstances";

const API_URL = "http://127.0.0.1:5000/api/contents";

const contentService = {
  getCountByCategory: async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/getCountContents`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  list: async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  searchByTopicOrName: async (query) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/`, {
        params: {
          search: query,
        },
      });
      console.log("Response:", response.data); // Verifica la respuesta del servidor
      return response.data;
    } catch (error) {
      console.error("Error searching:", error); // Agrega manejo de errores adicional
      throw error; // Puedes lanzar el error nuevamente si lo deseas
    }
  },
};

export default contentService;
