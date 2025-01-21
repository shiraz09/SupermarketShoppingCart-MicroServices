from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient
from werkzeug.security import check_password_hash
import jwt
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for everyone

client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

SECRET_KEY = "your_secret_key"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    user = db.users.find_one({"username": username})
    if user and check_password_hash(user["password"], password):
        token = jwt.encode(
            {"user_id": str(user["_id"]), "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
            SECRET_KEY, algorithm="HS256"
        )
        return jsonify({"token": token}), 200
    return jsonify({"error": "Invalid username or password"}), 401

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4006)
