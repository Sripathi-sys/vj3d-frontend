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
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="logo">VJ <span>3D</span> Works</Link>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>

            {/* ✅ Shop = All Products */}
            <li><Link to="/products">Shop</Link></li>

            {/* ✅ Categories Page */}
            <li><Link to="/categories">Categories</Link></li>

            <li><Link to="/custom-order">Custom Order</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <div className="nav-right">
            {showSearch ? (
              <form onSubmit={handleSearch} style={{ display:'flex', gap:6 }}>
                <input
                  autoFocus
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="search-input"
                />
                <button type="button" onClick={() => setShowSearch(false)}>✕</button>
              </form>
            ) : (
              <button onClick={() => setShowSearch(true)}>🔍</button>
            )}

            {/* Cart */}
            <button onClick={() => setCartOpen(true)} style={{ position:'relative' }}>
              🛒
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            {/* Mobile Menu */}
            <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
        <Link to="/custom-order" onClick={() => setMenuOpen(false)}>Custom Order</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>
    </>
  );
}

export default Navbar;