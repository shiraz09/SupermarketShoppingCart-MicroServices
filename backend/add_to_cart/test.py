import unittest
from app import app

class AddToCartTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_add_to_cart(self):
        response = self.app.post('/add_to_cart', json={
            "user_id": "mock_user_id",
            "product_id": "mock_product_id",
            "quantity": 2
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("Product added to cart successfully!", response.get_data(as_text=True))

if __name__ == "__main__":
    unittest.main()
