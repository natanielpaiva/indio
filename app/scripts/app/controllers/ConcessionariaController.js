
myApp.controller('ConcessionariaController', function($scope, $q) {


        $scope.concessionarias = [];
        $scope.concessionaria = { nickname: "", bir:"" };
        $scope.indexEditar = "";

        var Datastore = require('nedb')
            , db = new Datastore({ filename: 'db/concessionaria.db', autoload: true });


        // var usuario = new Datastore({ filename: 'db/usuario.json', autoload: true });

        activate().then(function(response) {
            $scope.concessionarias = response;
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

            if ($scope.concessionaria.nickname !== "") {
                if ($scope.concessionaria._id !== undefined && $scope.concessionaria._id !== "") {
                    db.update({ _id: $scope.concessionaria._id },
                        {
                            "nickname": $scope.concessionaria.nickname,
                            "bir" :$scope.concessionaria.bir
                        }, {}, function() {
                    });

                    $scope.concessionarias.push(angular.copy($scope.concessionaria));
                    $scope.concessionarias.splice($scope.indexEditar, 1);
                    $scope.concessionaria.nickname = "";
                    $scope.concessionaria.bir = "";
                } else {

                    db.insert({
                            "nickname": $scope.concessionaria.nickname,
                            "bir": $scope.concessionaria.bir
                        }, function(err, newDoc) {
                    });

                    $scope.concessionarias.push(angular.copy($scope.concessionaria));
                    $scope.concessionaria.nickname = "";
                    $scope.concessionaria.bir = "";
                    delete $scope.concessionaria._id;
                }
            }

        };

        $scope.editar = function(concessionaria, index) {
            $scope.concessionaria = angular.copy(concessionaria);
            $scope.indexEditar = index;
        };

        $scope.deletar = function(_id, index) {
            db.remove({ '_id': _id }, {}, function(err, numRemoved) {
            });
            $scope.concessionarias.splice(index, 1);
        };

   });

