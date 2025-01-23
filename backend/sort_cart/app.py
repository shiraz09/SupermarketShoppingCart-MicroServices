from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)  # Enable CORS for everyone

# Connect to MongoDB
client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/sort_cart', methods=['POST'])
def sort_cart():
    """
    Sort the user's cart items by total price (price * quantity) in descending order.
    """
    data = request.get_json()
    username = data.get("username")  # Username of the user

    if not username:
        return jsonify({"error": "Username is required"}), 400

    # Fetch the user's cart
    user = db.users.find_one({"username": username})
    if not user or "cart" not in user:
        return jsonify({"error": "Cart not found for the user"}), 404

    cart_items = user["cart"]

    # Enrich the cart items with product details and calculate total price
    enriched_cart = []
    for item in cart_items:
        product = db.products.find_one({"_id": ObjectId(item["product_id"])})
        if product:
            total_price = product["price"] * item["quantity"]
            enriched_cart.append({
                "product_id": str(product["_id"]),
                "name": product["name"],
                "price": product["price"],
                "quantity": item["quantity"],
                "total_price": total_price,
            })
        else:
            enriched_cart.append({
                "product_id": str(item["product_id"]),
                "name": None,
                "price": 0,
                "quantity": item["quantity"],
                "total_price": 0,
            })

    # Sort the cart items by total price in descending order
    sorted_cart = sorted(enriched_cart, key=lambda x: x["total_price"], reverse=True)

    return jsonify(sorted_cart), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4010)
