from django.db import migrations


def insertar_productos(apps, schema_editor):
    Producto = apps.get_model("productos", "Producto")

    if len(list(Producto.objects.all())) > 0:
        return

    productos = [
        ("Certificado 1"),
        ("Certificado 2"),
    ]

    for nombre in productos:
        Producto.objects.create(nombre=nombre)


class Migration(migrations.Migration):

    dependencies = [
        ("productos", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(insertar_productos),
    ]
