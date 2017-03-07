myApp.controller('FuncaoController', function($scope, $q) {


        $scope.funcoes = [];
        $scope.funcao = { nome: "" };
        $scope.indexEditar = "";

        var Datastore = require('nedb')
            , db_area = new Datastore({ filename: 'db/area.db', autoload: true });

        var Datastore = require('nedb')
            , db_funcao = new Datastore({ filename: 'db/funcao.db', autoload: true });    

        activate().then(function(response) {
            $scope.funcoes = response;
        });

		/**
		 * Iniciando os dados.
		 */
        function activate() {
            var deferred = $q.defer();
            db_funcao.find({}, function(err, newDoc) {
                deferred.resolve(newDoc);
            });
            return deferred.promise;
        }

        carregarAreas().then(function(response){
            $scope.areas = response;
        });


        function carregarAreas() {
            var deferred = $q.defer();
            db_area.find({}, function(err, newDoc) {
                deferred.resolve(newDoc);
            });
            return deferred.promise;
        }



		/**
		 * Adicionando .
		 */
        $scope.salvar = function() {

            if ($scope.funcao.nome !== "") {
                if ($scope.funcao._id !== undefined && $scope.funcao._id !== "") {
                    db_funcao.update({ _id: $scope.funcao._id },
                        {
                            "nome": $scope.funcao.nome,
                            "area": {nome:$scope.funcao.area.nome}
                        }, {}, function() {
                    });

                    $scope.funcoes.push(angular.copy($scope.funcao));
                    $scope.funcoes.splice($scope.indexEditar, 1);
                    $scope.funcao.nome = "";
                } else {
                    //console.log($scope.funcao.area);
                    db_funcao.insert({
                            "nome": $scope.funcao.nome,
                            "area": {nome:$scope.funcao.area.nome}
                        }, function(err, newDoc) {
                    });

                    $scope.funcoes.push(angular.copy($scope.funcao));
                    $scope.funcao.nome = "";
                    delete $scope.funcao._id;
                }
            }

        };

        $scope.editar = function(funcao, index) {
            $scope.funcao = angular.copy(funcao);
            $scope.indexEditar = index;
        };

        $scope.deletar = function(_id, index) {
            db_funcao.remove({ '_id': _id }, {}, function(err, numRemoved) {
            });
            $scope.funcoes.splice(index, 1);
        };

   });