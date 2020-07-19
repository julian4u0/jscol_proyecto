// Acá requerimos express
var express = require('express');
var app = express();

// Handlebars sirve para manejar plantillas html y mostrarlas
var hbs = require('express-handlebars');

//Configuramos hbs (handlebars) como view engine
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  //partialsDir: __dirname + '/views/partials/'
}));

// Usamos la carpeta public para referenciar archivos css / js
app.use(express.static(__dirname + '/public'));

// La ruta inicial "home", la cual muestra a index.hbs que está en la carpeta views
// con la plantilla "template.hbs" que está en la carpeta layouts
app.get('/', function (req, res) {
  res.render('index', { layout: 'template' });
});

app.listen(3000, function () {
  console.log('Servidor corriendo exitosamente en http://localhost:3000/');
});