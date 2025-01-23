# שימוש בתמונה רזה של Python
FROM python:3.9-slim

# הגדרת תיקיית העבודה
WORKDIR /app

# העתקת קובץ הדרישות והתקנת התלויות
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# העתקת קבצי השירות
COPY . .

# חשיפת הפורט שבו השירות פועל
EXPOSE 4012

# הפקודה להרצת האפליקציה
CMD ["python", "app.py"]
