# Prueba Backend Merqueo

Para ejecutar el proyecto es necesario tener instalado docker y correr los siguientes comandos

```bash
docker-compose build
docker-compose up
docker-compose start
```

Para ejecutar el proyecto sin necesidad de docker es necesario tener Instalado NodeJS, npm y el framework AdonisJS, posteriormente ejecutar el comando

```js
adonis serve --dev
```

El proyecto automaticamente estará desplegado y expuesto en el puerto 8080, dentro de este repositorio se encuentra la colección postman para ejecutar los diferentes servicios con el nombre PostmanCollection.json