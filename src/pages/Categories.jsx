import { useEffect, useState } from 'react';
import { getCategories } from '../api';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await getCategories();
      setCategories(res.data);
    };
    load();
  }, []);

  return (
    <div className="categories-page">
      <h1>Categories</h1>

      <div className="categories-grid">
        {categories.map(cat => (
          <div
            key={cat._id}
            className="category-card"
            onClick={() => navigate(`/products?category=${cat._id}`)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{cat.emoji} {cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;