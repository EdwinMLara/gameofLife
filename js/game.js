var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

/**El 10 es el tamaño de la celula */
var numCellX = canvasWidth/10;
var numCellY = canvasHeight/10;

var tiles_array = [];

function Tile(x,y,width,height,id,fillcolor){
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height
    this.workWidth = {
        start: x,
        end: x + width
    }
    this.workHeight = {
        start: y,
        end: y + height
    }
    this.fillcolor = fillcolor;
    this.strokeStyle = 'black';
}

function createTiles(quantityx,quantityy){
    var tile_width = canvasWidth/quantityx;
    var tile_height = canvasHeight/quantityy;

    var quantityAll = quantityx * quantityy;

    var drawPosition = {
        x: 0,
        y:0
    }

    for(var i=0;i<quantityAll;i++){
        var fillcolor = '#C7FF33';
        var tile = new Tile(drawPosition.x,drawPosition.y,tile_width,tile_height,i,fillcolor);
        tiles_array.push(tile);
        drawPosition.x = drawPosition.x + tile_width;

        if(drawPosition.x >= canvas.width){
            drawPosition.x = 0;
            drawPosition.y = drawPosition.y + tile_height;
        }
    } 
}

createTiles(numCellX,numCellY);

function drawTiles(){
    tiles_array.forEach((tile,i,arr) =>{
        context.beginPath();
        context.fillStyle = tile.fillcolor;
        context.rect(tile.x,tile.y,tile.width,tile.height);

        context.lineWidth = 2;
        context.strokeStyle = tile.strokeStyle;
        context.stroke();
        context.fill();
    });
}

drawTiles();

function checkClick(event){
    let clickX = event.layerX;
    let clickY = event.layerY;

    let element;

    tiles_array.forEach((tile,i,arr) => {
        if(clickX > tile.workWidth.start && clickX < tile.workWidth.end 
            && clickY > tile.workHeight.start && clickY < tile.workHeight.end){
            element = tile.id;
        } 
    });
    return element;
}

canvas.onclick = (e) =>{
    let elementClikedId = checkClick(e);
    //console.log(`se selecciono el cuadro ${elementClikedId}`);
    tiles_array[elementClikedId].fillcolor = 'black';
    drawTiles();
}

function array2Matriz(array,col){
    var res = [];
    for(let i=0;i<tiles_array.length;i+=col){
        res.push(array.slice(i,i+col));
    }
    return res;
}

var matriz_tiles = array2Matriz(tiles_array,numCellX);

function gameoflife(){
    var arrayLiveCell = [];
    var arrayDeadCell = [];
    var i1,k1,aux1,aux2,stateCell;
    var numCell = 0;
    let neighbours = 0;
    for(var i = 1 ; i<numCellY-1 ;i ++){
        for(var k = 1; k<numCellX-1 ; k++){
        i1 = 0;
        k1 = 0;

        for (aux1 = i-1; aux1 <= i+1; aux1++){
            for(aux2 = k-1; aux2 <= k+1 ; aux2++){ 
                if(matriz_tiles[aux1][aux2].fillcolor === 'black'){
                    neighbours += 1;
                }
                k1++;
            }
            k1=0;
            i1++;
        }

        if(matriz_tiles[i][k].fillcolor === 'black'){
            stateCell = 'alive';
            numCell += 1;
            neighbours -= 1;
        }else{
            stateCell = 'dead';
        }

        switch(neighbours){
            case 2:
                if(stateCell === 'alive'){
                    arrayLiveCell.push(matriz_tiles[i][k].id);
                }
                break;
            case 3:
                if(stateCell === 'dead'){
                    arrayLiveCell.push(matriz_tiles[i][k].id);
                }
                break;
            default:
                if(stateCell === 'alive'){
                    arrayDeadCell.push(matriz_tiles[i][k].id);
                }
        }
        neighbours = 0;
        }
    }
    if(numCell){
        arrayLiveCell.forEach((currentValue) => {
            tiles_array[currentValue].fillcolor = 'black';
        })
        arrayDeadCell.forEach((currentValue) => {
            tiles_array[currentValue].fillcolor = '#C7FF33'; 
        })
        drawTiles();
    }else{
        clearInterval(interval);
        alert('No hay celulas vivas, active algunas');
        
    }
}

var iniciar = document.getElementById("iniciar");
var detener = document.getElementById("detener");
var guardar = document.getElementById("guardar");
var interval;

iniciar.onclick = () =>{
    interval = setInterval(gameoflife,500);
}

detener.onclick = () =>{
    clearInterval(interval);
}

guardar.onclick = () =>{
    var jsonStr = JSON.stringify(tiles_array,null, 2);
    const blob  = new Blob([jsonStr],{type: 'text/plain;charset=utf-8'});
    var a = document.createElement('a');
    a.download = 'patron.txt';
    a.href = window.URL.createObjectURL(blob);
    a.click();
    console.log(a);
}






