angular.module('Biblioteca.administrador').factory('livroService', function ($http, URL_API) {

    var Cadastrar = function (livro) {
        return $http.post(URL_API + 'livros/cadastrar', livro);
    };

    var Selecionar = function () {
        return $http.get(URL_API + 'livros/Selecionar');
    };

    var Atualizar = function (livro) {
        return $http.put(URL_API + 'livros/atualizar', livro);
    };

    Excluir = function (livroId) {
        return $http.delete(URL_API + 'livros/excluir/' + livroId);
    };
    
    return{
        Cadastrar:Cadastrar,
        Atualizar:Atualizar,
        Excluir:Excluir,
        Selecionar:Selecionar
    }

});