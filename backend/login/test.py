import unittest
from app import app

class LoginTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_login_user(self):
        response = self.app.post('/login', json={
            "username": "test_user",
            "password": "test_password"
        })
        if response.status_code == 200:
            self.assertIn("token", response.get_json())
        elif response.status_code == 401:
            self.assertIn("Invalid username or password", response.get_data(as_text=True))

if __name__ == "__main__":
    unittest.main()
