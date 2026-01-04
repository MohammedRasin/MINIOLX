import api from './axios';

// Login user
export const loginUser = async data => {
  const res = await api.post('api/users/login', data);
  return res.data;
};

// Register user
export const registerUser = async data => {
  const res = await api.post('api/users/register', data);
  return res.data;
};
