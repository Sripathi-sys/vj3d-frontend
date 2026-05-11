
// src/pages/AdminDashboard.jsx

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import {
  getProducts,
  getOrders,
  getCategories,
  createProduct,
  updateProduct,
 deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  updateStatus
} from '../api';

// ============================================
// Sidebar
// ============================================

function Sidebar() {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const links = [
    { to:'/admin/dashboard',  icon:'📊', label:'Dashboard'  },
    { to:'/admin/products',   icon:'📦', label:'Products'   },
    { to:'/admin/orders',     icon:'🛒', label:'Orders'     },
    { to:'/admin/categories', icon:'🗂️', label:'Categories' },
  ];

  return (
    <div className="admin-sidebar">

      <div
        style={{
          padding:'0 24px 24px',
          borderBottom:'1px solid rgba(255,255,255,0.1)',
          fontFamily:'var(--font-serif)',
          fontSize:20,
          fontWeight:700,
          color:'#fff'
        }}
      >
        VJ <span style={{ color:'var(--accent)' }}>3D</span>
      </div>

      <nav className="admin-nav">
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={pathname === l.to ? 'active' : ''}
          >
            {l.icon} {l.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        style={{
          display:'flex',
          alignItems:'center',
          gap:10,
          padding:'12px 24px',
          color:'rgba(255,255,255,0.5)',
          fontSize:14,
          fontWeight:500,
          background:'none',
          border:'none',
          cursor:'pointer',
          width:'100%'
        }}
      >
        🚪 Logout
      </button>

    </div>
  );
}

// ============================================
// Styles
// ============================================

const overlayStyle = {
  position:'fixed',
  inset:0,
  background:'rgba(0,0,0,0.55)',
  zIndex:3000,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  padding:24,
  overflowY:'auto'
};

const modalStyle = {
  background:'#fff',
  borderRadius:8,
  width:'100%',
  maxWidth:560,
  maxHeight:'92vh',
  overflowY:'auto',
  padding:32,
  position:'relative',
  margin:'auto'
};

const inputStyle = {
  width:'100%',
  border:'1.5px solid #d1d5db',
  borderRadius:4,
  padding:'10px 14px',
  fontSize:14,
  fontFamily:'inherit',
  outline:'none',
  marginTop:6,
  marginBottom:14,
  display:'block',
  boxSizing:'border-box'
};

const labelStyle = {
  fontSize:13,
  fontWeight:600,
  color:'#444',
  display:'block',
  marginBottom:2
};

const saveBtnStyle = {
  width:'100%',
  background:'#1a1a1a',
  color:'#fff',
  border:'none',
  padding:'13px',
  fontSize:14,
  fontWeight:600,
  borderRadius:4,
  cursor:'pointer',
  marginTop:12,
  letterSpacing:'0.04em'
};

const addBtnStyle = {
  background:'#1a1a1a',
  color:'#fff',
  border:'none',
  padding:'10px 22px',
  fontSize:13.5,
  fontWeight:600,
  borderRadius:4,
  cursor:'pointer',
  marginBottom:20,
  letterSpacing:'0.04em',
  display:'inline-block'
};

const delBtnStyle = {
  background:'#fef2f2',
  color:'#e53e3e',
  border:'1px solid #fca5a5',
  padding:'6px 14px',
  fontSize:12.5,
  fontWeight:500,
  borderRadius:4,
  cursor:'pointer'
};

const editBtnStyle = {
  background:'#eff6ff',
  color:'#2563eb',
  border:'1px solid #93c5fd',
  padding:'6px 14px',
  fontSize:12.5,
  fontWeight:500,
  borderRadius:4,
  cursor:'pointer'
};

const closeBtnStyle = {
  position:'absolute',
  top:14,
  right:14,
  background:'#f3f4f6',
  border:'none',
  width:32,
  height:32,
  borderRadius:'50%',
  fontSize:16,
  cursor:'pointer',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  fontWeight:700
};

// ============================================
// Dashboard
// ============================================

export function Dashboard() {

  const [stats, setStats] = useState({
    products:0,
    orders:0,
    revenue:0,
    pending:0
  });

  useEffect(() => {

    Promise.all([
      getProducts({}),
      getOrders()
    ])
      .then(([p, o]) => {

        const orders = o.data;

        setStats({
          products: p.data.length,
          orders: orders.length,
          revenue: orders.reduce((s,x)=>s+x.totalAmount,0),
          pending: orders.filter(x=>x.status==='pending').length
        });

      })
      .catch(()=>{});

  }, []);

  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <div className="admin-topbar">
          <h2>Admin Dashboard</h2>
        </div>

        <div className="admin-content">

          <div className="stats-grid">

            {[
              {num:stats.products,label:'Total Products'},
              {num:stats.orders,label:'Total Orders'},
              {num:`₹${stats.revenue}`,label:'Total Revenue'},
              {num:stats.pending,label:'Pending Orders'}
            ].map((s,i)=>(
              <div className="stat-card" key={i}>
                <div className="value">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

// ============================================
// PRODUCTS
// ============================================
export function AdminProducts() {

  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <div className="admin-topbar">
          <h2>Manage Products</h2>
        </div>

        <div className="admin-content">

          <h3>Products Page Working ✅</h3>

        </div>

      </div>

    </div>
  );
}

export function AdminOrders() {

  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <div className="admin-topbar">
          <h2>Manage Orders</h2>
        </div>

        <div className="admin-content">

          <h3>Orders Page Working ✅</h3>

        </div>

      </div>

    </div>
  );
}

export function AdminCategories() {

  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <div className="admin-topbar">
          <h2>Manage Categories</h2>
        </div>

        <div className="admin-content">

          <h3>Categories Page Working ✅</h3>

        </div>

      </div>

    </div>
  );
}