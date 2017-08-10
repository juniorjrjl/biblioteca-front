var dependencias = ['ngRoute', 'Biblioteca.usuario','Biblioteca.administrador'];

angular.module('Biblioteca', dependencias)
    .constant('URL_API','http://localhost:8080/').config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}])