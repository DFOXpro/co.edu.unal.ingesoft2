/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Servicio.Transaccion = new Object();

/**
 * 
 * @param {String} nombre
 * @param {String} tipo
 * @param {String} divisa
 * @param {String} saldo
 * @param {function} callback Esta función se ejecutará despues de  persistir el objeto
 * @returns {String} Error Devuelve un error o null si no hay errores;
 */
Servicio.Transaccion.crear = function(nombre, transferencia, origen, destino, saldo, abono, gasto, callback) {
    console.log("Servicio.Transaccion.crear");
    if (nombre.length < 1)
        return "La transaccion necesita una categoria, seria un gasto sin razón";
    if (isNaN(parseFloat(saldo)))
        return "Escribe solo numeros en el saldo";
    if (saldo==0)
        return "Cuanto dinero usáste?";
    if(transferencia){
        if(origen == destino)
            return "Si es una transferencia no puede ser a la misma cuenta";
    } else{
        if (!abono & !gasto)
            return "Es un abono ó un gasto?";
        else if(gasto) saldo = -saldo;
        destino = null;
    }
    Persistencia.set("Transaccion", new Transaccion(nombre, origen, destino, parseFloat(saldo), Date().hashCode()), callback);
    return null;
};

Servicio.Transaccion.borrar = function(nombre, callback) {
    console.log("Servicio.Cuenta.borrar");
    if (nombre.length < 1)
        return "Este error pasa por manitas, no hay nombre";
    var c = Persistencia.get("Cuenta", nombre);
    if(typeof c == "object" & c != null) {
        Persistencia.del("Cuenta", new Transaccion(nombre), callback);
        return null;
    } else return "La cuenta no existe... manitas";
};
console.log("Cargado Stransaccion");