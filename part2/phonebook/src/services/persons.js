import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

/**
 * @typedef {Object} Person
 * @property {number} id
 * @property {string} name
 * @property {string} number
 */

/**
 * @returns {Promise<Person[]>}
 * */
const getAll = async () => {
  const request = axios.get(baseUrl);

  return request.then(response => response.data);
};

/**
 * @param {Person} newObject
 * @returns {Promise<Person>}
 */
const create = async newObject => {
  const request = axios.post(baseUrl, newObject);

  return request.then(response => response.data);
};

export default {
  getAll,
  create,
};
