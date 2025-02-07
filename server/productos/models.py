from django.db import models


class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre
