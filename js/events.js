
vlhtml    = "";
contador  = 0;
totalfi   = 0;
totalxifi = 0;

$(document).ready(function() {
    bootbox.prompt("Informe a quantidade de Linhas! ", function( linhas ) { 
        let msg = validate( " Quantidade", linhas, 'linhas' );
        
        if( msg ) {           
            modals( "Campos Inválidos: <br>" + msg, "alert" );
        } else {
            montaTabela( linhas, 'chamada' );
        }            
    });
    $('.bootbox-form').find('input')[0].getAttribute('type') = 'number';
});

function validate( campo, valor, tp ) {

    let msg = "";

    if( valor == null ||  valor.trim() == "" ) {        
        msg += "-" + campo + " Está Vazio. <br>";
    }

    if( valor <= 0 ) {
        msg += "-" + campo + " Valor invalido, deve ser maior que zero <br>";
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

    if( tpDados == "minimo" ) {
        msg += nMinimo();
    } else if( tpDados == "maximo" ) {
        msg += nMaximo();
    }

    if( msg ) {
        modals( "Os seguintes campos estão inválidos: <br>" +  msg, "" );
    }
}

function nMaximo() {
    return validate("Maximo: ", $("#vlmaximo").val());
}
function nMinimo() {
    return validate("Minimo: " , $("#vlminimo").val());
}
function nFi() {
    return validate("Fi: ", $("#vlFi").val());
}

function vlDados() {
    let msg = "";

    msg += tpDados == "maximo" ? validate("Maximo: ", tpDados ) : "";
    msg += tpDados == "minimo" ? validate("Minimo: " , tpDados ) : "";
    if( msg ) {
        modals( "Campos Inválidos: <br>" + msg, "" );
    } else {
        $('#valorMaximoMinimo').modal('hide');
    }
}


function calculaXi() {
    let calculo = parseInt( $("#vlminimo").val() ) + parseInt( $("#vlmaximo").val());
    return calculo / 2;
}

function calculadxifi( vl ) {
    return vl *  $("#vlFi").val();
}

async function montaTabela( totalLinhas, tpChamada, html, i, proxChamada ) {
       
    qvlhtml   = html ? html : "";
    contador = i ? i : "";

    let    msg      = "";

    if( tpChamada == "chamada" ) {
        $("#escondeLinhas").val( totalLinhas );
        $('#valorMaximoMinimo').modal('show');
        return;
    }

    contador = $("#contador").val() ? parseInt( $("#contador").val() )+1 : contador+1;

    if( proxChamada == "proxima" ) {

        $("#vlminimo").val("");
        $("#vlmaximo").val("");
        $("#vlFi").val("");
        if( contador <= $("#escondeLinhas").val() ) { 
            $('#valorMaximoMinimo').modal('show');
        }
        return;
    }


    if( tpChamada == "retorno" ) {   
       
        msg += nMinimo();    
        msg += nMaximo();        

        if( msg ) {
            $('#valorMaximoMinimo').modal('show');
            modals( "Os seguintes campos estão inválidos: <br>" +  msg, "" );        
        } else if( contador <= $("#escondeLinhas").val() ) {

            $("#contador").val( contador );

            let xi    = calculaXi();
            let xifi  = calculadxifi(xi);

            totalfi   = totalfi + parseInt( $("#vlFi").val() );
            totalxifi = totalxifi + xifi;
            
            vlhtml += "<tr>" +
                        "<td>"+
                            "<table>"+
                                "<tr>" + 
                                    "<td>" +
                                        $("#vlminimo").val()+
                                    "</td>"+
                                    "<td>" +
                                        "<img src='img/simbulo.png' alt='Inclui numero a esquerda e excluo o numero da direita' style='height: 20px; width: auto;'>"+
                                    "</td>"+
                                    "<td>" +
                                        $("#vlmaximo").val()+
                                    "</td>"+
                                "</tr>"+
                            "</table>"+
                        "</td>"+
                        "<td>"+
                            $("#vlFi").val()+
                        "</td>"+
                        "<td>"+
                            xi+
                        "</td>"+
                        "<td>"+
                            xifi+
                        "</td>"+
                    "</tr>";
            /**
             * Colocar modal aqui criar só uma TR etd 
             * moda bruta criar só uma TR etd
             * moda conforme zczuber criar só uma TR etd
             */
            if(  contador == $("#escondeLinhas").val() ) {
                vlhtml  +=  "<tr>"+
                                "<td>"+
                                    "Total:"+
                                "</td>"+
                                "<td>"+
                                    "E="+totalfi+
                                "</td>"+
                                "<td>"+
                                    
                                "</td>"+
                                "<td>"+
                                    "E="+totalxifi+
                                "</td>"+
                            "</tr>"+
                            "<tr>"+
                                "<td>"+
                                    "Mediana: "+
                                "</td>"+
                                "<td>"+                                    
                                    totalxifi / totalfi
                                "</td>"+
                                "<td>"+
                                    ""+
                                "</td>"+
                                "<td>"+
                                    ""+
                                "</td>"+
                            "</tr>";
            }

            $("#dadosTabela").html(vlhtml);
            $('#valorMaximoMinimo').modal('hide');           

            setTimeout(function() { 
                debugger;
                montaTabela(totalLinhas, 'retorno', vlhtml, contador, 'proxima');                  
            }, 1350);            
        }
    }
}


function recarregaPagin() {
    debugger;
    location.reload();
}

$('#valorMaximoMinimo').on('shown.bs.modal', function () {
    $('#vlminimo').trigger('focus');   
})