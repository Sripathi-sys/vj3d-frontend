// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../api';

const SkeletonGrid = () => (
  <div className="loading-grid">
    {[...Array(4)].map((_, i) => <div key={i} className="skeleton" />)}
  </div>
);

// Demo product images (royalty-free Unsplash 3D printing related)
const DEMO_PRODUCTS = [
  {
    _id: 'd1', name: 'Custom Name Plate', price: 249, originalPrice: 399,
    badge: 'SALE', inStock: true, emoji: '🪧',
    images: [],
  },
  {
    _id: 'd2', name: 'Dragon Figurine (Medium)', price: 499, originalPrice: 699,
    badge: 'NEW', inStock: true, emoji: '🐉',
    images: [],
  },
  {
    _id: 'd3', name: '3D Photo Frame (4×6)', price: 349, originalPrice: 499,
    badge: 'SALE', inStock: true, emoji: '🖼️',
    images: [],
  },
  {
    _id: 'd4', name: 'Custom Keychain Pair', price: 199, originalPrice: 299,
    badge: 'COMBO', inStock: true, emoji: '🔑',
    images: [],
  },
  {
    _id: 'd5', name: 'Miniature Sculpture', price: 599, originalPrice: 799,
    badge: null, inStock: true, emoji: '🗿',
    images: [],
  },
  {
    _id: 'd6', name: 'Mobile Stand (Custom)', price: 299, originalPrice: 449,
    badge: 'NEW', inStock: true, emoji: '📱',
    images: [],
  },
  {
    _id: 'd7', name: 'Wall Stand 3D Print', price: 399, originalPrice: 549,
    badge: null, inStock: false, emoji: '🏠',
    images: [],
  },
  {
    _id: 'd8', name: 'Science Project Model', price: 449, originalPrice: 699,
    badge: 'NEW', inStock: true, emoji: '🔬',
    images: [],
  },
];

const DEMO_CATEGORIES = [
  { _id: 'c1', name: 'Gift Items',      emoji: '🎁',   subtitle: 'For every occasion' },
  { _id: 'c2', name: 'Figurines',       emoji: '🐉',   subtitle: 'Characters & collectibles' },
  { _id: 'c3', name: 'Keychains',       emoji: '🔑',   subtitle: 'Custom & personalised' },
  { _id: 'c4', name: 'Photo Frames',    emoji: '🖼️',   subtitle: '3D printed frames' },
  { _id: 'c5', name: 'Mobile Cases',    emoji: '📱',   subtitle: 'Cases & stands' },
  { _id: 'c6', name: 'Home Decor',      emoji: '🏠',   subtitle: 'Wall stands & more' },
  { _id: 'c7', name: 'Science Models',  emoji: '🔬',   subtitle: 'Projects & prototypes' },
  { _id: 'c8', name: 'Custom Orders',   emoji: '✏️',   subtitle: 'Bring your idea to life' },
];

const reviews = [
  { id: 1, stars: '★★★★★', text: 'Got a custom nameplate for my desk — quality is incredible. Very detailed print and fast delivery!', author: 'Ravi Kumar', location: 'Bangalore' },
  { id: 2, stars: '★★★★★', text: 'Ordered a dragon figurine as a birthday gift. My friend loved it! Packaging was super secure.', author: 'Priya Sharma', location: 'Chennai' },
  { id: 3, stars: '★★★★☆', text: 'Great custom keychain set for our college farewell. 20 pieces, all perfect. Best 3D shop!', author: 'Arjun Menon', location: 'Kochi' },
  { id: 4, stars: '★★★★★', text: 'The 3D photo frame is stunning! Exactly as shown. Great quality. Highly recommend VJ 3D Works.', author: 'Sneha Reddy', location: 'Hyderabad' },
];

