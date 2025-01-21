import unittest
import os
from app import app

class VoiceSearchTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_voice_search(self):
        # הכנת קובץ קול לדוגמה לבדיקה
        audio_file_path = "test_audio.wav"
        if not os.path.exists(audio_file_path):
            self.skipTest("Audio file for test not found")

        with open(audio_file_path, "rb") as audio_file:
            response = self.app.post('/voice_search', content_type='multipart/form-data', data={
                'audio_file': audio_file
            })
        
        self.assertEqual(response.status_code, 200)
        self.assertIn("query", response.get_json())
        self.assertIn("results", response.get_json())

if __name__ == "__main__":
    unittest.main()
