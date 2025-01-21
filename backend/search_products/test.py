import unittest
from app import app

class SearchProductsTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_search_products(self):
        response = self.app.get('/search_products?query=Milk')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.get_json(), list)

if __name__ == "__main__":
    unittest.main()
