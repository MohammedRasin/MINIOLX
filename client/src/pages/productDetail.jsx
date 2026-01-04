import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/productApi';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product</p>;

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
      }}
    >
      <img
        src={product.image || 'https://via.placeholder.com/400'}
        alt={product.title}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '5px',
        }}
      />
      <h2>{product.title}</h2>
      <p>Price: ₹{product.price}</p>
      <div>
        category :
        {product.category.map(cat => (
          <p className="font-bold bg-green-100 p-1 rounded-md text-gray-500 inline mr-1 ml-1">
            {cat}
          </p>
        ))}
      </div>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
