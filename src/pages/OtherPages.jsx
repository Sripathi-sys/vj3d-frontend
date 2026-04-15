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
  href="mailto:vj3dworks@gmail.com?subject=Order%20Tracking&body=Hi,%20I%20want%20to%20track%20my%20order."
  className="btn-outline"
>
  Track via Email
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
  <span style={{ fontSize: 22 }}>📧</span>
  <div>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>Email</div>
    <a href="mailto:vj3dworks@gmail.com">vj3dworks@gmail.com</a>
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
  href="mailto:vj3dworks@gmail.com?subject=Query%20from%20Website&body=Hi%20VJ%203D%20Works,"
  className="btn-primary"
  style={{ display: 'inline-flex' }}
>
  📧 Send Email
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
    const subject = encodeURIComponent("Custom 3D Print Request");
const body = encodeURIComponent(
  `Hi VJ 3D Works,

I want a custom 3D print.

Name: ${form.name}
Phone: ${form.phone}
Idea: ${form.idea}
Quantity: ${form.quantity}
Budget: ${form.budget}`
);

window.location.href = `mailto:vj3dworks@gmail.com?subject=${subject}&body=${body}`;
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

        <button type="submit" className="btn-primary">
  📧 Send Request
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
