from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Feriado
from .serializer import FeriadosSerializer


# Endpoint para obtener un listado de días feriados
@api_view(["GET"])
def index(_):
    try:
        items = Feriado.objects.all()
        serialized = FeriadosSerializer(items, many=True)
        return Response(serialized.data)
    except:
        return Response({"message": "Error obteniendo los dias feridos"}, status=500)
