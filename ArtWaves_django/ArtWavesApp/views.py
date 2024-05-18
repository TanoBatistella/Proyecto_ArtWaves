from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt  
import json
from .models import CustomUser
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.shortcuts import render

@csrf_exempt
def user_redirect(request):
    # Es para redirigir al usuario a la página de inicio de sesión si no está autenticado
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'No está autenticado.'}, status=401)
    return HttpResponse(status=200)



@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            full_name = data.get('full_name')
            email = data.get('email')
            password = data.get('password')

            if not (full_name and email and password):
                return JsonResponse({'error': 'Por favor, complete todos los campos del formulario.'}, status=400)

            if CustomUser.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Ya existe un usuario con este correo electrónico.'}, status=400)

            user = CustomUser.objects.create_user(email=email, password=password, full_name=full_name)
            user.save()

            # Es para imprimir los datos de la cuenta nueva en la terminal.
            print(f"Nueva cuenta creada: {user.email}, {user.full_name}, {user.is_staff}, {user.is_active}")

            return JsonResponse({'message': 'Registro exitoso.'})
        except Exception as e:
            print("Error:", e)
            return JsonResponse({'error': 'Error interno del servidor.'}, status=500)
    else:
        return JsonResponse({'error': 'Método no permitido.'}, status=405)


@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return JsonResponse({'error': 'Credenciales inválidas.'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido.'}, status=405)

# Es para redirigir al usuario al inicio después de iniciar sesión 
@csrf_exempt
def user_redirect(request):
    if request.user.is_authenticated:
        # Respuesta correcta de HTTP
        return HttpResponse(status=200)
    else:
        return JsonResponse({'error': 'No está autenticado.'}, status=401)
    

    
def home(request):
    return render(request, 'home.html')