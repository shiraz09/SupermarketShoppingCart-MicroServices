const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB connection
mongoose.connect(
  'mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/shopping_cart?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Schema and model definitions
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
  cart: [cartItemSchema] // Embed the cart items schema
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/add_product', async (req, res) => {
  try {
    const { username, name, category, price, quantity } = req.body;

    // Validate input fields
    if (!username || !name || !category || !price || !quantity) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Add the product to the user's cart
    user.cart.push({ name, category, price, quantity });
    await user.save();

    res.status(200).json({ message: 'Product added to user\'s cart successfully!' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
