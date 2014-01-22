/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Vista.pantalla.Transaccion = new Object();
Vista.pantalla.Transaccion.mostrar = function() {
    console.log("Vista.pantalla.Transaccion.mostrar");
    Vista.pantallaActual = Vista.pantalla.Transaccion;
    Vista.mostarButtons(true, true, false,
        true, true, true);
    var string = "";
    var temp = Persistencia.get("Transaccion");
    //if(temp)
    for (var i=0; i < temp.length; i++ ){
        var ftemp = new Date(temp[i].fecha);//~~
        var fecha = 
            ftemp.getDate()+"/"+
            (ftemp.getMonth()+1) +"/"+
            ftemp.getFullYear();
        if(temp[i].destino==null)
            string += $("#transaccion").html().format(temp[i].nombre, temp[i].origen, fecha, temp[i].saldo, temp[i].id);
        else string += $("#transaccion").html().format(temp[i].nombre, temp[i].origen +" > "+temp[i].destino, fecha, temp[i].saldo, temp[i].id);
    }
    //string += $("#btn-crearCuenta").html();
    $("article").html(string);
    for (var j=0; j < temp.length; j++ )
        if(temp[j].destino==null) Vista.colorSaldo($("#saldo-"+temp[j].id));
    Vista.seleccionarFooter($("#btn-transacciones"));
};