function Home() {
  const [featured,    setFeatured]    = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories,  setCategories]  = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [f, n, cats] = await Promise.all([
          getProducts({ featured: true }),
          getProducts({ newArrival: true }),
          getCategories(),
        ]);
        setFeatured(f.data.slice(0, 8));
        setNewArrivals(n.data.slice(0, 8));
        setCategories(cats.data.slice(0, 8));
      } catch {
        // fallback to demo
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const showFeatured   = featured.length   > 0 ? featured   : DEMO_PRODUCTS;
  const showNew        = newArrivals.length > 0 ? newArrivals: DEMO_PRODUCTS.slice(4);
  const showCategories = categories.length  > 0 ? categories : DEMO_CATEGORIES;

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-label">🖨️ Premium 3D Printing · Gingee, Tamil Nadu</div>
          <h1>
            Custom 3D Prints,<br />
            <em>Delivered Across India</em>
          </h1>
          <p className="hero-sub">
            Sculptures, keychains, photo frames, mobile cases & more —
            all custom-made by J. Vijay. Send your idea, we'll print it.
          </p>
          <div className="hero-btns">
            <Link to="/products" className="btn-primary">Shop Now</Link>
            <Link to="/custom-order" className="btn-outline">Custom Order</Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><div className="stat-num">500+</div><div className="stat-label">Orders Delivered</div></div>
            <div className="stat"><div className="stat-num">100%</div><div className="stat-label">Custom Prints</div></div>
            <div className="stat"><div className="stat-num">4.9★</div><div className="stat-label">Customer Rating</div></div>
            <div className="stat"><div className="stat-num">3–5</div><div className="stat-label">Day Delivery</div></div>
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ── */}
      <div className="features-bar">
        {[
          { icon: '🚚', title: 'Free Delivery',   desc: 'On orders above ₹999' },
          { icon: '🎨', title: 'Custom Prints',   desc: 'Send your design, we print' },
          { icon: '💎', title: 'Premium Quality', desc: 'High-res FDM & Resin' },
          { icon: '📦', title: 'Safe Packaging',  desc: 'Damage-free guaranteed' },
        ].map((f, i) => (
          <div className="feat" key={i}>
            <div className="feat-icon">{f.icon}</div>
            <div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── BEST SELLERS ── */}
      <section className="section">
        <div className="sec-head">
          <h2>Best Sellers</h2>
          <Link to="/products" className="view-all">View all →</Link>
        </div>
        {loading
          ? <SkeletonGrid />
          : <div className="products-grid">{showFeatured.map(p => <ProductCard key={p._id} product={p} />)}</div>
        }
      </section>

      {/* ── CATEGORIES ── */}
      <div className="section-alt">
        <div className="section-inner">
          <div className="sec-head">
            <h2>Shop by Category</h2>
            <Link to="/categories" className="view-all">View all →</Link>
          </div>
          <div className="cat-grid">
            {showCategories.map((cat, i) => (
              <Link
                to={cat._id.startsWith('c') ? `/custom-order` : `/products?category=${cat._id}`}
                key={cat._id || i}
                className="ccard"
                style={{ textDecoration: 'none' }}
              >
                <div className="cemoji">{cat.emoji}</div>
                <div className="cname">{cat.name}</div>
                <div className="csub">{cat.subtitle}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEW ARRIVALS ── */}
      <section className="section">
        <div className="sec-head">
          <h2>New Arrivals</h2>
          <Link to="/products?newArrival=true" className="view-all">View all →</Link>
        </div>
        {loading
          ? <SkeletonGrid />
          : <div className="products-grid">{showNew.map(p => <ProductCard key={p._id} product={p} />)}</div>
        }
      </section>

      {/* ── WHY CHOOSE US ── */}
      <div className="section-alt">
        <div className="section-inner">
          <div className="sec-head">
            <h2>Why Choose VJ 3D Works?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: '🎯', title: 'Precision Printing',  desc: 'Every item is printed with high-resolution FDM and resin technology for sharp, detailed results.' },
              { icon: '🤝', title: 'Custom Everything',   desc: 'Send us any design — we create nameplates, figurines, gifts and prototypes from your ideas.' },
              { icon: '🚀', title: 'Pan-India Delivery',  desc: 'We ship to every corner of India with secure, damage-free packaging for all orders.' },
              { icon: '💬', title: 'WhatsApp Support',    desc: 'Get instant help on WhatsApp — order updates, custom quotes, and after-sales support.' },
            ].map((w, i) => (
              <div key={i} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{w.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8, color: 'var(--text)' }}>{w.title}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <section className="section">
        <div className="sec-head">
          <h2>Customer Reviews</h2>
          <span style={{ fontSize: 13, color: 'var(--text3)' }}>4.9 / 5 · 100+ reviews</span>
        </div>
        <div className="testi-grid">
          {reviews.map(r => (
            <div className="tcard" key={r.id}>
              <div className="tstars">{r.stars}</div>
              <p className="ttext">"{r.text}"</p>
              <div className="tauthor">{r.author}</div>
              <div className="tloc">📍 {r.location}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHATSAPP CTA ── */}
      <section className="cta">
        <h2>Have a <span>Custom Idea?</span></h2>
        <p>Send us your design on WhatsApp — nameplates, figurines, gifts, science models — anything is possible.</p>
        <a
          href="https://wa.me/919159432954?text=Hi%20VJ%203D%20Works!%20I%20want%20a%20custom%203D%20print"
          target="_blank"
          rel="noreferrer"
          className="wa-btn"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Chat on WhatsApp
        </a>
      </section>


      {/* ── SERVICES BANNER ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)',
        padding: '64px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decorative dots */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize:'32px 32px', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1 }}>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(26px, 4vw, 38px)', fontWeight:700, color:'#fff', marginBottom:12, letterSpacing:'-0.3px' }}>
            Check Out Our Services
          </h2>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.65)', marginBottom:40, maxWidth:480, margin:'0 auto 40px' }}>
            We offer a variety of useful services from our centre in Gingee.
          </p>

          {/* Icons row */}
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'clamp(16px, 3vw, 36px)', flexWrap:'wrap', marginBottom:44 }}>
            {[
              { icon:'🪪', label:'Aadhaar' },
              { icon:'🚌', label:'Transport' },
              { icon:'💰', label:'Banking' },
              { icon:'🏛️', label:'Govt Services' },
              { icon:'📋', label:'Certificates' },
              { icon:'📱', label:'SIM / Recharge' },
              { icon:'📄', label:'Applications' },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                <div style={{
                  width: 72, height: 72,
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32,
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'transform 0.2s',
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize:11, color:'rgba(255,255,255,0.5)', fontWeight:500, letterSpacing:'0.05em' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Button */}
          <Link
            to="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#22c55e',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.03em',
              boxShadow: '0 4px 20px rgba(34,197,94,0.35)',
              transition: 'filter 0.2s, transform 0.2s',
            }}
          >
            ⚙️ Explore Our Services
          </Link>

          {/* Two service labels */}
          <div style={{ display:'flex', justifyContent:'center', gap:16, marginTop:28, flexWrap:'wrap' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.8)', padding:'6px 14px', borderRadius:100, fontSize:12.5, fontWeight:500, border:'1px solid rgba(255,255,255,0.15)' }}>
              🏛️ Meena CSC & E-Sevai Centre
            </span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.8)', padding:'6px 14px', borderRadius:100, fontSize:12.5, fontWeight:500, border:'1px solid rgba(255,255,255,0.15)' }}>
              🚌 JK Transports
            </span>
          </div>
        </div>
      </section>

      {/* ── FLOATING WA BUTTON ── */}
      <a
        href="https://wa.me/919159432954"
        target="_blank"
        rel="noreferrer"
        className="wa-float"
        title="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </>
  );
}

export default Home;
