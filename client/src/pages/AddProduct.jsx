import { useState } from 'react';
import { Input, Button, Select, message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/productApi';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const AddProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success('Product added successfully');
      queryClient.invalidateQueries(['products']);
      navigate('/');
    },
    onError: err => {
      message.error(err.response?.data?.message || 'Failed to add product');
    },
  });

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = value => {
    setForm(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.price || !form.category) {
      message.warning('Please fill required fields');
      return;
    }

    mutation.mutate({
      ...form,
      category: [form.category], // backend expects array
      price: Number(form.price),
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>

      <div className="space-y-4">
        <Input
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
        />

        <TextArea
          name="description"
          placeholder="Product Description"
          rows={4}
          value={form.description}
          onChange={handleChange}
        />

        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <Input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <Select
          placeholder="Select Category"
          className="w-full"
          value={form.category || undefined}
          onChange={handleCategoryChange}
          options={[
            { value: 'CARS', label: 'CARS' },
            { value: 'fourwheeler', label: 'fourwheeler' },
            { value: 'WATCHS', label: 'WATCHS' },
            { value: 'ELECECTRONICS', label: 'ELECECTRONICS' },
          ]}
        />

        <Button
          type="primary"
          className="w-full"
          loading={mutation.isPending}
          onClick={handleSubmit}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
