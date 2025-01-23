from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for everyone

# Connect to MongoDB
client = MongoClient(
    "mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client.shopping_cart

@app.route('/get_cart/<username>', methods=['GET'])
def get_cart(username):
    """
    Retrieve the cart for a specific user by username.
    """
    # Find the user by username
    user = db.users.find_one({"username": username})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Return the user's cart
    cart = user.get("cart", [])  # Return the cart field, or an empty list if not found
    return jsonify({"username": username, "cart": cart}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4005)
