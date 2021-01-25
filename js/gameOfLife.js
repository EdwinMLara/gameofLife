createTiles(numCellX,numCellY);
console.log(tiles_array);
drawTiles(tiles_array);
matriz_tiles = array2Matriz(tiles_array,numCellX);

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
        drawTiles(tiles_array);
    }else{
        clearInterval(interval);
        alert('No hay celulas vivas, active algunas');
        
    }
}







