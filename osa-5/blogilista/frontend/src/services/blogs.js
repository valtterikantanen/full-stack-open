import axios from 'axios';
const baseUrl = '/api/blogs';

let token;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async blogInfo => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, blogInfo, config);
  return response.data;
};

const update = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config);
  return response.data;
};

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const blogService = { getAll, create, setToken, update, remove };

export default blogService;
