from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash

app = Flask(__name__)
CORS(app)

client = MongoClient(
    "mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client.shopping_cart

@app.route('/register', methods=['POST'])
def register():
    """
    Register a new user with a unique username.
    """
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Validate input
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Check if the username already exists
    if db.users.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 409

    # Save the new user to the database
    hashed_password = generate_password_hash(password)
    user = {"username": username, "password": hashed_password, "cart": []}  # Add an empty cart
    db.users.insert_one(user)

    return jsonify({"message": "User registered successfully!"}), 201

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4007)
