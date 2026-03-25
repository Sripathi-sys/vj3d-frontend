// src/api.js — Central API config
// All backend calls go through here
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Attach token to every request if admin is logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProducts    = (params) => API.get('/products', { params });
export const getProduct     = (id)     => API.get(`/products/${id}`);
export const createProduct  = (data)   => API.post('/products', data);
export const updateProduct  = (id, d)  => API.put(`/products/${id}`, d);
export const deleteProduct  = (id)     => API.delete(`/products/${id}`);

export const getCategories  = ()       => API.get('/categories');
export const createCategory = (data)   => API.post('/categories', data);
export const deleteCategory = (id)     => API.delete(`/categories/${id}`);

export const placeOrder     = (data)   => API.post('/orders', data);
export const getOrders      = ()       => API.get('/orders');
export const updateStatus   = (id, s)  => API.put(`/orders/${id}/status`, { status: s });

export const adminLogin     = (data)   => API.post('/auth/login', data);
export const setupAdmin     = (data)   => API.post('/auth/setup', data);

export const sendContact    = (data)   => API.post('/contact', data);

export default API;
