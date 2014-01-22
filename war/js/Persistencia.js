/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Persistencia = new Object();

Persistencia.cache = Array(3);//
Persistencia.db;
ready = 0;
/**
 * Esta es la primera funcion que se ejecuta, carga el cache y luego llama al main
 */
Persistencia.open = function() {
    var rqst = indexedDB.open("co.edu.unal.is2.walletmanager", 1);
    rqst.onerror = function(event) {
        console.error("indexedDB.open.request.onerror: " + event);
        delete window.rqst;
    };
    rqst.onsuccess = function() {
        console.log("indexedDB.open.request.onsucces");
        Persistencia.db = rqst.result;
        Persistencia.get("Cuenta", "", Control.main);
        Persistencia.get("Transaccion", "", Control.main);
        Persistencia.get("Configuracion", "", Control.main);
        delete window.rqst;
    };
    rqst.onupgradeneeded = function(event) {
        console.log("indexedDB.open.request.onupgradeneeded");
        Persistencia.db = event.target.result;
        // Create an objectStore for this database
        Persistencia.db.createObjectStore("persistencia", {keyPath: "id"});
        delete window.rqst;
    };
};
Persistencia.open();

/**
 * Esta funcion es asincrona si no tiene cargado un cache o sincronica si ya se cargó el cache
 * @param {String} tabla Nombre de la tabla
 * @param {String} llave Llave del objeto
 * @param {function} callback El parametro a esta función es el resultado del request
 * @returns {Value} 
 * <ul>
 * <li>El objeto correspondiente a la llave (si hay llave)</li>
 * <li>Null si no existe un objeto con dicha llave (si hay llave)</li>
 * <li>El arreglo de objetos (si no hay llave)</li>
 * <li>Undefined si no hay cache (empieza a cargar el caché asincronamente)</li>
 * </ul>
 * 
 */
Persistencia.get = function(tabla, llave, callback) {
    console.log("Persistencia.get");
    delete window.rqst;
    var i;
    if (tabla == "Cuenta") i = 0;
    else if (tabla == "Transaccion") i = 1;
    else if (tabla == "Configuracion") i = 2;

    if (typeof Persistencia.cache[i] !== "undefined") {//Respuesta sincronica
        //console.log("Existe cache");
        if(llave == null | llave == "" | typeof llave == "undefined") return Persistencia.cache[i];
        for (var item in Persistencia.cache[i])
            if(Persistencia.cache[i][item].id == llave){
                if (typeof callback != "undefined") callback(Persistencia.cache[i][item]);
                return Persistencia.cache[i][item];
            }
        return null;//No encontró la llave;
    }
    else {//Respuesta asincronica
        console.log("No existe cache");
        var trans = Persistencia.db.transaction(["persistencia"]);//Readonly
        var store = trans.objectStore("persistencia");
        var request = store.get(tabla);
        request.onerror = function(event) {
            console.error("Persistencia.get:request.onerror"+event);
        };
        request.onsuccess = function(event) {
            console.log("Persistencia.get(" + tabla + ") onsuccess");
            if (typeof event.target.result !== "undefined")
                Persistencia.cache[i] = event.target.result.valor;
            if (typeof callback !== "undefined")
                callback(Persistencia.cache[i]);
        };
    }
    return undefined;
};
/**
 * 
 * @param {String} tabla 
 * @param {Value} valor
 * @param {function} callback runs onsuccess
 */
Persistencia.set = function(tabla, valor, callback) {
    console.log("Persistencia.set("+tabla+", "+valor+", "+callback+")");
    var v =  Persistencia.get(tabla);
    if(typeof v == "undefined") {
        v = new Array(valor);
    } else{
        var crea = true;
        for (var item in v)
            if (v[item].id == valor.id) {
                v[item] = valor;
                crea = false;
            }//Update
        if(crea) v[v.length] = valor;
    }
    var i;
    if (tabla === "Cuenta") i = 0;
    else if (tabla === "Transaccion") i = 1;
    else if (tabla === "Configuracion") i = 2;

    Persistencia.cache[i] = v;

    var trans = Persistencia.db.transaction(["persistencia"], "readwrite");
    var store = trans.objectStore("persistencia");
    var request = store.put({
        "valor": v,
        "id": tabla
    });
    request.onsuccess = function() {
        console.log("Persistencia.set(" + tabla + ") onsucces");
        if (typeof callback !== "undefined")
            callback();
    };
    request.onerror = function(e) {
        console.error("Persistencia.set:request.onerror: "+e);
    };
    //localStorage.setItem(tabla, JSON.stringify(value));
};

/**
 * 
 * @param {String} tabla 
 * @param {String} id
 * @param {function} callback runs onsuccess
 * @return {String} error o null si no hay problemas
 */
Persistencia.del = function(tabla, id, callback) {
    console.log("Persistencia.del("+tabla+", "+id+", "+callback+")");
    var v =  Persistencia.get(tabla);
    if(typeof v == "undefined") {
        return "No hay nada que borrar";
    } else{
        crea = true;
        for (var i = 0; i < v.length; i ++) {
            if (v[i].id === v[i].id) {
                crea = false;
                v.splice(i, 1);
            }//Update
        }
        if(crea){
            return "No existe ese objeto";
        }
    }
    var trans = Persistencia.db.transaction(["persistencia"], "readwrite");
    var store = trans.objectStore("persistencia");
    var request = store.put({
        "valor": v,
        "id": tabla
    });
    request.onsuccess = function() {
        console.log("Persistencia.set(" + tabla + ") onsucces");
        if (typeof callback !== "undefined")
            callback();
    };
    request.onerror = function(e) {
        console.error("Persistencia.set:request.onerror: "+e);
    };
    //localStorage.setItem(tabla, JSON.stringify(value));
};

console.log("Cargado persitencia");