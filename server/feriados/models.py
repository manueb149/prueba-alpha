from django.db import models


class Feriado(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    fecha = models.DateField("Fecha feriado", unique=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre
