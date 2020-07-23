// Acá requerimos express
var express = require('express');
var app = express();


const user = require("./routes/user");

// MySQL
var mysql = require('mysql');
const InitiateMongoServer = require("./config/db");

// body-parser
var bodyParser = require('body-parser');

// Cookie parser para manejar cookies
var cookieParser = require('cookie-parser');

// Conexión
InitiateMongoServer();
// PORT
const PORT = process.env.PORT || 4000;

require('dotenv').config({ debug: process.env.DEBUG });

// Handlebars sirve para manejar plantillas html y mostrarlas
var hbs = require('express-handlebars');

//Configuramos hbs (handlebars) como view engine
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(bodyParser.json()); // JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Encoded bodies
app.use(cookieParser()); // Usamos cookie parser
app.use(express.json());

// Usamos la carpeta public para referenciar archivos css / js
app.use(express.static(__dirname + '/public'));

// La ruta inicial "home", la cual muestra a index.hbs que está en la carpeta views
// con la plantilla "template.hbs" que está en la carpeta layouts
app.get('/', function (req, res) {

  if(req.cookies.username){
    let usuario = req.cookies.username
    res.render('index', { layout: 'template', usuario: usuario });
  }
  else{
    res.render('index', { layout: 'template' });
  }

  
});

// Login
app.get('/login', function (req, res) {
  res.render('login', { layout: 'template' });
});


app.use("/user", user);

// Registro
app.get('/register', function (req, res) {
  res.render('register', { layout: 'template',  });
});

app.get('/seller', function (req, res) {
  res.render('seller', { layout: 'template',  });
});

// Logout
app.get('/logout', function (req, res) {
  
  //borrar todas las cookies
  res.clearCookie("token");
  res.clearCookie("id");
  res.clearCookie("username");
  res.clearCookie("email");
  res.clearCookie("role");
  res.redirect("/")
});

app.listen(3000, function () {
  console.log('Servidor corriendo exitosamente en http://localhost:3000/');
});