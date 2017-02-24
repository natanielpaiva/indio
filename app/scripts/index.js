const electron = require('electron');
const {ipcRenderer} = electron;
const {remote} = electron;

function boot() {

	// Get logger instance and inject it in Angular
	const logger = remote.getGlobal('logger');
	angular
		.module('myApp',[])
		.value('logger', logger);

	angular.bootstrap(document, ['myApp'], {
		strictDi: true
	});
}

document.addEventListener('DOMContentLoaded', boot);

ipcRenderer.on('update-message', function(event, method) {
    alert(method);
});