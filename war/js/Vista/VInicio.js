/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Vista.pantalla.Inicio = new Object();
Vista.pantalla.Inicio.mostrar = function() {
    console.log("Vista.pantalla.Inicio.mostrar");
    Vista.pantallaActual = Vista.pantalla.Inicio;
    Vista.mostarButtons(false, false, false,
            false, false, false);
    $("article").html($("#inicio").html());
    console.log("fin Vista.Pantanlla.Inicio");
};

console.log("Cargado Vinicio");