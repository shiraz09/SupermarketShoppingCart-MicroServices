from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    user_id = data["user_id"]

    # שליפת פריטי עגלה
    cart_items = list(db.cart.find({"user_id": user_id}))
    if not cart_items:
        return jsonify({"error": "Cart is empty"}), 400

    total_price = sum(item["quantity"] * db.products.find_one({"_id": ObjectId(item["product_id"])})["price"] for item in cart_items)

    # יצירת הזמנה
    order = {
        "user_id": user_id,
        "items": cart_items,
        "total_price": total_price,
        "status": "Paid"
    }
    db.orders.insert_one(order)

    # ניקוי העגלה
    db.cart.delete_many({"user_id": user_id})

    return jsonify({"message": "Checkout successful!", "order_id": str(order["_id"]), "total_price": total_price}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5006)
