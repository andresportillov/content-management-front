import axiosInstance from "./axiosInstances";

const API_URL = "http://127.0.0.1:5000/api/users";

const userService = {
  getUser: async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
