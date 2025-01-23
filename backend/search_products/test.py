import requests

BASE_URL = "http://localhost:4009"

def test_search_products_by_category():
    """
    בדיקה: חיפוש מוצרים לפי קטגוריה מסוימת.
    """
    query = "Fruits"  # קטגוריה לחיפוש
    response = requests.get(f"{BASE_URL}/search_products", params={"query": query})

    # בדיקת התגובה
    assert response.status_code == 200
    products = response.json()
    assert isinstance(products, list)  # התוצאה צריכה להיות רשימה
    for product in products:
        assert product.get("category") == query  # בדיקה שהקטגוריה תואמת

def test_search_products_no_query():
    """
    בדיקה: החזרת כל המוצרים כאשר אין קטגוריה שסופקה.
    """
    response = requests.get(f"{BASE_URL}/search_products")

    # בדיקת התגובה
    assert response.status_code == 200
    products = response.json()
    assert isinstance(products, list)  # התוצאה צריכה להיות רשימה
    assert len(products) > 0  # וידוא שיש מוצרים כלשהם במאגר
    for product in products:
        assert "name" in product  # בדיקת נוכחות שדה שם
        assert "category" in product  # בדיקת נוכחות שדה קטגוריה
        assert "price" in product  # בדיקת נוכחות שדה מחיר
