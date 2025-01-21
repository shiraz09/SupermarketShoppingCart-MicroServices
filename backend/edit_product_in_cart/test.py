import unittest
from app import app

class EditProductInCartTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_edit_product_in_cart(self):
        response = self.app.put('/edit_product_in_cart', json={
            "user_id": "mock_user_id",
            "product_id": "mock_product_id",
            "name": "Updated Product",
            "price": 10.99
        })
        if response.status_code == 200:
            self.assertIn("Product updated successfully!", response.get_data(as_text=True))
        elif response.status_code == 404:
            self.assertIn("Product not found", response.get_data(as_text=True))

if __name__ == "__main__":
    unittest.main()
