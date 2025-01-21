import unittest
from app import app

class AddProductTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_add_product(self):
        response = self.app.post('/add_product', json={
            "name": "Milk",
            "category": "Dairy",
            "price": 5.5,
            "description": "1L of Milk"
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn("Product added successfully!", response.get_data(as_text=True))

if __name__ == "__main__":
    unittest.main()
