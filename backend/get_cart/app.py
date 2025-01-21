from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/get_cart/<user_id>', methods=['GET'])
def get_cart(user_id):
    cart_items = list(db.cart.find({"user_id": user_id}))
    for item in cart_items:
        item["_id"] = str(item["_id"])
    return jsonify(cart_items), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4005)
