import axiosInstance from "./axiosInstances";

const API_URL = "http://127.0.0.1:5000/api/categories";

const categoryService = {
  list: async (query) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/`, {
        params: query,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default categoryService;
