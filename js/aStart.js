var nodeArray = [];
function Node(x,y,width,height,id,fillcolor){
    Tile.call(this,x,y,width,height,id,fillcolor);
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
        let fillcolor2 = '#C7FF33';
        let node = new Node(drawPositionNode.x,drawPositionNode.y,tile_width,tile_height,i,fillcolor2);
        nodeArray.push(node);
        drawPositionNode.x = drawPositionNode.x + tile_width;

        if(drawPositionNode.x >= canvas.width){
            drawPositionNode.x = 0;
            drawPositionNode.y = drawPositionNode.y + tile_height;
        }
    }
}

createTilesNodes(numCellX,numCellY);
console.log(nodeArray);
//drawTiles(nodeArray);
matrixNodes = array2Matriz(nodeArray,numCellX);

function aStar(){
    var openList = [];
    var closeList = [];
    var startNode = matrixNodes[0][0];
    var endNode = matrizNodes[numCellY-1][numCellX-1];
    openList.push(startNode) 

}