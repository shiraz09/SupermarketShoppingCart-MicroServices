import React, { useState, useEffect } from 'react';
import { getProducts, addToCart } from '../api';
import ProductList from '../components/ProductList';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    await addToCart({ ...product, quantity: 1 });
    alert('Product added to cart!');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Product List</h1>
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default HomePage;
