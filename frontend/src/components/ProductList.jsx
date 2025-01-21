import React from 'react';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <h2 className="font-bold">{product.name}</h2>
          <p>₪{product.price}</p>
          <button
            className="bg-blue-500 text-white py-1 px-4 rounded mt-2"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
