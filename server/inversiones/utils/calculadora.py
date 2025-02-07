from datetime import time, date, datetime, timedelta


class CaculadoraFecha:
    __horario_operativo_max = time(hour=10, minute=30, second=0, microsecond=0)
    __horario_operativo_min = time(hour=0, minute=0, second=0, microsecond=0)

    def __init__(
        self, fecha_creacion: str, reinversion: bool, plazo: int, feriados: list
    ):
        try:
            self.fecha_creacion = datetime.strptime(fecha_creacion, "%Y-%m-%d %H:%M:%S")
            self.fecha = date.fromisoformat(fecha_creacion.split(" ")[0])
            self.tiempo = time.fromisoformat(fecha_creacion.split(" ")[1])
            self.plazo = plazo
            self.es_reinversion = reinversion
            self.feriados = feriados
            self.fecha_inicio = self.__fecha_inicio
            self.fecha_fin = self.__fecha_fin
        except:
            raise Exception("Formato de fecha incorrecto.")

    @property
    def fecha_inicio_str(self):
        return self.fecha_inicio.strftime("%Y-%m-%d %H:%M:%S")

    @property
    def fecha_fin_str(self):
        return self.fecha_fin.strftime("%Y-%m-%d %H:%M:%S")

    @property
    def __fecha_inicio(self):
        # sumar días en función de horario operativo
        nueva_fecha = self.fecha_creacion + self.__dias_a_sumar

        es_laborable = self.__es_laborable(nueva_fecha)
        es_feriado = self.__es_feriado(nueva_fecha)

        # revisar si la nueva fecha es no es laborable, de no serlo, la movemos a un lunes
        if not es_laborable or es_feriado:
            nueva_fecha = self.__mover_a_dia_laborable(
                es_laborable, es_feriado, nueva_fecha
            )

        # cambiar el tiempo a 00:00:00
        nueva_fecha = datetime.strftime(nueva_fecha, "%Y-%m-%d 00:00:00")
        nueva_fecha = datetime.strptime(nueva_fecha, "%Y-%m-%d %H:%M:%S")
        return nueva_fecha

    @property
    def __fecha_fin(self):
        # sumar días en función del plazo
        nueva_fecha = self.fecha_inicio + timedelta(days=self.plazo)

        es_laborable = self.__es_laborable(nueva_fecha)
        es_feriado = self.__es_feriado(nueva_fecha)

        # revisar si la nueva fecha es no es laborable, de no serlo, la movemos a un lunes
        if not es_laborable or es_feriado:
            nueva_fecha = self.__mover_a_dia_laborable(
                es_laborable, es_feriado, nueva_fecha
            )

        # cambiar el tiempo a 00:00:00
        nueva_fecha = datetime.strftime(nueva_fecha, "%Y-%m-%d 00:00:00")
        nueva_fecha = datetime.strptime(nueva_fecha, "%Y-%m-%d %H:%M:%S")
        return nueva_fecha

    @property
    def plazo_real(self):
        return (self.fecha_fin - self.fecha_inicio).days

    @property
    def __dias_a_sumar(self):
        """
        Días a sumar a la hora de creación de la inversión
        """
        # es menor o igual a la hora operativa
        if self.__en_horarario_operativo and not self.es_reinversion:
            return timedelta(days=2)
        # mayor a la hora operativa
        elif not self.__en_horarario_operativo and not self.es_reinversion:
            return timedelta(days=3)
        # menor o igual a la hora operativa y es una reinversión
        elif self.__en_horarario_operativo and self.es_reinversion:
            return timedelta(days=1)
        # mayor a la hora operativa y es una reinversión
        elif not self.__en_horarario_operativo and self.es_reinversion:
            return timedelta(days=2)
        else:
            return timedelta(days=0)

    @property
    def __en_horarario_operativo(self):
        """
        Determina si la fecha de creación está dentro del horario operativo
        """
        return (
            self.__horario_operativo_min <= self.tiempo
            and self.tiempo <= self.__horario_operativo_max
        )

    def __es_laborable(self, fecha: datetime):
        return fecha.isoweekday() < 6

    def __es_feriado(self, fecha: datetime):
        """
        Compara la fecha proporcionada con un listado de días feriados
        """
        check_feriado = lambda x: x.month == fecha.month and x.day == fecha.day
        try:
            return len(list(filter(check_feriado, self.feriados))) > 0
        except:
            raise Exception("Error al comparar los días feriados.")

    def __mover_a_dia_laborable(self, es_laborable, es_feriado, nueva_fecha):
        while not es_laborable or es_feriado:
            nueva_fecha += timedelta(days=1)
            es_laborable = self.__es_laborable(nueva_fecha)
            es_feriado = self.__es_feriado(nueva_fecha)
        return nueva_fecha
