import unittest
from app import app

class CheckoutTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_checkout(self):
        response = self.app.post('/checkout', json={
            "user_id": "mock_user_id"
        })
        if response.status_code == 200:
            self.assertIn("Checkout successful!", response.get_data(as_text=True))
        elif response.status_code == 400:
            self.assertIn("Cart is empty", response.get_data(as_text=True))

if __name__ == "__main__":
    unittest.main()
