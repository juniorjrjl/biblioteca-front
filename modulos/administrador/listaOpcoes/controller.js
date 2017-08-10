angular.module('Biblioteca.administrador').controller('opiniaoController', function ($scope, $filter, opiniaoService) {

    $scope.opinioes = [];
    $scope.ordenacao = "estadoConservacao";
    $scope.simboloOrdenacao = " (+)";
    $scope.verificacaoOrdenacao = "estadoConservacao";
    $scope.inicio = 0;
    $scope.fim = 5;
    $scope.tamanhoPagina = 5;
    $scope.paginaQuebrada = 0;
    $scope.pesquisa = "";


    $scope.proximo = function() {
        if ($scope.inicio + $scope.tamanhoPagina <= Math.ceil($scope.opinioes.length / $scope.fim)) {
            $scope.inicio  = $scope.inicio + $scope.tamanhoPagina;
            $scope.fim = $scope.fim + $scope.tamanhoPagina;
        }else if (($scope.paginaQuebrada !== 0) && ($scope.inicio + $scope.paginaQuebrada !== $scope.opinioes.length)){
            $scope.inicio  = $scope.inicio + $scope.paginaQuebrada;
            $scope.fim = $scope.fim + $scope.paginaQuebrada;
        }
    };

    $scope.primeiro = function () {
        $scope.inicio  = 0;
        $scope.fim = $scope.tamanhoPagina;
    };

    $scope.ultimo = function () {
        $scope.inicio  = $scope.paginaQuebrada === 0 ? ($scope.opinioes.length - $scope.tamanhoPagina) :
            ($scope.opinioes.length - $scope.paginaQuebrada);
        $scope.fim = $scope.opinioes.length;
    };

    $scope.anterior = function() {
        if ($scope.fim !== $scope.tamanhoPagina) {
            $scope.inicio  = $scope.inicio - $scope.tamanhoPagina;
            $scope.fim = $scope.fim - $scope.tamanhoPagina;
            $scope.paginaAtual --;
        }
    };

    $scope.definirOrdenacao = function (novaOrdenacao) {
        if ($scope.ordenacao === novaOrdenacao){
            $scope.ordenacao = '-'  + novaOrdenacao;
            $scope.simboloOrdenacao = " (-)";
        }else {
            $scope.ordenacao = novaOrdenacao;
            $scope.simboloOrdenacao = " (+)";
        }
        $scope.verificacaoOrdenacao = novaOrdenacao
    };

    $scope.carregarListagem = function () {
        opiniaoService.selecionar()
            .then(function (retorno) {
                $scope.opinioes = retorno.data();
                $scope.paginaQuebrada = ($scope.opinioes.length - ($scope.tamanhoPagina * Math.floor($scope.opinioes.length / $scope.tamanhoPagina)));
            })
    };

});