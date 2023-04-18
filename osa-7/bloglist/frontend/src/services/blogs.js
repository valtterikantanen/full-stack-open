import axios from 'axios';
import storageService from '../services/storage';
const baseUrl = '/api/blogs';

const headers = {
  Authorization: storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
};

const getAll = async () => {
  const req = await axios.get(baseUrl);
  return req.data;
};

const create = async object => {
  const req = await axios.post(baseUrl, object, { headers });
  return req.data;
};

const update = async object => {
  const req = await axios.put(`${baseUrl}/${object.id}`, object, { headers });
  return req.data;
};

const remove = async id => {
  await axios.delete(`${baseUrl}/${id}`, { headers });
};

const addComment = async (id, comment) => {
  const req = await axios.post(`${baseUrl}/${id}/comments`, { comment }, { headers });
  return req.data;
};

export default { getAll, create, update, remove, addComment };
