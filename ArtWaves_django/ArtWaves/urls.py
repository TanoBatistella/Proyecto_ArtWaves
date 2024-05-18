from django.contrib import admin
from django.urls import path, include
from ArtWavesApp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', views.register),
    path('api/login/', views.user_login),
    path('api/redirect/', views.user_redirect),
    path('', views.home, name='home'), 
]