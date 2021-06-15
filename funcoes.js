var auxiliar = "";
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
            criptografar(palavra,p,q,e);
        }else{
            descriptografar(palavra,p,q,e);
        }
    }

}

function criptografar(palavra,p,q,e){
    // $('#resultado').val('');
    if(palavra == "")
        return false;
    else{
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
        chamadaApiCriptografia(parseInt(arraySeparacao[0])+"^"+parseInt(e)+"mod"+n,palavra,p,q,e);
    }
}

function descriptografar(palavra,p,q,e){
    //$('#resultado').val('');
    if(palavra == "")
        return false;
    else{
    var teste,d,teste3,teste4;
    var einicial = e;
    arraySeparacao = [];
    var u = 0; // for para quebrar a palavra em 4 posições
    for (var i = 0; i < palavra.length; i = i+4){
        arraySeparacao[u] = palavra.substring(i,i+4);
        u++;
    }

    pmenos1 = p - 1;
    qmenos1 = q - 1;
    n = pmenos1 * qmenos1;

    arrayResultados = [];
    
    var aux = "";
    var valor = 0;
    var i = 0;

    chamadaApiResultadoD(arraySeparacao[0],n,e,p,q,palavra);

    }
}

function chamadaApiResultadoD(valor,n,e,p,q,palavra){
    var input = "d*"+e+" \\equiv 1 mod("+n+")";
    // alert('https://api.wolframalpha.com/v2/query?input='+input+'&format=plaintext&output=JSON&&appid=XTA64W-J9AL3QPYJE');
    $.ajax({
        url  : 'https://api.wolframalpha.com/v2/query?input='+input+'&format=plaintext&output=JSON&&appid=XTA64W-J9AL3QPYJE',
        data : 'cliente=eu&acao=getmenu',
        type : "GET",
        crossDomain  : "true",
        dataType     : "jsonp",
        contentType  : "application/json",
        async: false,
        success: function( menu ){
            jsonResultado = menu;
            auxiliar = jsonResultado.queryresult.pods[1].subpods[0].plaintext;
            string = auxiliar;

            string = string.split("d congruent ");
            if(string[1] != "" && string[1] != null && string[1] != undefined){
                string = string[1];
                string = string.split(" (mod");
                string = parseInt(string[0]);
                chamadaApiResultado(valor+"^"+string+" \\equiv M mod "+(p*q), n,e,p,q,palavra);
            }
            else{
                alert('Problema retornado pela API -> ' + auxiliar);
            }
        }
    });
}

function chamadaApiResultado(input,n,e,p,q,palavra){

    $.ajax({
        url  : 'https://api.wolframalpha.com/v2/query?input='+input+'&format=plaintext&output=JSON&&appid=XTA64W-J9AL3QPYJE',
        data : 'cliente=eu&acao=getmenu',
        type : "GET",
        crossDomain  : "true",
        dataType     : "jsonp",
        contentType  : "application/json",
        async: false,
        success: function( menu ){
            jsonResultado = menu;
            auxiliar = jsonResultado.queryresult.pods[1].subpods[0].plaintext;
            string = auxiliar;
            string = string.split("M congruent ");
            string = string[1];
            string = string.split(" (mod");

            if(parseInt(string[0]) < 1000){
                string[0] = "0"+string[0];
            }

            for (var i = 0; i < string[0].length; i+=2){
                stringaux = string[0].substring(i,i+2);
                console.log(stringaux);
                $('#resultado').val($('#resultado').val() + dicionarioInverso(stringaux));
            }
            descriptografar(palavra.substring(4),p,q,e);
           
            console.log(string[0]);
        }
    });
}

function chamadaApiCriptografia(input,palavra,p,q,e){
    //418^1949mod2537
    // alert('https://api.wolframalpha.com/v2/query?input='+input+'&format=plaintext&output=JSON&&appid=XTA64W-J9AL3QPYJE');
    $.ajax({
        url  : 'https://api.wolframalpha.com/v2/query?input='+input+'&format=plaintext&output=JSON&&appid=XTA64W-J9AL3QPYJE',
        data : 'cliente=eu&acao=getmenu',
        type : "GET",
        crossDomain  : "true",
        dataType     : "jsonp",
        contentType  : "application/json",
        async: false,
        success: function( menu ){
            jsonResultado = menu;
            auxiliar = jsonResultado.queryresult.pods[1].subpods[0].plaintext;
            string = auxiliar;


            if(parseInt(string)< 1000){
                string = "0"+string;
            }

            $('#resultado').val($('#resultado').val() + string);
            criptografar(palavra.substring(2),p,q,e);
        }
    });
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
        return alert('Ocorreu algum problema.');  
}

function dicionarioInverso(numero){
    if(numero == "00")
        return "a";
    else if(numero == "01")
        return "b";
    else if(numero == "02")
        return "c";
    else if(numero == "03")
        return "d";
    else if(numero == "04")
        return "e";
    else if(numero == "05")
        return "f";
    else if(numero == "06")
        return "g";
    else if(numero == "07")
        return "h";
    else if(numero == "08")
        return "i";
    else if(numero == "09")
        return "j";
    else if(numero == "10")
        return "k";
    else if(numero == "11")
        return "l";
    else if(numero == "12")
        return "m";
    else if(numero == "13")
        return "n";
    else if(numero == "14")
        return "o";
    else if(numero == "15")
        return "p";
    else if(numero == "16")
        return "q";
    else if(numero == "17")
        return "r";
    else if(numero == "18")
        return "s";
    else if(numero == "19")
        return "t";
    else if(numero == "20")
        return "u";
    else if(numero == "21")
        return "v";
    else if(numero == "22")
        return "w";
    else if(numero == "23")
        return "x";
    else if(numero == "24")
        return "y";
    else if(numero == "25")
        return "z";
    else 
        return alert('Ocorreu algum problema.');  
}

// function descriptografar(palavra,p,q,e){
//     $('#resultado').val('');
//     var teste,d,teste3,teste4;
//     var einicial = e;
//     arraySeparacao = [];
//     var u = 0; // for para quebrar a palavra em 4 posições
//     for (var i = 0; i < palavra.length; i = i+4){
//         arraySeparacao[u] = palavra.substring(i,i+4);
//         u++;
//     }

//     pmenos1 = p - 1;
//     qmenos1 = q - 1;
//     n = pmenos1 * qmenos1;

//     arrayResultados = [];
    
//     var aux = "";
//     var valor = 0;
//     var i = 0;
//     while(aux != 1){
//         if(i == 0){ // Primeiro Loop = Inicio Algoritmo de euclides
//             divisao = parseInt((n / e));
//             resto = n % e;
//             // console.log(n+" = "+e+"*"+divisao+"+"+resto);
//             arrayResultados[i] = n - (e*divisao);
//             aux = arrayResultados[i];
//             valor = parseInt(n / (-e));
//             ninicial = n;
//         }else{
//             divisao = parseInt(e / aux);
//             resto = e % aux;
//             // console.log(e+" = "+divisao+"*"+aux+"+"+resto);
//             arrayResultados[i] = e - (divisao*aux);
//             e = aux;
//             aux = arrayResultados[i];
            
//         }
//         i++;
//     }

//     if(arrayResultados.length == 1){
//         d = valor;
//         if(d < 0){
//             d = d + ninicial;
//         }
//     }else{

//     }

//     for(var i = 0; i < arraySeparacao.length; i++){
//         chamadaApi(arraySeparacao[i]+"^"+d+" \\equiv M mod "+(p*q));
//     }

// }