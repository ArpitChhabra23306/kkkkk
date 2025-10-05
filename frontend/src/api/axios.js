// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: "https://kkkkk-qay1.onrender.com/api",
  timeout: 10000,
});

// attach token to each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

export default API;
