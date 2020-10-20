var node_start = [];
var node_goal = []
function aStart(){

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
        }
    }
}