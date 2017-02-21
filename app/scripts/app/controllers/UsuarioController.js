(function() {

    angular
        .module('app', ['ngMaterial', 'ngAnimate'])
        .controller('UsuarioController', ['$scope', '$q', 'logger', UsuarioController]);

    function UsuarioController($scope, $q, logger) {

        $scope.usuarios = [];
        $scope.usuario = { nome: "" };
        $scope.indexEditar = "";

        var Datastore = require('nedb')
            , db = new Datastore({ filename: 'db/usuario.json', autoload: true });

        activate().then(function(response) {
            $scope.usuarios = response;
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
		 * Adicionando novo usuário.
		 */
        $scope.salvarUsuario = function() {

            if ($scope.usuario.nome !== "") {
                if ($scope.usuario._id) {
                    db.update({ _id: $scope.usuario._id }, { "nome": $scope.usuario.nome }, {}, function() {
                    });

                    $scope.usuarios.push(angular.copy($scope.usuario));
                    $scope.usuarios.splice($scope.indexEditar, 1);
                    $scope.usuario.nome = "";
                } else {
                    logger.info("Adding Usuario: " + $scope.usuario.nome);

                    db.insert({ "nome": $scope.usuario.nome }, function(err, newDoc) {
                    });

                    $scope.usuarios.push(angular.copy($scope.usuario));
                    $scope.usuario.nome = "";
                    delete $scope.usuario._id;
                }
            }

        };

        $scope.editarUsuario = function(usuario, index) {
            $scope.usuario = angular.copy(usuario);
            $scope.indexEditar = index;
        };

        $scope.deletarUsuario = function(_id, index) {
            db.remove({ '_id': _id }, {}, function(err, numRemoved) {
            });
            $scope.usuarios.splice(index, 1);
        };
    }
})();