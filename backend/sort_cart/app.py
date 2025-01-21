from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/sort_cart', methods=['POST'])
def sort_cart():
    data = request.get_json()
    user_id = data["user_id"]
    sort_by = data.get("sort_by", "price")
    order = data.get("order", "asc")

    cart_items = list(db.cart.find({"user_id": user_id}))
    for item in cart_items:
        product = db.products.find_one({"_id": item["product_id"]})
        item.update({"name": product["name"], "price": product["price"]})

    sorted_items = sorted(cart_items, key=lambda x: x[sort_by], reverse=(order == "desc"))
    return jsonify(sorted_items), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5008)
