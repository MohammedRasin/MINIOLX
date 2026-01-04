import api from './axios';

export const fetchProductById = async id => {
  const res = await api.get(`/api/products/${id}`);
  return res.data.product;
};

export const fetchProducts = async (filter = {}) => {
  const cleanedFilter = Object.fromEntries(
    Object.entries(filter).filter(([_, v]) => v)
  );

  const params = new URLSearchParams(cleanedFilter).toString();
  const res = await api.get(`/api/products?${params}`);
  return res.data.products;
};
