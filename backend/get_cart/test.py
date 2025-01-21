import unittest
from app import app

class GetCartTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_cart(self):
        user_id = "mock_user_id"
        response = self.app.get(f'/get_cart/{user_id}')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.get_json(), list)

if __name__ == "__main__":
    unittest.main()
