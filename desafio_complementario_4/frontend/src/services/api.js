import axios from 'axios';

const API_URL = 'http://localhost:8080/'; // Ajusta esto a la URL de tu backend

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const register = async (userData) => {
  return api.post('/users/register', userData);
};

export const login = async (email, password) => {
  return api.post('/users/login', { email, password });
};

export const logout = async () => {
  return api.post('/users/logout');
};

export const getCurrentUser = async () => {
  return api.get('/users/current');
};

export default api;