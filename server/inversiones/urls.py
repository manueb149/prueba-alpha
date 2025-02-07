from django.urls import path
from . import controller

urlpatterns = [
    path("calculo", controller.caculo_inversion, name="calculo_inversion"),
]
