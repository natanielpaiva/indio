(function () {

    angular
        .module('app', ['ngMaterial', 'ngAnimate'])
        .controller('UsuarioController', ['$scope', 'logger', UsuarioController]);

    function UsuarioController($scope, logger) {

        var usuarioCont = this;
        usuarioCont.usuarios = [];
        usuarioCont.usuario = { nome: "" };
        usuarioCont.addUsuario = addUsuario;

        var Datastore = require('nedb')
            , db = new Datastore({ filename: 'app/scripts/app/db/usuario.json', autoload: true });

        activate();

		/**
		 * Iniciando os dados.
		 */
        function activate() {
            db.find({}, function (err, newDoc) {
                usuarioCont.usuarios = newDoc;
            });
        }

		/**
		 * Adicionando novo usuário.
		 */
        function addUsuario() {

            logger.info("Adding Usuario: " + usuarioCont.usuario.nome);

            db.insert({ "nome": usuarioCont.usuario.nome }, function (err, newDoc) {
            });

            usuarioCont.usuarios.push(angular.copy(usuarioCont.usuario));
            usuarioCont.usuario.nome = "";
        }
    }
})();