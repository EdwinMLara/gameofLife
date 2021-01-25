var openList = [];
var closeList = [];
var nodeArray = [];
var startNode = matriz_tiles[0][0];
var endNode = matriz_tiles[numCellY-1 ][numCellX-1]; 
openList.push(startNode)

function Node(x,y,width,height,fillcolor){
    Tile.call(x,y,width,height,fillcolor);
    this.f = 0;
    this.g = 0;
    this.h = 0;
}

function createTilesNodes(quantityx,quantityy){
    let tile_width = canvasWidth/quantityx;
    let tile_height = canvasHeight/quantityy;

    let quantityAll = quantityy*quantityy;

    let drawPositionNode = {
        x: 0,
        y: 0
    }

    for(let i=0;i<quantityAll;i++){
        let fillcolor = '#C7FF33';
        let node = new Node(drawPositionNode.x,drawPositionNode.y,tile_width,tile_height,i,fillcolor);
        nodeArray.push(node);
        drawPositionNode.x = drawPositionNode.x + tile_width;

        if(drawPositionNode.x >= canvas.width){
            drawPositionNode.x = 0;
            drawPositionNode.y = drawPositionNode.y + tile_height;
        }
    }
}