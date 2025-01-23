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

// Schema and model definition
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.post('/add_product', async (req, res) => {
  try {
    const { name, category, price } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const product = new Product({ name, category, price });
    const result = await product.save();

    res.status(201).json({ message: 'Product added successfully!', id: result._id });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
