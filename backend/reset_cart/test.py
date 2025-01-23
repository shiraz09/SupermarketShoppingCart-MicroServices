import requests

BASE_URL = "http://localhost:4008"

def test_reset_cart_success():
    """
    בדיקה: איפוס עגלה בהצלחה עבור משתמש קיים.
    """
    # שם משתמש קיים
    payload = {
        "username": "moran"  # שם המשתמש
    }

    # שליחת בקשת איפוס עגלה
    response = requests.post(f"{BASE_URL}/reset_cart", json=payload)

    # בדיקת התגובה
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert data["message"] in ["Cart reset successfully!", "Cart is already empty!"]

def test_reset_cart_user_not_found():
    """
    בדיקה: ניסיון איפוס עגלה עבור משתמש שאינו קיים.
    """
    # שם משתמש שאינו קיים
    payload = {
        "username": "non_existing_user"
    }

    # שליחת בקשת איפוס עגלה
    response = requests.post(f"{BASE_URL}/reset_cart", json=payload)

    # בדיקת התגובה
    assert response.status_code == 404
    data = response.json()
    assert data.get("error") == "User not found"
