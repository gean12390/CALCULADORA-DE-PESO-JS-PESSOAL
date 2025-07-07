let quantidade = document.getElementById('quantidade');
let espaco = document.getElementById('espaco');
let final = document.getElementById('resultado');
let cod_material = document.getElementById('cod_material');
let i = 0;
valor = [];
let separar = [];
let resultado = [];


document.addEventListener('keydown', (event) => {
    if (document.activeElement.id === 'cod_material' && event.key === 'Tab') {
        document.getElementById('ajuda').select();
        document.getElementById('resultado').select();
    } else if(document.activeElement.id === 'id_1' && event.shiftKey && event.key === 'Tab'){
        document.getElementById('ajuda').focus();
    }
});


function input(){

    if(quantidade.value == ""){
        i = 0;
        espaco.innerHTML = ' ';
    }else if(quantidade.value <= 7){
        espaco.appendChild(document.createElement('hr'));
        if(i < quantidade.value){
            for(i; i < parseFloat(quantidade.value); i++){
                espaco.appendChild(document.createElement('input')).id = `id_${i + 1}`; 
                document.getElementById(`id_${i + 1}`).setAttribute('autocomplete', 'off');
                document.getElementById(`id_${i + 1}`).placeholder = `ESPAÇO ${i + 1}`;
            }
        }else if (i > parseFloat(quantidade.value)) {
    for ( i; i > parseFloat(quantidade.value); i--) {
        const elemento = document.getElementById(`id_${i}`);
        if (elemento) {
            espaco.removeChild(elemento);
        }
    }
}
    }else{
        alert('Não é possivel criar 8 ou mais inputs');
        document.getElementById('quantidade'). value = ' ';
        espaco.innerHTML = ' ';
        i = 0;
    }
}

function calcular(){
        let total = 0;

    for(let p = 0; p < parseFloat(quantidade.value); p++){
        valor[p] = document.getElementById(`id_${p + 1}`).value;
        separar[p] = [];
         let denominador
        let numerador
        let fracao
        let inteiro

        if(valor[p].includes('/')){
            for(let j = 0; j < valor[p].length; j++){
                separar[p][j] = valor[p][j];
            }
            for(let j = 0; j < separar[p].length; j++){
                if(separar[p][j] == '.'){
                     inteiro = parseFloat(separar[p][j - 1]) * 25.4; 
                } else if(separar[p][j] == '/'){
                    if(separar[p][j + 2] != null){
                         denominador = (separar[p][j + 1] + separar[p][j + 2]);
                         numerador = separar[p][j - 1];
                         fracao = (parseFloat(numerador/denominador)) * 25.4;
                    }else{
                          denominador = parseFloat(separar[p][j + 1]);
                         numerador = parseFloat(separar[p][j - 1]);      
                         fracao = (parseFloat(numerador/denominador)) * 25.4;
                    }
                }
            }
            if(valor[p].includes('.')){
            resultado[p] = parseFloat(inteiro + fracao);
            }else if(!valor[p].includes('.')){
                resultado[p] = parseFloat(fracao);
            }
        } else if(valor[p].includes(`'`) || valor[p].includes(`p`) || valor[p].includes(`P`)){
            inteiro = parseFloat(valor[p]) * 25.4;
            resultado[p] = inteiro;
        } else if(!valor[p].includes(`'`) && !valor[p].includes('/')){
            if(valor[p].includes('MTS') || valor[p].includes('MT') || valor[p].includes('mts') || valor[p].includes('mt')){
                inteiro =  parseFloat(valor[p]) * 1000;
                resultado[p] = inteiro 
        
        } else if(!isNaN(parseFloat((valor[p])))){
            resultado[p] = parseFloat(valor[p]);
            }
        }        
            total += resultado[p];
           
            
        }
        if(total == 0){
        }
            //alert(isNaN(total) ? 0 : parseFloat(total).toFixed(2));
        _codigo_material(parseFloat(total), parseFloat(cod_material.value), parseFloat(quantidade.value));
}

document.body.addEventListener('keydown', (event) =>{
    if(event.key == "Enter"){

       calcular();

    }
});

function _codigo_material(x, y, j){
    if(y == 1){
        if(j == 2){
          x = (((((resultado[0] * resultado[0])* resultado[1]) * 2.7) * 3.1416) / 4000000);
            if(x < 0.1){
                final.value = (0.1).toFixed(3);
            }else{
                final.value = x.toFixed(3);
            }
        }else if(j == 1 ){
           x = ((x * 2.7) / 1000000);
                        if(x < 0.1){
                final.value = (0.1).toFixed(3);
            }else{
                final.value = x.toFixed(3);
            }
        }else if(j > 2){
            
        }


    }
}


quantidade.addEventListener('input', input);

document.getElementById('ajuda').addEventListener('click', () => {
    alert('Codigos: \n\n 1 - Aluminio \n 2 - Cobre \n 3 - Latão');

})
