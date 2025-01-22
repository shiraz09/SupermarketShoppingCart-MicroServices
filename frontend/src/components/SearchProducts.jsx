import React, { useState } from "react";
import { searchProducts } from "../api";

const SearchProducts = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await searchProducts(query.trim());
      setResults(response);
      if (response.length === 0) {
        setError("No products found for the given query.");
      }
    } catch (error) {
      setError("Error searching products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2>Search Products</h2>

      {/* שדה חיפוש */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "1rem",
            width: "70%",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            fontSize: "1rem",
            backgroundColor: "#3182ce",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* הודעת שגיאה */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* טעינה */}
      {loading && <p>Loading...</p>}

      {/* תוצאות חיפוש */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {results.map((product) => (
          <li
            key={product._id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              textAlign: "left",
            }}
          >
            <strong>{product.name}</strong> - {product.category} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchProducts;
