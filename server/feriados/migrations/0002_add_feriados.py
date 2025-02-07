from django.db import migrations
from datetime import date


def insertar_feriados(apps, schema_editor):
    Feriado = apps.get_model("feriados", "Feriado")

    if len(list(Feriado.objects.all())) > 0:
        return

    feriados = [
        ("Día de los Santos Reyes", "2025-01-06"),
        ("Natalicio de Juan Pablo Duarte", "2025-01-26"),
        ("Día de la Independencia Nacional", "2025-02-27"),
        ("Día de Nuestra Señora de la Altagracia", "2025-01-21"),
        ("Viernes Santo", "2025-04-18"),
        ("Día del Trabajo", "2025-05-01"),
        ("Corpus Christi", "2025-06-19"),
        ("Día de la Restauración", "2025-08-16"),
        ("Día de Nuestra Señora de las Mercedes", "2025-09-24"),
        ("Día de la Constitución", "2025-11-06"),
        ("Día de Navidad", "2025-12-25"),
        ("Año Nuevo", "2025-01-01"),
    ]

    for nombre, fecha in feriados:
        Feriado.objects.create(nombre=nombre, fecha=date.fromisoformat(fecha))


class Migration(migrations.Migration):

    dependencies = [
        ("feriados", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(insertar_feriados),
    ]
