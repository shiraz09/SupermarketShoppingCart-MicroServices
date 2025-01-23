import requests

BASE_URL = "http://localhost:4003"

def test_delete_product_success():
    """
    בדיקה: מחיקת מוצר בהצלחה ממשתמש קיים.
    """
    # יצירת נתוני בדיקה
    username = "moran"
    product_name = "Apple"

    # בקשה למחיקת מוצר
    response = requests.delete(f"{BASE_URL}/delete_product", json={
        "username": username,
        "product_name": product_name
    })

    # בדיקת תוצאה
    assert response.status_code == 200
    assert response.json().get("message") == "Product deleted successfully!"

def test_delete_product_user_or_product_not_found():
    """
    בדיקה: ניסיון למחוק מוצר ממשתמש או מוצר שלא קיימים.
    """
    # יצירת נתוני בדיקה עם משתמש או מוצר שלא קיימים
    username = "non_existing_user"
    product_name = "NonExistingProduct"

    # בקשה למחיקת מוצר
    response = requests.delete(f"{BASE_URL}/delete_product", json={
        "username": username,
        "product_name": product_name
    })

    # בדיקת תוצאה
    assert response.status_code == 404
    assert response.json().get("error") == "Product not found in user's cart"
