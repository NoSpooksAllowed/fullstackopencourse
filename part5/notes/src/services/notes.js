import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";

/**
 * @typedef {Object} Note
 * @property {number} id - The ID of the object.
 * @property {string} content - The content of the object.
 * @property {boolean} important - Indicates whether the object is important.
 */

let token = null;

/**
 * @param {String} newToken
 */
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

/**
 * @returns {Promise<Note[]>}
 */
const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

/**
 * @param {Note} newObject
 * @returns {Promise<Note>}
 */
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

/**
 * @param {number} id
 * @param {Note} newObject
 * @returns {Promise<Note>}
 */
const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  setToken,
};