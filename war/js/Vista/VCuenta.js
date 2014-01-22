/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Vista.pantalla.Cuenta = new Object();
Vista.pantalla.Cuenta.mostrar = function(temp) {
    console.log("Vista.pantalla.Cuenta.mostrar");
    Vista.pantallaActual = Vista.pantalla.Cuenta;
    Vista.mostarButtons(true, true, false,
        true, true, true);
    var string = "";
    Control.calcularSaldo();
    if(typeof temp == "undefined") temp = Persistencia.get("Cuenta");
    else if(typeof temp.length == "undefined") temp = Persistencia.get("Cuenta");
    for (var i=0; i < temp.length; i++ )
        string += $("#cuenta").html().format(temp[i].nombre, temp[i].saldototal);
    string += $("#btn-crearCuenta").html();
    $("article").html(string);
    for (var j=0; j < temp.length; j++ ){
        Vista.colorSaldo($("#saldo-"+temp[j].nombre));
        $("#btn-agregar-"+temp[j].nombre).click(function (){
            Evento.btnCrearTransaccion(this.id.split('-')[2]);
        });
    }
    Vista.pantalla.Cuenta.select(temp);
    Vista.seleccionarFooter($("#btn-cuentas"));
};

/**
 * Escribe las cuentas en el combo box (select >option) del crear transacción
 * @param {Array} array de cuentas
 */
Vista.pantalla.Cuenta.select = function (temp){
    console.log("Vista.pantalla.Cuenta.select");
    var c = '<option value="{0}">{0}</option>';
    var s = '';
    for (var i=0; i < temp.length; i++ )
        s += c.format(temp[i].nombre);
    //console.log(s);
    $("#slct-transaccion-Origen").html(s);
    $("#slct-transaccion-Destino").html(s);
};

console.log("Cargado Vcuenta");