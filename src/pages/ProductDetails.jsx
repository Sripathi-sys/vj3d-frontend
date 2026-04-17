import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api';
import { useCart } from '../context/CartContext';

const BASE = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api').replace('/api', '');

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [id]);

  if (!product) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ padding: 40, maxWidth: 1100, margin: 'auto' }}>
      
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        
        {/* IMAGE */}
        <div style={{ flex: 1 }}>
          {product.images?.[0] ? (
            <img
              src={`${BASE}${product.images[0]}`}
              alt={product.name}
              style={{ width: '100%', borderRadius: 10 }}
            />
          ) : (
            <div style={{ fontSize: 80 }}>{product.emoji || '🖨️'}</div>
          )}
        </div>

        {/* DETAILS */}
        <div style={{ flex: 1 }}>
          <h1>{product.name}</h1>

          <p style={{ color: '#666', marginTop: 10 }}>
            {product.description}
          </p>

          <h2 style={{ marginTop: 20 }}>₹{product.price}</h2>

          {product.originalPrice && (
            <p style={{ textDecoration: 'line-through', color: '#999' }}>
              ₹{product.originalPrice}
            </p>
          )}

          <button
            onClick={() => addToCart(product)}
            style={{
              marginTop: 20,
              padding: '12px 20px',
              background: 'black',
              color: 'white',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;