import React, { useState } from "react";

const SearchProducts = () => {
  // רשימת המוצרים מתוך הקטגוריות
  const categories = {
    Fruits: [
      { name: "Apple", price: 2 },
      { name: "Banana", price: 1 },
      { name: "Pineapple", price: 4 },
      { name: "Orange", price: 3 },
      { name: "Mango", price: 5 },
      { name: "Grapes", price: 6 },
      { name: "Peach", price: 4 },
      { name: "Cherry", price: 7 },
      { name: "Strawberry", price: 8 },
      { name: "Blueberry", price: 9 },
    ],
    Vegetables: [
      { name: "Carrot", price: 1 },
      { name: "Tomato", price: 2 },
      { name: "Cucumber", price: 1.5 },
      { name: "Potato", price: 1 },
      { name: "Spinach", price: 3 },
      { name: "Onion", price: 1 },
      { name: "Pepper", price: 2.5 },
      { name: "Broccoli", price: 3 },
      { name: "Lettuce", price: 2 },
      { name: "Garlic", price: 2.5 },
    ],
    Snacks: [
      { name: "Chips", price: 3 },
      { name: "Cookies", price: 4 },
      { name: "Popcorn", price: 2 },
      { name: "Chocolate", price: 5 },
      { name: "Candy", price: 3 },
      { name: "Crackers", price: 2.5 },
      { name: "Nuts", price: 6 },
      { name: "Granola Bars", price: 4 },
      { name: "Pretzels", price: 2 },
      { name: "Biscuits", price: 3 },
    ],
    Beverages: [
      { name: "Water", price: 1 },
      { name: "Juice", price: 3 },
      { name: "Soda", price: 2 },
      { name: "Milk", price: 2.5 },
      { name: "Coffee", price: 4 },
      { name: "Tea", price: 3 },
      { name: "Beer", price: 5 },
      { name: "Wine", price: 10 },
      { name: "Smoothie", price: 6 },
      { name: "Lemonade", price: 3 },
    ],
    Bakery: [
      { name: "Bread", price: 2 },
      { name: "Bagel", price: 1.5 },
      { name: "Croissant", price: 2.5 },
      { name: "Muffin", price: 3 },
      { name: "Cake", price: 4 },
      { name: "Doughnut", price: 1.5 },
      { name: "Pie", price: 5 },
      { name: "Baguette", price: 3 },
      { name: "Pita", price: 1 },
      { name: "Roll", price: 1.2 },
    ],
    Meat: [
      { name: "Chicken", price: 5 },
      { name: "Beef", price: 10 },
      { name: "Pork", price: 8 },
      { name: "Turkey", price: 7 },
      { name: "Fish", price: 6 },
      { name: "Lamb", price: 12 },
      { name: "Sausage", price: 4 },
      { name: "Bacon", price: 5 },
      { name: "Ham", price: 6 },
      { name: "Duck", price: 9 },
    ],
    Dairy: [
      { name: "Cheese", price: 3 },
      { name: "Milk", price: 2 },
      { name: "Butter", price: 2.5 },
      { name: "Yogurt", price: 1.5 },
      { name: "Cream", price: 3 },
      { name: "Cottage Cheese", price: 2 },
      { name: "Sour Cream", price: 2 },
      { name: "Ice Cream", price: 4 },
      { name: "Milkshake", price: 3 },
      { name: "Whipped Cream", price: 3.5 },
    ],
    Cleaning: [
      { name: "Detergent", price: 3 },
      { name: "Soap", price: 2 },
      { name: "Shampoo", price: 4 },
      { name: "Toothpaste", price: 3 },
      { name: "Toilet Paper", price: 2 },
      { name: "Tissues", price: 1.5 },
      { name: "Disinfectant", price: 4 },
      { name: "Sponges", price: 2 },
      { name: "Floor Cleaner", price: 3 },
      { name: "Glass Cleaner", price: 3 },
    ],
    Frozen: [
      { name: "Frozen Peas", price: 2 },
      { name: "Frozen Pizza", price: 6 },
      { name: "Frozen Berries", price: 4 },
      { name: "Frozen Fries", price: 3 },
      { name: "Frozen Corn", price: 2.5 },
      { name: "Frozen Spinach", price: 3 },
      { name: "Frozen Shrimp", price: 8 },
      { name: "Frozen Chicken", price: 7 },
      { name: "Frozen Bread", price: 4 },
      { name: "Ice Cream", price: 5 },
    ],
    Baby: [
      { name: "Diapers", price: 12 },
      { name: "Baby Wipes", price: 5 },
      { name: "Formula", price: 15 },
      { name: "Baby Lotion", price: 4 },
      { name: "Baby Shampoo", price: 3 },
      { name: "Baby Powder", price: 2 },
      { name: "Baby Food", price: 6 },
      { name: "Pacifier", price: 3 },
      { name: "Baby Bottle", price: 7 },
      { name: "Teething Ring", price: 4 },
    ],
    Pets: [
      { name: "Dog Food", price: 10 },
      { name: "Cat Food", price: 8 },
      { name: "Bird Seed", price: 5 },
      { name: "Fish Food", price: 3 },
      { name: "Pet Shampoo", price: 6 },
      { name: "Pet Toys", price: 7 },
      { name: "Litter Box", price: 15 },
      { name: "Dog Leash", price: 12 },
      { name: "Cat Collar", price: 10 },
      { name: "Hamster Cage", price: 25 },
    ],
  };
  

  // איחוד כל המוצרים למערך יחיד
  const allProducts = Object.entries(categories).flatMap(([category, products]) =>
    products.map((product) => ({ ...product }))
  );

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      setResults([]);
      return;
    }

    // חיפוש לפי תחילת מילה
    const filteredResults = allProducts.filter((product) =>
      product.name.toLowerCase().startsWith(query.trim().toLowerCase())
    );

    if (filteredResults.length === 0) {
      setError("No products found for the given query.");
    } else {
      setError("");
    }

    setResults(filteredResults);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2>Search Products</h2>

      {/* שדה חיפוש */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search by product name"
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

      {/* תוצאות חיפוש */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {results.map((product, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              textAlign: "left",
            }}
          >
            <strong>{product.name}</strong> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchProducts;
