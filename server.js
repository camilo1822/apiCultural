
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");

var CONTACTS_COLLECTION = "sites";

var db;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//importo controlador
var models     = require('./models/lugares')(app, mongoose);
var LugaresCtrl = require('./controllers/listaLugares');


// API routes
var listaLugares = express.Router();

listaLugares.route('/Lugares')
  .get(LugaresCtrl.findAllLugares)
  .post(LugaresCtrl.addLugar);
listaLugares.route('/Lugares/:id')
  .get(LugaresCtrl.findById)
  .delete(LugaresCtrl.deleteLugar);

var model     = require('./models/favoritos')(app, mongoose);
var FavoritosCtrl = require('./controllers/listaFavoritos');


// API routes
var listaFavoritos = express.Router();

listaFavoritos.route('/Favoritos')
  .get(FavoritosCtrl.findAllFavoritos)
  .post(FavoritosCtrl.addFavorito)

  listaFavoritos.route('/Favoritos/:id')
  .get(FavoritosCtrl.findById)
  .delete(FavoritosCtrl.deleteFavorito);
  


var model     = require('./models/comentarios')(app, mongoose);
var ComentariosCtrl = require('./controllers/listaComentarios');
// API routes
var listaComentarios = express.Router();

/*listaComentarios.route('/Comentarios')
  .get(ComentariosCtrl.findAllComentarios)
  .post(ComentariosCtrl.addComentario);*/

  listaComentarios.route('/Comentarios/:id')
  .get(ComentariosCtrl.findById)
  //.delete(ComentariosCtrl.deleteComentario);
  .delete(ComentariosCtrl.deletePaparapa);






var uristring='mongodb://lugaresCult:apiCultural@ds011379.mlab.com:11379/heroku_2v8qghk7';


mongoose.connect(uristring, function (err, database) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
  db = database;
});

  

// The http server will listen to an appropriate port, or default to
// port 5000.

// CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


var port = process.env.PORT || 5000;

app.use('/api', listaLugares);

app.use('/api', listaFavoritos);

app.use('/api', listaComentarios);

app.listen(port, function() {
  console.log('Node Server Running in the port:'+port);
});