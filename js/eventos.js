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

cargar.onchange = (e) => {
    let File = e.target.files[0];
    let filename = File.name;
    if(filename.endsWith(".txt")){
        let reader = new FileReader();
        reader.readAsText(File);

        reader.onload = function (){
            let jsonCargado = JSON.parse(reader.result);
            jsonCargado.forEach((value,index,array) => {
                if(value.fillcolor == 'black'){
                    tiles_array[index].fillcolor = 'black';
                }
            });
            drawTiles(); 
        }

        reader.onerror = function (){
            console.log(reader.error)
        }
    }else{
        alert('El archivo no es compatibles');
    } 
 
}

/**Cuando ligas una función a un evento en el html 
 * handleRadios(this) se obtiene el elemento como parametro
 * handleRadios(event) se obtiene el objeto del evento
*/
function handleRadios(myRadio){
    selected = myRadio.value;
    switch(selected){
        case '1':
            console.log("Game of life");
            break;
        case '2':
            console.log("A*");
            break;
        case '3':
            console.log("Arboles");
            break;
        default:
            console.log("Desconocido");
    }
}