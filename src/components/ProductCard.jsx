// src/components/ProductCard.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const BASE = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api').replace('/api', '');

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);
  const [expanded, setExpanded] = useState(false); // ✅ NEW

  const savings  = product.originalPrice ? product.originalPrice - product.price : null;
  const discount = savings && product.originalPrice
    ? Math.round((savings / product.originalPrice) * 100)
    : null;

  const badgeLabel = product.badge === 'NEW'   ? 'New'
                   : product.badge === 'COMBO' ? 'Combo'
                   : product.badge === 'SALE'  ? 'Sale'
                   : product.badge === 'HOT'   ? 'Hot'
                   : discount                  ? `-${discount}%`
                   : null;

  const badgeClass = `pbadge${product.badge === 'NEW' ? ' new' : product.badge === 'COMBO' ? ' combo' : ''}`;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="pcard">
      {badgeLabel && <div className={badgeClass}>{badgeLabel}</div>}

      <div className="pimg">
        {product.images?.[0]
          ? <img src={`${BASE}${product.images[0]}`} alt={product.name} loading="lazy" />
          : <div className="pimg-placeholder">{product.emoji || '🖨️'}</div>
        }
      </div>

      <div className="pbody">
        <div className="pname">{product.name}</div>

        {/* ✅ CLICKABLE DESCRIPTION */}
        {product.description && (
          <div
            onClick={() => setExpanded(!expanded)}
            style={{
              fontSize: 12,
              color: 'var(--text3)',
              lineHeight: 1.55,
              marginBottom: 8,
              cursor: 'pointer',

              display: expanded ? 'block' : '-webkit-box',
              WebkitLineClamp: expanded ? 'unset' : 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}

            {!expanded && (
              <span style={{ color: '#2563eb', marginLeft: 4 }}>
                ...more
              </span>
            )}
          </div>
        )}

        {/* Optional Show Less */}
        {expanded && (
          <span
            onClick={() => setExpanded(false)}
            style={{
              color: '#2563eb',
              fontSize: 12,
              cursor: 'pointer',
              display: 'block',
              marginBottom: 8
            }}
          >
            Show less
          </span>
        )}

        <div className="pprices">
          <span className="pprice">₹{product.price}</span>
          {product.originalPrice && <span className="pwas">₹{product.originalPrice}</span>}
          {discount && <span className="psave">-{discount}%</span>}
        </div>

        {product.inStock
          ? (
            <button
              className={`add-btn${added ? ' added' : ''}`}
              onClick={handleAdd}
            >
              {added ? '✓ Added' : 'Add to Cart'}
            </button>
          )
          : <div className="out-of-stock">Sold Out</div>
        }
      </div>
    </div>
  );
}

export default ProductCard;