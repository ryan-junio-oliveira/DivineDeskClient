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
  async deleteOffer(id) {
    try {
      return await handleRequest(`/offer/destroy/${id}`, "delete");
    } catch (error) {
      throw error;
    }
  },

  async editOffer(memberData) {
    try {
      await handleRequest(`/offer/update`, "put", memberData);
    } catch (error) {
      throw error;
    }
  },

  async showOffer(id) {
    try {
      return await handleRequest(`/offer/show/${id}`, "get");
    } catch (error) {
      throw error;
    }
  },

  async allOffers() {
    try {
      return await handleRequest("/offer/all", "get");
    } catch (error) {
      throw error;
    }
  },

  async addOffers(memberData) {
    try {
      return await handleRequest("/offer/store", "post", memberData);
    } catch (error) {
      throw error;
    }
  },
};
