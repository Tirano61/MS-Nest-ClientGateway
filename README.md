
# Cliente Gateway

El gateway es el punto de comunicación entre nosotros y nuestros servicios.
Es el encargado de recibir las peticiones, enviadas a los servicios correspondientes y devolver la respuesta al cliente.

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basadi en el `env.template`
4. Levantar el servidor de NTAS

    ```Docker
    docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
    ```

5. Tener levantados los microservicios que se van a  consumir
6. Levantar el proyecto con `npm run start:dev`

## nats

docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
