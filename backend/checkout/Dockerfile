# שימוש בתמונה רזה של Python
FROM python:3.9-slim

# הגדרת תיקיית העבודה
WORKDIR /app

# העתקת קובץ הדרישות
COPY requirements.txt requirements.txt

# התקנת התלויות
RUN pip install --no-cache-dir -r requirements.txt

# העתקת כל קבצי השירות לתוך התמונה
COPY . .

# חשיפת הפורט שבו השירות פועל
EXPOSE 4002

# הפקודה להרצת האפליקציה
CMD ["python", "app.py"]
