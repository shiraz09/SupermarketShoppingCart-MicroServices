from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/reset_cart', methods=['POST'])
def reset_cart():
    data = request.get_json()
    user_id = data["user_id"]

    result = db.cart.delete_many({"user_id": user_id})
    if result.deleted_count > 0:
        return jsonify({"message": "Cart reset successfully!"}), 200
    else:
        return jsonify({"message": "Cart is already empty!"}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4008)
