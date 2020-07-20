// Acá requerimos express
var express = require('express');
var app = express();

// MySQL
var mysql = require('mysql');

// body-parser
var bodyParser = require('body-parser');

// Cookie parser para manejar cookies
var cookieParser = require('cookie-parser');

// Conexión
var conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "comercio-db"
});

// Acá intentamos conectarnos
conexion.connect(function(err) {
  if (err) throw err;
  console.log("Correctamente conectado a MySQL!");
});


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

app.use(bodyParser.json()); // JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Encoded bodies
app.use(cookieParser()); // Usamos cookie parser

// Usamos la carpeta public para referenciar archivos css / js
app.use(express.static(__dirname + '/public'));

// La ruta inicial "home", la cual muestra a index.hbs que está en la carpeta views
// con la plantilla "template.hbs" que está en la carpeta layouts
app.get('/', function (req, res) {

  if(req.cookies.usuario){
    let usuario = req.cookies.usuario
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

// Login POST
app.post('/login', function (req, res) {
  //Acá podemos ver los argumentos que mandamos cuando nos registramos
  //console.log("nombre => " + req.body.usuario) 
  //console.log("clave => " + req.body.clave)

  // Aca busco un nombre de usuario con el que me mandaron
  var nombre_usuario = req.body.usuario
  var clave = req.body.clave
  var sql = "SELECT * FROM usuarios WHERE nombre_usuario = '" + nombre_usuario + "'";
  conexion.query(sql, function (err, result) {
    if (err) {
      // Hubo un error registrandose
      res.redirect("/")
      throw err
    };


    if(result != false){ // Cuando es false no hay usuarios con ese nombre de usuario asi que ejecutaremos cuando si hay
      if(result[0].clave == clave){ // Si la clave es igual en la base de datos y la que entro el usuario

        //Creo la cookie
        res.cookie("usuario", nombre_usuario);
      }
    }

    res.redirect("/")
  });

});

// Registro
app.get('/register', function (req, res) {
  res.render('register', { layout: 'template' });
});

// Registro POST
app.post('/register', function (req, res) {
  //Acá podemos ver los argumentos que mandamos cuando nos registramos
  //console.log("nombre => " + req.body.usuario) 
  //console.log("clave => " + req.body.clave)

  // Aca inserto el usuario nuevo en la tabla usuarios
  var nombre_usuario = req.body.usuario
  var clave = req.body.clave
  var sql = "INSERT INTO usuarios (nombre_usuario, clave) VALUES ('" + nombre_usuario + "','" + clave +"')";
  conexion.query(sql, function (err, result) {
    if (err) {
      // Hubo un error registrandose
      res.redirect("/")
      throw err
    };

    // El codigo de aqui abajo se ejecuta si se añadió el usuario correctamente,
    // entonces crearé una cookie con el nombre de usuario

    console.log("1 Usuario añadido!");
    res.cookie("usuario", nombre_usuario);
    res.redirect("/")
  });

});

// Logout
app.get('/logout', function (req, res) {
  res.clearCookie('usuario');
  res.redirect("/")
});

app.listen(3000, function () {
  console.log('Servidor corriendo exitosamente en http://localhost:3000/');
});