myApp.controller('AreaController', function($scope, $q) {


        $scope.areas = [];
        $scope.area = { nome: "" };
        $scope.indexEditar = "";

        var Datastore = require('nedb')
            , db_area = new Datastore({ filename: 'db/area.db', autoload: true });

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


        function salvarArea(){
            var deferred = $q.defer();
            db_area.insert({
                    "nome": $scope.area.nome
                }, function(err, newDoc) {
                    deferred.resolve(newDoc);
             });
             return deferred.promise;
        }


		/**
		 * Adicionando .
		 */
        $scope.salvar = function() {

            if ($scope.area.nome !== "") {
                if ($scope.area._id == undefined) {

                    
                    salvarArea().then(function(response){
                        $scope.areas.push(angular.copy(response));  
                    });
                    $scope.area = {nome:""};
                    

                } else {
                    db_area.update({ _id: $scope.area._id },
                        {
                            "nome": $scope.area.nome
                        }, {}, function() {
                    });
                    $scope.areas.push(angular.copy($scope.area)); 

                    $scope.areas.splice($scope.indexEditar, 1);
                    $scope.area = {nome:""};
                }
            }

        };

        $scope.editar = function(area, index) {
            console.log(area);
            $scope.area = angular.copy(area);
            $scope.indexEditar = index;
        };

        $scope.deletar = function(_id, index) {
            db_area.remove({ '_id': _id }, {}, function(err, numRemoved) {
            });
            $scope.areas.splice(index, 1);
        };

   });