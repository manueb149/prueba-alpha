from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import ProductosSerialier
from .models import Producto


# Endpoint para obtener un listado de los productos disponibles
@api_view(["GET"])
def index(_):
    try:
        items = Producto.objects.all()
        serialized = ProductosSerialier(items, many=True)
        return Response(serialized.data)
    except Exception as e:
        return Response(
            {"message": "Error obteniendo los productos", "error": e.args}, status=500
        )
