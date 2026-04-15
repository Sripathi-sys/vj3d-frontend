// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { totalItems, setCartOpen } = useCart();
  const [menuOpen, setMenuOpen]     = useState(false);
  const [search, setSearch]         = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setShowSearch(false);
    }
  };

  return (
    <>
      {/* ANNOUNCEMENT BANNER */}
      <div className="banner">
        🚀 Free Delivery On Orders Above ₹999 &nbsp;·&nbsp;
        All India Courier Available &nbsp;·&nbsp;
        WhatsApp: +91 91594 32954
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="logo">VJ <span>3D</span> Works</Link>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/custom-order">Custom Order</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <div className="nav-right">
            {showSearch ? (
              <form onSubmit={handleSearch} style={{ display:'flex', gap:6, alignItems:'center' }}>
                <input
                  autoFocus
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="search-input"
                />
                <button type="button" className="icon-btn" onClick={() => setShowSearch(false)}>✕</button>
              </form>
            ) : (
              <button className="icon-btn" onClick={() => setShowSearch(true)} title="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            )}

            <button className="icon-btn" onClick={() => setCartOpen(true)} title="Cart" style={{ position:'relative' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span style={menuOpen ? { transform:'rotate(45deg) translate(5px, 5px)' } : {}} />
              <span style={menuOpen ? { opacity:0 } : {}} />
              <span style={menuOpen ? { transform:'rotate(-45deg) translate(5px, -5px)' } : {}} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/"             onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products"     onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/categories"   onClick={() => setMenuOpen(false)}>Categories</Link>
        <Link to="/custom-order" onClick={() => setMenuOpen(false)}>Custom Order</Link>
        <Link to="/contact"      onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>
    </>
  );
}

export default Navbar;
