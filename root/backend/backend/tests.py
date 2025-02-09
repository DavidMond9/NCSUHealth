from django.test import TestCase, Client
from django.urls import reverse
import json

class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.register_url = reverse('register')  # Make sure these names match your urls.py
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')

    def test_register_login_logout(self):
        # Test Registration
        register_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post(
            self.register_url,
            data=json.dumps(register_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertIn('User registered successfully', response.json().get('message', ''))

        # Test Login
        login_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post(
            self.login_url,
            data=json.dumps(login_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn('Login successful', response.json().get('message', ''))

        # Test Logout
        response = self.client.post(self.logout_url, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Logout successful', response.json().get('message', ''))
