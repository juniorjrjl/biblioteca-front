angular.module('Biblioteca.usuario').controller('ComentarioController', function ($scope, usuarioService) {

    $scope.usuario = {};
    $scope.livros = {};
    $scope.opiniao = {};
    $scope.erros = [];

    $scope.cadastrar = function(usuario) {
        exibeFormOpiniao();
        usuarioService.Cadastrar(usuario)
            .then(function (resultado) {
                $scope.usuario = resultado.data[0];
                $scope.livros = resultado.data[1];
                if ($scope.livros.length === 0){
                    RemoverCSS([angular.element(document.getElementById("divAlerta"))], ["ocultar"]);
                }
            });
    };


    var exibeFormOpiniao = function () {
        var elementosExibir = [];
        var elementosOcultar = [];
        elementosExibir.push(angular.element(document.getElementById("fdsLivro")));
        elementosExibir.push(angular.element(document.getElementById("fdsEstadoConservacao")));
        elementosExibir.push(angular.element(document.getElementById("fdsAvaliacao")));
        elementosExibir.push(angular.element(document.getElementById("fdsObservacao")));
        elementosExibir.push(angular.element(document.getElementById("btnEnviarOpiniao")));
        elementosOcultar.push(angular.element(document.getElementById("btnCadastrar")));
        AdicionarCSS(elementosOcultar, ["ocultar"]);
        RemoverCSS(elementosExibir, ["ocultar", "ocultar", "ocultar", "ocultar", "ocultar"]);
    };

    $scope.setIdLivro = function () {
        $scope.opiniao.idLivro = $scope.livroSelecionado._id;
    };

    $scope.enviarOpiniao = function (opiniao) {
        opiniao.idUsuario = $scope.usuario._id;
        opiniao.estadoConservacao = $scope.estadoConservacaoSelecionado;
        usuarioService.enviarOpiniao(opiniao)
            .then(function () {
                RemoverCSS([angular.element(document.getElementById("divMensagemSucesso"))], ["ocultar"]);
                AdicionarCSS([angular.element(document.getElementById("divBotao"))],["ocultar"]);
                angular.element(document.getElementById("btnCadastrar")).disable = true;
            })
    };

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

});