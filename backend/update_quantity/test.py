import requests
import responses

BASE_URL = "http://localhost:4011"

@responses.activate
def test_update_quantity_success():
    """
    בדיקה: עדכון כמות של מוצר בעגלה בהצלחה.
    """
    # מגדירים את התשובה המזויפת של השירות
    responses.add(
        responses.PATCH,
        f"{BASE_URL}/update_quantity",
        json={"message": "Quantity updated successfully!"},
        status=200,
    )

    payload = {
        "username": "moran",
        "product_name": "Apple",
        "quantity": 5
    }

    response = requests.patch(f"{BASE_URL}/update_quantity", json=payload)
    assert response.status_code == 200
    assert response.json()["message"] == "Quantity updated successfully!"

@responses.activate
def test_update_quantity_missing_fields():
    """
    בדיקה: ניסיון לעדכן כמות עם שדות חסרים ומוודא שגיאה.
    """
    # מגדירים את התשובה המזויפת של השירות
    responses.add(
        responses.PATCH,
        f"{BASE_URL}/update_quantity",
        json={"error": "Missing required fields: username, product_name, or quantity"},
        status=400,
    )

    payload = {
        "username": "moran",
        # חסר product_name וכמות
    }

    response = requests.patch(f"{BASE_URL}/update_quantity", json=payload)
    assert response.status_code == 400
    assert response.json()["error"] == "Missing required fields: username, product_name, or quantity"

if __name__ == "__main__":
    # הפעלת הטסטים ישירות להרצה ידנית
    test_update_quantity_success()
    test_update_quantity_missing_fields()
    print("All tests passed!")
