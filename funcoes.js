
function validar(){

    var palavra = $('#palavra').val();
    var p = $('#p').val();
    var q = $('#q').val();
    var e = $('#e').val();

    if(palavra == ""){ // Validações
        alert('Digite a palavra!');
    }else if(p == ""){
        alert('Digite o p!');
    }else if(q == ""){
        alert('Digite o q!');
    }else if(e == ""){
        alert('Digite o e!');
    }else{
        if($('#tipo').val() == 1){
            $('#resultado').val(criptografar(palavra,p,q,e));
        }else{
            descriptografar();
        }
    }

}

function criptografar(palavra,p,q,e){
    n = p * q;
    palavraAux = ""; // variavel com a palavra codificada pelo dicionario
    for (var i = 0; i < palavra.length; i++){
        palavraAux += dicionario(palavra[i]);
    }
    
    arraySeparacao = [];
    var u = 0; // for para quebrar a palavra em 4 posições
    for (var i = 0; i < palavraAux.length; i = i+4){
        arraySeparacao[u] = palavraAux.substring(i,i+4);
        u++;
    }

    resultado_final = "";
    for(var i = 0; i < arraySeparacao.length; i++){
        resp = Math.pow(parseFloat(arraySeparacao[i]), e) % n;

        resp = ""+resp;
        if(resp.length < 4)
            resp = "0"+resp;

        resultado_final += resp;
    }
    return resultado_final;
}

function descriptografar(){

}

// Cripto -> Letras > A = 00, B = 01, ~ Z = 35

function dicionario(letra){
    if(letra == "a")
        return "00";
    else if(letra == "b")
        return "01";
    else if(letra == "c")
        return "02";
    else if(letra == "d")
        return "03";
    else if(letra == "e")
        return "04";
    else if(letra == "f")
        return "05";
    else if(letra == "g")
        return "06";
    else if(letra == "h")
        return "07";
    else if(letra == "i")
        return "08";
    else if(letra == "j")
        return "09";
    else if(letra == "k")
        return "10";
    else if(letra == "l")
        return "11";
    else if(letra == "m")
        return "12";
    else if(letra == "n")
        return "13";
    else if(letra == "o")
        return "14";
    else if(letra == "p")
        return "15";
    else if(letra == "q")
        return "16";
    else if(letra == "r")
        return "17";
    else if(letra == "s")
        return "18";
    else if(letra == "t")
        return "19";
    else if(letra == "u")
        return "20";
    else if(letra == "v")
        return "21";
    else if(letra == "w")
        return "22";
    else if(letra == "x")
        return "23";
    else if(letra == "y")
        return "24";
    else if(letra == "z")
        return "25";
    else 
        return false;  
}