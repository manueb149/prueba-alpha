# Prueba técnica para desarrollador Fullstack Python - Alpha Inversiones

### Autor

Manuel Bencosme

### Descripción

Calculadora de fechas de inversión, Puesto de Bolsa. API para calcular las fechas
de inicio y fin de una inversión para un producto financiero[^nota].

---

### Pasos para correr el projecto

1. Descargar el repositorio de git

    ```bash
    git clone https://github.com/manueb149/prueba-alpha.git --config core.autocrlf=input
    ```

2. Acceder a la carpeta descargada

    ```bash
    cd prueba-alpha
    ```

3. Ejecutar el comando de docker compose para crear los servicios

    ```bash
    docker-compose up -d
    ```

4. Ejecutar el siguente comando para crear el admin user.

    ```bash
    docker-compose exec alpha-django-api python manage.py createsuperuser --noinput
    ```

### Credenciales para portal web y admin panel

| Usuario | Clave |
| ------- | :---: |
| admin   | admin |

### Enlaces para portal web y admin panel

| Portal       |             URL             |
| ------------ | :-------------------------: |
| Web app      |   http://localhost:3000/    |
| Django Admin | http://localhost:8000/admin |

### Diagrama de arquitectura de alto nivel

![HLA](https://github.com/manueb149/prueba-alpha/blob/main/hla.png)

### Api Collection (Postman)

En el archivo `apis.json`

[^nota]: Este projecto esta concebido solo como prueba, por lo que todos los ambientes, usuarios y credenciales son meramente de desarrollo.
