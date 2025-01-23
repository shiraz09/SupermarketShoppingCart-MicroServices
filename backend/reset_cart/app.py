from flask import Flask, request, jsonify
from flask_cors import CORS  # Enable CORS for everyone
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for everyone

# Connect to MongoDB
client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/reset_cart', methods=['POST'])
def reset_cart():
    """
    Reset the cart for a specific user based on the username.
    """
    try:
        data = request.get_json()
        username = data.get("username")

        if not username:
            return jsonify({"error": "username is required"}), 400

        # Find the user by username
        user = db.users.find_one({"username": username})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Reset the cart for the user
        result = db.users.update_one({"username": username}, {"$set": {"cart": []}})
        if result.modified_count > 0:
            return jsonify({"message": "Cart reset successfully!"}), 200
        else:
            return jsonify({"message": "Cart is already empty!"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to reset cart", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4008)
