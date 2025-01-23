const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB connection
mongoose.connect(
  'mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/shopping_cart?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Schema definition
const cartItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  },
  { _id: false } // Disable automatic creation of _id for cart items
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  cart: [cartItemSchema] // Use cart item schema
});

const User = mongoose.model('User', userSchema);

// DELETE product from user's cart
app.delete('/delete_product', async (req, res) => {
  try {
    const { username, product_name } = req.body;

    // Validate request parameters
    if (!username || !product_name) {
      return res.status(400).json({ error: 'Username and product name are required' });
    }

    // Find the user and remove the product from their cart
    const result = await User.updateOne(
      { username },
      { $pull: { cart: { name: product_name } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Product not found in user\'s cart' });
    }

    return res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (error) {
    console.error('Error deleting product from cart:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
