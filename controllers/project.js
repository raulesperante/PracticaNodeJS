'use strict'

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
    }


};

module.exports = controller;