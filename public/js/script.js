
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
if (divFecha != null){
    divFecha.innerHTML = "Hoy es " + day + " de " + months[month] + " del " + year;

}
//document.write("Hoy es " + day + " de " + months[month] + " del " + year);


//Modo Oscuro

var modoOscuro = localStorage.getItem('modo');

if(modoOscuro != null){
    switch (modoOscuro) {
        case "oscuro":
            activaModoOscuro()
            break;
    
        default:
            break;
    }
}

function cambiarModo() {
    
    let modoactual = localStorage.getItem('modo');
    if(modoactual == "oscuro"){
        localStorage.setItem('modo', 'claro');
        quitaModoOscuro()
    }
    else{
        localStorage.setItem('modo', 'oscuro');
        activaModoOscuro()

    }
}

function activaModoOscuro() {
    var bodyElem = document.body;
    bodyElem.classList.add("dark-mode");
    var navElem = document.getElementById("navbar");
    navElem.classList.add("dark-mode-nav");
    document.querySelector("#navbar > div > a").classList.add("white-text");
    document.querySelector("#navbarToggler > ul > li:nth-child(1) > a").classList.add("white-text-muted");
    document.querySelector("#navbarToggler > ul > li:nth-child(2) > a").classList.add("white-text-muted");
    document.querySelector("body > footer").classList.add("dark-mode-footer")
    document.querySelector("#navbarToggler > a.nav-link").classList.add("white-text")
}
function quitaModoOscuro() {
    var bodyElem = document.body;
    bodyElem.classList.remove("dark-mode");
    var navElem = document.getElementById("navbar");
    navElem.classList.remove("dark-mode-nav");
    document.querySelector("#navbar > div > a").classList.remove("white-text");
    document.querySelector("#navbarToggler > ul > li:nth-child(1) > a").classList.remove("white-text-muted");
    document.querySelector("#navbarToggler > ul > li:nth-child(2) > a").classList.remove("white-text-muted");
    document.querySelector("body > footer").classList.remove("dark-mode-footer")
    document.querySelector("#navbarToggler > a.nav-link").classList.remove("white-text")
}

function typeUser(){
    lista = document.typeuser;
    typeuser = lista.options[lista.selectedIndex].text
}
