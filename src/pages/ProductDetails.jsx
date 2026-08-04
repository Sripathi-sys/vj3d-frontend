import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, uploadImage } from '../api';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/imageHelper';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Customization States
  const [size, setSize] = useState('4"');
  const [customSizeText, setCustomSizeText] = useState('');
  const [isCustomStatue, setIsCustomStatue] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="spinner" style={{ width: 40, height: 40, border: '4px solid #f3f3f3', borderTop: '4px solid var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: 80, textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/products" style={{ color: 'var(--accent)', textDecoration: 'underline', marginTop: 12, display: 'inline-block' }}>← Back to Products</Link>
      </div>
    );
  }

  const sizes = [
    { label: '4" (Base)', value: '4"' },
    { label: '6" (+₹150)', value: '6"' },
    { label: '8" (+₹350)', value: '8"' },
    { label: '10" (+₹600)', value: '10"' },
    { label: '12" (+₹900)', value: '12"' },
    { label: 'Custom size', value: 'Custom' },
  ];

  const getModifier = (sz) => {
    switch (sz) {
      case '6"': return 150;
      case '8"': return 350;
      case '10"': return 600;
      case '12"': return 900;
      default: return 0;
    }
  };

  const finalPrice = product.price + getModifier(size);
  const originalFinalPrice = product.originalPrice ? product.originalPrice + getModifier(size) : null;
  const savings = originalFinalPrice ? originalFinalPrice - finalPrice : null;
  const discount = savings && originalFinalPrice ? Math.round((savings / originalFinalPrice) * 100) : null;

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

  const handleAddToCart = () => {
    if (isCustomStatue && !photoUrl) {
      setUploadError('Please upload an HD photo first.');
      return;
    }

    const customSizeVal = size === 'Custom' ? (customSizeText || 'Custom Size') : size;
    
    const customizedProduct = {
      ...product,
      price: finalPrice,
      originalPrice: originalFinalPrice,
    };

    const customizations = {
      customSize: customSizeVal,
      customPhoto: isCustomStatue ? photoUrl : '',
      customPhotoName: isCustomStatue ? 'Statue Photo' : '',
    };

    addToCart(customizedProduct, customizations);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-details-container" style={{ padding: '40px 24px', maxWidth: 1100, margin: 'auto' }}>
      
      {/* Breadcrumbs */}
      <div style={{ marginBottom: 24, fontSize: 13, color: 'var(--text3)' }}>
        <Link to="/" style={{ color: 'inherit' }}>Home</Link> &nbsp;·&nbsp;
        <Link to="/products" style={{ color: 'inherit' }}>Products</Link> &nbsp;·&nbsp;
        <span style={{ color: 'var(--text)' }}>{product.name}</span>
      </div>

      <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
        
        {/* LEFT COLUMN: IMAGE */}
        <div style={{ flex: '1 1 450px' }}>
          {product.images?.[0] ? (
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--bg2)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              {product.badge && (
                <span style={{ position: 'absolute', top: 16, left: 16, background: 'var(--red)', color: 'white', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, zIndex: 10 }}>
                  {product.badge}
                </span>
              )}
              <img
                src={getImageUrl(product.images[0], 800)}
                alt={product.name}
                style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
          ) : (
            <div style={{ height: 400, background: 'var(--bg2)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, border: '1px solid var(--border)' }}>
              {product.emoji || '🖨️'}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INFO & CUSTOMIZATIONS */}
        <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
              {product.name}
            </h1>
            {product.category && (
              <span style={{ display: 'inline-block', background: 'var(--bg3)', color: 'var(--text2)', padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 500, marginTop: 8 }}>
                {product.category.name}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>₹{finalPrice}</span>
            {originalFinalPrice && (
              <>
                <span style={{ fontSize: 18, textDecoration: 'line-through', color: 'var(--text3)' }}>₹{originalFinalPrice}</span>
                {discount && <span style={{ fontSize: 14, color: 'var(--red)', fontWeight: 600 }}>({discount}% OFF)</span>}
              </>
            )}
          </div>

          {product.description && (
            <p style={{ color: 'var(--text2)', fontSize: 14.5, lineHeight: 1.7, borderBottom: '1px solid var(--border)', paddingBottom: 20, margin: 0 }}>
              {product.description}
            </p>
          )}

          {/* SIZING CUSTOMIZATION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>
              📐 Statue Size (Height in Inches):
            </label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {sizes.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSize(s.value)}
                  style={{
                    padding: '8px 14px',
                    fontSize: 13,
                    fontWeight: 500,
                    borderRadius: 'var(--radius)',
                    border: size === s.value ? '2px solid var(--accent)' : '1px solid var(--border)',
                    background: size === s.value ? 'var(--bg2)' : 'var(--bg)',
                    color: size === s.value ? 'var(--accent)' : 'var(--text2)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {size === 'Custom' && (
              <input
                type="text"
                placeholder="E.g., 14 inches (We will confirm final quote on WhatsApp)"
                value={customSizeText}
                onChange={e => setCustomSizeText(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  fontSize: 13.5,
                  outline: 'none',
                  marginTop: 4,
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            )}
          </div>

          {/* BELOVED ONES CUSTOM PHOTO UPLOAD */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 18, marginTop: 8 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isCustomStatue}
                onChange={e => setIsCustomStatue(e.target.checked)}
                style={{ marginTop: 3, width: 16, height: 16, accentColor: 'var(--accent)' }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14.5, color: 'var(--text)' }}>
                  🎨 3D Statue of Beloved Ones Customization
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text3)', marginTop: 2, lineHeight: 1.5 }}>
                  Check this if you want a 3D statue of your passed father, mother, or any important person. Add their HD photo.
                </div>
              </div>
            </label>

            {isCustomStatue && (
              <div style={{ marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 18px',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    📁 Select HD Photo / Document
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                  </label>

                  {uploading && (
                    <div style={{ fontSize: 13, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="spinner" style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid #ccc', borderTop: '2px solid #333', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></span>
                      Uploading photo...
                    </div>
                  )}

                  {photoUrl && (
                    <div style={{ fontSize: 13, color: '#15803d', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      ✓ Photo Uploaded Successfully!
                    </div>
                  )}
                </div>

                {uploadError && (
                  <div style={{ color: 'var(--red)', fontSize: 12.5, marginTop: 8 }}>
                    ⚠️ {uploadError}
                  </div>
                )}

                {photoUrl && (
                  <div style={{ marginTop: 12, position: 'relative', display: 'inline-block' }}>
                    <img
                      src={photoUrl}
                      alt="Beloved one preview"
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                    />
                    <button
                      onClick={() => setPhotoUrl('')}
                      style={{ position: 'absolute', top: -6, right: -6, background: 'var(--red)', color: 'white', border: 'none', borderRadius: '50%', width: 18, height: 18, fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ADD TO CART ACTION */}
          <div style={{ marginTop: 8 }}>
            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'black',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                {added ? '✓ Item Added to Cart' : '🛒 Add to Cart'}
              </button>
            ) : (
              <div style={{ textAlign: 'center', padding: '14px', background: 'var(--bg3)', borderRadius: 'var(--radius-lg)', color: 'var(--text3)', fontWeight: 600 }}>
                Out of Stock
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;