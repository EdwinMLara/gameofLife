function Node(x,y,width,height,id,fillcolor){
    Tile.call(this,x,y,width,height,id,fillcolor);
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];
    this.addneighbors = function(arrayAsMatrix){
        var x = this.x/10;
        var y = this.y/10;

        if(x < numCellX-1){
            this.neighbors.push(arrayAsMatrix[y][x+1]);
        }

        if(x>0){
            this.neighbors.push(arrayAsMatrix[y][x-1]);
        }

        if(y<numCellY-1){
            this.neighbors.push(arrayAsMatrix[y+1][x]);
        }

        if(y>0){
            this.neighbors.push(arrayAsMatrix[y-1][x]);
        }
    }

    this.previous = undefined;
}

function createTilesNodes(quantityx,quantityy){
    let tile_width = canvasWidth/quantityx;
    let tile_height = canvasHeight/quantityy;

    let quantityAll = quantityx*quantityy;

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

function drawTilesNodes(){
    nodeArray.forEach((tile,i,arr) =>{
        context.beginPath();
        context.fillStyle = tile.fillcolor;
        context.rect(tile.x,tile.y,tile.width,tile.height);

        context.lineWidth = 2;
        context.strokeStyle = tile.strokeStyle;
        context.stroke();
        context.fill();
    });
}

var nodeArray = [];
var path = [];
createTilesNodes(numCellX,numCellY);

var matrixNodes = array2Matriz(nodeArray,numCellX);

function findTheirNeighbord(){
    nodeArray.forEach(node => {
        node.addneighbors(matrixNodes);
    }); 
}

findTheirNeighbord();

function removeFromArray(arr,elt){
    for(let i= arr.length -1; i>=0;i--){
        if(arr[i].id === elt.id){
            arr.splice(i,1);
        }
    }
}

function heuristic(a,b){
    let d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    return d;    
}

var openList = [];
var closeList = [];
var startNode = matrixNodes[0][0];
startNode.fillcolor = '#000000';
var endNode = matrixNodes[numCellY-1][numCellX-5];
endNode.fillcolor = '#000000';
openList.push(startNode);
console.log(startNode,endNode);

drawTilesNodes();

function aStart(){

    if(openList.length > 0){
        var winnerCost = 0;
        for(let i=0; i < openList.length ; i++){
            if(openList[i].f < openList[winnerCost].f){
                winnerCost = i;
            }
        }

        var current = openList[winnerCost];

        if(openList[winnerCost].id === endNode.id){
            var temp = current;
            path.push(temp);
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous;
            }
            console.log("Terminado");
            clearInterval(interval);
        }

        removeFromArray(openList,current);
        closeList.push(current);

        var neighbors = current.neighbors;
        for (let i=0;i<neighbors.length;i++){
            var neighbor = neighbors[i];

            if(!closeList.includes(neighbor)){
                var tempG = current.g + 1;

                if(openList.includes(neighbor)){
                    if(tempG < neighbor.g){
                        neighbor.g = tempG;
                    }
                }else{
                    neighbor.g = tempG;
                    openList.push(neighbor);
                }

                neighbor.h = heuristic(neighbor,endNode);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }
        } 
    }else{
        clearInterval(interval);
        console.log("no hay soluciones");
    }

    openList.forEach(node =>{
        node.fillcolor = '#FF0000';
    });

    path.forEach(node =>{
        node.fillcolor = '#0000FF';
    });

    drawTilesNodes();
    console.log("open",openList);
    console.log("close",closeList);
}

//aStart();