/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Servicio.Cuenta = new Object();

/**
 * 
 * @param {String} nombre
 * @param {String} tipo
 * @param {String} divisa
 * @param {String} saldo
 * @param {function} callback Esta función se ejecutará despues de  persistir el objeto
 * @returns {String} Error Devuelve un error o null si no hay errores;
 */
Servicio.Cuenta.crear = function(nombre, tipo, divisa, saldo, callback) {
    console.log("Servicio.Cuenta.crear");
    if (nombre.length < 1)
        return "La cuenta necesita un nombre";
    if(saldo == "") saldo = 0;
    else if (isNaN(parseFloat(saldo)))
        return "Escribe solo numeros en el saldo";
    
    var c = Persistencia.get("Cuenta", nombre);
    if(typeof c == "object" & c != null) return "La cuenta ya existe";
    else {
        Persistencia.set("Cuenta", new Cuenta(nombre, tipo, divisa, parseFloat(saldo)), callback);
        return null;
    }
};



Servicio.Cuenta.borrar = function(nombre, callback) {
    console.log("Servicio.Cuenta.borrar");
    if (nombre.length < 1)
        return "Este error pasa por manitas, no hay nombre";
    c = Persistencia.get("Cuenta", nombre);
    if(typeof c == "object" & c != null) {
        Persistencia.del("Cuenta", new Cuenta(nombre, tipo, divisa, saldo), callback);
        return null;
    } else return "La cuenta no existe... manitas";
};

console.log("Cargado Scuenta");