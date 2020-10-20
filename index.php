<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div><canvas id="canvas" width="500" height="200" style="border:1px solid #000000;"></canvas></div>
    <div id="examples">
        <input type="radio" id="r1" name="rate" value="1" checked="checked" onclick="handleRadios(this)"> Game of Life
        <input type="radio" id="r2" name="rate" value="2" onclick="handleRadios(this)"> A*
        <input type="radio" id="r3" name="rate" value="3" onclick="handleRadios(this)"> Arboles
    </div>
    <div><button id="iniciar">Iniciar</button><button id="detener">Detener</button>
    <button id="guardar">Guardar Patron</button><input type="file" id="cargar"/></div>
</body>
<script src="js/variables.js"></script>
<script src="js/pintado.js"></script>
<script src="js/gameOfLife.js"></script>
<script src="js/eventos.js"></script> 
</html>