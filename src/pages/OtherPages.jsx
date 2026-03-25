// src/pages/OtherPages.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* ── ORDER SUCCESS ── */
export function OrderSuccess() {
  const { state } = useLocation();
  return (
    <div className="success-page">
      <div className="success-icon">✅</div>
      <h1>Order Placed!</h1>
      {state?.orderId && (
        <p style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '10px 16px', display: 'inline-block', fontSize: 13.5, marginBottom: 16 }}>
          Order ID: <strong>#{state.orderId}</strong>
        </p>
      )}
      <p>
        Thank you for your order! We'll pack it carefully and send you the tracking details on WhatsApp.
        Delivery in 3–5 business days.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
        <a
          href="https://wa.me/919159432954"
          target="_blank"
          rel="noreferrer"
          className="btn-outline"
        >
          Track on WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ── CONTACT ── */
export function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p style={{ color: 'var(--text2)', fontSize: 15, marginBottom: 8 }}>
        We're happy to help! Reach us on WhatsApp for the fastest response.
      </p>

      <div className="contact-card">
        <div className="contact-row">
          <span style={{ fontSize: 22 }}>💬</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>WhatsApp</div>
            <a href="https://wa.me/919159432954" target="_blank" rel="noreferrer">+91 91594 32954</a>
          </div>
        </div>
        <div className="contact-row">
          <span style={{ fontSize: 22 }}>📍</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>Address</div>
            <span style={{ color: 'var(--text2)', fontSize: 14 }}>
              54/2, Middle Street, Neganur Village,<br />Gingee — 604202, Tamil Nadu
            </span>
          </div>
        </div>
        <div className="contact-row">
          <span style={{ fontSize: 22 }}>📸</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>Instagram</div>
            <a href="https://instagram.com/vj_3d_works" target="_blank" rel="noreferrer">@VJ_3D_WORKS</a>
          </div>
        </div>
        <div className="contact-row">
          <span style={{ fontSize: 22 }}>🚚</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>Shipping</div>
            <span style={{ color: 'var(--text2)', fontSize: 14 }}>All India courier available · 3–5 business days</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <a
          href="https://wa.me/919159432954?text=Hi%20VJ%203D%20Works!%20I%20have%20a%20query."
          target="_blank"
          rel="noreferrer"
          className="wa-btn"
          style={{ display: 'inline-flex' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Message Us on WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ── CUSTOM ORDER ── */
export function CustomOrder() {
  const [step,    setStep]    = useState(1);
  const [form,    setForm]    = useState({ name: '', phone: '', idea: '', quantity: '1', budget: '' });
  const [sent,    setSent]    = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi VJ 3D Works! I want a custom 3D print.\n\nName: ${form.name}\nPhone: ${form.phone}\nIdea: ${form.idea}\nQuantity: ${form.quantity}\nBudget: ${form.budget}`
    );
    window.open(`https://wa.me/919159432954?text=${msg}`, '_blank');
    setSent(true);
  };

  if (sent) {
    return (
      <div className="success-page">
        <div className="success-icon">🎉</div>
        <h1>Request Sent!</h1>
        <p>We've opened WhatsApp with your details. Chat with us to confirm your custom order!</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="custom-page">
      <div className="hero-label" style={{ marginBottom: 20, display: 'inline-block' }}>Custom 3D Print Order</div>
      <h1>Tell Us Your Idea</h1>
      <p style={{ color: 'var(--text2)', fontSize: 15, margin: '12px 0 36px', lineHeight: 1.7 }}>
        We can print anything — nameplates, figurines, keychains, phone cases, models, gifts & more.
        Fill in the form and we'll get back to you on WhatsApp with a quote.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name *</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
        </div>
        <div className="form-group">
          <label>WhatsApp Number *</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 91594 32954" required />
        </div>
        <div className="form-group">
          <label>Describe Your Idea *</label>
          <textarea
            name="idea" value={form.idea} onChange={handleChange}
            placeholder="E.g. Custom nameplate with my name in Tamil, size 20×10cm, wall-mounted..."
            style={{ minHeight: 120 }}
            required
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="form-group">
            <label>Quantity</label>
            <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="1" type="number" min="1" />
          </div>
          <div className="form-group">
            <label>Budget (optional)</label>
            <input name="budget" value={form.budget} onChange={handleChange} placeholder="₹500" />
          </div>
        </div>

        <button type="submit" className="wa-btn" style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Send via WhatsApp
        </button>
      </form>

      <div style={{ marginTop: 40, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
        <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>What We Can Print</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {['Sculptures & Miniatures', 'Nameplates & Signs', 'Keychains & Gifts', '3D Photo Frames', 'Mobile Cases & Stands', 'Wall Stands', 'Science Project Models', 'Toys & Figurines'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13.5, color: 'var(--text2)' }}>
              <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
