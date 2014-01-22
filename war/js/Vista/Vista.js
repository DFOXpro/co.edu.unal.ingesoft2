/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Vista = new Object;
Vista.pantalla = new Object;//Se usa en las demas clases

Vista.seleccionarAside = function (element){
    console.log("evento-seleccionado");
    $('ul > li').removeClass('seleccionado');
    if(!element.hasClass('seleccionado')) {
        element.addClass('seleccionado');
    }
};
Vista.alternarAside = function() {
    console.log("Vista.alternarAside");
    if ($('aside').hasClass("seleccionado")) {
        $("article").removeAttr("style");
        $("article").addClass("seleccionado");
        $('aside').removeClass("seleccionado");
    } else {
        $('article').removeClass("seleccionado");
        $("article").css("transform", "translateX(200px)");
        $("article").css("-webkit-transform", "translateX(200px)");
        $('aside').addClass("seleccionado");
    }
};
Vista.seleccionarFooter = function (element){
    console.log("evento-seleccionado");
    $('footer > button').removeClass('seleccionado');
    if(!element.hasClass('seleccionado')) {
        element.addClass('seleccionado');
    }
};

Vista.mostarButtons = function (ordenar, transaccion, alerta, informe, reporte, cuentas){
    if(ordenar) $("#btn-ordenar").removeClass("hidden");
    else $("#btn-ordenar").addClass("hidden");

    if(transaccion) $("#btn-transaccion").removeClass("hidden");
    else $("#btn-transaccion").addClass("hidden");
    if(alerta) $("#btn-alerta").removeClass("hidden");
    else $("#btn-alerta").addClass("hidden");
    if(informe) $("#btn-transacciones").removeClass("hidden");
    else $("#btn-transacciones").addClass("hidden");
    if(reporte) $("#btn-reporte").removeClass("hidden");
    else $("#btn-reporte").addClass("hidden");
    if(cuentas) $("#btn-cuentas").removeClass("hidden");
    else $("#btn-cuentas").addClass("hidden");
    Vista.alerta();
};
Vista.alerta = function (msg){
    if(typeof msg !== "undefined"){
        $("#btn-alerta").removeClass("hidden");
        $("#btn-alerta").addClass("seleccionado");
        $("#menu-alerta").html(msg).collapse('show');
    } else{
        $("#btn-alerta").removeClass("seleccionado");
        $("#btn-alerta").addClass("hidden");
        $("#menu-alerta").collapse('hide');
    }
};

Vista.colorSaldo = function (element){
    if(element.text() !== "")
        if(parseInt(element.text()) < 0) element.css("color", "red");
        else element.css("color", "green");
    else if(parseInt(element.val()) < 0) element.css("color", "red");
        else element.css("color", "green");
};
Vista.sTranferencia = function (){
    console.log("evento-sTransferencia");
    if($('#cb-transaccion-Transferencia').is(":checked")){
        $('#slct-transaccion-Destino').removeClass("hidden");
        $('#spn-transaccion-Abono').addClass("hidden");        
    }
    else {
        $('#slct-transaccion-Destino').addClass("hidden");
        $('#spn-transaccion-Abono').removeClass("hidden");
    }
};

Vista.isLogged = function (){
    if(Control.logged){
        $("#li-sesionCerrar").removeClass("hidden");
        $("#li-sesionCrear").addClass("hidden");
        $("#li-sesionIniciar").addClass("hidden");
    }else{
        $("#li-sesionCerrar").addClass("hidden");
        $("#li-sesionCrear").removeClass("hidden");
        $("#li-sesionIniciar").removeClass("hidden");
    }
};
console.log("Cargado vista");