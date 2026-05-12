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
    { to: '/admin/dashboard',  icon: '📊', label: 'Dashboard'  },
    { to: '/admin/products',   icon: '📦', label: 'Products'   },
    { to: '/admin/orders',     icon: '🛒', label: 'Orders'     },
    { to: '/admin/categories', icon: '🗂️', label: 'Categories' },
  ];

  return (
    <div className="admin-sidebar">
      <div
        style={{
          padding: '0 24px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          fontFamily: 'var(--font-serif)',
          fontSize: 20,
          fontWeight: 700,
          color: '#fff'
        }}
      >
        VJ <span style={{ color: 'var(--accent)' }}>3D</span>
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
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 24px',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 14,
          fontWeight: 500,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

// ============================================
// Shared Styles
// ============================================

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.55)',
  zIndex: 3000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
  overflowY: 'auto'
};

const modalStyle = {
  background: '#fff',
  borderRadius: 8,
  width: '100%',
  maxWidth: 560,
  maxHeight: '92vh',
  overflowY: 'auto',
  padding: 32,
  position: 'relative',
  margin: 'auto'
};

const inputStyle = {
  width: '100%',
  border: '1.5px solid #d1d5db',
  borderRadius: 4,
  padding: '10px 14px',
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
  marginTop: 6,
  marginBottom: 14,
  display: 'block',
  boxSizing: 'border-box'
};

const labelStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: '#444',
  display: 'block',
  marginBottom: 2
};

const saveBtnStyle = {
  width: '100%',
  background: '#1a1a1a',
  color: '#fff',
  border: 'none',
  padding: '13px',
  fontSize: 14,
  fontWeight: 600,
  borderRadius: 4,
  cursor: 'pointer',
  marginTop: 12,
  letterSpacing: '0.04em'
};

const addBtnStyle = {
  background: '#1a1a1a',
  color: '#fff',
  border: 'none',
  padding: '10px 22px',
  fontSize: 13.5,
  fontWeight: 600,
  borderRadius: 4,
  cursor: 'pointer',
  marginBottom: 20,
  letterSpacing: '0.04em',
  display: 'inline-block'
};

const delBtnStyle = {
  background: '#fef2f2',
  color: '#e53e3e',
  border: '1px solid #fca5a5',
  padding: '6px 14px',
  fontSize: 12.5,
  fontWeight: 500,
  borderRadius: 4,
  cursor: 'pointer'
};

const editBtnStyle = {
  background: '#eff6ff',
  color: '#2563eb',
  border: '1px solid #93c5fd',
  padding: '6px 14px',
  fontSize: 12.5,
  fontWeight: 500,
  borderRadius: 4,
  cursor: 'pointer'
};

const closeBtnStyle = {
  position: 'absolute',
  top: 14,
  right: 14,
  background: '#f3f4f6',
  border: 'none',
  width: 32,
  height: 32,
  borderRadius: '50%',
  fontSize: 16,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 14
};

const thStyle = {
  textAlign: 'left',
  padding: '10px 14px',
  background: '#f9fafb',
  borderBottom: '1px solid #e5e7eb',
  fontWeight: 600,
  fontSize: 13,
  color: '#374151'
};

const tdStyle = {
  padding: '12px 14px',
  borderBottom: '1px solid #f3f4f6',
  verticalAlign: 'middle',
  color: '#1f2937'
};

// ============================================
// Dashboard
// ============================================

