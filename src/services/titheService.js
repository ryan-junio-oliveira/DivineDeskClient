import axios from "../apis/axios.js";

const handleRequest = async (url, method = "get", data = null) => {
  const token = localStorage.getItem("token");
  const config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (data) {
    config.data = data;
  }

  const response = await axios(config);
  return response.data;
};

export default {
  async deleteTithe(id) {
    try {
      return await handleRequest(`/tithe/destroy/${id}`, "delete");
    } catch (error) {
      throw error;
    }
  },

  async editTithe(memberData) {
    try {
      await handleRequest(`/tithe/update`, "put", memberData);
    } catch (error) {
      throw error;
    }
  },

  async showTithe(id) {
    try {
      return await handleRequest(`/tithe/show/${id}`, "get");
    } catch (error) {
      throw error;
    }
  },

  async allTithes() {
    try {
      return await handleRequest("/tithe/all", "get");
    } catch (error) {
      throw error;
    }
  },

  async addTithes(memberData) {
    try {
      return await handleRequest("/tithe/store", "post", memberData);
    } catch (error) {
      throw error;
    }
  },
};
