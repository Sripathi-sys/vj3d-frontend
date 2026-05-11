import { useEffect, useState } from 'react';
import { getCategories } from '../api';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="categories-page">
      <div className="container">

        <div className="section-header">
          <h1 className="section-title">Categories</h1>
          <p className="section-subtitle">
            Explore products by category
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="category-card"
              onClick={() => navigate(`/products?category=${cat._id}`)}
            >
              <div className="category-emoji">
                {cat.emoji || '📦'}
              </div>

              <h3>{cat.name}</h3>

              <button className="category-btn">
                View Products
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Categories;