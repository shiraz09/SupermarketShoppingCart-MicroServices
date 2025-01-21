import React, { useState } from "react";
import { searchProducts } from "../api";

const SearchProducts = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchProducts(query);
      setResults(response);
    } catch (error) {
      alert("Error searching products");
    }
  };

  return (
    <div>
      <h2>Search Products</h2>
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
            {product.name} - {product.category} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchProducts;
