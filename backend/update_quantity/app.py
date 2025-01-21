from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/update_quantity', methods=['PATCH'])
def update_quantity():
    data = request.get_json()
    user_id = data["user_id"]
    product_id = data["product_id"]
    quantity = data["quantity"]

    if quantity < 0:
        return jsonify({"error": "Quantity cannot be negative"}), 400

    result = db.cart.update_one(
        {"user_id": user_id, "product_id": product_id},
        {"$set": {"quantity": quantity}}
    )

    if result.matched_count:
        return jsonify({"message": "Quantity updated successfully!"}), 200
    return jsonify({"error": "Product not found"}), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002)