export function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    pending: 0
  });

  useEffect(() => {
    Promise.all([getProducts({}), getOrders()])
      .then(([p, o]) => {
        const orders = o.data;
        setStats({
          products: p.data.length,
          orders: orders.length,
          revenue: orders.reduce((s, x) => s + x.totalAmount, 0),
          pending: orders.filter(x => x.status === 'pending').length
        });
      })
      .catch(() => {});
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
              { num: stats.products, label: 'Total Products' },
              { num: stats.orders,   label: 'Total Orders'   },
              { num: `₹${stats.revenue}`, label: 'Total Revenue' },
              { num: stats.pending,  label: 'Pending Orders' }
            ].map((s, i) => (
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
  const [products,   setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal,  setShowModal]  = useState(false);
  const [saving,     setSaving]     = useState(false);
  const [editingId,  setEditingId]  = useState(null);
  const [imageFile,  setImageFile]  = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fileInputRef = useRef();

  const emptyForm = {
    name: '', description: '', price: '', originalPrice: '',
    emoji: '', badge: '', category: '',
    inStock: true, featured: false, isNewArrival: false, isCombo: false
  };

  const [form, setForm] = useState(emptyForm);

  const load = () => {
    getProducts({}).then(r => setProducts(r.data)).catch(() => {});
    getCategories().then(r => setCategories(r.data)).catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name:         product.name         || '',
      description:  product.description  || '',
      price:        product.price        || '',
      originalPrice:product.originalPrice|| '',
      emoji:        product.emoji        || '',
      badge:        product.badge        || '',
      category:     product.category?._id|| '',
      inStock:      product.inStock,
      featured:     product.featured,
      isNewArrival: product.isNewArrival,
      isCombo:      product.isCombo
    });
    setImagePreview(product.images?.[0] || '');
    setImageFile(null);
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      data.append('name',         form.name);
      data.append('description',  form.description);
      data.append('price',        form.price);
      data.append('originalPrice',form.originalPrice);
      data.append('emoji',        form.emoji);
      data.append('badge',        form.badge);
      data.append('inStock',      form.inStock);
      data.append('featured',     form.featured);
      data.append('isNewArrival', form.isNewArrival);
      data.append('isCombo',      form.isCombo);
      if (form.category) data.append('category', form.category);
      if (imageFile)     data.append('images',   imageFile);

      if (editingId) {
        await updateProduct(editingId, data);
      } else {
        await createProduct(data);
      }

      setShowModal(false);
      setForm(emptyForm);
      setEditingId(null);
      setImageFile(null);
      setImagePreview('');
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this product?')) return;
    deleteProduct(id).then(() => load()).catch(() => alert('Delete failed'));
  };

  const checkboxRow = (key, label) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 14, cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
      />
      {label}
    </label>
  );

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-topbar"><h2>Manage Products</h2></div>
        <div className="admin-content">

          <button style={addBtnStyle} onClick={openAdd}>+ Add Product</button>

          {products.length === 0 ? (
            <p style={{ color: '#6b7280', fontSize: 14 }}>No products found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Image</th>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>Stock</th>
                    <th style={thStyle}>Badges</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id}>
                      <td style={tdStyle}>
                        {p.images?.[0]
                          ? <img src={p.images[0]} alt={p.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} />
                          : <span style={{ fontSize: 28 }}>{p.emoji || '📦'}</span>
                        }
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600 }}>{p.name}</div>
                        {p.badge && (
                          <span style={{ fontSize: 11, background: '#fef9c3', color: '#92400e', padding: '2px 6px', borderRadius: 3 }}>{p.badge}</span>
                        )}
                      </td>
                      <td style={tdStyle}>{p.category?.name || '—'}</td>
                      <td style={tdStyle}>
                        <div>₹{p.price}</div>
                        {p.originalPrice && (
                          <div style={{ fontSize: 12, color: '#9ca3af', textDecoration: 'line-through' }}>₹{p.originalPrice}</div>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <span style={{
                          fontSize: 12,
                          padding: '3px 8px',
                          borderRadius: 12,
                          background: p.inStock ? '#dcfce7' : '#fee2e2',
                          color: p.inStock ? '#166534' : '#991b1b',
                          fontWeight: 600
                        }}>
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          {p.featured     && <span style={{ fontSize: 11, background: '#ede9fe', color: '#5b21b6', padding: '2px 6px', borderRadius: 3 }}>Featured</span>}
                          {p.isNewArrival && <span style={{ fontSize: 11, background: '#dbeafe', color: '#1e40af', padding: '2px 6px', borderRadius: 3 }}>New</span>}
                          {p.isCombo      && <span style={{ fontSize: 11, background: '#fce7f3', color: '#9d174d', padding: '2px 6px', borderRadius: 3 }}>Combo</span>}
                        </div>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button style={editBtnStyle} onClick={() => handleEdit(p)}>Edit</button>
                          <button style={delBtnStyle}  onClick={() => handleDelete(p._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={overlayStyle} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={modalStyle}>
            <button style={closeBtnStyle} onClick={() => setShowModal(false)}>✕</button>
            <h3 style={{ marginBottom: 20, fontSize: 18, fontWeight: 700 }}>
              {editingId ? 'Edit Product' : 'Add Product'}
            </h3>

            <form onSubmit={handleSave}>
              <label style={labelStyle}>Name *</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />

              <label style={labelStyle}>Description</label>
              <textarea
                style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Price (₹) *</label>
                  <input style={inputStyle} type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
                </div>
                <div>
                  <label style={labelStyle}>Original Price (₹)</label>
                  <input style={inputStyle} type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Emoji</label>
                  <input style={inputStyle} value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} placeholder="e.g. 🎁" />
                </div>
                <div>
                  <label style={labelStyle}>Badge</label>
                  <input style={inputStyle} value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="e.g. Best Seller" />
                </div>
              </div>

              <label style={labelStyle}>Category</label>
              <select
                style={inputStyle}
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              >
                <option value="">— Select Category —</option>
                {categories.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>

              <label style={labelStyle}>Product Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ ...inputStyle, padding: '8px 14px' }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 6, marginBottom: 14 }}
                />
              )}

              <div style={{ marginBottom: 14 }}>
                {checkboxRow('inStock',      'In Stock')}
                {checkboxRow('featured',     'Featured')}
                {checkboxRow('isNewArrival', 'New Arrival')}
                {checkboxRow('isCombo',      'Combo')}
              </div>

              <button style={saveBtnStyle} type="submit" disabled={saving}>
                {saving ? 'Saving…' : editingId ? 'Update Product' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// ORDERS
// ============================================

const STATUS_OPTIONS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusColors = {
  pending:    { bg: '#fef9c3', color: '#92400e' },
  confirmed:  { bg: '#dbeafe', color: '#1e40af' },
  processing: { bg: '#ede9fe', color: '#5b21b6' },
  shipped:    { bg: '#d1fae5', color: '#065f46' },
  delivered:  { bg: '#dcfce7', color: '#166534' },
  cancelled:  { bg: '#fee2e2', color: '#991b1b' },
};

export function AdminOrders() {
  const [orders,     setOrders]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => {
    setLoading(true);
    getOrders()
      .then(r => setOrders(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateStatus(orderId, newStatus);
      setOrders(prev =>
        prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o)
      );
    } catch {
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-topbar"><h2>Manage Orders</h2></div>
        <div className="admin-content">

          {loading ? (
            <p style={{ color: '#6b7280', fontSize: 14 }}>Loading orders…</p>
          ) : orders.length === 0 ? (
            <p style={{ color: '#6b7280', fontSize: 14 }}>No orders found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Order ID</th>
                    <th style={thStyle}>Customer</th>
                    <th style={thStyle}>Items</th>
                    <th style={thStyle}>Total</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => {
                    const sc = statusColors[order.status] || { bg: '#f3f4f6', color: '#374151' };
                    const isExpanded = expandedId === order._id;
                    return (
                      <>
                        <tr key={order._id}>
                          <td style={tdStyle}>
                            <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#6b7280' }}>
                              #{order._id?.slice(-8).toUpperCase()}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <div style={{ fontWeight: 600 }}>{order.customerName || order.shippingAddress?.name || '—'}</div>
                            <div style={{ fontSize: 12, color: '#6b7280' }}>{order.customerPhone || order.shippingAddress?.phone || ''}</div>
                          </td>
                          <td style={tdStyle}>
                            {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                          </td>
                          <td style={tdStyle}>
                            <span style={{ fontWeight: 600 }}>₹{order.totalAmount}</span>
                          </td>
                          <td style={tdStyle}>
                            <span style={{ fontSize: 13 }}>
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                                : '—'}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <select
                              value={order.status}
                              disabled={updatingId === order._id}
                              onChange={e => handleStatusChange(order._id, e.target.value)}
                              style={{
                                border: 'none',
                                borderRadius: 12,
                                padding: '5px 10px',
                                fontSize: 12,
                                fontWeight: 600,
                                background: sc.bg,
                                color: sc.color,
                                cursor: 'pointer',
                                outline: 'none'
                              }}
                            >
                              {STATUS_OPTIONS.map(s => (
                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                              ))}
                            </select>
                          </td>
                          <td style={tdStyle}>
                            <button
                              style={editBtnStyle}
                              onClick={() => setExpandedId(isExpanded ? null : order._id)}
                            >
                              {isExpanded ? 'Hide' : 'View'}
                            </button>
                          </td>
                        </tr>

                        {/* Expanded row */}
                        {isExpanded && (
                          <tr key={`${order._id}-expanded`}>
                            <td colSpan={7} style={{ ...tdStyle, background: '#f9fafb', padding: 20 }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

                                {/* Items */}
                                <div>
                                  <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 13 }}>Order Items</div>
                                  {order.items?.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                      {item.image && (
                                        <img src={item.image} alt={item.name} style={{ width: 36, height: 36, borderRadius: 4, objectFit: 'cover' }} />
                                      )}
                                      <div>
                                        <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                                        <div style={{ fontSize: 12, color: '#6b7280' }}>Qty: {item.quantity} × ₹{item.price}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Shipping */}
                                <div>
                                  <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 13 }}>Shipping Address</div>
                                  {order.shippingAddress ? (
                                    <div style={{ fontSize: 13, lineHeight: 1.6, color: '#374151' }}>
                                      <div>{order.shippingAddress.name}</div>
                                      <div>{order.shippingAddress.phone}</div>
                                      <div>{order.shippingAddress.address}</div>
                                      <div>{order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}</div>
                                    </div>
                                  ) : (
                                    <div style={{ fontSize: 13, color: '#9ca3af' }}>No address info</div>
                                  )}

                                  {order.paymentMethod && (
                                    <div style={{ marginTop: 12, fontSize: 13 }}>
                                      <span style={{ fontWeight: 600 }}>Payment: </span>
                                      {order.paymentMethod}
                                    </div>
                                  )}
                                </div>

                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// CATEGORIES
// ============================================

export function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [showModal,  setShowModal]  = useState(false);
  const [saving,     setSaving]     = useState(false);
  const [editingId,  setEditingId]  = useState(null);

  const emptyForm = { name: '', description: '', emoji: '' };
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    getCategories().then(r => setCategories(r.data)).catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setForm({
      name:        cat.name        || '',
      description: cat.description || '',
      emoji:       cat.emoji       || ''
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateCategory(editingId, form);
      } else {
        await createCategory(form);
      }
      setShowModal(false);
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this category?')) return;
    deleteCategory(id).then(() => load()).catch(() => alert('Delete failed'));
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-topbar"><h2>Manage Categories</h2></div>
        <div className="admin-content">

          <button style={addBtnStyle} onClick={openAdd}>+ Add Category</button>

          {categories.length === 0 ? (
            <p style={{ color: '#6b7280', fontSize: 14 }}>No categories found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Emoji</th>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Description</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(cat => (
                    <tr key={cat._id}>
                      <td style={{ ...tdStyle, fontSize: 28, width: 60 }}>{cat.emoji || '🗂️'}</td>
                      <td style={tdStyle}>
                        <span style={{ fontWeight: 600 }}>{cat.name}</span>
                      </td>
                      <td style={{ ...tdStyle, color: '#6b7280', maxWidth: 300 }}>
                        {cat.description || '—'}
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button style={editBtnStyle} onClick={() => handleEdit(cat)}>Edit</button>
                          <button style={delBtnStyle}  onClick={() => handleDelete(cat._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={overlayStyle} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={modalStyle}>
            <button style={closeBtnStyle} onClick={() => setShowModal(false)}>✕</button>
            <h3 style={{ marginBottom: 20, fontSize: 18, fontWeight: 700 }}>
              {editingId ? 'Edit Category' : 'Add Category'}
            </h3>

            <form onSubmit={handleSave}>
              <label style={labelStyle}>Category Name *</label>
              <input
                style={inputStyle}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Miniatures"
                required
              />

              <label style={labelStyle}>Description</label>
              <textarea
                style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Short description of this category"
              />

              <label style={labelStyle}>Emoji</label>
              <input
                style={inputStyle}
                value={form.emoji}
                onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))}
                placeholder="e.g. 🏆"
              />

              <button style={saveBtnStyle} type="submit" disabled={saving}>
                {saving ? 'Saving…' : editingId ? 'Update Category' : 'Create Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
