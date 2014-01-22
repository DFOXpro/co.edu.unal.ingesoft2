/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Evento = new Object();

Evento.btnCrearTransaccion = function (cuenta) {
    console.log("Evento.btnCrearTransaccion: "+cuenta);
    $("#slct-transaccion-Origen").val(cuenta);
    $("#menu-transaccion").collapse("show");
};

$('#btn-opciones').click(Vista.alternarAside);
$('ul > li').click(function (){
    Vista.seleccionarAside($(this));
});

//BOTONES DEL FOOTER
$('#btn-cuentas').click(Vista.pantalla.Cuenta.mostrar);
$('#btn-transacciones').click(Vista.pantalla.Transaccion.mostrar);

//BOTONES DE LOS MENUS
$('#cb-transaccion-Transferencia').click(Vista.sTranferencia);
$('#btn-cuenta-Aceptar').click(Control.crearCuenta);
$('#btn-transaccion-Aceptar').click(Control.crearTransaccion);
//$('footer > button').click(function (){
//    Vista.seleccionarFooter($(this));
//});
console.log("Cargado evento");