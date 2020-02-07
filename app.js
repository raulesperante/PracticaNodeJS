// Aquí va toda la configuración de express

'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar archivos de rutas
var project_routes = require('./routes/project');

// Middlewares
// Body parser convierte cualquier input en json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// CORS
// Configurar cabeceras y cors
// Este middleware siempre se va a ejecutar antes de cada petición
app.use((req, res, next) => {
    // Ya en producción no irá '*', todo, sino que irán solo los 
    // origenes permitidos
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    // Luego de configurar las cabeceras, con el método next
    // se continúa con la acción que fue requerida
    next();
});


// RUTAS
// /api, es para sobreescribir la url, para el middleware
// Las url serán del tipo /api/home
// Si no queremos sobreescribir nada: app.use('/', project_routes);
app.use('/api', project_routes);

// exportar
module.exports = app;


/*
// Rutas Ejemplo
app.get('/', (request, response) => {
    response.status(200).send("<h1>Página de inicio</h1>");
});

app.get('/test', (request, response) => {
    response.status(200).send({
        message: "Hola Mundo desde mi api de NodeJs"
    });
})

app.post('/test1', (request, response) => {
    console.log(request.param('nombre'));
    response.status(200).send({
        message: "Hola Mundo desde mi api de NodeJs"
    });
})
*/