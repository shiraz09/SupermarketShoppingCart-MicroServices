const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ObjectId } = mongoose.Types;

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

// DELETE endpoint
app.delete('/delete_product/:product_id', async (req, res) => {
  const { product_id } = req.params;

  try {
    if (!ObjectId.isValid(product_id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const result = await mongoose.connection.db.collection('products').deleteOne({ _id: new ObjectId(product_id) });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: 'Product deleted successfully!' });
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
