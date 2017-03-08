/* global myApp */

myApp.controller('ConfiguracaoController', function($scope, $q) {
    $scope.configuracoes = [];
    $scope.configuracao = { bir:"", areas:[], funcoes:[], itensFunil:[], itensScore:[] };
    $scope.indexEditar = "";

    var Datastore = require('nedb')
        , db = new Datastore({ filename: 'db/configuracao.db', autoload: true });

    activate().then(function(response) {
        $scope.configuracoes = response;
    });

    /**
     * Iniciando os dados.
     */
    function activate() {
        var deferred = $q.defer();
        db.find({}, function(err, newDoc) {
            deferred.resolve(newDoc);
        });
        return deferred.promise;
    }

    /**
     * Adicionando .
     */
    $scope.salvar = function() {
        if ($scope.configuracao.nickname !== "" && $scope.configuracao.bir !== "") {
            if (undefined != $scope.configuracao._id) {
                console.log('Achou id de ccs. UPDATE');
                db.update({ _id: $scope.configuracao._id },
                        {
                            nickname: $scope.configuracao.nickname,
                            bir: $scope.configuracao.bir
                        }, {}, function() {
                    });
                $scope.configuracoes.push(angular.copy($scope.configuracao));
                $scope.configuracoes.splice($scope.indexEditar, 1);
                $scope.configuracao.nickname = "";
                $scope.configuracao.bir = "";
            } else {
                console.log('Não achou id de ccs. INSERT');
                db.insert({ nickname: $scope.configuracao.nickname, bir: $scope.configuracao.bir }, function (err) {});

                $scope.configuracoes.push(angular.copy($scope.configuracao));
                $scope.configuracao.nickname = "";
                $scope.configuracao.bir = "";
                delete $scope.configuracao._id;
            }
        }
    };

    $scope.editar = function(configuracao, index) {
        $scope.configuracao = angular.copy(configuracao);
        $scope.indexEditar = index;
    };

    $scope.deletar = function(_id, index) {
        db.remove({ _id: _id }, {}, function(err, numRemoved) {});
        $scope.configuracoes.splice(index, 1);
    };        
});

