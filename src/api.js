// src/api.js — FINAL VERSION
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true // ✅ VERY IMPORTANT
});

// Attach token (for admin routes)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// PRODUCTS
export const getProducts    = (params) => API.get('/products', { params });
export const getProduct     = (id)     => API.get(`/products/${id}`);
export const createProduct  = (data)   => API.post('/products', data);
export const updateProduct  = (id, d)  => API.put(`/products/${id}`, d);
export const deleteProduct  = (id)     => API.delete(`/products/${id}`);

// CATEGORIES
export const getCategories  = ()       => API.get('/categories');
export const createCategory = (data)   => API.post('/categories', data);
export const deleteCategory = (id)     => API.delete(`/categories/${id}`);

// ORDERS
export const placeOrder     = (data)   => API.post('/orders', data);
export const getOrders      = ()       => API.get('/orders');
export const updateStatus   = (id, s)  => API.put(`/orders/${id}/status`, { status: s });

// AUTH
export const adminLogin     = (data)   => API.post('/auth/login', data);
export const setupAdmin     = (data)   => API.post('/auth/setup', data);

// CONTACT
export const sendContact    = (data)   => API.post('/contact', data);

export default API;