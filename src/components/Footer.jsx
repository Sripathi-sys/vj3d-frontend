// src/components/Footer.jsx
import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">VJ <span>3D</span> Works</Link>
            <p>
              Custom 3D printed gifts, figurines, keychains & prototypes — crafted
              with precision by J. Vijay at Gingee, Tamil Nadu. All India courier available.
            </p>
            <div className="social-row">
              <a href="https://instagram.com/vj_3d_works" target="_blank" rel="noreferrer" className="soc-btn" title="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://wa.me/919159432954" target="_blank" rel="noreferrer" className="soc-btn" title="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?badge=NEW">New Arrivals</Link></li>
              <li><Link to="/products?badge=SALE">Sale Items</Link></li>
              <li><Link to="/custom-order">Custom Order</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Info</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/returns">Return Policy</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="https://wa.me/919159432954" target="_blank" rel="noreferrer">
                  WhatsApp: 91594 32954
                </a>
              </li>
              <li><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13.5 }}>54/2, Middle Street</span></li>
              <li><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13.5 }}>Neganur Village, Gingee</span></li>
              <li><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13.5 }}>Tamil Nadu — 604202</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} <span>VJ 3D Works</span> by J. Vijay. All rights reserved.</p>
          <p>Made with ❤️ in Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
