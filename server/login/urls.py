from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView

urlpatterns = [
    path("login", TokenObtainPairView.as_view(), name="login"),
    path("validate", TokenVerifyView.as_view(), name="verify"),
]
