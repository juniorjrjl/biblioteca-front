angular.module('Biblioteca.administrador').controller('ComentarioController', function ($scope, $filter, livroService) {

    $scope.livros = [];
    $scope.livroEdicao = {};
    $scope.livro = {};
    $scope.atualizacao = false;
    var indice;

    var AdicionarCSS = function (elementos, CSS){
        for (var i = 0; i < elementos.length; i ++){
            elementos[i].addClass(CSS[i]);
        }
    };

    var RemoverCSS = function (elementos, CSS){
        for (var i = 0; i < elementos.length; i ++){
            elementos[i].removeClass(CSS[i]);
        }
    };

    $scope.carregarListagem = function () {
        Listar();
    };

    var Listar = function () {
        livroService.Selecionar().then(function (resultado) {
            $scope.livros = resultado.data;
        });
    };

    $scope.cadastrar = function (livro) {
        livroService.Cadastrar(livro)
            .then(function (resultado) {
                $scope.livros.push(resultado.data);
                $scope.livro = {};
                $scope.livros = $filter('orderBy')($scope.livros, 'nome');
        });
    };

    var Localizar = function (livroCodigo){
        var indice = -1;
        var linhas = eval($scope.livros);
        for (var i = 0; i < linhas.length; i++) {
            if (linhas[i]._id === livroCodigo) {
                indice = i;
                break;
            }
        }
        return indice;
    };

    $scope.Atualizar = function (livroId) {
        elementosExibir = [];
        elementosOcultar = [];
        CSS = ["ocultar", "ocultar", "ocultar"];
        elementosExibir.push(angular.element(document.getElementById("lblNome" + livroId)));
        elementosExibir.push(angular.element(document.getElementById("operacoes" + livroId)));
        elementosOcultar.push(angular.element(document.getElementById("txtNome" + livroId)));
        elementosOcultar.push(angular.element(document.getElementById("edicao" + livroId)));
        AdicionarCSS(elementosExibir, CSS);
        RemoverCSS(elementosOcultar, CSS);
        indice = Localizar(livroId);
        angular.copy($scope.livros[indice], $scope.livroEdicao);
        $scope.atualizacao = true;
    };

    $scope.ConfirmarAtualizacao = function (livroId) {
        elementosExibir = [];
        elementosOcultar = [];
        CSS = ["ocultar", "ocultar", "ocultar"];
        elementosOcultar.push(angular.element(document.getElementById("lblNome" + livroId)));
        elementosOcultar.push(angular.element(document.getElementById("operacoes" + livroId)));
        elementosExibir.push(angular.element(document.getElementById("txtNome" + livroId)));
        elementosExibir.push(angular.element(document.getElementById("edicao" + livroId)));
        AdicionarCSS(elementosExibir, CSS);
        RemoverCSS(elementosOcultar, CSS);
        livroService.Atualizar($scope.livroEdicao)
            .then(function (resultado) {
                $scope.livroEdicao = {};
                $scope.livros = $filter('orderBy')($scope.livros, 'nome');
            });
        $scope.atualizacao = false;
    };

    $scope.CancelarAtualizacao = function (livroId) {
        elementosExibir = [];
        elementosOcultar = [];
        CSS = ["ocultar", "ocultar", "ocultar"];
        elementosOcultar.push(angular.element(document.getElementById("lblNome" + livroId.toString())));
        elementosOcultar.push(angular.element(document.getElementById("operacoes" + livroId.toString())));
        elementosExibir.push(angular.element(document.getElementById("txtNome" + livroId.toString())));
        elementosExibir.push(angular.element(document.getElementById("edicao" + livroId.toString())));
        AdicionarCSS(elementosExibir, CSS);
        RemoverCSS(elementosOcultar, CSS);
        angular.copy($scope.livroEdicao, $scope.livros[indice]);
        $scope.atualizacao = false;
    };

    $scope.Excluir = function (livroId) {
        indice = Localizar(livroId);
        livroService.Excluir(livroId)
            .then(function (resultado) {
                $scope.livros.splice(indice, 1);
                $scope.livros = $filter('orderBy')($scope.livros, 'nome');
            });
    };

});