// Handle Squirrel events for Windows immediately on start
if(require('electron-squirrel-startup')) return;

const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {autoUpdater} = electron;
const {ipcMain} = electron;
const os = require('os');

const logger = require('winston');
logger.level = 'debug';
global.logger = logger;

// Janela principal
var mainWindow = null;


// Quit when all windows are closed
app.on('window-all-closed', function() {
	app.quit();
});

// Criando a primeira janela da aplicação
app.on('ready', function() {

    logger.debug("Iniciando a aplicação");

    // Criando a Janela principal
    mainWindow = new BrowserWindow({
        name: "indio",
        width: 400,
        height: 600,
        toolbar: false
    });

    // Arquivo HTML que vai abrir a primeira Janela
    mainWindow.loadURL('file://' + __dirname + "/views/index.html");

    // Já abre o web developer tools do google chromer
    // mainWindow.webContents.openDevTools({detach:true});

    // Fecha a janela
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    
});