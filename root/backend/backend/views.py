from django.contrib.auth import authenticate, login, logout
from .models.user import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        # Debug print to confirm your endpoint is called
        print("Register endpoint called!")

        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Debug prints
        print(f"username: {username}, email: {email}, password: {password}")

        if not username or not email or not password:
            return JsonResponse({'error': 'All fields (username, email, password) are required'}, status=400)

        # Check if username already exists
        if User.objects(username=username).first():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        # Check if email already exists
        if User.objects(email=email).first():
            return JsonResponse({'error': 'Email already in use'}, status=400)

        # Create new user in MongoDB
        new_user = User(username=username, email=email, password=password)
        new_user.save()

        return JsonResponse({'message': 'User registered successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logout successful'})
    return JsonResponse({'error': 'Invalid request method'}, status=405)