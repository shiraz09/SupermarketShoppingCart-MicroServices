from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for everyone

try:
    client = MongoClient(
        "mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    db = client.shopping_cart

    @app.route('/delete_product', methods=['DELETE'])
    def delete_product():
        try:
            data = request.get_json()
            username = data.get("username")  # Get username from request
            product_name = data.get("product_name")  # Get product name from request

            if not username or not product_name:
                return jsonify({"error": "Username and product name are required"}), 400

            # Remove the product with the specified name from the user's cart
            result = db.users.update_one(
                {"username": username},
                {"$pull": {"cart": {"name": product_name}}}
            )

            if result.modified_count == 0:
                return jsonify({"error": "Product not found in user's cart"}), 404

            return jsonify({"message": "Product deleted successfully!"}), 200
        except Exception as e:
            return jsonify({"error": "Failed to delete product", "details": str(e)}), 400

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
