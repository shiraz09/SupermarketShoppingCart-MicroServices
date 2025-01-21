from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for everyone

client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/add_product', methods=['POST'])
def add_product():
    data = request.get_json()
    product = {
        "name": data["name"],
        "category": data["category"],
        "price": data["price"],
        "description": data["description"]
    }
    result = db.products.insert_one(product)
    return jsonify({"message": "Product added successfully!", "id": str(result.inserted_id)}), 201

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4000)
