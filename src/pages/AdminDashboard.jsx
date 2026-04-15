// src/pages/AdminDashboard.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getProducts, getOrders, getCategories, createProduct, deleteProduct, createCategory, deleteCategory, updateStatus } from '../api';

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('adminToken'); navigate('/admin'); };
  const links = [
    { to:'/admin/dashboard',  icon:'📊', label:'Dashboard'  },
    { to:'/admin/products',   icon:'📦', label:'Products'   },
    { to:'/admin/orders',     icon:'🛒', label:'Orders'     },
    { to:'/admin/categories', icon:'🗂️', label:'Categories' },
  ];
  return (
    <div className="admin-sidebar">
      <div style={{ padding:'0 24px 24px', borderBottom:'1px solid rgba(255,255,255,0.1)', fontFamily:'var(--font-serif)', fontSize:20, fontWeight:700, color:'#fff' }}>
        VJ <span style={{ color:'var(--accent)' }}>3D</span>
      </div>
      <nav className="admin-nav">
        {links.map(l => (
          <Link key={l.to} to={l.to} className={pathname === l.to ? 'active' : ''}>
            {l.icon} {l.label}
          </Link>
        ))}
      </nav>
      <button onClick={logout} style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 24px', color:'rgba(255,255,255,0.5)', fontSize:14, fontWeight:500, background:'none', border:'none', cursor:'pointer', width:'100%' }}>
        🚪 Logout
      </button>
    </div>
  );
}

const overlayStyle  = { position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', zIndex:3000, display:'flex', alignItems:'center', justifyContent:'center', padding:24, overflowY:'auto' };
const modalStyle    = { background:'#fff', borderRadius:8, width:'100%', maxWidth:560, maxHeight:'92vh', overflowY:'auto', padding:32, position:'relative', margin:'auto' };
const inputStyle    = { width:'100%', border:'1.5px solid #d1d5db', borderRadius:4, padding:'10px 14px', fontSize:14, fontFamily:'inherit', outline:'none', marginTop:6, marginBottom:14, display:'block', boxSizing:'border-box' };
const labelStyle    = { fontSize:13, fontWeight:600, color:'#444', display:'block', marginBottom:2 };
const saveBtnStyle  = { width:'100%', background:'#1a1a1a', color:'#fff', border:'none', padding:'13px', fontSize:14, fontWeight:600, borderRadius:4, cursor:'pointer', marginTop:12, letterSpacing:'0.04em' };
const addBtnStyle   = { background:'#1a1a1a', color:'#fff', border:'none', padding:'10px 22px', fontSize:13.5, fontWeight:600, borderRadius:4, cursor:'pointer', marginBottom:20, letterSpacing:'0.04em', display:'inline-block' };
const delBtnStyle   = { background:'#fef2f2', color:'#e53e3e', border:'1px solid #fca5a5', padding:'6px 14px', fontSize:12.5, fontWeight:500, borderRadius:4, cursor:'pointer' };
const closeBtnStyle = { position:'absolute', top:14, right:14, background:'#f3f4f6', border:'none', width:32, height:32, borderRadius:'50%', fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 };

// ── Dashboard ──
export function Dashboard() {
  const [stats, setStats] = useState({ products:0, orders:0, revenue:0, pending:0 });
  useEffect(() => {
    Promise.all([getProducts({}), getOrders()])
      .then(([p, o]) => {
        const orders = o.data;
        setStats({ products:p.data.length, orders:orders.length, revenue:orders.reduce((s,x)=>s+x.totalAmount,0), pending:orders.filter(x=>x.status==='pending').length });
      }).catch(()=>{});
  }, []);
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-topbar"><h2>Admin Dashboard</h2></div>
        <div className="admin-content">
          <div className="stats-grid">
            {[{num:stats.products,label:'Total Products'},{num:stats.orders,label:'Total Orders'},{num:`₹${stats.revenue}`,label:'Total Revenue'},{num:stats.pending,label:'Pending Orders'}].map((s,i)=>(
              <div className="stat-card" key={i}><div className="value">{s.num}</div><div className="label">{s.label}</div></div>
            ))}
          </div>
          <p style={{color:'var(--text3)',fontSize:14,marginTop:12}}>Welcome to VJ 3D Works admin panel.</p>
        </div>
      </div>
    </div>
  );
}

