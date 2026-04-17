// src/App.js
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';

import { CartProvider } from './context/CartContext';
import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import Cart    from './components/Cart';
import Toast   from './components/Toast';

import Home       from './pages/Home';
import Products   from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories'; // ✅ IMPORTANT (added)
import Checkout   from './pages/Checkout';
import { OrderSuccess, Contact, CustomOrder } from './pages/OtherPages';
import { TermsOfService, PrivacyPolicy, ShippingPolicy, ReturnPolicy } from './pages/PolicyPages';

import AdminLogin from './pages/AdminLogin';
import { Dashboard, AdminProducts, AdminOrders, AdminCategories } from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) =>
  localStorage.getItem('adminToken') ? children : <Navigate to="/admin" replace />;

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Cart />
      <Toast />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>

          {/* ✅ PUBLIC ROUTES */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />

          {/* ✅ SHOP (ALL PRODUCTS) */}
          <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
<Route path="/product/:id" element={
  <PublicLayout><ProductDetails /></PublicLayout>
} />
          {/* ✅ FIXED: Categories page */}
          <Route path="/categories" element={<PublicLayout><Categories /></PublicLayout>} />

          <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
          <Route path="/order-success" element={<PublicLayout><OrderSuccess /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/custom-order" element={<PublicLayout><CustomOrder /></PublicLayout>} />

          <Route path="/terms" element={<PublicLayout><TermsOfService /></PublicLayout>} />
          <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
          <Route path="/shipping" element={<PublicLayout><ShippingPolicy /></PublicLayout>} />
          <Route path="/returns" element={<PublicLayout><ReturnPolicy /></PublicLayout>} />

          {/* ✅ ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />

          {/* ✅ 404 PAGE */}
          <Route
            path="*"
            element={
              <PublicLayout>
                <div style={{ textAlign:'center', padding:'80px 24px' }}>
                  <div style={{ fontSize:64 }}>🔍</div>
                  <h2 style={{ marginTop:16, marginBottom:16 }}>Page Not Found</h2>
                  <Link to="/" style={{ color:'#2563eb' }}>← Go Home</Link>
                </div>
              </PublicLayout>
            }
          />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;