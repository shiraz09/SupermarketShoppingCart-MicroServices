FROM python:3.9-slim

# הגדרת תיקיית העבודה
WORKDIR /app

# העתקת קובץ הדרישות והתקנת הספריות
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# העתקת כל הקבצים לתוך התמונה
COPY . .

# חשיפת הפורט שבו השירות רץ
EXPOSE 4010

# הפקודה להרצת האפליקציה
CMD ["python", "app.py"]
