import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productApi';
import { useNavigate } from 'react-router-dom';
import { Input, Space, Select } from 'antd';
import { useState } from 'react';

const ProductList = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({ category: [], title: '' });
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', filter.title, filter.category.join(',')],
    queryFn: () =>
      fetchProducts({
        title: filter.title,
        category:
          filter.category.length > 0 ? filter.category.join(',') : undefined,
      }),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  const { Search } = Input;
  const onSearch = value => {
    setFilter(prev => ({ ...prev, title: value }));
  };
  const handleChange = value => {
    if (!value) {
      setFilter(prev => ({ ...prev, category: [] }));
    } else {
      setFilter(prev => ({ ...prev, category: [value] }));
    }
  };
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Search
            placeholder="Enter Product Name or Category"
            onSearch={onSearch}
            enterButton
            className="w-full sm:w-80"
          />

          <Select
            value={filter.category[0] || ''}
            className="w-40"
            onChange={handleChange}
            options={[
              { value: '', label: 'All' },
              { value: 'CARS', label: 'CARS' },
              { value: 'fourwheeler', label: 'fourwheeler' },
              { value: 'WATCHS', label: 'WATCHS' },
              { value: 'ELECECTRONICS', label: 'ELECECTRONICS' },
            ]}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilter({ category: [], title: '' })}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      {products && products.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map(product => (
            <div
              key={product._id}
              className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <img
                src={product.image || 'https://via.placeholder.com/200'}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-indigo-600 font-bold mt-2">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
