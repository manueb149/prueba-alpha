from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("login.urls")),
    path("api/productos/", include("productos.urls")),
    path("api/inversiones/", include("inversiones.urls")),
    path("api/feriados/", include("feriados.urls")),
]
