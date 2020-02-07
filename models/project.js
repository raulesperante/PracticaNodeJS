'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    descripcion: String,
    categoria: String,
    year: Number,
    langs: String,
    image: String
});

// Parámetros tipo de entidad a guardar en db y Esquema
// Mongoose por detrás toma el nombre 'Project', lo pasa a 
// minúsculas y le pone una 's' al final
module.exports = mongoose.model('Project', ProjectSchema);