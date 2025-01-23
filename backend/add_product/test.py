import requests

BASE_URL = "http://localhost:4000"

def test_add_product_success():
    """
    בדיקה: הוספת מוצר לעגלה של משתמש קיים בהצלחה.
    """
    payload = {
        "username": "moran",
        "name": "Apple",
        "category": "Fruits",
        "price": 3.5,
        "quantity": 2
    }
    response = requests.post(f"{BASE_URL}/add_product", json=payload)
    assert response.status_code == 200
    assert response.json().get("message") == "Product added to user's cart successfully!"

def test_add_product_user_not_found():
    """
    בדיקה: ניסיון להוספת מוצר לעגלה של משתמש שלא קיים.
    """
    payload = {
        "username": "non_existing_user",
        "name": "Banana",
        "category": "Fruits",
        "price": 2.0,
        "quantity": 5
    }
    response = requests.post(f"{BASE_URL}/add_product", json=payload)
    assert response.status_code == 404
    assert response.json().get("error") == "User not found"

def test_add_product_missing_fields():
    """
    בדיקה: ניסיון להוספת מוצר עם שדות חסרים.
    """
    payload = {
        "username": "moran",
        "name": "Orange"
        # חסרים קטגוריה, מחיר וכמות
    }
    response = requests.post(f"{BASE_URL}/add_product", json=payload)
    assert response.status_code == 500  # אמור להחזיר שגיאה אם חסרים שדות
