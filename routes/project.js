/*
 * Fichero de configuración de las rutas del controlador projects
 *
 */

 'use strict'

// Cargar Express
 var express = require('express');
// Cargar mi controllador
var ProjectController = require('../controllers/project');

var router = express.Router();

// Creo las rutas
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);

module.exports = router;
