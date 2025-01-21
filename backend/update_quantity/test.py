import unittest
from app import app

class UpdateQuantityTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_update_quantity(self):
        response = self.app.patch('/update_quantity', json={
            "user_id": "mock_user_id",
            "product_id": "mock_product_id",
            "quantity": 5
        })
        if response.status_code == 200:
            self.assertIn("Quantity updated successfully!", response.get_data(as_text=True))
        elif response.status_code == 404:
            self.assertIn("Product not found", response.get_data(as_text=True))
        elif response.status_code == 400:
            self.assertIn("Quantity cannot be negative", response.get_data(as_text=True))

if __name__ == "__main__":
    unittest.main()
