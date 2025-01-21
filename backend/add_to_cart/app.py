from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    cart_item = {
        "user_id": data["user_id"],
        "product_id": data["product_id"],
        "quantity": data["quantity"]
    }
    db.cart.update_one(
        {"user_id": data["user_id"], "product_id": data["product_id"]},
        {"$inc": {"quantity": data["quantity"]}},
        upsert=True
    )
    return jsonify({"message": "Product added to cart successfully!"}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002)
