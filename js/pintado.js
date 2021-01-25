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

function drawTiles(drawArray){
    drawArray.forEach((tile,i,arr) =>{
        context.beginPath();
        context.fillStyle = tile.fillcolor;
        context.rect(tile.x,tile.y,tile.width,tile.height);

        context.lineWidth = 2;
        context.strokeStyle = tile.strokeStyle;
        context.stroke();
        context.fill();
    });
}

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
    if(tiles_array[elementClikedId].fillcolor === 'black'){
        tiles_array[elementClikedId].fillcolor = '#C7FF33';
        console.log('poner en verde');
    }
    else{
        tiles_array[elementClikedId].fillcolor = 'black';
        console.log('poner a negro');
    }
    drawTiles();
}

function array2Matriz(array,col){
    var res = [];
    for(let i=0;i<tiles_array.length;i+=col){
        res.push(array.slice(i,i+col));
    }
    return res;
}