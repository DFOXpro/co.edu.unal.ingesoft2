/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Control = new Object;
Control.logged = false;
var ready = 0;
/**
 * Esta función verifica que se halla cargado el cache completamente, luego inicia la app
 * @returns {undefined}
 */
Control.main = function(){
    ready++;
    if(ready > 2){//Esto basicamente hace un loop esperando a que el caché se inicie
    //if(false){
        delete ready;
        console.log("Control.main");
        //Control.verificarCompra();
        Modelo.innit();
        Control.inicio();
        console.log("fin main");
    }
};

Control.inicio = function (){
    console.log("Control.inicio");
    Vista.isLogged();
    var temp = Persistencia.get("Cuenta");
    if (temp == undefined) Vista.pantalla.Inicio.mostrar();
    else Vista.pantalla.Cuenta.mostrar(temp);
    console.log("fin Control.inicio");
};

Control.crearCuenta = function() {
    console.log("Control.crearCuenta");
    var e = Servicio.Cuenta.crear(
        $('#tf-cuenta-Nombre').val(),
        $('#slct-cuenta-Tipo').val(),
        $('#slct-cuenta-Divisa').val(),
        $('#tf-cuenta-Saldo').val(),
        Vista.pantalla.Cuenta.mostrar
    );
    if(e !== null) $('#spn-cuenta-Error').text(e);
    else $('#menu-cuenta').collapse('hide');
};

Control.crearTransaccion = function() {
    console.log("Control.crearTransaccion");
    var e = Servicio.Transaccion.crear(
        $('#tf-transaccion-categoria').val(),
        $('#cb-transaccion-Transferencia').is(":checked"),
        $('#slct-transaccion-Origen').val(),
        $('#slct-transaccion-Destino').val(),
        $('#tf-transaccion-valor').val(),
        $("#rb-transaccion-Abono").is(':checked'),
        $("#rb-transaccion-Gasto").is(':checked'),
        Vista.pantallaActual.mostrar
    );
    if(e !== null) $('#spn-transaccion-Error').text(e);
    else $('#menu-transaccion').collapse('hide');
};

Control.calcularSaldo = function (){
    var c = Persistencia.get("Cuenta");
    for(var j = 0; j < c.length; j++){
        c[j].saldototal = c[j].saldo;
        Persistencia.set("Cuenta", c[j]);
    }

    var t = Persistencia.get("Transaccion");
    if (typeof t != "undefined"){
        for(var i = 0; i < t.length; i++){
            var c1 = Persistencia.get("Cuenta",t[i].origen);
            if(t[i].destino == null){
                c1.saldototal += t[i].saldo;
            }else{
                c1.saldototal -= t[i].saldo;
                var cd = Persistencia.get("Cuenta",t[i].destino);
                cd.saldototal += t[i].saldo;
                Persistencia.set("Cuenta", cd);
            }
            Persistencia.set("Cuenta", c1);
        }
    }

};
console.log("Cargado control");