import requests

BASE_URL = "http://localhost:4006"

def test_login_success():
    """
    בדיקה: התחברות מוצלחת עם פרטי משתמש תקינים.
    """
    payload = {
        "username": "moran",
        "password": "123456"  # סיסמה תקינה
    }

    # שליחת בקשת התחברות
    response = requests.post(f"{BASE_URL}/login", json=payload)

    # בדיקת התגובה
    assert response.status_code == 200
    data = response.json()
    assert data.get("message") == "Login successful"
    assert data.get("username") == "moran"  # שם המשתמש תואם

def test_login_failure():
    """
    בדיקה: התחברות נכשלת עם פרטי משתמש לא תקינים.
    """
    payload = {
        "username": "moran",
        "password": "wrongpassword"  # סיסמה לא נכונה
    }

    # שליחת בקשת התחברות
    response = requests.post(f"{BASE_URL}/login", json=payload)

    # בדיקת התגובה
    assert response.status_code == 401  # סטטוס של כשל התחברות
    data = response.json()
    assert data.get("error") == "Invalid username or password"
