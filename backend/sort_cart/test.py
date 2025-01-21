import unittest
from app import app

class SortCartTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_sort_cart(self):
        response = self.app.post('/sort_cart', json={
            "user_id": "mock_user_id",
            "sort_by": "price",
            "order": "asc"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.get_json(), list)

if __name__ == "__main__":
    unittest.main()
