'use strict'

// Importar modelo
var Project = require('../models/project');
// Para borrar archivo
var fs = require('fs');

// Crear propiedades por cada método
var controller = {
    home: function(request, response){
        return response.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function(request, response){
        return response.status(200).send({
            message: "Soy el método test"
        });
    },

    saveProject: function(request, response){
        var project = new Project();

        //Recorger parametros del post
        var params = request.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        //Guardar en db
        project.save((err, projectStored) => {
            if(err) return response.status(500).send({
                message: "Error al guardar"
            });
            if(!projectStored) return response.status(404).send({
                message: "No se ha podido guardar el proyecto"
            });
            return response.status(200).send({project: projectStored});
        });

        /*
        return response.status(200).send({
            params: project,
            message: "Metodo saveProject"
        });
        */
    },

    getProject: function(request, response){
        var projectId = request.params.id;

        if(projectId == null) return response.status(404).send({
            message: "El proyecto no existe"
        });

        // Método de moogose
        Project.findById(projectId, (err, project) =>{
            if(err) return response.status(500).send({
                message: "Error al devolver los datos"
            });
            if(!project) return response.status(404).send({
                message: "El proyecto no existe"
            });
            return response.status(200).send({
                project
            });
        });
    },

    // Listar todos los proyectos
    getProjects: function(request, response){
        // es como un where para 2019 Project.find({year: 2019})
        Project.find({}).exec((err, projects) =>{
            if(err) return response.status(500).send({
                message: "Error al devolver los datos"
            });
            if(!projects) return response.status(404).send({
                message: "No hay proyectos para mostrar"
            });

            return response.status(200).send({
                projects
            });
        })
    },

    updateProject: function(request, response){
        var projectId = request.params.id;
        var update = request.body;
        // El parámetro opcional new:true, devuelve el objeto actualizado
        Project.findByIdAndUpdate(projectId, update, {new:true},
            (err, projectUpdated) => {
                if(err) return response.status(500).send({
                    message: "Error al actualizar"
                });
                if(!projectUpdated) return response.status(404).send({
                    message: "No exite el proyecto para actualizar"
                });
                return response.status(200).send({
                    project: projectUpdated
                });
            });
    },

    deleteProject: function(request, response){
        var projectId = request.params.id;

        Project.findByIdAndDelete(projectId, (err, projectRemoved) =>
        {
            if(err) return response.status(500).send({
                message: "No se ha podido borrar el proyecto"
            });
            if(!projectRemoved) return response.status(404).send({
                message: "No se puede eliminar ese proyecto"
            });
            return response.status(200).send({
                project: projectRemoved
            });
        })
    },

    uploadImage: function(request, response){
        var projectId = request.params.id;
        var fileName = 'Imagen no subida...';
        var permissions = parseInt('0777', 8);

        // si hay archivos subidos
        if(request.files){
            var filePath = request.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' ||
               fileExt == 'gif'){
                // Guardar en la db
                Project.findByIdAndUpdate(projectId, {image: fileName},
                     {new: true}, (err, projectUpdated) => {
                    if(err) return response.status(500).send({
                        message: 'La imagen no se ha subido'
                    });
                    if(!projectUpdated) return response.status(404).send({
                        message: 'El proyecto no existe'
                    });
                    return response.status(200).send({
                        project: projectUpdated
                    });

                    });
                    /*
                    return response.status(200).send({
                        files: fileName
                    });
                    */
               }else{
                   // borrar el archivo
                   fs.unlink(filePath, (err) => {
                       return response.status(200).send({
                           message: 'La extensión no es válida'
                       });
                   })
               }

        }else{
            return response.status(200).send({
                message: fileName
            });
        }
    },


}


module.exports = controller;