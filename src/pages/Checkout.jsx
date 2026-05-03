// src/pages/Checkout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createRazorpayOrder, verifyPayment } from '../api';

const BASE = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const [form, setForm] = useState({
    customerName: '', customerPhone: '', customerEmail: '',
    address: '', city: '', pincode: '', notes: '',
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const shipping   = totalPrice >= 999 ? 0 : 80;
  const grandTotal = totalPrice + shipping;

  const handleSubmit = async e => {
    e.preventDefault();
    if (items.length === 0) { setError('Your cart is empty!'); return; }
    setLoading(true);
    setError('');

    try {
      // 1️⃣ Create Razorpay order on backend
      const { data } = await createRazorpayOrder({ amount: grandTotal });
      if (!data.success) throw new Error('Could not initiate payment');

      const rzpOrder = data.order;

      // 2️⃣ Open Razorpay popup
      const options = {
        key:         process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount:      rzpOrder.amount,   // already in paise from backend
        currency:    'INR',
        name:        'VJ 3D Works',
        description: 'Custom 3D Print Order',
        image:       '/logo192.png',    // optional: your logo
        order_id:    rzpOrder.id,
        prefill: {
          name:    form.customerName,
          email:   form.customerEmail,
          contact: form.customerPhone,
        },
        notes: {
          address: form.address,
        },
        theme: { color: '#2563eb' },

        // 3️⃣ After successful payment
        handler: async (response) => {
          try {
            const orderData = {
              ...form,
              items: items.map(i => ({
                product: i._id,
                name:    i.name,
                price:   i.price,
                qty:     i.qty,
              })),
              totalAmount: grandTotal,
            };

            const verify = await verifyPayment({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              orderData,
            });

            if (verify.data.success) {
              clearCart();
              navigate('/order-success', {
                state: { orderId: verify.data.orderId },
              });
            } else {
              setError('Payment done but order saving failed. Please contact support.');
            }
          } catch (err) {
            setError(
              'Payment received but verification failed. ' +
              'Contact support with Payment ID: ' + response.razorpay_payment_id
            );
          } finally {
            setLoading(false);
          }
        },

        // 4️⃣ If user closes popup
        modal: {
          ondismiss: () => {
            setError('Payment was cancelled. Please try again.');
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      // 5️⃣ Handle payment failure inside popup
      rzp.on('payment.failed', (response) => {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      rzp.open();

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  // ── Empty cart screen ──────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="success-page">
        <div className="success-icon">🛒</div>
        <h1>Cart is Empty</h1>
        <p>Add some products to your cart before checking out.</p>
        <a href="/products" className="btn-primary">Browse Products</a>
      </div>
    );
  }

  // ── Main checkout page ─────────────────────────────────────────────────────
  return (
    <div className="checkout-page">
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, marginBottom: 8, color: 'var(--text)' }}>
        Checkout
      </h1>
      <p style={{ color: 'var(--text3)', fontSize: 14, marginBottom: 32 }}>
        Fill in your delivery details to complete the order.
      </p>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: 'var(--red)', padding: '12px 16px', borderRadius: 'var(--radius)', marginBottom: 24, fontSize: 14 }}>
          ⚠️ {error}
        </div>
      )}

      <div className="checkout-grid">

        {/* ── FORM ── */}
        <form onSubmit={handleSubmit}>
          <h2>Delivery Details</h2>

          <div className="form-group">
            <label>Full Name *</label>
            <input name="customerName" value={form.customerName} onChange={handleChange} placeholder="Your full name" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label>Phone *</label>
              <input name="customerPhone" value={form.customerPhone} onChange={handleChange} placeholder="+91 91594 32954" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="customerEmail" value={form.customerEmail} onChange={handleChange} placeholder="Optional" type="email" />
            </div>
          </div>

          <div className="form-group">
            <label>Full Address *</label>
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="House/Flat no, Street, Area..." required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label>City *</label>
              <input name="city" value={form.city} onChange={handleChange} placeholder="City" required />
            </div>
            <div className="form-group">
              <label>PIN Code *</label>
              <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="600001" required />
            </div>
          </div>

          <div className="form-group">
            <label>Order Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any special instructions for your order..." />
          </div>

          {/* Payment info badge */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 20, fontSize: 14, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 8 }}>
            💳 <strong style={{ color: 'var(--text)' }}>Payment:</strong>
            &nbsp;Secure online payment via Razorpay — UPI, Card, NetBanking
          </div>

          <button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? '⏳ Processing...' : `Pay Now — ₹${grandTotal}`}
          </button>
        </form>

        {/* ── ORDER SUMMARY ── */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div>
            {items.map(item => (
              <div className="order-item" key={item._id}>
                <div style={{ width: 56, height: 56, background: 'var(--bg2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                  {item.images?.[0]
                    ? <img src={`${BASE}${item.images[0]}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                    : item.emoji || '📦'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13.5, color: 'var(--text)', marginBottom: 3 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text3)' }}>Qty: {item.qty}</div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>₹{item.price * item.qty}</div>
              </div>
            ))}
          </div>

          <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)', marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14, color: 'var(--text2)' }}>
              <span>Subtotal</span><span>₹{totalPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14, color: 'var(--text2)' }}>
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? 'var(--green)' : 'var(--text)' }}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
          </div>

          <div className="order-total">
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>

          {totalPrice < 999 && (
            <p style={{ fontSize: 12.5, color: 'var(--accent)', marginTop: 12, background: '#eff6ff', padding: '8px 12px', borderRadius: 'var(--radius)', border: '1px solid #bfdbfe' }}>
              🚚 Add ₹{999 - totalPrice} more for FREE delivery!
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Checkout;