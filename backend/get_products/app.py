from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/get_products', methods=['GET'])
def get_products():
    category = request.args.get('category', None)
    if category:
        products = list(db.products.find({"category": category}))
    else:
        products = list(db.products.find())
    for product in products:
        product["_id"] = str(product["_id"])
    return jsonify(products)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4012)
