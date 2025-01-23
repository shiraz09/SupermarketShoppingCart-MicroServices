import requests

BASE_URL = "http://localhost:4012"

def test_get_products_with_category():
    """
    בדיקה: קבלת מוצרים על פי קטגוריה מסוימת.
    """
    category = "Fruits"

    # שליחת בקשה לשירות עם קטגוריה
    response = requests.get(f"{BASE_URL}/get_products", params={"category": category})

    # בדיקת התגובה
    assert response.status_code == 200
    products = response.json()
    assert isinstance(products, list)  # בדיקה שהתגובה היא רשימה
    for product in products:
        assert product.get("category") == category  # בדיקה שהקטגוריה נכונה

def test_get_products_without_category():
    """
    בדיקה: קבלת כל המוצרים ללא ציון קטגוריה.
    """
    # שליחת בקשה לשירות ללא קטגוריה
    response = requests.get(f"{BASE_URL}/get_products")

    # בדיקת התגובה
    assert response.status_code == 200
    products = response.json()
    assert isinstance(products, list)  # בדיקה שהתגובה היא רשימה
    assert len(products) > 0  # בדיקה שיש מוצרים כלשהם במאגר
    for product in products:
        assert "name" in product  # בדיקה שלכל מוצר יש שם
        assert "category" in product  # בדיקה שלכל מוצר יש קטגוריה
        assert "price" in product  # בדיקה שלכל מוצר יש מחיר
