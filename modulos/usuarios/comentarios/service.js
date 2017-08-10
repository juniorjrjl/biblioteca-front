angular.module('Biblioteca.usuario').factory('usuarioService', function ($http, URL_API) {

    var Cadastrar = function (usuario) {
        return $http.post(URL_API + 'usuarios/iniciarAvaliacao', usuario)
    };

    var enviarOpiniao = function (opiniao) {
        return $http.post(URL_API + 'opinioes/enviar', opiniao)
    };

    return{
        Cadastrar:Cadastrar,
        enviarOpiniao:enviarOpiniao
    }

});