var dependencias = [];
angular.module('Biblioteca.usuario',  dependencias)
    .config(function($routeProvider){

        $routeProvider
            .when('/', {
                controller: 'ComentarioController',
                templateUrl: 'modulos/usuarios/comentarios/view.html'
            })
            .otherwise({
                redirectTo : '/usuario/comentarios'
            });
    });