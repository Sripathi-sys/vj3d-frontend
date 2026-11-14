// src/pages/Checkout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createRazorpayOrder, verifyPayment } from '../api';
import { getImageUrl } from '../utils/imageHelper';

const WA_NUMBER = '919159432954';

const WA_SVG = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

// ── WhatsApp Order Message Builder (Post-Payment Verified Order) ──
export function buildWhatsAppOrderMessage(order, razorpayPaymentId) {
  if (!order) return '';
  const orderId = order._id || order.orderId || '';
  const customerName = order.customerName || '';
  const customerPhone = order.customerPhone || '';
  const customerEmail = order.customerEmail ? String(order.customerEmail).trim() : '';
  const address = order.address || '';
  const city = order.city || '';
  const state = order.state || '';
  const pincode = order.pincode || '';
  const paymentId = order.razorpayPaymentId || razorpayPaymentId || '';

  const items = Array.isArray(order.items) ? order.items : [];
  let calculatedSubtotal = 0;

  const itemsList = items.map((item, idx) => {
    const qty = parseInt(item.qty || item.quantity || 1, 10);
    const price = Number(item.price) || 0;
    const itemTotal = price * qty;
    calculatedSubtotal += itemTotal;

    const customizations = [];
    const size = item.size || item.customSize;
    const color = item.color || item.customColor;
    const photo = item.photo || item.customPhoto;

    if (size) customizations.push(`Size: ${size}`);
    if (color) customizations.push(`Color: ${color}`);
    if (photo) customizations.push(`Photo Uploaded`);

    const customText = customizations.length > 0 ? ` (${customizations.join(', ')})` : '';

    return `${idx + 1}. *${item.name}*${customText}\n   Qty: ${qty} × ₹${price} = ₹${itemTotal}`;
  }).join('\n');

  const shippingCharge = Number(order.shippingCharge) || 0;
  const grandTotal = Number(order.totalAmount) || (calculatedSubtotal + shippingCharge);
  const subtotal = calculatedSubtotal > 0 ? calculatedSubtotal : (grandTotal - shippingCharge);

  const emailLine = customerEmail ? `• *Email:* ${customerEmail}\n` : '';
  const notesLine = order.notes && String(order.notes).trim() ? `\n*Order Notes:* ${String(order.notes).trim()}\n` : '';

  return `*🛍️ ORDER CONFIRMATION - VJ 3D WORKS*
----------------------------------------
*Order ID:* #${orderId}
*Payment Status:* PAID
*Razorpay Payment ID:* ${paymentId}
----------------------------------------
*Customer Details:*
• *Name:* ${customerName}
• *Phone:* ${customerPhone}
${emailLine}• *Delivery Address:*
  ${address}, ${city}, ${state} - ${pincode}

----------------------------------------
*Ordered Products:*
${itemsList}

----------------------------------------
*Payment Summary:*
• *Subtotal:* ₹${subtotal}
• *Shipping Charge (${state}):* ₹${shippingCharge}
• *Grand Total:* ₹${grandTotal}
• *Status:* PAID (Razorpay: ${paymentId})
----------------------------------------${notesLine}
Thank you for your order! Please process my 3D print.`;
}

// ── Shipping charges by state ──
const SHIPPING_RATES = {
  'Tamil Nadu':         60,
  'Kerala':             80,
  'Andhra Pradesh':    130,
  'Telangana':         130,
  'Karnataka':         130,
  'Maharashtra':       130,
  'Delhi':             130,
  'Uttar Pradesh':     130,
  'West Bengal':       130,
  'Rajasthan':         130,
  'Gujarat':           130,
  'Madhya Pradesh':    130,
  'Bihar':             130,
  'Punjab':            130,
  'Haryana':           130,
  'Odisha':            130,
  'Jharkhand':         130,
  'Assam':             130,
  'Chhattisgarh':      130,
  'Uttarakhand':       130,
  'Himachal Pradesh':  130,
  'Jammu & Kashmir':   130,
  'Goa':               130,
  'Tripura':           130,
  'Meghalaya':         130,
  'Manipur':           130,
  'Nagaland':          130,
  'Arunachal Pradesh': 130,
  'Mizoram':           130,
  'Sikkim':            130,
  'Puducherry':         60,
  'Andaman & Nicobar': 130,
  'Lakshadweep':       130,
  'Chandigarh':        130,
  'Dadra & Nagar Haveli': 130,
  'Daman & Diu':       130,
  'Ladakh':            130,
};

