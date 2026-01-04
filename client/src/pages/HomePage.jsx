import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productApi';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
  });

  const categories = ['All', 'Electronics', 'Mobiles', 'Cars', 'Furniture'];

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Categories</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat === 'All' ? '' : cat)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: category === cat ? '#2196F3' : 'white',
              color: category === cat ? 'white' : 'black',
              cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))',
          gap: '20px',
        }}
      >
        {products.map(product => (
          <div
            key={product._id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <img
              src={product.image || 'https://via.placeholder.com/200'}
              alt={product.title}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '5px',
              }}
            />
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <p>{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
