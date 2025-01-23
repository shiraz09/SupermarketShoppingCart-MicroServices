import React, { useEffect, useState } from "react";

const SearchProducts = ({ selectedCategory, onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `http://localhost:4012/get_products?category=${selectedCategory}`
          : "http://localhost:4012/get_products";

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h2>Search Products</h2>
      <input
        type="text"
        placeholder="Search by product name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "1rem",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          width: "100%",
        }}
      />
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onCartUpdate={onCartUpdate} // Pass the callback
          />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product, onCartUpdate }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("No user logged in. Please log in first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/add_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name: product.name,
          category: product.category,
          price: product.price,
          quantity,
        }),
      });
    
      if (response.ok) {
        alert(`${quantity} x ${product.name} added to cart successfully!`);
        onCartUpdate(); // Notify HomePage that the cart state has changed
        setQuantity(1); // Reset quantity
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding product to cart at 4000, retrying with 5000...", error);
    
      // Retry with fallback server
      try {
        const fallbackResponse = await fetch("http://localhost:5007/add_product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            name: product.name,
            category: product.category,
            price: product.price,
            quantity,
          }),
        });
    
        if (fallbackResponse.ok) {
          alert(`${quantity} x ${product.name} added to cart successfully (via fallback server)!`);
          onCartUpdate(); // Notify HomePage that the cart state has changed
          setQuantity(1); // Reset quantity
        } else {
          const fallbackData = await fallbackResponse.json();
          alert(`Error from fallback server: ${fallbackData.error}`);
        }
      } catch (fallbackError) {
        console.error("Error adding product to cart at fallback server (5000):", fallbackError);
        alert("Failed to add product to cart after retrying. Please try again later.");
      }
    }    
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={product.img}
        alt={product.name}
        style={{ maxWidth: "100%", borderRadius: "5px" }}
      />
      <h3>{product.name}</h3>
      <p>₪ {product.price.toFixed(2)}</p>
      <div style={{ margin: "10px 0" }}>
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          style={{
            padding: "5px",
            fontSize: "1rem",
            marginRight: "5px",
            cursor: "pointer",
          }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          style={{
            padding: "5px",
            fontSize: "1rem",
            marginLeft: "5px",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default SearchProducts;
