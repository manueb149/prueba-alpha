from rest_framework import serializers
from .models import Feriado


class FeriadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feriado
        fields = "__all__"
