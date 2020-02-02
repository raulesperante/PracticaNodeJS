// Aquí va toda la configuración de express

'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar archivos de rutas


// Middlewares
// Body parser convierte cualquier input en json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// RUTAS
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


// exportar
module.exports = app;
