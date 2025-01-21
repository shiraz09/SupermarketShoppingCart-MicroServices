from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)  # Enable CORS for everyone

client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/delete_product/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        result = db.products.delete_one({"_id": ObjectId(product_id)})
        if result.deleted_count == 1:
            return jsonify({"message": "Product deleted successfully!"}), 200
        else:
            return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        return jsonify({"error": "Invalid product ID", "details": str(e)}), 400

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4003)
