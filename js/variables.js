var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

/**El 10 es el tamaño de la celula */
var numCellX = canvasWidth/10;
var numCellY = canvasHeight/10;

var tiles_array = [];

var iniciar = document.getElementById("iniciar");
var detener = document.getElementById("detener");
var guardar = document.getElementById("guardar");
var cargar  = document.getElementById("cargar");
var interval;

var matriz_tiles;