angular.module('Biblioteca.administrador').factory('opiniaoService', function ($http, URL_API) {

    var selecionar = function () {
        return $http.get(URL_API + 'opinioes/Selecionar');
    };

    return{
        selecionar : selecionar
    }

});