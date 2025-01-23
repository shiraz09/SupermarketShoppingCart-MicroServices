import requests

BASE_URL = "http://localhost:4005"

def test_get_cart_success():
    """
    בדיקה: קבלת עגלת קניות עבור משתמש קיים.
    """
    username = "moran"  # שם משתמש קיים עם עגלה

    # שליחת בקשה לשירות
    response = requests.get(f"{BASE_URL}/get_cart/{username}")

    # בדיקת התגובה
    assert response.status_code == 200
    data = response.json()
    assert data.get("username") == username  # בדיקה ששם המשתמש תקין
    assert isinstance(data.get("cart"), list)  # בדיקה שהעגלה היא רשימה

def test_get_cart_user_not_found():
    """
    בדיקה: ניסיון לקבל עגלת קניות עבור משתמש שלא קיים.
    """
    username = "non_existing_user"  # שם משתמש שלא קיים

    # שליחת בקשה לשירות
    response = requests.get(f"{BASE_URL}/get_cart/{username}")

    # בדיקת התגובה
    assert response.status_code == 404
    data = response.json()
    assert data.get("error") == "User not found"
