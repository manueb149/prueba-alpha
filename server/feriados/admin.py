from django.contrib import admin
from .models import Feriado


@admin.register(Feriado)
class FeriadoAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "fecha", "fecha_creacion")
