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
            return JsonResponse({f'error {username} {email} {password}': 'All fields (username, email, password)  are required'}, status=400)

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
        # Debug print
        print("Login endpoint called!")
        
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        # Debug prints
        print(f"username: {username}, password: {password}")

        # Check if user exists and password matches
        user = User.objects(username=username).first()
        if user and user.password == password:  # Note: In production, use proper password hashing
            # Return user data instead of setting session
            return JsonResponse({
                'message': 'Login successful',
                'username': username,
                'email': user.email
            })
        return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        # Clear the session
        request.session.flush()
        return JsonResponse({'message': 'Logged out successfully'}, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def update_profile_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')

        if not username:
            return JsonResponse({'error': 'Username is required'}, status=400)

        user = User.objects(username=username).first()
        if user:
            # Update user fields
            user.modify(
                set__name=data.get('name'),
                set__gender=data.get('gender'),
                set__birth_date=data.get('birthDate'),
                set__height=data.get('height'),
                set__weight=data.get('weight'),
                set__goal=data.get('goal'),
                set__timeframe=data.get('timeframe'),
                set__activity_level=data.get('activityLevel'),
                set__macros=data.get('macros', {
                    'protein': 30,
                    'carbs': 50,
                    'fats': 20
                }),
                set__daily_calories=data.get('daily_calories', 2000),
                set__daily_water=data.get('daily_water', 8)
            )
            
            # Return updated user data
            return JsonResponse({
                'name': user.name,
                'gender': user.gender,
                'birthDate': user.birth_date,
                'height': user.height,
                'weight': user.weight,
                'goal': user.goal,
                'timeframe': user.timeframe,
                'activityLevel': user.activity_level,
                'macros': user.macros,
                'daily_calories': user.daily_calories,
                'daily_water': user.daily_water
            }, status=200)
            
        return JsonResponse({'error': 'User not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def get_profile(request, username):
    try:
        user = User.objects.get(username=username)
        return JsonResponse({
            'name': user.name,
            'gender': user.gender,
            'birthDate': user.birth_date,
            'height': user.height,
            'weight': user.weight,
            'goal': user.goal,
            'timeframe': user.timeframe,
            'activityLevel': user.activity_level,
            'macros': user.macros,
            'daily_calories': user.daily_calories,
            'daily_water': user.daily_water
        })
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)