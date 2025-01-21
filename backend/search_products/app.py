from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/search_products', methods=['GET'])
def search_products():
    query = request.args.get("query", "")
    products = list(db.products.find({"name": {"$regex": query, "$options": "i"}}))
    for product in products:
        product["_id"] = str(product["_id"])
    return jsonify(products), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4009)
