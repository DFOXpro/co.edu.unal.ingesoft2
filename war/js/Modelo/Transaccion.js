/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Transaccion = function (nombre, origen, destino, saldo, fecha) {
    this.id = fecha;//Unico
    this.nombre = nombre;
    this.origen = origen;
    this.destino = destino;
    this.saldo = saldo;
    this.fecha = fecha;
};
console.log("Cargado Mtransaccion");