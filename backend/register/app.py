from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash

app = Flask(__name__)
CORS(app)  # Enable CORS for everyone

client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data["username"]
    password = generate_password_hash(data["password"])
    
    # Check for unique username
    if db.users.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 409

    user = {"username": username, "password": password}
    db.users.insert_one(user)
    return jsonify({"message": "User registered successfully!"}), 201

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4007)
