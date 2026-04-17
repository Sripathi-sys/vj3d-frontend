import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../api';

const SkeletonGrid = () => (
  <div className="loading-grid">
    {[...Array(8)].map((_, i) => <div key={i} className="skeleton" />)}
  </div>
);

function Products() {
  const location = useLocation(); // ✅ FIX
  const navigate = useNavigate(); // ✅ better navigation

  const query = new URLSearchParams(location.search);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState('default');
  const [search, setSearch] = useState(query.get('search') || '');

  const categoryFromUrl = query.get('category');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {};

        if (query.get('newArrival') === 'true') params.newArrival = true;
        if (query.get('combo') === 'true') params.combo = true;
        if (query.get('badge')) params.badge = query.get('badge');
        if (search) params.search = search;

        const [p, cats] = await Promise.all([
          getProducts(params),
          getCategories()
        ]);

        setProducts(p.data);
        setCategories(cats.data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [location.search, search]); // ✅ FIXED (NO MULTIPLE CALLS)

  const filtered = products
    .filter(p => {
      if (!categoryFromUrl) return true;
      return (
        p.category?._id === categoryFromUrl ||
        p.category === categoryFromUrl
      );
    })
    .filter(p =>
      !search || p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>
          {categoryFromUrl ? 'Category Products' : 'All Products'}
        </h1>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
            style={{ width: 200 }}
          />

          <select
            className="sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="filter-bar">
          <button
            className={`filter-chip ${!categoryFromUrl ? 'active' : ''}`}
            onClick={() => navigate('/products')} // ✅ FIXED
          >
            All
          </button>

          {categories.map(cat => (
            <button
              key={cat._id}
              className={`filter-chip ${
                categoryFromUrl === cat._id ? 'active' : ''
              }`}
              onClick={() =>
                navigate(`/products?category=${cat._id}`) // ✅ FIXED
              }
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
          <div style={{ fontSize: 48 }}>🔍</div>
          <p>No products found</p>
        </div>
      ) : (
        <>
          <p style={{ marginBottom: 20 }}>
            Showing {filtered.length} products
          </p>

          <div className="products-grid">
            {filtered.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;