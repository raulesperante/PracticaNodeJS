'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var app = require('./app');
var port = 3700;

// Forma general: mongodb://dominio:puerto/raiz
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(() =>{
        console.log("Conexion a la base de datos establecida con éxito");

        // Creación del servidor
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la url: localhost:3700")
        });

    })
    .catch(err => console.log(err));