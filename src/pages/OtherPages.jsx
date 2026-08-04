// src/pages/OtherPages.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { uploadImage } from '../api';

const WA_NUMBER = '919159432954';
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

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
        {/* ✅ FIX: Replaced email tracking with WhatsApp */}
        <a
          href={`${WA_BASE}?text=Hi%20VJ%203D%20Works!%20I%20want%20to%20track%20my%20order.%20Order%20ID%3A%20${state?.orderId || ''}`}
          target="_blank"
          rel="noreferrer"
          className="btn-outline"
        >
          📲 Track via WhatsApp
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

        {/* ✅ FIX: Replaced Email row with WhatsApp row */}
        <div className="contact-row">
          <span style={{ fontSize: 22 }}>💬</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>WhatsApp</div>
            <a
              href={`${WA_BASE}?text=Hi%20VJ%203D%20Works!`}
              target="_blank"
              rel="noreferrer"
            >
              +91 91594 32954
            </a>
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

      {/* ✅ FIX: Replaced "Send Email" button with WhatsApp button */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <a
          href={`${WA_BASE}?text=Hi%20VJ%203D%20Works!%20I%20have%20a%20query.`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          💬 Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ── CUSTOM ORDER ── */
export function CustomOrder() {
  const [form, setForm] = useState({ name: '', phone: '', idea: '', quantity: '1', budget: '' });
  const [sent, setSent] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

 const handleChange = e => {
  const { name, value } = e.target;
  if (name === 'name' && /[^a-zA-Z\s]/.test(value)) return;
  if (name === 'phone' && /[^0-9+\s]/.test(value)) return;
  setForm({ ...form, [name]: value });
};

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await uploadImage(formData);
      setPhotoUrl(res.data.url);
    } catch (err) {
      console.error(err);
      setUploadError(err.response?.data?.message || 'Failed to upload photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // ✅ FIX: Send to WhatsApp instead of email
    const message = encodeURIComponent(
`Hi VJ 3D Works! I want a custom 3D print.

Name: ${form.name}
Phone: ${form.phone}
Idea: ${form.idea}
Quantity: ${form.quantity}
Budget: ${form.budget || 'Not specified'}
Beloved One's Photo: ${photoUrl || 'Not uploaded'}`
    );
    window.open(`${WA_BASE}?text=${message}`, '_blank');
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div className="form-group">
            <label>Quantity</label>
            <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="1" type="number" min="1" />
          </div>
          <div className="form-group">
            <label>Budget (optional)</label>
            <input name="budget" value={form.budget} onChange={handleChange} placeholder="₹500" />
          </div>
        </div>

        {/* beloved ones statue photo upload */}
        <div className="form-group" style={{ background: 'var(--bg2)', padding: '16px 20px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: 20 }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
            🖼️ Upload HD Photo of your Beloved Ones (Optional)
          </label>
          <div style={{ fontSize: 12.5, color: 'var(--text3)', marginBottom: 12 }}>
            If you need a 3D statue of your passed father, mother, or beloved one, upload their HD photo.
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              📁 Select HD Photo / Document
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </label>

            {uploading && (
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>Uploading photo...</span>
            )}

            {photoUrl && (
              <span style={{ fontSize: 13, color: '#15803d', fontWeight: 600 }}>✓ Uploaded successfully!</span>
            )}
          </div>

          {uploadError && (
            <div style={{ color: 'var(--red)', fontSize: 12.5, marginTop: 8 }}>⚠️ {uploadError}</div>
          )}

          {photoUrl && (
            <div style={{ marginTop: 12, position: 'relative', display: 'inline-block' }}>
              <img src={photoUrl} alt="Preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
              <button type="button" onClick={() => setPhotoUrl('')} style={{ position: 'absolute', top: -6, right: -6, background: 'var(--red)', color: 'white', border: 'none', borderRadius: '50%', width: 18, height: 18, fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
          )}
        </div>

        {/* ✅ FIX: WhatsApp send button */}
        <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          💬 Send via WhatsApp
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
