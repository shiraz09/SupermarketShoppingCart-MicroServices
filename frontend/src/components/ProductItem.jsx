import React from 'react';

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="font-bold">{product.name}</h2>
      <p>₪{product.price}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
