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

var fs = require('fs');

// Para trabajar con archivos importo esta dependencia
// se utiliza en uploadImage
var multipart = require('connect-multiparty');
// Defino dónde se guardarán las imágenes
var multipartMiddleware = multipart({uploadDir: './uploads'});
// Este middleware hay que aplicarlo a una ruta para que se ejecute antes 
// que el controlador


function createDir(){
    var permissions = parseInt('0777', 8);
    if(!fs.existsSync('./uploads')){
        fs.mkdirSync('./uploads', permissions, function(err){
            if(err){
                console.log(err);
                return response.send({
                    message: "Error! Can't make the directory! \n"
                });
            }
        });
    }else{
        console.log("El directorio existe");
    }
}


// Creo las rutas
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
// Parámetro obligatorio '/project/:id'
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
// Le pasé el middleware como tercer parámetro
// de esta forma, ya tendré disponible la propiedad files
router.post('/upload-image/:id',function(req, res, next){
    createDir();
    next();
}, multipartMiddleware, ProjectController.uploadImage);


module.exports = router;
