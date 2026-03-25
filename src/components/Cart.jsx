// src/components/Cart.jsx
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const BASE = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

function Cart() {
  const { items, cartOpen, setCartOpen, updateQty, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const goCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div className={`cart-overlay ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} />

      <div className={`cart-panel ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart {items.length > 0 && <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: 14 }}>({items.length} item{items.length > 1 ? 's' : ''})</span>}</h3>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <p>Your cart is empty</p>
              <button
                onClick={() => { setCartOpen(false); navigate('/products'); }}
                style={{ marginTop: 16, background: 'var(--text)', color: '#fff', padding: '10px 22px', borderRadius: 'var(--radius)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item._id}>
                <div className="ci-img">
                  {item.images?.[0]
                    ? <img src={`${BASE}${item.images[0]}`} alt={item.name} />
                    : item.emoji || '🖨️'
                  }
                </div>
                <div className="ci-info">
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-price">₹{item.price}</div>
                  <div className="ci-controls">
                    <button className="qty-btn" onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
                    <span className="ci-qty">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                    <span className="ci-remove" onClick={() => removeFromCart(item._id)}>Remove</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <button className="checkout-btn" onClick={goCheckout}>Proceed to Checkout</button>
            <button className="continue-btn" onClick={() => setCartOpen(false)}>Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
