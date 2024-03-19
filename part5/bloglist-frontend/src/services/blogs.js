import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

const config = {
  token: "",
  headers: {},
};

const getAll = async () => {
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const setToken = (newToken) => {
  config.token = `Bearer ${newToken}`;
  config.headers = { Authorization: config.token };
};

export default { getAll, setToken };
