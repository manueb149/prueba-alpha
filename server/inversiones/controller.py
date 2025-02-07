from rest_framework.decorators import api_view
from rest_framework.response import Response
from feriados.models import Feriado
from productos.models import Producto
from .utils.calculadora import CaculadoraFecha


# Endpoint para obtener él calculo de las fechas de inversión
@api_view(["POST"])
def caculo_inversion(request):
    try:
        productos = list(Producto.objects.all())
        feriados = list(Feriado.objects.all())
        fecha_feriados = list(map(lambda x: x.fecha, feriados))

        producto_check = lambda x: int(x.pk) == int(request.data["producto"])
        producto_valido = len(list(filter(producto_check, productos))) == 1
        if not producto_valido:
            return Response({"message": "El producto no se encuentra registrado."}, 400)

        calculo_fecha = CaculadoraFecha(
            request.data["fechaCreacion"],
            request.data["enReinversion"],
            request.data["plazo"],
            fecha_feriados,
        )
        result = {
            "producto": request.data["producto"],
            "plazo": request.data["plazo"],
            "fechaInicio": calculo_fecha.fecha_inicio_str,
            "fechaFin": calculo_fecha.fecha_fin_str,
            "plazoReal": calculo_fecha.plazo_real,
        }
        return Response(result)
    except Exception as e:
        return Response(
            {"message": "Error calculando la fecha de la inversión", "error": e.args},
            status=500,
        )