// ── Products ──
export function AdminProducts() {
  const [products,     setProducts]     = useState([]);
  const [categories,   setCategories]   = useState([]);
  const [showModal,    setShowModal]    = useState(false);
  const [saving,       setSaving]       = useState(false);
  const [imageFile,    setImageFile]    = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef();
  const BASE = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api').replace('/api','');

  const emptyForm = { name:'', description:'', price:'', originalPrice:'', emoji:'', badge:'', category:'', inStock:true, featured:false, isNewArrival:false, isCombo:false };
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    getProducts({}).then(r=>setProducts(r.data)).catch(()=>{});
    getCategories().then(r=>setCategories(r.data)).catch(()=>{});
  };
  useEffect(()=>{ load(); },[]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      data.append('name',          form.name);
      data.append('description',   form.description);
      data.append('price',         form.price);
      data.append('originalPrice', form.originalPrice);
      data.append('emoji',         form.emoji);
      data.append('badge',         form.badge);
      data.append('inStock',       form.inStock);
      data.append('featured',      form.featured);
      data.append('isNewArrival',  form.isNewArrival);
      data.append('isCombo',       form.isCombo);
      if (form.category) data.append('category', form.category);
      if (imageFile)     data.append('images', imageFile);
      await createProduct(data);
      setShowModal(false);
      setForm(emptyForm);
      setImageFile(null);
      setImagePreview('');
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id, name) => {
    deleteProduct(id).then(()=>load()).catch(err=>alert(err.response?.data?.message||'Delete failed'));
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-topbar"><h2>Manage Products</h2></div>
        <div className="admin-content">
          <button style={addBtnStyle} onClick={()=>setShowModal(true)}>+ Add Product</button>
          <div style={{overflowX:'auto'}}>
            <table className="admin-table">
              <thead><tr><th>Photo</th><th>Name</th><th>Description</th><th>Price</th><th>Badge</th><th>Stock</th><th>Actions</th></tr></thead>
              <tbody>
                {products.length===0 && <tr><td colSpan={7} style={{textAlign:'center',color:'#888',padding:40}}>No products yet — click "+ Add Product"</td></tr>}
                {products.map(p=>(
                  <tr key={p._id}>
                    <td>
                      <div style={{width:52,height:52,background:'#f3f4f6',borderRadius:4,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>
                        {p.images?.[0] ? <img src={`${BASE}${p.images[0]}`} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : (p.emoji||'📦')}
                      </div>
                    </td>
                    <td style={{fontWeight:500,maxWidth:140}}>{p.name}</td>
                    <td style={{fontSize:12,color:'#888',maxWidth:180}}>
                      {p.description
                        ? <span style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{p.description}</span>
                        : <span style={{color:'#ccc',fontStyle:'italic'}}>No description</span>
                      }
                    </td>
                    <td style={{fontWeight:700}}>₹{p.price}</td>
                    <td>{p.badge&&<span style={{background:'#fee2e2',color:'#991b1b',padding:'2px 8px',borderRadius:2,fontSize:11,fontWeight:700}}>{p.badge}</span>}</td>
                    <td><span style={{color:p.inStock?'#16a34a':'#e53e3e',fontSize:12,fontWeight:600}}>{p.inStock?'✓ In Stock':'✗ Out'}</span></td>
                    <td><button style={delBtnStyle} onClick={()=>handleDelete(p._id,p.name)}>🗑️ Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div style={overlayStyle} onClick={()=>setShowModal(false)}>
              <div style={modalStyle} onClick={e=>e.stopPropagation()}>
                <button style={closeBtnStyle} onClick={()=>setShowModal(false)}>✕</button>
                <h3 style={{fontFamily:'var(--font-serif)',fontSize:22,marginBottom:24}}>Add New Product</h3>
                <form onSubmit={handleSave}>

                  {/* Photo Upload */}
                  <label style={labelStyle}>Product Photo</label>
                  <div onClick={()=>fileInputRef.current.click()} style={{border:'2px dashed #d1d5db',borderRadius:6,padding:20,textAlign:'center',cursor:'pointer',marginBottom:14,marginTop:6,background:'#f9fafb'}}>
                    {imagePreview
                      ? <img src={imagePreview} alt="preview" style={{height:120,objectFit:'cover',borderRadius:4,margin:'0 auto',display:'block'}}/>
                      : <div><div style={{fontSize:32,marginBottom:6}}>📸</div><div style={{fontSize:13.5,fontWeight:600,color:'#555'}}>Click to upload photo</div><div style={{fontSize:12,color:'#888',marginTop:4}}>JPG, PNG — max 5MB</div></div>
                    }
                  </div>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{display:'none'}}/>
                  {imagePreview && <button type="button" onClick={()=>{setImageFile(null);setImagePreview('');}} style={{fontSize:12,color:'#e53e3e',background:'none',border:'none',cursor:'pointer',marginBottom:10,marginTop:-8,display:'block'}}>✕ Remove photo</button>}

                  {/* Product Name */}
                  <label style={labelStyle}>Product Name *</label>
                  <input style={inputStyle} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Dragon Figurine" required/>

                  {/* Description */}
                  <label style={labelStyle}>Product Description</label>
                  <textarea
                    style={{...inputStyle, minHeight:90, resize:'vertical'}}
                    value={form.description}
                    onChange={e=>setForm({...form,description:e.target.value})}
                    placeholder="Describe your product — size, material, what it's for, customisation options..."
                  />

                  {/* Price */}
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div>
                      <label style={labelStyle}>Price (₹) *</label>
                      <input style={inputStyle} type="number" min="0" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="199" required/>
                    </div>
                    <div>
                      <label style={labelStyle}>Original Price (₹)</label>
                      <input style={inputStyle} type="number" min="0" value={form.originalPrice} onChange={e=>setForm({...form,originalPrice:e.target.value})} placeholder="299"/>
                    </div>
                  </div>

                  <label style={labelStyle}>Emoji (shown if no photo)</label>
                  <input style={inputStyle} value={form.emoji} onChange={e=>setForm({...form,emoji:e.target.value})} placeholder="🎁"/>

                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div>
                      <label style={labelStyle}>Badge</label>
                      <select style={inputStyle} value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})}>
                        <option value="">None</option>
                        <option value="SALE">SALE</option>
                        <option value="NEW">NEW</option>
                        <option value="HOT">HOT</option>
                        <option value="COMBO">COMBO</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Category</label>
                      <select style={inputStyle} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                        <option value="">No category</option>
                        {categories.map(c=><option key={c._id} value={c._id}>{c.emoji} {c.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
                    {[['inStock','✓ In Stock'],['featured','⭐ Featured'],['isNewArrival','🆕 New Arrival'],['isCombo','🎁 Combo']].map(([k,l])=>(
                      <label key={k} style={{display:'flex',alignItems:'center',gap:8,fontSize:13.5,cursor:'pointer',fontWeight:500,padding:'6px 0'}}>
                        <input type="checkbox" checked={form[k]} onChange={e=>setForm({...form,[k]:e.target.checked})} style={{width:16,height:16,cursor:'pointer'}}/>
                        {l}
                      </label>
                    ))}
                  </div>

                  <button type="submit" style={{...saveBtnStyle,opacity:saving?0.7:1}} disabled={saving}>
                    {saving?'Saving...':'Save Product'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Orders ──
export function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const load = () => { getOrders().then(r=>setOrders(r.data)).catch(()=>{}); };
  useEffect(()=>{ load(); },[]);

  const handleStatus = (id, status) => {
    updateStatus(id, status).then(()=>load()).catch(err=>alert(err.response?.data?.message||'Error'));
  };

  const sc = { pending:{bg:'#fef3c7',color:'#92400e'}, confirmed:{bg:'#d1fae5',color:'#065f46'}, processing:{bg:'#dbeafe',color:'#1e40af'}, shipped:{bg:'#ede9fe',color:'#5b21b6'}, delivered:{bg:'#d1fae5',color:'#065f46'}, cancelled:{bg:'#fee2e2',color:'#991b1b'} };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-topbar"><h2>Manage Orders</h2></div>
        <div className="admin-content">
          <div style={{overflowX:'auto'}}>
            <table className="admin-table">
              <thead><tr><th>Order ID</th><th>Customer</th><th>Phone</th><th>Amount</th><th>Status</th><th>Date</th><th>Update</th></tr></thead>
              <tbody>
                {orders.length===0 && <tr><td colSpan={7} style={{textAlign:'center',color:'#888',padding:40}}>No orders yet</td></tr>}
                {orders.map(o=>{
                  const s=sc[o.status]||{bg:'#f3f4f6',color:'#374151'};
                  return (
                    <tr key={o._id}>
                      <td style={{fontSize:11,fontWeight:700,letterSpacing:1}}>#{o._id.slice(-6).toUpperCase()}</td>
                      <td style={{fontWeight:500}}>{o.customerName}</td>
                      <td>{o.customerPhone}</td>
                      <td style={{fontWeight:700}}>₹{o.totalAmount}</td>
                      <td><span style={{background:s.bg,color:s.color,padding:'3px 10px',borderRadius:3,fontSize:11,fontWeight:700,textTransform:'uppercase'}}>{o.status}</span></td>
                      <td style={{fontSize:12,color:'#888'}}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                      <td>
                        <select style={{padding:'6px 10px',fontSize:12,border:'1px solid #d1d5db',borderRadius:4,outline:'none',cursor:'pointer',background:'#fff'}} value={o.status} onChange={e=>handleStatus(o._id,e.target.value)}>
                          {['pending','confirmed','processing','shipped','delivered','cancelled'].map(s=><option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Categories ──
export function AdminCategories() {
  const [cats,      setCats]      = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [form,      setForm]      = useState({ name:'', subtitle:'', emoji:'' });

  const load = () => { getCategories().then(r=>setCats(r.data)).catch(()=>{}); };
  useEffect(()=>{ load(); },[]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createCategory(form);
      setShowModal(false);
      setForm({ name:'', subtitle:'', emoji:'' });
      load();
    } catch (err) {
      alert(err.response?.data?.message||'Error saving category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    deleteCategory(id).then(()=>load()).catch(err=>alert(err.response?.data?.message||'Delete failed'));
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-topbar"><h2>Manage Categories</h2></div>
        <div className="admin-content">
          <button style={addBtnStyle} onClick={()=>setShowModal(true)}>+ Add Category</button>
          <table className="admin-table">
            <thead><tr><th>Emoji</th><th>Name</th><th>Subtitle</th><th>Actions</th></tr></thead>
            <tbody>
              {cats.length===0 && <tr><td colSpan={4} style={{textAlign:'center',color:'#888',padding:40}}>No categories yet</td></tr>}
              {cats.map(c=>(
                <tr key={c._id}>
                  <td style={{fontSize:26}}>{c.emoji}</td>
                  <td style={{fontWeight:600}}>{c.name}</td>
                  <td style={{color:'#888',fontSize:13}}>{c.subtitle}</td>
                  <td><button style={delBtnStyle} onClick={()=>handleDelete(c._id)}>🗑️ Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <div style={overlayStyle} onClick={()=>setShowModal(false)}>
              <div style={modalStyle} onClick={e=>e.stopPropagation()}>
                <button style={closeBtnStyle} onClick={()=>setShowModal(false)}>✕</button>
                <h3 style={{fontFamily:'var(--font-serif)',fontSize:22,marginBottom:24}}>Add New Category</h3>
                <form onSubmit={handleSave}>
                  <label style={labelStyle}>Category Name *</label>
                  <input style={inputStyle} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Keychains" required/>
                  <label style={labelStyle}>Subtitle</label>
                  <input style={inputStyle} value={form.subtitle} onChange={e=>setForm({...form,subtitle:e.target.value})} placeholder="e.g. Custom & personalised"/>
                  <label style={labelStyle}>Emoji</label>
                  <input style={inputStyle} value={form.emoji} onChange={e=>setForm({...form,emoji:e.target.value})} placeholder="e.g. 🔑"/>
                  <button type="submit" style={{...saveBtnStyle,opacity:saving?0.7:1}} disabled={saving}>
                    {saving?'Saving...':'Save Category'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
