import axios from '../apis/axios.js';

/**
 * Helper function to handle GET requests with authorization.
 * @param {string} url - The URL to send the GET request to.
 * @returns {Promise<Object>} - The response data from the request.
 */
const handleRequest = async (url) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  /**
   * Deletes a member by ID.
   * @param {number} id - The ID of the member to delete.
   * @returns {Promise<void>}
   * @throws Will throw an error if the request fails.
   */
  async deleteMember(id) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/members/destroy/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      // TODO: alert error
    }
  },

  /**
   * Updates a member's data.
   * @param {number} id - The ID of the member to update.
   * @param {Object} memberData - The new data for the member.
   * @returns {Promise<void>}
   * @throws Will throw an error if the request fails.
   */
  async editMember(id, memberData) {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/members/update/${id}`, memberData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      // TODO: alert error
    }
  },

  /**
   * Retrieves a member's data by ID.
   * @param {number} id - The ID of the member to retrieve.
   * @returns {Promise<Object>} - The member's data.
   * @throws Will throw an error if the request fails.
   */
  async showMember(id) {
    try {
      return await handleRequest(`/members/show/${id}`);
    } catch (error) {
      console.log(error);
      // TODO: alert error
    }
  },

  /**
   * Retrieves all members.
   * @returns {Promise<Array>} - The list of all members.
   * @throws Will throw an error if the request fails.
   */
  async allMembers() {
    try {
      return await handleRequest('/members/all');
    } catch (error) {
      console.log(error);
      // TODO: alert error
    }
  },
};
