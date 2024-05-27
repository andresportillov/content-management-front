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
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error searching:", error);
      throw error;
    }
  },
  add: async (formData) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default contentService;
