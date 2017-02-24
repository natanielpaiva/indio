(function() {
    //Teste do git no VSCode. Igor
    angular
        .module('app', ['ngAnimate'])
        .controller('ConcessionariaController', ['$scope', '$q', 'logger', ConcessionariaController]);

    function ConcessionariaController($scope, $q, logger) {

        $scope.concessionarias = [];
        $scope.concessionaria = { nickname: "", bir:"" };
        $scope.indexEditar = "";

        var Datastore = require('nedb')
            , concessionaria = new Datastore({ filename: 'db/concessionaria.json', autoload: true });


        // var usuario = new Datastore({ filename: 'db/usuario.json', autoload: true });    

        activate().then(function(response) {
            $scope.concessionarias = response;
        });

		/**
		 * Iniciando os dados.
		 */
        function activate() {
            var deferred = $q.defer();
            concessionaria.find({}, function(err, newDoc) {
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
                    concessionaria.update({ _id: $scope.concessionaria._id }, 
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

                    concessionaria.insert({ 
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
    }
})();