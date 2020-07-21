
function makeArray() { 
    for (i = 0; i < makeArray.arguments.length; i++)
    this[i + 1] = makeArray.arguments[i] 
} 
var months = new makeArray('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'); 
var date = new Date(); 
var day = date.getDate(); 
var month = date.getMonth() + 1; 
var yy = date.getYear(); 
var year = (yy < 1000) ? yy + 1900 : yy; 

var divFecha = document.getElementById("div-fecha");
divFecha.innerHTML = "Hoy es " + day + " de " + months[month] + " del " + year;
//document.write("Hoy es " + day + " de " + months[month] + " del " + year);


//Modo Oscuro
function modoOscuro() {
    var bodyElem = document.body;
    bodyElem.classList.toggle("dark-mode");
    var navElem = document.getElementById("navbar");
    navElem.classList.toggle("dark-mode-nav");

    document.querySelector("#navbar > div > a").classList.toggle("white-text");
    document.querySelector("#navbarToggler > ul > li:nth-child(1) > a").classList.toggle("white-text-muted");
    document.querySelector("#navbarToggler > ul > li:nth-child(2) > a").classList.toggle("white-text-muted");
    document.querySelector("body > footer").classList.toggle("dark-mode-footer")
    document.querySelector("#navbarToggler > a.nav-link").classList.toggle("white-text")
 }