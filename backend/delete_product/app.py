from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for everyone

try:
    client = MongoClient(
        "mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    db = client.shopping_cart

    @app.route('/add_product', methods=['POST'])
    def add_product():
        data = request.get_json()
        username = data.get("username")  # Get username from request
        product = {
            "_id": ObjectId(),  # Generate unique ObjectId for the product
            "name": data["name"],
            "category": data["category"],
            "price": data["price"],
        }

        # Check if user exists
        user = db.users.find_one({"username": username})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Add product to user's cart
        db.users.update_one(
            {"username": username},
            {"$push": {"cart": product}}
        )

        return jsonify({"message": "Product added to user's cart successfully!"}), 200

    @app.route('/delete_product/<product_id>', methods=['DELETE'])
    def delete_product(product_id):
        try:
            # Validate product_id
            if not ObjectId.is_valid(product_id):
                return jsonify({"error": "Invalid product ID"}), 400

            # Find and remove the product from all carts
            result = db.users.update_many(
                {},
                {"$pull": {"cart": {"_id": ObjectId(product_id)}}}
            )

            if result.modified_count == 0:
                return jsonify({"error": "Product not found in any cart"}), 404

            return jsonify({"message": "Product deleted successfully!"}), 200
        except Exception as e:
            return jsonify({"error": "Failed to delete product", "details": str(e)}), 400

    @app.route('/get_cart/<username>', methods=['GET'])
    def get_cart(username):
        try:
            user = db.users.find_one({"username": username})
            if not user:
                return jsonify({"error": "User not found"}), 404

            return jsonify({"cart": user.get("cart", [])}), 200
        except Exception as e:
            return jsonify({"error": "Failed to fetch cart", "details": str(e)}), 400

    @app.route('/reset_cart', methods=['POST'])
    def reset_cart():
        try:
            data = request.get_json()
            username = data.get("username")

            if not username:
                return jsonify({"error": "Username not provided"}), 400

            result = db.users.update_one(
                {"username": username},
                {"$set": {"cart": []}}
            )

            if result.modified_count == 0:
                return jsonify({"error": "User not found or cart already empty"}), 404

            return jsonify({"message": "Cart has been reset successfully!"}), 200
        except Exception as e:
            return jsonify({"error": "Failed to reset cart", "details": str(e)}), 400

    if __name__ == "__main__":
        try:
            app.run(host='0.0.0.0', port=4003)
        except Exception as e:
            print(f"Error starting Flask server: {e}")

except Exception as e:
    print(f"Flask service failed: {e}")
    print("Attempting to start the Node.js service...")

    try:
        subprocess.run(["node", "node_service.js"], check=True)
    except Exception as node_error:
        print(f"Node.js service failed: {node_error}")
        print("Both services failed. Exiting.")