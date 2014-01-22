/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Modelo = new Object();

Modelo.innit = function (){
    if (typeof Persistencia.cache[0] !== "object") {//No hay transacciones
//DO nothing
    };
    if (typeof Persistencia.cache[1] !== "object") {//No hay cuentas
//DO nothing
    };
    if (typeof Persistencia.cache[2] !== "object") {//Configuracion
        console.log("Creando configuracion");
        temp = new Array();
        //temp[0] = new Modelo.Configuracion("sombraBtnPC", false, "Enable fullscreen button shadow? ");
        //Persistencia.set("configuracion", temp);
        delete window.temp;
    };
};
console.log('Cargado modelo');