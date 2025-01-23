import requests

BASE_URL = "http://localhost:4010"

def test_sort_cart_success():
    """
    בדיקה: סידור עגלה של משתמש קיים לפי מחיר כולל (מחיר * כמות).
    """
    payload = {
        "username": "moran"  # שם המשתמש קיים
    }

    # שליחת בקשת סידור עגלה
    response = requests.post(f"{BASE_URL}/sort_cart", json=payload)

    # בדיקת התגובה
    assert response.status_code == 200
    sorted_cart = response.json()
    assert isinstance(sorted_cart, list)  # התוצאה צריכה להיות רשימה

    # וידוא שהעגלה מסודרת לפי המחיר הכולל בסדר יורד
    for i in range(len(sorted_cart) - 1):
        assert sorted_cart[i]["total_price"] >= sorted_cart[i + 1]["total_price"]

def test_sort_cart_user_not_found():
    """
    בדיקה: ניסיון לסדר עגלה עבור משתמש שאינו קיים.
    """
    payload = {
        "username": "non_existing_user"  # שם משתמש שאינו קיים
    }

    # שליחת בקשת סידור עגלה
    response = requests.post(f"{BASE_URL}/sort_cart", json=payload)

    # בדיקת התגובה
    assert response.status_code == 404
    data = response.json()
    assert data.get("error") == "Cart not found for the user"
