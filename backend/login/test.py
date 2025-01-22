import unittest
from app import app

class LoginTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_login_user_success(self):
        response = self.app.post('/login', json={
            "username": "test_user",
            "password": "test_password"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("Login successful", response.get_data(as_text=True))

    def test_login_user_invalid_credentials(self):
        response = self.app.post('/login', json={
            "username": "wrong_user",
            "password": "wrong_password"
        })
        self.assertEqual(response.status_code, 401)
        self.assertIn("Invalid username or password", response.get_data(as_text=True))

if __name__ == "__main__":
    unittest.main()
