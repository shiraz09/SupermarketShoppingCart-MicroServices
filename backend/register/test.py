import unittest
from app import app

class RegisterTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_register_user(self):
        response = self.app.post('/register', json={
            "username": "test_user",
            "password": "test_password"
        })
        if response.status_code == 201:
            self.assertIn("User registered successfully!", response.get_data(as_text=True))
        elif response.status_code == 409:
            self.assertIn("Username already exists", response.get_data(as_text=True))

if __name__ == "__main__":
    unittest.main()
