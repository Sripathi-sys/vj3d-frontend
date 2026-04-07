// src/App.js — Main Router & App Entry
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';

// Context
import { CartProvider } from './context/CartContext';

// Layout components
import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import Cart    from './components/Cart';
import Toast   from './components/Toast';

// Public pages
import Home     from './pages/Home';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import { OrderSuccess, Contact, CustomOrder } from './pages/OtherPages';
import { Services } from './pages/Services';
import { TermsOfService, PrivacyPolicy, ShippingPolicy, ReturnPolicy } from './pages/PolicyPages';

// Admin pages
import AdminLogin from './pages/AdminLogin';
import { Dashboard, AdminProducts, AdminOrders, AdminCategories } from './pages/AdminDashboard';

// ── Protected route ──
const ProtectedRoute = ({ children }) => {
  return localStorage.getItem('adminToken') ? children : <Navigate to="/admin" replace />;
};

// ── Public layout ──
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

          {/* ── PUBLIC ROUTES ── */}
          <Route path="/"              element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/products"      element={<PublicLayout><Products /></PublicLayout>} />
          <Route path="/categories"    element={<PublicLayout><Products /></PublicLayout>} />
          <Route path="/checkout"      element={<PublicLayout><Checkout /></PublicLayout>} />
          <Route path="/order-success" element={<PublicLayout><OrderSuccess /></PublicLayout>} />
          <Route path="/contact"       element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/custom-order"  element={<PublicLayout><CustomOrder /></PublicLayout>} />
          <Route path="/services"      element={<PublicLayout><Services /></PublicLayout>} />

          {/* ── POLICY ROUTES ── */}
          <Route path="/terms"    element={<PublicLayout><TermsOfService /></PublicLayout>} />
          <Route path="/privacy"  element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
          <Route path="/shipping" element={<PublicLayout><ShippingPolicy /></PublicLayout>} />
          <Route path="/returns"  element={<PublicLayout><ReturnPolicy /></PublicLayout>} />

          {/* ── ADMIN ROUTES ── */}
          <Route path="/admin"            element={<AdminLogin />} />
          <Route path="/admin/dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/products"   element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/orders"     element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={
            <PublicLayout>
              <div style={{ textAlign:'center', padding:'80px 24px' }}>
                <div style={{ fontSize:64 }}>🔍</div>
                <h2 style={{ fontFamily:'var(--font-serif)', marginTop:16, marginBottom:16 }}>Page Not Found</h2>
                <Link to="/" style={{ color:'#2563eb' }}>← Go Home</Link>
              </div>
            </PublicLayout>
          } />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
