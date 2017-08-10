var dependencias = [];
angular.module('Biblioteca.administrador',dependencias)
    .config(function($routeProvider){

        $routeProvider
            .when('/livros/cadastro', {
                controller: 'ComentarioController',
                templateUrl: 'modulos/administrador/cadastroLivros/view.html'
            })
            .when('/opnioes/listagem', {
                controller: 'opiniaoController',
                templateUrl: 'modulos/administrador/listaOpcoes/view.html'
            });
    });