from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for everyone

# MongoDB connection
client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/update_quantity', methods=['PATCH'])
def update_quantity():
    data = request.get_json()

    username = data.get("username")  # Get username
    product_name = data.get("product_name")  # Get product name
    quantity = data.get("quantity")  # Get new quantity

    # Validate input
    if not username or not product_name or quantity is None:
        return jsonify({"error": "Missing required fields: username, product_name, or quantity"}), 400

    if quantity < 0:
        return jsonify({"error": "Quantity cannot be negative"}), 400

    # Find and update the product quantity
    result = db.users.update_one(
        {"username": username, "cart.name": product_name},  # Find user and product in the cart
        {"$set": {"cart.$.quantity": quantity}}  # Update the quantity
    )

    if result.matched_count > 0:
        return jsonify({"message": "Quantity updated successfully!"}), 200
    return jsonify({"error": "Product not found in the cart"}), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4011)
