```js
// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// ================= AUTH TOKEN =================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= ERROR HANDLER =================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', error?.response || error.message);
    return Promise.reject(error);
  }
);

// ======================================================
// PRODUCTS
// ======================================================

// Get all products
export const getProducts = (params) =>
  API.get('/products', { params });

// Get single product
export const getProduct = (id) =>
  API.get(`/products/${id}`);

// Create product
export const createProduct = (data) =>
  API.post('/products', data);

// ✅ Update product
export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);

// Delete product
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);


// ======================================================
// CATEGORIES
// ======================================================

// Get all categories
export const getCategories = () =>
  API.get('/categories');

// Create category
export const createCategory = (data) =>
  API.post('/categories', data);

// ✅ Update category
export const updateCategory = (id, data) =>
  API.put(`/categories/${id}`, data);

// Delete category
export const deleteCategory = (id) =>
  API.delete(`/categories/${id}`);


// ======================================================
// ORDERS
// ======================================================

// Place order
export const placeOrder = (data) =>
  API.post('/orders', data);

// Get all orders
export const getOrders = () =>
  API.get('/orders');

// Update order status
export const updateStatus = (id, status) =>
  API.put(`/orders/${id}/status`, { status });

// ================= RAZORPAY =================

// Create Razorpay order
export const createRazorpayOrder = (data) =>
  API.post('/orders/create-razorpay-order', data);

// Verify payment
export const verifyPayment = (data) =>
  API.post('/orders/verify-payment', data);


// ======================================================
// AUTH
// ======================================================

// Admin login
export const adminLogin = (data) =>
  API.post('/auth/login', data);

// Setup admin
export const setupAdmin = (data) =>
  API.post('/auth/setup', data);


// ======================================================
// CONTACT
// ======================================================

// Send contact form
export const sendContact = (data) =>
  API.post('/contact', data);


// ======================================================
// EXPORT API
// ======================================================

export default API;
```
