<h1>Get started</h1>

Requisitos:
Tener instalado MongoDb, Robo3T, NodeJs

Crear una base de datos de nombre: portafolio
Crear colección de nombre: projects
Importar los datos a la base que está en db_mongo.json

Correr MongoDaemon
Con la terminal, en el directorio del proyecto ejecutar:
npm start
Cargará el servidor en localhost:3700

La idea de este backend es que sea consumido por un frontend que representa una web tipo porfolio de un desarrollador.
La entidad aquí es project, que representa un proyecto realizado por el desarrollador. Esta entidad tienen un nombre del projecto, un año y una imagen entre otros atributos. Más información en models

Usar un cliente api-rest para consumir el backend
Uso de la API

<h2>GET</h2> 
Ejemplos
localhost:3700/home
Forma general: localhost:3700/project/id
localhost:3700/project/5e362d03ae2b9bb43e2ba89e

Traer todos los proyectos:
localhost:3700/projects/

<h2>PUT</h2>
localhost:3700/project/id

<h2>POST</h2>
Añadir una imagen a un proyecto, documento existente
localhost:3700/upload-image/id

<h2>DELETE</h2>
Eliminar un proyecto existente
localhost:3700/project/id


