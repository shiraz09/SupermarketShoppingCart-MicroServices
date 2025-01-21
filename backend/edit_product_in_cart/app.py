from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for everyone

client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/edit_product_in_cart', methods=['PUT'])
def edit_product_in_cart():
    data = request.get_json()
    user_id = data["user_id"]
    product_id = data["product_id"]

    update_fields = {}
    if "name" in data:
        update_fields["name"] = data["name"]
    if "category" in data:
        update_fields["category"] = data["category"]
    if "price" in data:
        update_fields["price"] = data["price"]
    if "quantity" in data:
        update_fields["quantity"] = data["quantity"]

    result = db.cart.update_one(
        {"user_id": user_id, "product_id": product_id},
        {"$set": update_fields}
    )

    if result.matched_count:
        return jsonify({"message": "Product updated successfully!"}), 200
    return jsonify({"error": "Product not found"}), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4004)
