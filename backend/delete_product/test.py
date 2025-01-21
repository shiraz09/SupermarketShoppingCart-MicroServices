import unittest
from app import app

class DeleteProductTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_delete_product(self):
        # Use an existing product ID or mock it for the test
        product_id = "mocked_product_id"
        response = self.app.delete(f'/delete_product/{product_id}')
        if response.status_code == 200:
            self.assertIn("Product deleted successfully!", response.get_data(as_text=True))
        elif response.status_code == 404:
            self.assertIn("Product not found", response.get_data(as_text=True))

if __name__ == "__main__":
    unittest.main()
