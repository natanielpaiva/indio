myApp.controller('AreaController', function($scope, $q) {


        $scope.areas = [];
        $scope.area = { nome: "" };
        $scope.indexEditar = "";

        var Datastore = require('nedb')
            , db_area = new Datastore({ filename: 'db/area.db', autoload: true });
        //var concessionaria = new Datastore({ filename: 'db/concessionaria.json', autoload: true });

        activate().then(function(response) {
            $scope.areas = response;
        });

		/**
		 * Iniciando os dados.
		 */
        function activate() {
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

            if ($scope.area.nome !== "") {
                if ($scope.area._id !== undefined && $scope.area._id !== "") {
                    db_area.update({ _id: $scope.area._id },
                        {
                            "nome": $scope.area.nome
                        }, {}, function() {
                    });

                    $scope.areas.push(angular.copy($scope.area));
                    $scope.areas.splice($scope.indexEditar, 1);
                    $scope.area.nome = "";
                } else {

                    db_area.insert({
                            "nome": $scope.area.nome
                        }, function(err, newDoc) {
                    });

                    $scope.areas.push(angular.copy($scope.area));
                    $scope.area.nome = "";
                    delete $scope.area._id;
                }
            }

        };

        $scope.editar = function(area, index) {
            $scope.area = angular.copy(area);
            $scope.indexEditar = index;
        };

        $scope.deletar = function(_id, index) {
            db_area.remove({ '_id': _id }, {}, function(err, numRemoved) {
            });
            $scope.areas.splice(index, 1);
        };

   });