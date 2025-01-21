import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
import speech_recognition as sr

app = Flask(__name__)

# חיבור ל-MongoDB
client = MongoClient("mongodb+srv://moranavraham11:AW9ta2zrTeZiWdSh@cluster0.dogxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.shopping_cart

@app.route('/voice_search', methods=['POST'])
def voice_search():
    if 'audio_file' not in request.files:
        return jsonify({"error": "Audio file is required"}), 400
    
    audio_file = request.files['audio_file']
    file_path = os.path.join("uploads", audio_file.filename)
    audio_file.save(file_path)

    # זיהוי קול
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(file_path) as source:
            audio = recognizer.record(source)
        query = recognizer.recognize_google(audio)
    except sr.UnknownValueError:
        return jsonify({"error": "Could not understand the audio"}), 400
    except sr.RequestError as e:
        return jsonify({"error": f"Speech recognition service error: {e}"}), 500
    finally:
        os.remove(file_path)  # מחיקת קובץ הקול לאחר עיבוד

    # חיפוש במסד הנתונים
    products = list(db.products.find({"name": {"$regex": query, "$options": "i"}}))
    for product in products:
        product["_id"] = str(product["_id"])
    
    return jsonify({"query": query, "results": products}), 200

if __name__ == "__main__":
    if not os.path.exists("uploads"):
        os.makedirs("uploads")  # יצירת תיקיית העלאות לקבצים זמניים
    app.run(host='0.0.0.0', port=5013)