const STATE_LIST = Object.keys(SHIPPING_RATES).sort();

function getShipping(state) {
  if (!state) return 0;
  return SHIPPING_RATES[state] || 130;
}

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const [form, setForm] = useState({
    customerName: '', customerPhone: '', customerEmail: '',
    address: '', city: '', state: '', pincode: '', notes: '',
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // ── Shipping & total calculation ──
  const shippingCharge = getShipping(form.state);
  const grandTotal     = totalPrice + shippingCharge;

  // ── Validation helper ──
  const validateForm = () => {
    if (items.length === 0) {
      return 'Your cart is empty!';
    }
    if (!form.customerName.trim()) {
      return 'Please enter your full name.';
    }
    if (!form.customerPhone.trim()) {
      return 'Please enter your phone number.';
    }
    const cleanPhone = form.customerPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      return 'Please enter a valid 10-digit phone number.';
    }
    if (form.customerEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.customerEmail.trim())) {
        return 'Please enter a valid email address (or leave it blank).';
      }
    }
    if (!form.address.trim()) {
      return 'Please enter your full delivery address.';
    }
    if (!form.city.trim()) {
      return 'Please enter your city.';
    }
    if (!form.state) {
      return 'Please select your state.';
    }
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode.trim())) {
      return 'Please enter a valid 6-digit PIN code.';
    }
    return null;
  };

  // ── WhatsApp Order Sharing ──
  const handleShareWhatsApp = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');

    const itemsSummary = items.map((item, idx) => {
      const details = [];
      if (item.customSize) details.push(`Size: ${item.customSize}`);
      if (item.customColor) details.push(`Color: ${item.customColor}`);
      if (item.customPhoto) details.push(`Custom Photo Added`);
      const detailsStr = details.length > 0 ? ` (${details.join(', ')})` : '';

      return `${idx + 1}. *${item.name}*${detailsStr}\n   Qty: ${item.qty} × ₹${item.price} = ₹${item.price * item.qty}`;
    }).join('\n');

    const customerEmailStr = form.customerEmail.trim() ? form.customerEmail.trim() : 'Not provided';
    const notesStr = form.notes.trim() ? `\n\n*Order Notes:* ${form.notes.trim()}` : '';

    const message = `*🛍️ NEW ORDER DETAILS - VJ 3D WORKS*
----------------------------------------
*Customer Details:*
• *Name:* ${form.customerName.trim()}
• *Phone:* ${form.customerPhone.trim()}
• *Email:* ${customerEmailStr}
• *Complete Delivery Address:*
  ${form.address.trim()}, ${form.city.trim()}, ${form.state} - ${form.pincode.trim()}

----------------------------------------
*Selected Products:*
${itemsSummary}

----------------------------------------
*Summary:*
• *Subtotal:* ₹${totalPrice}
• *Shipping Charge (${form.state}):* ₹${shippingCharge}
• *Final Order Total:* ₹${grandTotal}
----------------------------------------${notesStr}

Please confirm my order. Thank you!`;

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError('');

    try {
      const orderPayload = {
        customerName:  form.customerName.trim(),
        customerPhone: form.customerPhone.trim(),
        customerEmail: form.customerEmail.trim(),
        address:       form.address.trim(),
        city:          form.city.trim(),
        state:         form.state.trim(),
        pincode:       form.pincode.trim(),
        notes:         form.notes.trim(),
        items: items.map(i => ({
          product: (i._id && i._id.length === 24) ? i._id : undefined,
          name:    i.name,
          price:   i.price,
          qty:     i.qty,
          size:    i.customSize || '',
          color:   i.customColor || '',
          photo:   i.customPhoto || '',
        })),
      };

      const { data } = await createRazorpayOrder(orderPayload);
      if (!data.success || !data.order) throw new Error(data.message || 'Could not initiate payment');

      const rzpOrder = data.order;

      const options = {
        key:         process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount:      rzpOrder.amount,
        currency:    'INR',
        name:        'VJ 3D Works',
        description: 'Custom 3D Print Order',
        image:       '/logo192.png',
        order_id:    rzpOrder.id,
        prefill: {
          name:    form.customerName,
          email:   form.customerEmail,
          contact: form.customerPhone,
        },
        notes: { address: form.address },
        theme: { color: '#2563eb' },

        handler: async (response) => {
          try {
            const verify = await verifyPayment({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            });

            if (verify.data.success) {
              const verifiedOrder = verify.data.order || {
                ...orderPayload,
                _id: verify.data.orderId || data.orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                shippingCharge,
                totalAmount: grandTotal,
              };

              const waMessage = buildWhatsAppOrderMessage(verifiedOrder, response.razorpay_payment_id);
              const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

              clearCart();

              navigate('/order-success', {
                state: {
                  orderId: verify.data.orderId || verifiedOrder._id,
                  order:   verifiedOrder,
                  waUrl:   waUrl,
                },
              });
            } else {
              setError(verify.data.message || 'Payment verification failed on the server. Please contact support.');
              setLoading(false);
            }
          } catch (err) {
            console.error('Payment verification error:', err);
            setError(err.response?.data?.message || ('Payment received but server verification failed. Contact support with Payment ID: ' + response.razorpay_payment_id));
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setError('Payment was cancelled. Please try again.');
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        setError(`Payment failed: ${response.error?.description || 'Payment could not be completed'}`);
        setLoading(false);
      });
      rzp.open();

    } catch (err) {
      console.error('Create Razorpay order error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

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
              <label>Email <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: 12 }}>(Optional)</span></label>
              <input name="customerEmail" value={form.customerEmail} onChange={handleChange} placeholder="Optional (e.g. name@example.com)" type="email" />
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

          {/* ── STATE SELECTOR ── */}
          <div className="form-group">
            <label>State *</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                fontSize: 14,
                background: 'var(--bg)',
                color: form.state ? 'var(--text)' : 'var(--text3)',
                cursor: 'pointer',
              }}
            >
              <option value="">Select your state</option>
              {STATE_LIST.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* ── SHIPPING INFO BANNER ── */}
          {form.state && (
            <div style={{
              background: shippingCharge === 60 ? '#f0fdf4' : '#eff6ff',
              border: `1px solid ${shippingCharge === 60 ? '#86efac' : '#93c5fd'}`,
              borderRadius: 'var(--radius)',
              padding: '10px 14px',
              marginBottom: 16,
              fontSize: 13.5,
              color: shippingCharge === 60 ? '#15803d' : '#1d4ed8',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              🚚 Shipping to <strong>{form.state}</strong>: ₹{shippingCharge}
            </div>
          )}

          <div className="form-group">
            <label>Order Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any special instructions for your order..." />
          </div>

          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 20, fontSize: 14, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 8 }}>
            💳 <strong style={{ color: 'var(--text)' }}>Payment:</strong>
            &nbsp;Secure online payment via Razorpay — UPI, Card, NetBanking
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="wa-share-btn"
              disabled={loading}
            >
              {WA_SVG}
              Share Order via WhatsApp
            </button>

            <button
              type="submit"
              className="place-order-btn"
              disabled={loading}
              style={{ marginTop: 0 }}
            >
              {loading ? '⏳ Processing...' : `Proceed to Payment — ₹${grandTotal}`}
            </button>
          </div>
        </form>

        {/* ── ORDER SUMMARY ── */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div>
            {items.map(item => (
              <div className="order-item" key={item.cartId}>
                <div style={{ width: 56, height: 56, background: 'var(--bg2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, overflow: 'hidden' }}>
                  {item.images?.[0]
                    ? <img src={getImageUrl(item.images[0], 150)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                    : item.emoji || '📦'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13.5, color: 'var(--text)', marginBottom: 3 }}>{item.name}</div>
                  
                  {item.customSize && (
                    <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, marginBottom: 2 }}>
                      📐 Size: {item.customSize}
                    </div>
                  )}

                  {item.customColor && (
                    <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600, marginBottom: 2 }}>
                      🎨 Color: {item.customColor}
                    </div>
                  )}

                  {item.customPhoto && (
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>
                      🖼️ Statue Photo Added
                    </div>
                  )}

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
              <span style={{ fontWeight: 600, color: shippingCharge === 0 ? 'var(--text3)' : 'var(--text)' }}>
                {form.state ? `₹${shippingCharge}` : 'Select state'}
              </span>
            </div>
          </div>

          <div className="order-total">
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>

          {/* ── SHIPPING RATES INFO ── */}
          <div style={{ marginTop: 16, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '12px 14px', fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.8 }}>
            🚚 <strong style={{ color: 'var(--text2)' }}>Shipping Rates:</strong><br />
            Tamil Nadu & Puducherry — ₹60<br />
            Kerala — ₹80<br />
            Other states — ₹130
          </div>

        </div>

      </div>
    </div>
  );
}

export default Checkout;
