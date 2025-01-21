import React, { useState, useEffect } from 'react';
import { getCartItems, updateQuantity, deleteFromCart } from '../api';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getCartItems();
      setCartItems(data);
    };
    fetchCartItems();
  }, []);

  const handleUpdateQuantity = async (productId, quantity) => {
    await updateQuantity(productId, quantity);
    alert('Quantity updated!');
  };

  const handleDeleteFromCart = async (productId) => {
    await deleteFromCart(productId);
    alert('Product removed from cart!');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Your Cart</h1>
      {cartItems.map((item) => (
        <CartItem
          key={item._id}
          item={item}
          onUpdateQuantity={handleUpdateQuantity}
          onDelete={handleDeleteFromCart}
        />
      ))}
    </div>
  );
};

export default CartPage;
