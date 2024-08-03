import axios from '../apis/axios.js';

/**
 * Helper function to handle HTTP requests with authorization.
 * @param {string} url - The URL to send the request to.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - The data to send in the request body (if applicable).
 * @returns {Promise<Object>} - The response data from the request.
 */
const handleRequest = async (url, method = 'get', data = null) => {
  const token = localStorage.getItem('token');
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
  /**
   * Deletes a member by ID.
   * @param {number} id - The ID of the member to delete.
   * @returns {Promise<void>}
   * @throws Will throw an error if the request fails.
   */
  async deleteMember(id) {
    try {
      return await handleRequest(`/members/destroy/${id}`, 'delete');
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
  async editMember(memberData) {
    try {
      await handleRequest(`/members/update`, 'put', memberData);
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
      return await handleRequest(`/members/show/${id}`, 'get');
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
      return await handleRequest('/members/all', 'get');
    } catch (error) {
      console.log(error);
      // TODO: alert error
    }
  },

  
  /**
   * Description placeholder
   * @async
   * @param {*} memberData
   * @returns {unknown}
   */
  async addMember(memberData) {
    try {
      return await handleRequest('/members/store', 'post', memberData);
    } catch (error) {
      // TODO: handle error
    }
  }
};
