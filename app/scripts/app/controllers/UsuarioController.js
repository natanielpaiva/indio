(function() {

    angular
        .module('app', ['ngMaterial', 'ngAnimate'])
        .controller('UsuarioController', ['$scope', 'logger', UsuarioController]);

    function UsuarioController($scope, logger) {

        var usuarioCont = this;
        usuarioCont.usuarios = [];
        usuarioCont.usuario = { nome: "" };
        usuarioCont.salvarUsuario = salvarUsuario;
        usuarioCont.editarUsuario = editarUsuario;
        usuarioCont.deletarUsuario = deletarUsuario;
        usuarioCont.indexEditar = "";

        var Datastore = require('nedb')
            , db = new Datastore({ filename: 'app/db/usuario.json', autoload: true });

        activate();

		/**
		 * Iniciando os dados.
		 */
        function activate() {
            db.find({}, function(err, newDoc) {
                usuarioCont.usuarios = newDoc;
            });
        }

		/**
		 * Adicionando novo usuário.
		 */
        function salvarUsuario() {

            if (usuarioCont.usuario.nome !== "") {
                if (usuarioCont.usuario._id) {
                    db.update({ _id: usuarioCont.usuario._id }, { "nome": usuarioCont.usuario.nome }, {}, function() {
                    });

                    usuarioCont.usuarios.push(angular.copy(usuarioCont.usuario));
                    usuarioCont.usuarios.splice(usuarioCont.indexEditar, 1);
                    usuarioCont.usuario.nome = "";
                } else {
                    logger.info("Adding Usuario: " + usuarioCont.usuario.nome);

                    db.insert({ "nome": usuarioCont.usuario.nome }, function(err, newDoc) {
                    });

                    usuarioCont.usuarios.push(angular.copy(usuarioCont.usuario));
                    usuarioCont.usuario.nome = "";
                }
            }

        }

        function editarUsuario(usuario, index) {
            usuarioCont.usuario = angular.copy(usuario);
            usuarioCont.indexEditar = index;
        }

        function deletarUsuario(_id, index) {
            db.remove({ '_id': _id }, {}, function(err, numRemoved) {
            });
            usuarioCont.usuarios.splice(index, 1);
        }
    }
})();