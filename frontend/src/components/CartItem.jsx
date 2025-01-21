import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onDelete }) => {
  return (
    <div className="border p-4 rounded shadow mb-4 flex justify-between items-center">
      <div>
        <h2 className="font-bold">{item.name}</h2>
        <p>₪{item.price}</p>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.product_id, Number(e.target.value))}
          className="border w-16 text-center"
        />
        <button
          className="bg-red-500 text-white py-1 px-4 rounded ml-2"
          onClick={() => onDelete(item.product_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
