import axios from "axios";
const baseUrl = "http://localhost:3003/api/login";

/**
 * @param {Object} credentials
 * @returns {Promise<Object>}
 */
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
