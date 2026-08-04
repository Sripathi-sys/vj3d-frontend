// src/components/ProductCard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/imageHelper';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added,    setAdded]    = useState(false);
  const [imgError, setImgError] = useState(false);

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

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const imageUrl = getImageUrl(product.images?.[0]);

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="pcard" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {badgeLabel && <div className={badgeClass}>{badgeLabel}</div>}

      <div className="pimg">
        {imageUrl && !imgError
          ? <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          : <div className="pimg-placeholder">{product.emoji || '🖨️'}</div>
        }
      </div>

      <div className="pbody">
        <div className="pname">{product.name}</div>

        {product.description && (
          <div style={{
            fontSize: 12,
            color: 'var(--text3)',
            lineHeight: 1.55,
            marginBottom: 8,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {product.description}
          </div>
        )}

        <div className="pprices">
          <span className="pprice">₹{product.price}</span>
          {product.originalPrice && <span className="pwas">₹{product.originalPrice}</span>}
          {discount && <span className="psave">-{discount}%</span>}
        </div>

        {product.inStock
          ? <button className={`add-btn${added ? ' added' : ''}`} onClick={handleAdd}>
              {added ? '✓ Added' : 'Add to Cart'}
            </button>
          : <div className="out-of-stock" onClick={e => e.stopPropagation()}>Sold Out</div>
        }
      </div>
    </div>
  );
}

export default ProductCard;
