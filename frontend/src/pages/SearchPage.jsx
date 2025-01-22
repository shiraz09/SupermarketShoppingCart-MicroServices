import React, { useState } from "react";
import { searchProducts } from "../api";
import "./SearchPage.css"; // נוודא שה-CSS מחובר

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchProducts(query);
      setResults(response);
    } catch (error) {
      alert("Failed to search products");
    }
  };

  return (
    <div className="search-page-container">
      <div className="search-section">
        <h1>Search Products</h1>
        <input
          type="text"
          placeholder="Search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {results.map((product) => (
            <li key={product._id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
