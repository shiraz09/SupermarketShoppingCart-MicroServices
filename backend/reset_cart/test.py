import unittest
from app import app

class ResetCartTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_reset_cart(self):
        response = self.app.post('/reset_cart', json={"user_id": "mock_user_id"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("Cart reset successfully!", response.get_data(as_text=True))

if __name__ == "__main__":
    unittest.main()
