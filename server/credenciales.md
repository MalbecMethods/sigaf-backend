# Siga los siguientes pasos para usar el servidor
## Crea un entorno
    python -m venv env

## Ingresa al entorno
     ./env/Scripts/activate       
     p 
## Instala  las dependencias
    pip install -r requierements.txt

## Crea las tablas necesesarias para ejecutar django
    python manage.py makemigrations 
    python manage.py migrate    

## Crea un superusuario para utilizar el panel de admin
    python manage.py createsuperuser 

## Coloca un usuario y contraseña como este(Todo es segun tu preferencia, incluido el email.)
    username: admin
    contraseña: Contraseña1

## Ejecuta el servidor 
    python manage.py runserver

## Esto te dara un link a la ruta del servidor
- Si quieres acceder al panel del admin debes utilizar la ruta "/admin" ej: localhost:8080/admin

