// src/pages/Products.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../api';

const SkeletonGrid = () => (
  <div className="loading-grid">
    {[...Array(8)].map((_, i) => <div key={i} className="skeleton" />)}
  </div>
);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Products() {
  const query = useQuery();
  const [products,   setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [activeCategory, setActiveCategory] = useState(query.get('category') || 'all');
  const [sort,    setSort]    = useState('default');
  const [search,  setSearch]  = useState(query.get('search') || '');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {};
        if (query.get('newArrival') === 'true') params.newArrival = true;
        if (query.get('combo')      === 'true') params.combo      = true;
        if (query.get('badge'))                 params.badge      = query.get('badge');
        if (search)                             params.search     = search;
        const [p, cats] = await Promise.all([getProducts(params), getCategories()]);
        setProducts(p.data);
        setCategories(cats.data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = products
    .filter(p => activeCategory === 'all' || p.category?._id === activeCategory || p.category === activeCategory)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name')       return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>All Products</h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
            style={{ width: 200 }}
          />
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>
      </div>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="filter-bar">
          <button
            className={`filter-chip ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat._id}
              className={`filter-chip ${activeCategory === cat._id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat._id)}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <SkeletonGrid />
      ) : filtered.length === 0 ? (
        <div className="no-products">
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ fontSize: 16, fontWeight: 500 }}>No products found</p>
          <p style={{ fontSize: 13.5, marginTop: 6 }}>Try a different filter or search term</p>
        </div>
      ) : (
        <>
          <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 20 }}>
            Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>
          <div className="products-grid">
            {filtered.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
