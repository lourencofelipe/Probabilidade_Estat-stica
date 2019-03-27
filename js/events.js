$( document ).ready(function() {
    bootbox.prompt("Informe a quantidade de Linhas! ", function( linhas ) { 
        let msg = validate( " Quantidade", linhas, 'linhas' );
        
        if( msg ) {           
            modals( msg, "alert" );
        } else {
            montaTabela( linhas );
        }            
    });
});

function validate( campo, valor, tp ) {

    let msg = ""

    if( valor == null ||  valor.trim() == "" ) {
        msg += "-" + campo + " Está Vazio. </br>";
    }
    if( valor <= 0 ) {
        msg += "-" + campo + " Valor invalido, deve ser maior que zero";
    }

    if( valor > 4 && tp == "linhas" ) {
        msg += "-" + campo + " Valor de linhas invalido, <br> deve ser menor ou igual a 4";
    }

    return msg;
}

function modals( msg, tpModal ) {
    let valor = "";
    if( tpModal == "modalInput" ) {
        bootbox.prompt(msg, function( result ) { 
            valor = result; 
        });
    } else {
        bootbox.alert( msg );
    }
    
    return valor;
}

function vlValores( tpDados ) {
    let msg = "";

    msg += tpDados == "maximo" ? validate("Maximo: ", tpDados )  : "";
    msg += tpDados == "minimo" ? validate("Minimo: " , tpDados ) : "";

    if( msg ) {
        modals( msg, "" );
    } else {
        $('#valorMaximoMinimo').modal('hide');
    }
}

function vlDados() {
    let msg = "";

    msg += tpDados == "maximo" ? validate("Maximo: ", tpDados ) : "";
    msg += tpDados == "minimo" ? validate("Minimo: " , tpDados ) : "";

    if( msg ) {
        modals( msg, "" );
    } else {
        $('#valorMaximoMinimo').modal('hide');
    }
}

async function montaTabela( totalLinhas ) {

    let i    = 0, 
        html = "",
        msg  = "";
    
    if( totalLinhas ) {
        $("#escondeLinhas").val( totalLinhas );
        i++;
        $('#valorMaximoMinimo').modal('show');
        
    }

    /*for( let i = 0; i <= linhas; i++ ) {
        console.log(i);
        chamadaModalPersonalisado();

        valMinimo = $("#vlminimo").val();
        valMaximo = $("#vlmaximo").val();

        
        msg += validate("Valor minimo: ", modals, "" );
        msg += validate("Valor maximo: ", modals, "" );

        html += "<tr>" +

                "</tr>";
    }*/

    $("#dadosTabela").html(html);

    
}