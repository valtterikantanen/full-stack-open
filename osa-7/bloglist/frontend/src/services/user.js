import axios from 'axios';
let token = null;

const STORAGE_KEY = 'blogListAppUser';

const getAll = async () => {
  const req = await axios.get('/api/users');
  return req.data;
};

const setUser = user => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  token = user.token;
};

const getUser = () => {
  const loggedUserJSON = localStorage.getItem(STORAGE_KEY);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    token = user.token;
    return user;
  }

  return null;
};

const clearUser = () => {
  localStorage.clear();
  token = null;
};

const getToken = () => token;

export default {
  getAll,
  setUser,
  getUser,
  clearUser,
  getToken
};
